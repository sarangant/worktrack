import { Bell, CalendarDays, CircleUserRound, Menu } from 'lucide-react';
import { format } from 'date-fns';

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border bg-[#0f1832]/60 backdrop-blur">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden rounded-lg border border-border bg-panel p-2 hover:border-accent transition"
          >
            <Menu size={20} className="text-slate-200" />
          </button>
        )}
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">Tidsregistrering</p>
          <h2 className="text-lg md:text-xl font-semibold text-white">Overblik</h2>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 text-sm text-muted">
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2">
          <CalendarDays size={16} />
          <span>{format(new Date(), 'EEEE dd. MMM, HH:mm')}</span>
        </div>
        <button className="relative rounded-full border border-border bg-panel p-2 hover:border-accent transition">
          <Bell size={18} className="text-slate-200" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent"></span>
        </button>
        <div className="flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-2">
          <CircleUserRound size={20} className="text-slate-200" />
          <span className="hidden md:inline text-slate-100 font-semibold">Dig</span>
        </div>
      </div>
    </header>
  );
}
