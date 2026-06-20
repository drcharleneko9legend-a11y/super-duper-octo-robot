import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Zap, Flame } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/login' : '/api/register';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          login(data.token, data.user);
        } else {
          setIsLogin(true);
          setError('Account created! Please log in.');
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#18181C] p-8 rounded-3xl border border-zinc-800 shadow-2xl">
      <div className="text-center mb-8">
        <Zap className="w-12 h-12 text-[#FF4C00] mx-auto mb-4" />
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">
          {isLogin ? 'Warrior Login' : 'Join the Movement'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#A1A1AA] mb-2">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full bg-black border border-zinc-800 px-4 py-3 rounded-xl focus:outline-none focus:border-[#FF4C00] transition text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#A1A1AA] mb-2">Password</label>
          <input 
            type="password" 
            required
            className="w-full bg-black border border-zinc-800 px-4 py-3 rounded-xl focus:outline-none focus:border-[#FF4C00] transition text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF4C00] text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:scale-[1.02] transition shadow-lg shadow-[#FF4C00]/20 flex items-center justify-center gap-2"
        >
          {loading ? 'Processing...' : (isLogin ? 'Enter Arena' : 'Become Warrior')}
          <Flame className="w-5 h-5" />
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-[#A1A1AA]">
        {isLogin ? "New warrior?" : "Already a member?"}
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="ml-2 text-[#FF4C00] font-black uppercase tracking-tighter hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
