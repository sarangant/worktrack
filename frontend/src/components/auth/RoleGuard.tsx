import { Navigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../state/auth';
import type { UserRole } from '../../types';

type Props = {
  allow: UserRole[];
  children: React.ReactNode;
};

export function RoleGuard({ allow, children }: Props) {
  const location = useLocation();
  const [auth] = useAtom(authAtom);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allow.includes(auth.user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
