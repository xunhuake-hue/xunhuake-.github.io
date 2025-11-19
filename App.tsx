
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, ShoppingBag, MapPin, Calendar, Star, Code, BookOpen, X, Lock, Unlock, Edit3, RotateCcw } from 'lucide-react';
import Home from './pages/Home';
import Comrades from './pages/Comrades';
import Selection from './pages/Selection';
import Actions from './pages/Actions';
import Base from './pages/Base';
import { AdminProvider, useAdmin } from './AdminContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isEditMode, toggleEditMode, logout, resetData } = useAdmin();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-star-dark/90 backdrop-blur-md border-b border-star-gold/20 h-16 flex items-center px-6 justify-between shadow-lg">
      <div className="flex items-center space-x-3">
        <Link to="/" className="group flex items-center space-x-2">
          <div className="relative w-10 h-10 flex items-center justify-center bg-star-red rounded-sm transform rotate-45 group-hover:rotate-0 transition-all duration-500 shadow-[0_0_15px_rgba(185,28,28,0.5)]">
            <Star className="w-6 h-6 text-star-gold transform -rotate-45 group-hover:rotate-0 transition-all duration-500 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-widest text-star-gold">群星公会</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-slate-400">Stars Guild</span>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex space-x-8">
        {[
          { path: '/', label: '星星之火', icon: Star },
          { path: '/comrades', label: '核心成员', icon: Shield },
          { path: '/selection', label: '群星甄选', icon: ShoppingBag },
          { path: '/actions', label: '红色活动', icon: Calendar },
          { path: '/base', label: '线下据点', icon: MapPin },
        ].map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`relative group flex items-center space-x-1 py-2 transition-colors duration-300 ${isActive(item.path) ? 'text-star-red' : 'text-slate-300 hover:text-star-gold'}`}
          >
            <item.icon size={16} className={`mb-0.5 ${isActive(item.path) ? 'fill-current' : ''}`} />
            <span className="font-medium">{item.label}</span>
            {isActive(item.path) && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-star-red shadow-[0_0_8px_rgba(185,28,28,0.8)]"></span>
            )}
          </Link>
        ))}
      </div>

      {/* Admin Controls in Navbar if authenticated */}
      {isAuthenticated && (
        <div className="hidden md:flex items-center space-x-2 ml-4 border-l border-slate-700 pl-4">
            <button 
                onClick={toggleEditMode} 
                className={`p-2 rounded transition-colors ${isEditMode ? 'bg-star-gold text-black' : 'text-slate-400 hover:text-white'}`}
                title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            >
                <Edit3 size={18} />
            </button>
            <button 
                onClick={resetData}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Reset Data"
            >
                <RotateCcw size={18} />
            </button>
            <button 
                onClick={logout}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="Logout"
            >
                <Lock size={18} />
            </button>
        </div>
      )}
      
      {/* Mobile menu placeholder - simplified for this demo */}
      <div className="md:hidden text-star-gold">
        <div className="border border-star-gold/50 px-2 py-1 rounded text-xs">MENU</div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAdmin();

  const handleCopyrightClick = () => {
    setClickCount(prev => prev + 1);
  };

  useEffect(() => {
    if (clickCount === 5) {
      setShowTerminal(true);
      setClickCount(0);
    }
  }, [clickCount]);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (login(password)) {
          setShowLogin(false);
          setPassword('');
      } else {
          alert("密码错误 (Hint: stars)");
      }
  };

  return (
    <footer className="bg-black border-t border-star-gold/10 py-12 mt-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-star-red font-bold text-lg mb-4 font-serif">群星公会</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              做最理想的现实主义者，<br/>做最现实的理想主义者。
            </p>
          </div>
          <div className="flex flex-col space-y-2 text-sm text-slate-400">
            <h4 className="text-star-gold font-bold mb-2">联系我们</h4>
            <span>海口市龙华区骑楼老街</span>
            <span>contact@starsguild.org</span>
          </div>
          <div className="flex items-end justify-end">
             <div className="text-right">
                <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">System Status: Online</p>
                <div className="flex space-x-1 justify-end items-center">
                   {!isAuthenticated && (
                       <button onClick={() => setShowLogin(true)} className="text-slate-700 hover:text-star-red transition-colors mr-2">
                           <Lock size={12} />
                       </button>
                   )}
                   {isAuthenticated && <span className="text-[10px] text-green-500 mr-2">ADMIN ACTIVE</span>}
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <div className="w-2 h-2 bg-star-red rounded-full"></div>
                   <div className="w-2 h-2 bg-star-gold rounded-full"></div>
                </div>
             </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-700 select-none">
          <span 
            onClick={handleCopyrightClick} 
            className="cursor-pointer hover:text-slate-600 transition-colors"
          >
            © 2024 Stars Guild. All Rights Reserved.
          </span>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-star-red/20 to-transparent"></div>

      {/* Admin Login Modal */}
      {showLogin && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-star-red/50 p-6 max-w-sm w-full">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-star-red font-bold font-serif">Owner Access</h3>
                      <button onClick={() => setShowLogin(false)}><X size={18} className="text-slate-500 hover:text-white"/></button>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                      <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full bg-black border border-slate-700 text-white p-2 focus:border-star-red focus:outline-none"
                        autoFocus
                      />
                      <button type="submit" className="w-full bg-star-red text-white font-bold py-2 hover:bg-red-700 transition-colors">
                          UNLOCK
                      </button>
                  </form>
              </div>
          </div>
      )}

      {/* Easter Egg: Terminal Modal */}
      {showTerminal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center font-mono p-4">
          <div className="w-full max-w-2xl bg-slate-950 border border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)] rounded-sm overflow-hidden">
            <div className="bg-slate-900 p-2 flex justify-between items-center border-b border-green-900">
              <span className="text-green-500 text-xs">alei@stars-guild:~/secret_backend</span>
              <button onClick={() => setShowTerminal(false)} className="text-green-500 hover:text-white"><X size={16}/></button>
            </div>
            <div className="p-6 text-green-500 space-y-4">
              <p>> Accessing encrypted channel...</p>
              <p>> Decrypting... [OK]</p>
              <p>> Welcome, traveler. You found the backdoor.</p>
              <div className="border border-green-500/50 p-4 mt-4 text-white bg-green-900/20">
                <p className="mb-2 font-bold underline">REWARD_UNLOCKED:</p>
                <p>1x Coupon: "Alei's Signed Vinyl Record"</p>
                <p className="text-xs mt-2 opacity-70">Code: RED_STAR_HARMONY_2024</p>
              </div>
              <p className="animate-pulse">_</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

const BookListModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-[#fdf6e3] text-[#657b83] max-w-md w-full p-8 rounded shadow-2xl transform rotate-1 border-l-4 border-star-red relative" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-star-red"><X size={24}/></button>
      <h2 className="text-2xl font-serif font-bold text-star-red mb-1 border-b-2 border-star-red pb-2">阿彪的书单</h2>
      <p className="text-xs mb-6 italic text-slate-500">"Muscle & Dialectics"</p>
      
      <ul className="space-y-4 font-serif">
        <li className="flex justify-between border-b border-slate-200 pb-2">
          <span>《矛盾论》</span>
          <span className="text-star-gold-dim font-bold">必读</span>
        </li>
        <li className="flex justify-between border-b border-slate-200 pb-2">
          <span>《施瓦辛格健身全书》</span>
          <span className="text-slate-400">基础</span>
        </li>
        <li className="flex justify-between border-b border-slate-200 pb-2">
          <span>《乡土中国》</span>
          <span className="text-slate-400">进阶</span>
        </li>
        <li className="flex justify-between border-b border-slate-200 pb-2">
          <span>《百年孤独》</span>
          <span className="text-slate-400">消遣</span>
        </li>
      </ul>
      <div className="mt-6 text-right">
        <div className="inline-block border-2 border-star-red p-1 px-4 text-star-red font-bold transform -rotate-12 opacity-80">
          READ OR LIFT
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [showBooks, setShowBooks] = useState(false);

  return (
    <AdminProvider>
        <Router>
        <div className="min-h-screen bg-star-dark bg-industrial-pattern text-slate-200 selection:bg-star-red selection:text-white flex flex-col">
            <Navbar />
            
            <main className="flex-grow pt-16">
            <Routes>
                <Route path="/" element={<Home onBookClick={() => setShowBooks(true)} />} />
                <Route path="/comrades" element={<Comrades />} />
                <Route path="/selection" element={<Selection />} />
                <Route path="/actions" element={<Actions />} />
                <Route path="/base" element={<Base />} />
            </Routes>
            </main>

            <Footer />

            {showBooks && <BookListModal onClose={() => setShowBooks(false)} />}
        </div>
        </Router>
    </AdminProvider>
  );
};

export default App;
