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
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
      <div className="flex items-center gap-3">
        {/* Breadcrumb or page title could go here */}
        <h1 className="text-lg font-semibold text-text-primary">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button 
            className="relative rounded-lg border border-border bg-panel p-2.5 hover:border-accent transition active:scale-95"
            onClick={handleBellClick}
          >
            <Bell size={18} className="text-text-secondary" />
            {hasUnread && <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent"></span>}
          </button>
          
          {showNotifications && (
            <div className="absolute top-full mt-2 right-0 w-80 desktop-card z-50">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-text-primary">Notifications</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-text-muted hover:text-text-secondary transition"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {sampleNotifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-border hover:bg-panel transition">
                    <p className="text-sm text-text-primary">{notification.text}</p>
                    <p className="text-xs text-text-muted mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <button className="w-full text-center text-sm text-accent hover:text-accent-soft transition">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2">
          <CircleUserRound size={20} className="text-text-secondary" />
          <span className="text-text-primary font-medium text-sm">Profile</span>
        </div>
      </div>
    </header>
  );
}
