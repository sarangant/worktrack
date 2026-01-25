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

const baseLink =
  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-panel';

const activeClass = 'bg-panel text-accent border border-border';
const inactiveClass = 'text-slate-200';

const employeeLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/history', label: 'Historik', icon: History },
  { to: '/reports', label: 'Rapporter', icon: FileText },
  { to: '/profile', label: 'Profil', icon: User },
];

const adminLinks = [
  { to: '/admin/users', label: 'Brugere', icon: Users },
  { to: '/admin/calendars', label: 'Arbejdstid', icon: CalendarClock },
  { to: '/admin/absence-types', label: 'Fraværstyper', icon: ClipboardCheck },
  { to: '/admin/corrections', label: 'Korretion', icon: ShieldCheck },
  { to: '/admin/status', label: 'Statusboard', icon: Network },
  { to: '/admin/reports', label: 'Rapporter', icon: BarChart3 },
];

export function Sidebar() {
  const [auth] = useAtom(authAtom);
  const navigate = useNavigate();
  const isAdmin = auth.user?.role === Roles.Admin;
  const links = isAdmin ? [...employeeLinks, ...adminLinks] : employeeLinks;

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#0d152e] border-r border-border min-h-screen px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black">
          WT
        </div>
        <div>
          <p className="text-lg font-bold text-white">Worktrack</p>
          <p className="text-xs text-muted">Tidsregistrering</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(baseLink, isActive ? activeClass : inactiveClass)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-panel transition-colors"
        >
          <LogOut size={18} />
          Log ud
        </button>
        <p className="mt-2 text-xs text-muted px-2">
          {auth.user?.name} · {auth.user?.role === Roles.Admin ? 'Administrator' : 'Medarbejder'}
        </p>
      </div>
    </aside>
  );
}
