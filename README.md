# Worktrack
A modern time-tracking and absence management system with role-based access for employees and administrators. Frontend is fully functional; backend is intentionally empty (to be built with NestJS).

## Features
- **Authentication**: Mocked login for Admin (email) and Employee (employee ID) roles.
- **Dashboard (Employee)**: Check in/out, register absence, pause tracking, recent sessions.
- **StatusBoard**: Post/update status and location; live list of all users’ statuses.
- **Reports**: Create, download (simulated), and share reports in PDF/Excel.
- **Admin Pages**:
  - Users: Add, edit, activate/deactivate users; assign roles.
  - Calendars: Define work schedules and break times.
  - Absence Types: Configure colors, policies, and status.
  - Corrections: Manage correction requests.
  - Admin Reports: Plan, download, and share admin-level reports.
- **Profile**: Update name/email; view role and user ID.
- **Responsive UI**: Dark theme with TailwindCSS; clean component library.

## Stack
- **Frontend**: Vite + React 19 + TypeScript
- **State**: Jotai (auth state)
- **Routing**: React Router v7
- **HTTP**: Axios with auth interceptor
- **Styling**: TailwindCSS + custom theme
- **Icons**: Lucide React

## Quick Start
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5174 (or the port shown in terminal).

## Test Logins (Mocked)
Authentication is mocked in `src/lib/api.ts`. Use any password.

### Admin (full access)
- **Login**: Enter any email (e.g., `admin@company.com`), any password.
- **Redirect**: `/admin/users`
- **Sidebar shows**: All links (Dashboard, History, Reports, Profile, plus all admin pages).
- **Footer label**: “Administrator”

### Employee (limited access)
- **Login**: Enter any employee ID (e.g., `12345`), any password.
- **Redirect**: `/dashboard`
- **Sidebar shows**: Dashboard, History, Reports, Profile only.
- **Footer label**: “Medarbejder”

## Navigation Guide
### Employee Routes
- `/dashboard` – Check in/out, absence registration, quick actions, recent sessions.
- `/history` – Past work sessions and corrections.
- `/reports` – Create/download personal reports.
- `/profile` – Edit name/email; view role/ID.

### Admin Routes (employees cannot access these)
- `/admin/users` – Manage users, roles, and status.
- `/admin/calendars` – Work schedules and breaks.
- `/admin/absence-types` – Configure absence types, colors, policies.
- `/admin/corrections` – Review/approve correction requests.
- `/admin/status` – StatusBoard (employees can also view this).
- `/admin/reports` – Admin-level reporting.

## How It Works
- **No backend**: All data lives in component state; changes reset on refresh.
- **Role-based UI**: Sidebar and routing adapt to user role.
- **Simulated actions**: Downloads, sharing, and API calls show alerts.
- **Persistence**: Auth token and user are stored in `localStorage`.

## Development Notes
- Replace the mocked `loginRequest` in `src/lib/api.ts` with real API calls when the NestJS backend is ready.
- Remove dummy token logic and integrate proper authentication.
- All forms and CRUD operations are wired to local state for demo purposes.

## Project Structure
```
frontend/
├─ src/
│  ├─ components/
│  │  ├─ ui/          # Reusable UI (Button, Card, Input, Table, Badge)
│  │  ├─ layout/      # AppShell, Sidebar, Topbar
│  │  └─ auth/        # AuthGate, RoleGuard
│  ├─ pages/
│  │  ├─ admin/       # Admin-only pages
│  │  └─ Login, Dashboard, History, Reports, Profile
│  ├─ lib/
│  │  └─ api.ts       # Axios instance and mocked login
│  ├─ state/
│  │  └─ auth.ts      # Jotai auth atom and helpers
│  └─ types.ts        # TypeScript types
└─ README.md
```
