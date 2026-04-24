import { FileText, LayoutDashboard, Settings, Target } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Predictions', path: '/prediction', icon: Target },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/account', icon: Settings },
  ];

  return (
    <aside className="h-full bg-bg-card border-r border-border-main flex flex-col transition-colors sidebar overflow-hidden w-full relative">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-accent/20 border border-border-main/50">
          <img 
            src="/logo.jpeg" 
            alt="ChurnAI Logo" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="text-accent font-black">C</div>';
            }}
          />
        </div>
        <h1 className="text-xl font-black bg-gradient-to-r from-text-main to-text-muted bg-clip-text text-transparent tracking-tight">
          ChurnAI
        </h1>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-muted hover:bg-bg-primary hover:text-text-main'
              }`
            }
          >
            <link.icon size={20} />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border-main">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-primary cursor-pointer transition-colors group">
          <div className="w-10 h-10 bg-bg-primary rounded-full flex items-center justify-center border border-border-main overflow-hidden group-hover:border-accent/50 transition-colors">
            <img 
              src="/logo1.jpeg" 
              alt="Admin" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<Users size={16} className="text-text-muted" />';
              }}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-text-main">Admin User</p>
            <p className="text-xs text-text-muted">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
