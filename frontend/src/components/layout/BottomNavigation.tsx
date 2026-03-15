import React from 'react';
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
    <nav className="bg-panel border-t border-border relative">
      {/* Home button above menu */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center rounded-full transition-all duration-200 w-[91px] h-[91px]',
              isActive
                ? 'text-accent'
                : 'text-text-muted hover:text-text-primary'
            )
          }
        >
          {({ isActive }) => (
            <div className={cn(
              'bg-accent rounded-full p-6 shadow-lg border-2 border-panel transition-transform',
              isActive ? 'scale-110' : 'scale-100 hover:scale-105'
            )}>
              <Home size={40} className="text-white" />
            </div>
          )}
        </NavLink>
      </div>
      
      {/* Bottom menu bar */}
      <div className="flex justify-between items-center py-4 px-6">
        {/* Left side items */}
        <div className="flex gap-4">
          {leftNavItems.map(({ to, icon: Icon }, index) => {
            const isActive = location.pathname === to;
            return (
              <React.Fragment key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'flex flex-col items-center justify-center py-3 px-3 rounded-lg transition-all duration-200',
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-text-muted hover:text-text-primary hover:bg-panel-high'
                    )
                  }
                >
                  <Icon size={24} className={cn('transition-transform', isActive ? 'scale-110' : 'scale-100')} />
                </NavLink>
                {/* Add separator after History (index 0) */}
                {index === 0 && (
                  <div className="w-px h-6 bg-border mt-5"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Right side items */}
        <div className="flex gap-4">
          {rightNavItems.map(({ to, icon: Icon }, index) => {
            const isActive = location.pathname === to;
            return (
              <React.Fragment key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'flex flex-col items-center justify-center py-3 px-3 rounded-lg transition-all duration-200',
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-text-muted hover:text-text-primary hover:bg-panel-high'
                    )
                  }
                >
                  <Icon size={24} className={cn('transition-transform', isActive ? 'scale-110' : 'scale-100')} />
                </NavLink>
                {/* Add separator after Profile (index 0) */}
                {index === 0 && (
                  <div className="w-px h-6 bg-border mt-5"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
