import { Bell, CircleUserRound } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-text-secondary">Tidsregistrering</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative rounded-full border border-border bg-panel p-2.5 hover:border-accent transition active:scale-95">
          <Bell size={18} className="text-slate-700" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent"></span>
        </button>
        <div className="flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-2">
          <CircleUserRound size={20} className="text-slate-700" />
          <span className="text-slate-900 font-semibold text-sm">Dig</span>
        </div>
      </div>
    </header>
  );
}
