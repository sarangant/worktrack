export const Roles = {
  Employee: 'employee',
  Admin: 'admin',
} as const;

export type UserRole = (typeof Roles)[keyof typeof Roles];

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthState = {
  accessToken: string | null;
  user: User | null;
};

export type CheckInSession = {
  id: string;
  start: string;
  end?: string;
  durationMinutes?: number;
};

export type FlexBalanceEntry = {
  id: string;
  timestamp: string;
  deltaMinutes: number;
  balanceMinutes: number;
  reason: string;
};

export type AbsenceType = {
  id: string;
  name: string;
  color?: string;
};

export type AbsenceRecord = {
  id: string;
  type: AbsenceType;
  from: string;
  to: string;
  note?: string;
  status: 'approved' | 'pending' | 'rejected';
};

export type ReportFormat = 'pdf' | 'xlsx';
