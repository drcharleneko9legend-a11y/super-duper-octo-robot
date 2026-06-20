import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Trophy, Flame, Zap, Layout, Package, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/challenge/progress', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error('Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  };

  const completeDay = async (day) => {
    if (progress.some(p => p.day === day)) return;

    try {
      const response = await fetch('/api/challenge/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ day })
      });
      if (response.ok) {
        fetchProgress();
      }
    } catch (error) {
      console.error('Failed to mark progress');
    }
  };

  const streak = progress.length;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#18181C] p-8 rounded-3xl border border-zinc-800">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#FF4C00] mb-2">Warrior Dashboard</h2>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Welcome Back, {user?.email.split('@')[0]}</h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-black/50 px-6 py-4 rounded-2xl border border-zinc-800 text-center">
            <p className="text-2xl font-black text-[#FF4C00] italic">{streak}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A1A1AA]">Current Streak</p>
          </div>
          <button 
            onClick={logout}
            className="bg-zinc-800 p-4 rounded-2xl hover:bg-red-600 transition group"
          >
            <LogOut className="w-6 h-6 text-[#A1A1AA] group-hover:text-white" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Challenge Tracker */}
        <div className="md:col-span-2 bg-[#18181C] p-8 rounded-3xl border border-zinc-800 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-[#FF4C00]" />
              <h3 className="text-xl font-black uppercase italic tracking-tighter">30-Day Challenge Progress</h3>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#A1A1AA]">{Math.round((progress.length / 30) * 100)}% Complete</span>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isCompleted = progress.some(p => p.day === day);
              return (
                <button
                  key={i}
                  onClick={() => completeDay(day)}
                  disabled={isCompleted}
                  className={`aspect-square rounded-xl border flex items-center justify-center font-black text-sm transition ${
                    isCompleted 
                      ? 'bg-[#FF4C00] border-[#FF4C00] text-black shadow-[0_0_15px_rgba(255,76,0,0.4)]' 
                      : 'border-zinc-800 text-zinc-600 hover:border-[#FF4C00]/50'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Premium Resources */}
        <div className="bg-[#18181C] p-8 rounded-3xl border border-zinc-800 space-y-8">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-[#ADFF2F]" />
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Premium Resources</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Warrior Meal Plan', locked: user?.subscription_status === 'free' },
              { title: 'Elite Workout Guide', locked: user?.subscription_status === 'free' },
              { title: 'Sleep Protocol Pro', locked: user?.subscription_status === 'free' },
              { title: 'Cold Plunge Masterclass', locked: user?.subscription_status === 'free' },
            ].map((resource, i) => (
              <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between ${resource.locked ? 'border-zinc-900 bg-black/20 opacity-50' : 'border-zinc-800 bg-black/50 hover:border-[#ADFF2F]/50 transition cursor-pointer'}`}>
                <span className="text-sm font-bold uppercase tracking-tight">{resource.title}</span>
                {resource.locked ? <Zap className="w-4 h-4 text-zinc-700" /> : <Flame className="w-4 h-4 text-[#ADFF2F]" />}
              </div>
            ))}
          </div>
          
          {user?.subscription_status === 'free' && (
            <button className="w-full bg-[#ADFF2F] text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:scale-[1.02] transition shadow-lg shadow-[#ADFF2F]/20">
              Upgrade to Premium
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
