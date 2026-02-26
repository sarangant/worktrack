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
        {/* Status bar */}
        <div className="bg-gradient-to-b from-[#4352dc] to-[#4352dc] px-6 py-2 flex justify-between items-center text-white text-xs flex-shrink-0">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-3 bg-white rounded-sm"></div>
            <div className="w-4 h-3 bg-white rounded-sm"></div>
            <div className="w-4 h-3 bg-white rounded-sm"></div>
          </div>
        </div>
        
        {/* App content area */}
        <div className="flex-1 bg-gradient-to-b from-[#4352dc] to-[#4352dc] flex flex-col overflow-hidden">
          {/* Header and scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <Topbar />
            <main className="px-4 pt-4 pb-4">
              {children ?? <Outlet />}
            </main>
          </div>
          
          {/* Fixed Bottom Navigation */}
          <div className="flex-shrink-0">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
