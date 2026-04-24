import React from 'react';
import { 
  User, Mail, Shield, CreditCard, Bell, Moon, Sun, 
  LogOut, Key, CheckCircle2, ChevronRight, Activity, 
  Zap, Database, Lock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Account = () => {
  const { theme, toggleTheme } = useTheme();

  const sections = [
    {
      id: 'profile',
      title: 'Profile Information',
      icon: User,
      items: [
        { label: 'Full Name', value: 'Admin User', icon: User },
        { label: 'Email Address', value: 'admin@churnai.io', icon: Mail },
        { label: 'Role', value: 'System Administrator', icon: Shield, badge: 'Super Admin' }
      ]
    },
    {
      id: 'subscription',
      title: 'Plan & Usage',
      icon: CreditCard,
      items: [
        { label: 'Current Plan', value: 'Premium SaaS', icon: Zap, badge: 'Active' },
        { label: 'ML Credits', value: '842 / 1000', icon: Database },
        { label: 'Billing Period', value: 'Monthly (Renews May 1st)', icon: Activity }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-accent/10 rounded-2xl text-accent">
          <SettingsIcon size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-main">Account Settings</h1>
          <p className="text-text-muted">Manage your profile, subscription, and platform preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Subscription */}
        <div className="lg:col-span-2 space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="glass-card overflow-hidden">
              <div className="p-6 border-b border-border-main bg-bg-primary/30 flex items-center gap-3">
                <section.icon className="text-accent" size={20} />
                <h3 className="font-bold text-text-main">{section.title}</h3>
              </div>
              <div className="p-6 space-y-6">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-bg-primary rounded-lg text-text-muted group-hover:text-accent transition-colors">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-widest">{item.label}</p>
                        <p className="text-text-main font-medium">{item.value}</p>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-1 bg-accent/10 text-accent text-[10px] font-black rounded-full uppercase tracking-tighter">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 bg-bg-primary/50 border-t border-border-main text-right">
                <button className="text-xs font-bold text-accent hover:underline">Edit Section</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Preferences & Security */}
        <div className="space-y-8">
          {/* Preferences */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-text-main mb-6 flex items-center gap-2">
              <SettingsIcon size={18} className="text-accent" />
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-bg-primary/50 rounded-xl border border-border-main">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                  <span className="text-sm font-medium">Dark Mode</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-10 h-5 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-accent' : 'bg-border-main'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-bg-primary/50 rounded-xl border border-border-main">
                <div className="flex items-center gap-3">
                  <Bell size={18} />
                  <span className="text-sm font-medium">Email Alerts</span>
                </div>
                <div className="w-10 h-5 rounded-full bg-accent relative">
                   <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-text-main mb-6 flex items-center gap-2">
              <Lock size={18} className="text-accent" />
              Security
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-bg-primary/50 rounded-xl border border-border-main hover:border-accent/30 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Key size={18} className="text-text-muted" />
                  <span className="text-sm font-medium">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </button>
              
              <div className="h-px bg-border-main my-2" />

              <button className="w-full flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all font-bold text-sm">
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsIcon = ({ size, className }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default Account;
