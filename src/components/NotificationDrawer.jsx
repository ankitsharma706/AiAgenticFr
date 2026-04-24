import React from 'react';
import { X, Bell, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

const NotificationDrawer = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: "Report Generated",
      message: "Monthly retention audit completed successfully.",
      time: "2 mins ago",
      type: "success",
      icon: CheckCircle2
    },
    {
      id: 2,
      title: "ML Service Warning",
      message: "Prediction latency is higher than usual.",
      time: "1 hour ago",
      type: "warning",
      icon: AlertTriangle
    },
    {
      id: 3,
      title: "New User Behavior Detected",
      message: "Significant drop in Enterprise segment activity.",
      time: "3 hours ago",
      type: "info",
      icon: Info
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-bg-card border-l border-border-main z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl flex flex-col`}>
        <div className="p-6 border-b border-border-main flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="text-accent" size={20} />
            <h3 className="font-bold text-text-main">Notifications</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-main hover:bg-bg-primary rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 bg-bg-primary/50 border border-border-main rounded-xl hover:border-accent/30 transition-all group">
              <div className="flex gap-4">
                <div className={`mt-1 p-2 rounded-lg ${
                  n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                  n.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-accent/10 text-accent'
                }`}>
                  <n.icon size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-text-main group-hover:text-accent transition-colors">{n.title}</h4>
                    <span className="text-[10px] text-text-muted whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border-main bg-bg-primary/30">
          <button className="w-full py-2.5 text-xs font-bold text-accent uppercase tracking-widest hover:underline transition-all">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
