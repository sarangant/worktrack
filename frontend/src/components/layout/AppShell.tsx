import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';
import { BottomNavigation } from './BottomNavigation';

type Props = {
  children?: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Fixed Top Navigation - always visible */}
      <div className="fixed top-0 left-0 right-0 bg-panel border-b border-border z-50">
        <Topbar />
      </div>
      
      {/* Scrollable content with padding for fixed elements */}
      <div className="flex-1 overflow-y-auto pt-16" style={{ paddingBottom: '80px' }}>
        <main className="px-4 pt-4 pb-4">
          {children ?? <Outlet />}
        </main>
      </div>
      
      {/* Fixed Bottom Navigation - always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-panel border-t border-border z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}
