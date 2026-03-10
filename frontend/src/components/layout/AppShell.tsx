import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';
import { BottomNavigation } from './BottomNavigation';

type Props = {
  children?: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#cdcfe5] flex items-center justify-center p-4">
      {/* Phone-like container with white stroke */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-white" style={{ height: '812px' }}>
        {/* App content area */}
        <div className="flex-1 bg-gradient-to-b from-[#4352dc] to-[#4352dc] flex flex-col overflow-hidden relative">
          {/* Header and scrollable content */}
          <div className="flex-1 overflow-y-auto pb-20">
            <Topbar />
            <main className="px-4 pt-4 pb-4">
              {children ?? <Outlet />}
            </main>
          </div>
          
          {/* Fixed Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
