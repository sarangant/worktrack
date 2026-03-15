import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  History,
  FileText,
  User,
  Users,
  CalendarClock,
  ClipboardCheck,
  ShieldCheck,
  Network,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Roles } from '../../types';
import { useAtom } from 'jotai';
import { authAtom, clearAuthToken } from '../../state/auth';

const employeeLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/history', label: 'Historik', icon: History },
  { to: '/reports', label: 'Rapporter', icon: FileText },
  { to: '/profile', label: 'Profil', icon: User },
  { to: '/notes', label: 'Noter', icon: FileText },
  { to: '/sample-reports', label: 'Eksempelrapporter', icon: FileText },
];

const adminLinks = [
  { to: '/admin/users', label: 'Brugere', icon: Users },
  { to: '/admin/calendars', label: 'Arbejdstid', icon: CalendarClock },
  { to: '/admin/absence-types', label: 'Fraværstyper', icon: ClipboardCheck },
  { to: '/admin/corrections', label: 'Korretion', icon: ShieldCheck },
  { to: '/admin/status', label: 'Statusboard', icon: Network },
  { to: '/admin/reports', label: 'Rapporter', icon: BarChart3 },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const [auth] = useAtom(authAtom);
  const navigate = useNavigate();
  const isAdmin = auth.user?.role === Roles.Admin;
  const links = isAdmin ? [...employeeLinks, ...adminLinks] : employeeLinks;

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  const handleLinkClick = () => {
    onClose?.();
  };

  return (
    <aside className="h-full bg-surface border-r border-border flex flex-col">
      {/* Logo section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black">
            WT
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">Worktrack</p>
            <p className="text-xs text-text-muted">Tidsregistrering</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={handleLinkClick}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              isActive 
                ? 'bg-accent/10 text-accent border border-accent/20' 
                : 'text-text-secondary hover:bg-panel hover:text-text-primary'
            )}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:bg-panel hover:text-text-primary transition-colors"
        >
          <LogOut size={18} />
          Log ud
        </button>
        <div className="mt-3 px-4">
          <p className="text-sm font-medium text-text-primary">{auth.user?.name}</p>
          <p className="text-xs text-text-muted">
            {auth.user?.role === Roles.Admin ? 'Administrator' : 'Medarbejder'}
          </p>
        </div>
      </div>
    </aside>
  );
}
