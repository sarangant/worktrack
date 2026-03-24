import { Navigate, Route, Routes } from 'react-router-dom';
import { ResponsiveAppShell } from './components/layout/ResponsiveAppShell';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { HistoryPage } from './pages/History';
import { ReportsPage } from './pages/Reports';
import { ProfilePage } from './pages/Profile';
import { SettingsPage } from './pages/Settings';
import { NotesPage, SampleReportsPage } from './pages/Notes';
import { UsersPage } from './pages/admin/Users';
import { CalendarsPage } from './pages/admin/Calendars';
import { AbsenceTypesPage } from './pages/admin/AbsenceTypes';
import { CorrectionsPage } from './pages/admin/Corrections';
import { StatusBoardPage } from './pages/admin/StatusBoard';
import { AdminReportsPage } from './pages/admin/AdminReports';
import { AuthGate } from './components/auth/AuthGate';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <DashboardPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/history"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <HistoryPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/reports"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <ReportsPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <ProfilePage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <SettingsPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/notes"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <NotesPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/sample-reports"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <SampleReportsPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <UsersPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/calendars"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <CalendarsPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/absence-types"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <AbsenceTypesPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/corrections"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <CorrectionsPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/status"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <StatusBoardPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AuthGate>
            <ResponsiveAppShell>
              <AdminReportsPage />
            </ResponsiveAppShell>
          </AuthGate>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
