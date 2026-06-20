import React, { useState } from 'react';
import { 
  Play, 
  Users, 
  Eye, 
  Trophy, 
  CheckCircle, 
  Mail,
  Zap,
  Flame,
  Moon,
  Wind,
  Video,
  Camera,
  Send,
  X
} from 'lucide-react';
import { useAuth } from './AuthContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

const App = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Joining...');
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus('SUCCESS: YOU ARE IN, WARRIOR!');
        setEmail('');
      } else {
        setStatus(`ERROR: ${data.error}`);
      }
    } catch (error) {
      setStatus('ERROR: SYSTEM FAILURE. TRY AGAIN.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
      <Zap className="w-12 h-12 text-[#FF4C00] animate-pulse" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-[#FF4C00] selection:text-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <img src="/brand-assets/logo.png" className="h-10 w-10" />
          <span className="font-black text-2xl tracking-tighter text-white uppercase">WARRIOR <span className="text-[#FF4C00]">VITALITY</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
          <a href="#content" className="hover:text-[#FF4C00] transition">Content</a>
          <a href="#wellness" className="hover:text-[#FF4C00] transition">Wellness</a>
          <a href="#challenge" className="hover:text-[#FF4C00] transition">Challenge</a>
          <a href="#warriors" className="hover:text-[#FF4C00] transition">Warriors</a>
        </div>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button 
                onClick={() => setShowAuth(true)}
                className="text-xs font-black uppercase tracking-widest hover:text-[#FF4C00] transition"
              >
                Members
              </button>
              <button 
                onClick={() => setShowAuth(true)}
                className="bg-[#FF4C00] text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-tighter hover:scale-105 transition shadow-[0_0_15px_rgba(255,76,0,0.35)]"
              >
                Join Now
              </button>
            </>
          ) : (
            <button 
              className="bg-[#ADFF2F] text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-tighter hover:scale-105 transition shadow-[0_0_15px_rgba(173,255,47,0.35)]"
            >
              Warrior Area
            </button>
          )}
        </div>
      </nav>

      {user ? (
        <main className="max-w-6xl mx-auto px-6 py-12">
          <Dashboard />
        </main>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative pt-20 pb-32 px-6 md:px-12 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="bg-[#FF4C00] text-black text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 w-fit rounded">
                  Stop Scrolling!
                </div>
                <h1 className="text-6xl md:text-9xl font-black leading-none tracking-tighter italic uppercase">
                  YOUR <span className="text-white">PATHETIC</span> <br />
                  <span className="text-[#FF4C00]">EXCUSES?</span>
                </h1>
                <p className="text-3xl md:text-5xl font-black uppercase italic">
                  They're <span className="text-[#ADFF2F] line-through">Dead</span>!
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="bg-[#FF4C00] text-black px-8 py-4 rounded-full font-black text-xl uppercase tracking-tighter hover:scale-105 transition flex items-center gap-2 shadow-[0_0_20px_rgba(255,76,0,0.4)]"
                  >
                    Start Today <Flame className="w-6 h-6" />
                  </button>
                  <button className="border-2 border-white/20 px-8 py-4 rounded-full font-black text-xl uppercase tracking-tighter hover:bg-white hover:text-black transition flex items-center gap-2">
                    <Play className="w-6 h-6 fill-current" /> Watch Now
                  </button>
                </div>
                <div className="flex gap-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Users className="text-[#FF4C00] w-5 h-5" />
                    <span className="text-sm font-bold text-[#A1A1AA] tracking-tight"><span className="text-white">5.2M+</span> Warriors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="text-[#FF4C00] w-5 h-5" />
                    <span className="text-sm font-bold text-[#A1A1AA] tracking-tight"><span className="text-white">50M+</span> Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="text-[#FF4C00] w-5 h-5" />
                    <span className="text-sm font-bold text-[#A1A1AA] tracking-tight"><span className="text-white">#1</span> Wellness 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="w-full aspect-[4/5] bg-[#18181C] rounded-3xl border border-white/10 overflow-hidden relative group">
                  <img 
                    src="/brand-assets/hero-graphic.png" 
                    alt="Warrior Coach" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
                  <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <p className="text-2xl font-black text-[#FF4C00]">2.4M</p>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Viral Views</p>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <p className="text-2xl font-black text-[#ADFF2F]">156K</p>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Likes Today</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section id="wellness" className="bg-black py-12 border-y border-zinc-800">
            <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
              {[
                { label: 'CLEAN', sub: 'EAT DAILY', icon: Zap },
                { label: 'MOVE', sub: 'EVERY DAY', icon: Flame },
                { label: 'SLEEP', sub: '8 HOURS', icon: Moon },
                { label: 'ZERO', sub: 'REGRETS', icon: Wind },
              ].map((item, i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <h3 className="text-4xl font-black text-[#FF4C00] tracking-tighter group-hover:scale-110 transition">{item.label}</h3>
                  <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em]">{item.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Viral Content Grid */}
          <section id="content" className="py-24 px-6 md:px-12 bg-gradient-to-b from-black to-[#0A0A0B]">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-5xl font-black italic tracking-tighter uppercase">Viral <span className="text-[#FF4C00]">Content</span></h2>
                <p className="text-[#A1A1AA] font-bold uppercase tracking-widest text-sm">Bold truths that DOMINATE the algorithm</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5">
                  <img 
                    src="/brand-assets/viral-dominate-morning.png"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    alt="Dominate Morning"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Play className="w-12 h-12 text-[#FF4C00] fill-current" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-black uppercase leading-tight">Master your morning protocol</p>
                    <p className="text-[10px] text-gray-400 font-bold">4.8M views</p>
                  </div>
                </div>
                <div className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5">
                  <img 
                    src="/brand-assets/viral-protein-secrets.png"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    alt="Protein Secrets"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Play className="w-12 h-12 text-[#FF4C00] fill-current" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-black uppercase leading-tight">Protein Secrets Revealed</p>
                    <p className="text-[10px] text-gray-400 font-bold">2.1M views</p>
                  </div>
                </div>
                {[3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?auto=format&fit=crop&q=80&w=400`}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition duration-500"
                      alt="Workout"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Play className="w-12 h-12 text-[#FF4C00] fill-current" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-black uppercase leading-tight">Elite performance hacks</p>
                      <p className="text-[10px] text-gray-400 font-bold">1.2M views</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button className="border border-white/20 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition">
                  View All Content
                </button>
              </div>
            </div>
          </section>

          {/* Transformation Section */}
          <section id="warriors" className="py-24 px-6 md:px-12 bg-black border-y border-zinc-800">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-5xl font-black italic tracking-tighter uppercase">Transformation <span className="text-[#ADFF2F]">Proof</span></h2>
                <p className="text-[#A1A1AA] font-bold uppercase tracking-widest text-sm">Discipline is the only shortcut</p>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden border border-zinc-800 max-w-4xl mx-auto">
                 <img src="/brand-assets/before-after-template.png" className="w-full" alt="Before and After" />
                 <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                    <p className="text-2xl font-black italic uppercase">"I stopped negotiating with my comfort zone."</p>
                    <p className="text-[#ADFF2F] font-bold uppercase tracking-widest">- Warrior #1042</p>
                 </div>
              </div>
            </div>
          </section>

          {/* Challenge Section */}
          <section id="challenge" className="py-24 px-6 md:px-12 bg-[#0A0A0B]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 bg-[#18181C] border border-zinc-800 rounded-[3rem] overflow-hidden">
              <div className="flex-1">
                 <img src="/brand-assets/challenge-banner.png" className="w-full h-full object-cover" alt="Challenge Banner" />
              </div>
              <div className="flex-1 p-8 md:p-16 space-y-12 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4C00]/5 blur-[100px]" />
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">30-Day <br/><span className="text-[#FF4C00]">Warrior Challenge</span></h2>
                  <p className="text-[#A1A1AA] font-bold uppercase tracking-widest text-sm">Crush excuses. Track progress. TRANSFORM.</p>
                </div>
                <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className={`aspect-square rounded-lg border flex items-center justify-center font-black text-xs transition cursor-pointer hover:scale-110 ${i === 0 ? 'bg-[#FF4C00] border-[#FF4C00] text-black shadow-[0_0_20px_rgba(255,76,0,0.4)]' : 'border-white/10 text-zinc-700 hover:border-[#FF4C00]/50'}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/5">
                    <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest">Your Streak:</span>
                    <span className="text-[#FF4C00] font-black italic flex items-center gap-1">0 DAYS <Flame className="w-4 h-4" /></span>
                  </div>
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="block w-full bg-[#FF4C00] text-black py-6 rounded-2xl font-black text-2xl uppercase tracking-tighter hover:scale-[1.02] transition shadow-xl shadow-[#FF4C00]/10"
                  >
                    Join The Challenge
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Signup Section */}
          <section className="py-32 px-6 md:px-12 bg-gradient-to-t from-black to-[#0A0A0B]">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Zap className="w-16 h-16 text-[#FF4C00] mx-auto mb-4 animate-pulse" />
              <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                Become A <span className="text-[#FF4C00]">Warrior</span>
              </h2>
              <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto font-medium">
                Get exclusive wellness hacks, early access to challenges, and Dr. Charlene's no-BS tips delivered straight to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto pt-8">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email, warrior..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-zinc-800 px-8 py-6 rounded-2xl font-bold text-lg focus:outline-none focus:border-[#FF4C00] transition"
                />
                <button 
                  type="submit"
                  className="bg-[#FF4C00] text-black px-12 py-6 rounded-2xl font-black text-xl uppercase tracking-tighter hover:scale-105 transition shadow-[0_0_20px_rgba(255,76,0,0.3)]"
                >
                  Join Now
                </button>
              </form>
              {status && (
                <p className={`font-black uppercase tracking-widest text-sm ${status.includes('ERROR') ? 'text-red-500' : 'text-[#FF4C00]'}`}>
                  {status}
                </p>
              )}
              <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">
                One body. Zero regrets. Join 5.2M+ warriors.
              </p>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-black py-20 px-6 md:px-12 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 md:gap-24">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/brand-assets/logo.png" className="h-10 w-10" />
              <span className="font-black text-2xl tracking-tighter text-white uppercase">WARRIOR <span className="text-[#FF4C00]">VITALITY</span></span>
            </div>
            <p className="text-[#A1A1AA] font-medium leading-relaxed max-w-sm">
              Bold wellness truths: Eat Clean, Move Daily, Sleep Stern! One body, infinite power.
            </p>
            <div className="flex gap-4">
              {[Camera, Video, Send, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#FF4C00] hover:text-black transition">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-widest text-sm">Quick Links</h4>
            <div className="flex flex-col gap-4 text-[#A1A1AA] font-bold text-sm">
              <a href="#" className="hover:text-white">Viral Content</a>
              <a href="#" className="hover:text-white">Wellness Pillars</a>
              <a href="#" className="hover:text-white">30-Day Challenge</a>
              <a href="#" className="hover:text-white">Transformations</a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-widest text-sm">Resources</h4>
            <div className="flex flex-col gap-4 text-[#A1A1AA] font-bold text-sm">
              <a href="#" className="hover:text-white">Meal Plans</a>
              <a href="#" className="hover:text-white">Workout Guides</a>
              <a href="#" className="hover:text-white">Sleep Protocol</a>
              <a href="#" className="hover:text-white">Cold Plunge 101</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-20 mt-20 border-t border-zinc-800 flex flex-col md:flex-row justify-between gap-8">
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
            © 2026 Dr. Charlene K09. All rights reserved.
          </p>
          <div className="flex gap-8 text-zinc-600 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAuth(false)}
          />
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute -top-12 right-0 text-[#A1A1AA] hover:text-white transition"
            >
              <X className="w-8 h-8" />
            </button>
            <Auth />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
