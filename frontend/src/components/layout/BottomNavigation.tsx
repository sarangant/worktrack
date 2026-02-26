import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Clock,
  FileText,
  User,
  Settings,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export function BottomNavigation() {
  const location = useLocation();

  const leftNavItems = [
    { to: '/history', label: 'History', icon: Clock },
    { to: '/reports', label: 'Reports', icon: FileText },
  ];
  
  const rightNavItems = [
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white border-t border-slate-200 relative">
      {/* Home button above menu */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center rounded-full transition-all duration-200 w-24 h-24',
              isActive
                ? 'text-accent'
                : 'text-slate-500 hover:text-slate-700'
            )
          }
        >
          <div className="bg-accent rounded-full p-6 shadow-lg border-2 border-white">
            <Home size={40} className="text-white" />
          </div>
        </NavLink>
      </div>
      
      {/* Bottom menu bar */}
      <div className="flex justify-between items-center py-3 px-8">
        {/* Left side items */}
        <div className="flex gap-6">
          {leftNavItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-accent'
                      : 'text-slate-500 hover:text-slate-700'
                  )
                }
              >
                <Icon size={20} className={cn('transition-transform', isActive ? 'scale-110' : 'scale-100')} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </NavLink>
            );
          })}
        </div>
        
        {/* Right side items */}
        <div className="flex gap-6">
          {rightNavItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-accent'
                      : 'text-slate-500 hover:text-slate-700'
                  )
                }
              >
                <Icon size={20} className={cn('transition-transform', isActive ? 'scale-110' : 'scale-100')} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
