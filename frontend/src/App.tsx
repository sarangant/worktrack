import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
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
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <AuthGate>
            <AppShell>
              <DashboardPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/history"
        element={
          <AuthGate>
            <AppShell>
              <HistoryPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/reports"
        element={
          <AuthGate>
            <AppShell>
              <ReportsPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGate>
            <AppShell>
              <ProfilePage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthGate>
            <AppShell>
              <SettingsPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/notes"
        element={
          <AuthGate>
            <AppShell>
              <NotesPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/sample-reports"
        element={
          <AuthGate>
            <AppShell>
              <SampleReportsPage />
            </AppShell>
          </AuthGate>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AuthGate>
            <AppShell>
              <UsersPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/calendars"
        element={
          <AuthGate>
            <AppShell>
              <CalendarsPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/absence-types"
        element={
          <AuthGate>
            <AppShell>
              <AbsenceTypesPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/corrections"
        element={
          <AuthGate>
            <AppShell>
              <CorrectionsPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/status"
        element={
          <AuthGate>
            <AppShell>
              <StatusBoardPage />
            </AppShell>
          </AuthGate>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AuthGate>
            <AppShell>
              <AdminReportsPage />
            </AppShell>
          </AuthGate>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
