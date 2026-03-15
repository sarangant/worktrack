import { Bell, CircleUserRound, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notificationRef = useRef<HTMLDivElement>(null);

  const sampleNotifications = [
    { id: 1, text: 'Your timesheet for yesterday is ready for review', time: '2 hours ago' },
    { id: 2, text: 'New absence request from John Doe', time: '5 hours ago' },
    { id: 3, text: 'Reminder: Submit your weekly report', time: '1 day ago' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (hasUnread) {
      setHasUnread(false);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-panel">
      <div className="flex items-center gap-3">
        {/* Breadcrumb or page title could go here */}
        <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative" ref={notificationRef}>
          <button 
            className="relative rounded-lg border border-border bg-panel p-3 hover:border-accent hover:bg-panel-high transition-all active:scale-95"
            onClick={handleBellClick}
          >
            <Bell size={20} className="text-text-primary" />
            {hasUnread && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent border-2 border-surface"></span>}
          </button>
          
          {showNotifications && (
            <div className="absolute top-full mt-2 right-0 w-80 desktop-card z-50 shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-text-primary text-base">Notifications</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-text-muted hover:text-text-primary transition p-1 rounded hover:bg-panel"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {sampleNotifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-border hover:bg-panel transition cursor-pointer">
                    <p className="text-sm text-text-primary font-medium leading-relaxed">{notification.text}</p>
                    <p className="text-xs text-text-muted mt-2">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <button className="w-full text-center text-sm text-accent hover:text-accent-soft transition font-medium py-2 rounded hover:bg-panel">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-panel px-4 py-2.5 hover:bg-panel-high transition-all">
          <CircleUserRound size={22} className="text-text-primary" />
          <span className="text-text-primary font-semibold text-base">Profile</span>
        </div>
      </div>
    </header>
  );
}
