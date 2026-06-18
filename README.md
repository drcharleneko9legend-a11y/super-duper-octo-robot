# Warrior Vitality Landing Page

High-conversion landing page for Warrior Vitality, built with Vite, React, and Tailwind CSS.

## Features
- High-intensity, 'scroll-stopping' design.
- Mobile-first responsive layout.
- Warrior Signup email capture.
- Integrated with team database for lead storage.

## Tech Stack
- **Frontend:** Vite, React, Tailwind CSS, Lucide React.
- **Backend:** Node.js, Express.
- **Database:** SQLite (via `team-db` CLI).

## Local Setup

### Prerequisites
- Node.js (v24 or later)
- `team-db` CLI installed and configured.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/drcharleneko9legend-a11y/super-duper-octo-robot.git
   cd super-duper-octo-robot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Deployment

### Using Docker
1. Build and start the container:
   ```bash
   docker-compose up -d --build
   ```
The app will be available at `http://localhost:3000`.

### Manual Deployment
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   node server.js
   ```

## Database Schema
The app uses a `leads` table in the shared database:
```sql
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  email TEXT UNIQUE NOT NULL, 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
