import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const JWT_SECRET = 'warrior-vitality-secret-key-2026';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

const runQuery = (query) => {
  const shellCommand = `team-db '${query.replace(/'/g, "'\\''")}'`;
  return execSync(shellCommand).toString();
};

// --- AUTH ROUTES ---

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();
    const query = `INSERT INTO users (id, email, password_hash) VALUES ('${userId}', '${email}', '${hashedPassword}')`;
    runQuery(query);
    res.json({ message: 'Warrior account created successfully!' });
  } catch (error) {
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    const output = runQuery(query);
    const result = JSON.parse(output);
    
    if (!result || result.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, subscription_status: user.subscription_status } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const query = `SELECT id, email, subscription_status FROM users WHERE id = '${req.user.id}'`;
    const output = runQuery(query);
    const result = JSON.parse(output);
    if (!result || result.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- CHALLENGE ROUTES ---

app.get('/api/challenge/progress', authenticateToken, (req, res) => {
  try {
    const query = `SELECT day, completed_at FROM challenge_progress WHERE user_id = '${req.user.id}'`;
    const output = runQuery(query);
    const result = JSON.parse(output);
    res.json(result || []);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/challenge/complete', authenticateToken, (req, res) => {
  const { day } = req.body;
  if (day === undefined) return res.status(400).json({ error: 'Day is required' });

  try {
    // Check if already completed to avoid duplicates
    const checkQuery = `SELECT * FROM challenge_progress WHERE user_id = '${req.user.id}' AND day = ${day}`;
    const checkOutput = runQuery(checkQuery);
    const checkResult = JSON.parse(checkOutput);
    
    if (checkResult && checkResult.length > 0) {
      return res.status(400).json({ error: 'Day already completed' });
    }

    const query = `INSERT INTO challenge_progress (user_id, day) VALUES ('${req.user.id}', ${day})`;
    runQuery(query);
    res.json({ message: `Day ${day} completed!` });
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- LEAD SIGNUP ---
app.post('/api/signup', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const query = `INSERT INTO leads (email) VALUES ('${email}')`;
    runQuery(query);
    res.json({ message: 'Welcome to the movement, Warrior!' });
  } catch (error) {
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Warrior Vitality server listening at http://0.0.0.0:${port}`);
});
