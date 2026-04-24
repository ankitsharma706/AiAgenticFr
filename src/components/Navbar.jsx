import React, { useState } from 'react';
import { Bell, User, Sun, Moon, LogOut, Settings, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import NotificationDrawer from './NotificationDrawer';

const Navbar = ({ title, onToggleSidebar, isSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="h-24 flex items-center justify-between px-8 bg-bg-card/40 backdrop-blur-md border border-border-main/50 rounded-2xl transition-all shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-main tracking-tight capitalize">
            {location.pathname.replace('/', '') || 'Dashboard'}
          </h2>
          <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mt-0.5">ChurnAI Intelligence Platform</p>
        </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-bg-primary/50 border border-border-main rounded-xl p-1 px-2 gap-1">
            <button 
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-text-main hover:bg-bg-card rounded-lg transition-all"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-text-muted hover:text-text-main hover:bg-bg-card rounded-lg transition-colors relative"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-accent rounded-full border border-bg-card"></span>
            </button>
          </div>

          <div className="h-8 w-[1px] bg-border-main mx-1"></div>

          <Link 
            to="/account"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${
              location.pathname === '/account' 
              ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' 
              : 'bg-bg-primary/50 border-border-main hover:bg-bg-primary text-text-main'
            }`}
          >
            <div className={`w-7 h-7 rounded-full overflow-hidden border ${location.pathname === '/account' ? 'border-white/40' : 'border-accent/20'}`}>
              <img 
                src="/logo1.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<User size={14} />';
                }}
              />
            </div>
            <span className="text-sm font-bold">Account</span>
          </Link>
        </div>
      </nav>

      <NotificationDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
};

export default Navbar;
