import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { cn } from '../../utils/cn';

type Props = {
  children?: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-surface text-slate-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Topbar />
          <main className={cn('flex-1 px-6 pb-10 pt-6')}>
            {children ?? <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}
