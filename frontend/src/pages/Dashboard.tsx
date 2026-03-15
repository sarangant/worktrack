import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

type Session = { id: string; start: string; end?: string };
type FlexStat = { label: string; value: string };

const initialSessions: Session[] = [
  { id: 's1', start: '2024-11-20T08:00:00Z', end: '2024-11-20T16:02:00Z' },
  { id: 's2', start: '2024-11-19T08:15:00Z', end: '2024-11-19T15:55:00Z' },
  { id: 's3', start: '2024-11-18T07:58:00Z', end: '2024-11-18T16:10:00Z' },
];

const initialFlexStats: FlexStat[] = [
  { label: 'Akkumuleret flex', value: '0' },
  { label: 'Dagens saldo', value: '0' },
  { label: 'Sidste fravær', value: '13. nov · Ferie' },
];

const loadFromStorage = () => {
  // Always return fresh state to avoid old data conflicts
  return {
    sessions: initialSessions,
    flexStats: initialFlexStats,
    checkedIn: false,
  };
};

const saveToStorage = (state: { sessions: Session[], flexStats?: FlexStat[], checkedIn: boolean }) => {
  localStorage.setItem('dashboardState', JSON.stringify(state));
};

export function DashboardPage() {
  const navigate = useNavigate();
  
  const stored = loadFromStorage();
  const [sessions, setSessions] = useState(stored.sessions);
  const [flexStats, setFlexStats] = useState(stored.flexStats);
  const [checkedIn, setCheckedIn] = useState(stored.checkedIn);
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [absenceType, setAbsenceType] = useState('');
  const [absenceNote, setAbsenceNote] = useState('');

  const handleCheckIn = () => {
    const now = new Date();
    const timestamp = now.getTime();
    const newSession = {
      id: `s${timestamp}`,
      start: now.toISOString(),
      end: undefined,
    };
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    setCheckedIn(true);
    
    // Calculate cumulative flex from original sessions (before adding new incomplete session)
    const newCumulativeFlex = calculateCumulativeFlex(sessions);
    const newFlexStats = [
      { label: 'Akkumuleret flex', value: `${newCumulativeFlex > 0 ? '+' : ''}${newCumulativeFlex}t` },
      { label: 'Dagens saldo', value: `Check-in kl. ${format(now, 'HH:mm')}` },
      { label: 'Sidste fravær', value: '13. nov · Ferie' },
    ];
    setFlexStats(newFlexStats);
    saveToStorage({ sessions: updatedSessions, flexStats: newFlexStats, checkedIn: true });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const activeSession = sessions.find((s: Session) => !s.end);
    if (!activeSession) return;
    
    const updatedSession = { ...activeSession, end: now.toISOString() };
    const updatedSessions = sessions.map((s: Session) => s.id === activeSession.id ? updatedSession : s);
    setSessions(updatedSessions);
    setCheckedIn(false);
    
    // Update flex stats with new cumulative calculation
    const newCumulativeFlex = calculateCumulativeFlex(updatedSessions);
    const todayFlex = calculateTodayFlex(updatedSessions.filter((s: Session) => {
      const sessionDate = new Date(s.start);
      const today = new Date();
      return sessionDate.toDateString() === today.toDateString();
    }));
    const newFlexStats = [
      { label: 'Akkumuleret flex', value: `${newCumulativeFlex > 0 ? '+' : ''}${newCumulativeFlex}t` },
      { label: 'Dagens saldo', value: `${todayFlex > 0 ? '+' : ''}${todayFlex}t` },
      { label: 'Sidste fravær', value: '13. nov · Ferie' },
    ];
    const updatedFlexStats = newFlexStats;
    setFlexStats(updatedFlexStats);
    saveToStorage({ sessions: updatedSessions, flexStats: updatedFlexStats, checkedIn: false });
  };

  const calculateTodayFlex = (todaySessions: Session[]) => {
    const totalMinutes = todaySessions.reduce((acc, session: Session) => {
      if (session.start && session.end) {
        const start = new Date(session.start);
        const end = new Date(session.end);
        const workMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
        return acc + workMinutes;
      }
      return acc;
    }, 0);
    
    const normalWorkMinutes = 8 * 60; // 8 hours = 480 minutes
    return Math.round((totalMinutes - normalWorkMinutes) / 60 * 10) / 10; // Round to 1 decimal
  };

  const calculateCumulativeFlex = (allSessions: Session[]) => {
    const totalWorkMinutes = allSessions.reduce((acc, session: Session) => {
      if (session.start && session.end) {
        const start = new Date(session.start);
        const end = new Date(session.end);
        const workMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
        return acc + workMinutes;
      }
      return acc;
    }, 0);
    
    // Only count completed sessions (with end time) as workdays
    const totalWorkDays = allSessions.filter((s: Session) => s.start && s.end).length;
    const expectedWorkMinutes = totalWorkDays * 8 * 60; // 8 hours per workday
    const flexMinutes = totalWorkMinutes - expectedWorkMinutes;
    const flexHours = Math.round(flexMinutes / 60 * 10) / 10; // Convert to hours, round to 1 decimal
    
    return flexHours;
  };

  const handleRegisterAbsence = () => {
    if (!absenceType) return;
    
    const newAbsence = {
      id: `a${Date.now()}`,
      type: absenceType,
      date: new Date().toISOString(),
      note: absenceNote,
      status: 'pending'
    };
    
    // TODO: Save absence to backend
    console.log('Registering absence:', newAbsence);
    alert(`${absenceType} registreret!`);
    
    setShowAbsenceModal(false);
    setAbsenceType('');
    setAbsenceNote('');
  };

  const todaySessions = sessions.filter((s: Session) => {
    const sessionDate = new Date(s.start);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  });

  const todayFlex = calculateTodayFlex(todaySessions);
  const cumulativeFlex = calculateCumulativeFlex(sessions);

  // Update flex stats dynamically for display
  const displayFlexStats = [
    { label: 'Akkumuleret flex', value: `${cumulativeFlex > 0 ? '+' : ''}${cumulativeFlex}t` },
    { label: 'Dagens saldo', value: `${todayFlex > 0 ? '+' : ''}${todayFlex}t` },
    { label: 'Sidste fravær', value: flexStats[2]?.value || '13. nov · Ferie' },
  ];

  const calculateSessionHours = (session: Session) => {
    const start = new Date(session.start);
    const end = new Date(session.end || new Date());
    const workMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    const hours = Math.floor(workMinutes / 60);
    const minutes = Math.round(workMinutes % 60);
    return `${hours}t ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Overblik</h1>
        <p className="text-text-secondary mt-1">Din arbejdsdag og flexsaldo.</p>
      </div>

      {/* Check-in/Check-out Card */}
      <div className="desktop-card p-6">
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold text-text-primary">
            {format(new Date(), 'HH:mm')}
          </div>
          <div className="text-lg text-text-secondary font-medium">
            {checkedIn ? 'Tjekket ind' : 'Tjekket ud'}
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={checkedIn ? handleCheckOut : handleCheckIn}
              className="flex-1"
              size="lg"
            >
              {checkedIn ? 'Tjek ud' : 'Tjek ind'}
            </Button>
          </div>
        </div>
      </div>

      {/* Flex Balance Card */}
      <div className="desktop-card p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Flexsaldo</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary font-medium">I dag</span>
            <span className={`text-2xl font-bold ${todayFlex >= 0 ? 'text-accent' : 'text-danger'}`}>
              {todayFlex > 0 ? '+' : ''}{todayFlex}t
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary font-medium">Total</span>
            <span className="text-2xl font-bold text-text-primary">
              {displayFlexStats[0].value}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="desktop-card p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Hurtige handlinger</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="secondary"
            onClick={() => setShowAbsenceModal(true)}
            className="h-20 flex-col"
          >
            <span className="text-lg mb-1">📅</span>
            Registrér fravær
          </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate('/history')}
            className="h-20 flex-col"
          >
            <span className="text-lg mb-1">📊</span>
            Se historik
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="desktop-card p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Seneste aktivitet</h3>
        <div className="space-y-3">
          {sessions.slice(0, 3).map((session: Session) => (
            <div key={session.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
              <div>
                <div className="font-semibold text-text-primary">
                  {format(new Date(session.start), 'dd. MMM yyyy')}
                </div>
                <div className="text-sm text-text-secondary mt-1">
                  {format(new Date(session.start), 'HH:mm')} - 
                  {session.end ? format(new Date(session.end), 'HH:mm') : 'Aktiv'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">
                  {session.end ? 
                    calculateSessionHours(session) : 
                    'I gang'
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Absence Modal */}
      {showAbsenceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="desktop-card p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-text-primary mb-4">Registrér fravær</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Type fravær
                </label>
                <select 
                  value={absenceType}
                  onChange={(e) => setAbsenceType(e.target.value)}
                  className="w-full px-3 py-2 bg-panel border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="">Vælg type</option>
                  <option value="ferie">Ferie</option>
                  <option value="sygdom">Sygdom</option>
                  <option value="anden">Anden</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Note (valgfrit)
                </label>
                <textarea
                  value={absenceNote}
                  onChange={(e) => setAbsenceNote(e.target.value)}
                  placeholder="Tilføj note..."
                  className="w-full px-3 py-2 bg-panel border border-border rounded-lg text-text-primary placeholder-text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="secondary"
                  onClick={() => setShowAbsenceModal(false)}
                  className="flex-1"
                >
                  Annuller
                </Button>
                <Button 
                  onClick={handleRegisterAbsence}
                  className="flex-1"
                  disabled={!absenceType}
                >
                  Registrér
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
