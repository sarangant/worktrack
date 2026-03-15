import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

type Props = {
  children?: React.ReactNode;
};

export function DesktopAppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
