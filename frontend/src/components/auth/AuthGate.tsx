import { Navigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom, loadPersistedAuth } from '../../state/auth';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export function AuthGate({ children }: Props) {
  const location = useLocation();
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    if (!auth.user) {
      loadPersistedAuth();
      // Force a re-read after loading persisted auth
      const token = localStorage.getItem('accessToken');
      const userRaw = localStorage.getItem('user');
      if (token && userRaw) {
        try {
          const user = JSON.parse(userRaw);
          setAuth({ accessToken: token, user });
        } catch {
          // ignore
        }
      }
    }
  }, [auth.user, setAuth]);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
