import { useState, useEffect } from 'react';
import { DesktopAppShell } from './DesktopAppShell';
import { AppShell } from './AppShell';

type Props = {
  children?: React.ReactNode;
};

export function ResponsiveAppShell({ children }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isDesktop) {
    return <DesktopAppShell>{children}</DesktopAppShell>;
  }

  return <AppShell>{children}</AppShell>;
}
