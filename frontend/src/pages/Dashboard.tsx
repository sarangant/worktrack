import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { loadPersistedAuth } from '../state/auth';

type Session = { id: string; start: string; end?: string; lunchDeducted?: boolean }; // Store timestamps as strings

type FlexStat = { label: string; value: string };

const LUNCH_BREAK_MINUTES = 30; // 30 minutes lunch break
const LUNCH_BREAK_TRIGGER_MINUTES = 4 * 60; // Auto-deduct after 4 hours


const initialFlexStats: FlexStat[] = [
  { label: 'Akkumuleret flex', value: '0' },
  { label: 'Dagens saldo', value: '0' },
  { label: 'Sidste fravær', value: '13. nov · Ferie' },
];

const loadFromStorage = () => {
  // Load from localStorage, fallback to empty state for fresh login
  const storedRaw = localStorage.getItem('dashboardState');
  if (storedRaw) {
    try {
      const stored = JSON.parse(storedRaw);
      return {
        sessions: stored.sessions || [],
        flexStats: stored.flexStats || initialFlexStats,
        checkedIn: stored.checkedIn || false,
      };
    } catch {
      // If parsing fails, return empty state
      return {
        sessions: [],
        flexStats: initialFlexStats,
        checkedIn: false,
      };
    }
  }
  
  // Fallback to empty state for fresh login
  return {
    sessions: [],
    flexStats: initialFlexStats,
    checkedIn: false,
  };
};

const saveToStorage = (state: { sessions: Session[], flexStats?: FlexStat[], checkedIn: boolean }) => {
  localStorage.setItem('dashboardState', JSON.stringify(state));
};

export function DashboardPage() {
  const navigate = useNavigate();
  
  // Load persisted auth on mount
  const persistedAuth = loadPersistedAuth();
  const stored = loadFromStorage();
  
  // Check if current user matches stored user data
  const currentUser = persistedAuth && persistedAuth.user ? persistedAuth.user : null;
  const storedUserRaw = localStorage.getItem('user');
  const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
  
  // If different user or no stored user, start fresh
  const shouldStartFresh = !persistedAuth || !storedUser || !currentUser || currentUser.id !== storedUser.id;
  const sessionsToUse = shouldStartFresh ? [] : stored.sessions;
  const flexStatsToUse = shouldStartFresh ? initialFlexStats : stored.flexStats;
  const checkedInToUse = shouldStartFresh ? false : stored.checkedIn;
  
  const [sessions, setSessions] = useState(sessionsToUse);
  const [flexStats, setFlexStats] = useState(flexStatsToUse);
  const [checkedIn, setCheckedIn] = useState(checkedInToUse);
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [absenceType, setAbsenceType] = useState('');
  const [absenceNote, setAbsenceNote] = useState('');
  
  // Real-time tracking state
  const [currentSessionStart, setCurrentSessionStart] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Real-time timer effect
  useEffect(() => {
    if (checkedIn && currentSessionStart) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - currentSessionStart;
        setElapsedTime(elapsed);
      }, 100); // Update every 100ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkedIn, currentSessionStart]);
  
  // Load active session on mount using separate effect
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const activeSession = sessions.find((s: Session) => !s.end);
    if (activeSession) {
      setCurrentSessionStart(parseInt(activeSession.start));
      setCheckedIn(true);
    }
  }, [sessions]);

  const handleCheckIn = () => {
    const timestamp = Number(new Date());
    const newSession = {
      id: `s${timestamp}`,
      start: timestamp.toString(),
      end: undefined,
      lunchDeducted: false,
    };
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    setCheckedIn(true);
    setCurrentSessionStart(timestamp);
    
    // Calculate cumulative flex from existing sessions (before adding new incomplete session)
    const existingSessions = sessions.filter((s: Session) => s.start && s.end);
    const newCumulativeFlex = calculateCumulativeFlex(existingSessions);
    const newFlexStats = [
      { label: 'Akkumuleret flex', value: `${newCumulativeFlex > 0 ? '+' : ''}${newCumulativeFlex}t` },
      { label: 'Dagens saldo', value: '0t 0m' },
      { label: 'Sidste fravær', value: '13. nov · Ferie' },
    ];
    setFlexStats(newFlexStats);
    saveToStorage({ sessions: updatedSessions, flexStats: newFlexStats, checkedIn: true });
  };

  const handleCheckOut = () => {
    const timestamp = Number(new Date());
    const activeSession = sessions.find((s: Session) => !s.end);
    if (!activeSession) return;
    
    const startTime = parseInt(activeSession.start);
    const totalElapsed = timestamp - startTime;
    
    // Calculate lunch break deduction
    let lunchBreak = 0;
    const totalElapsedMinutes = totalElapsed / (1000 * 60);
    
    if (totalElapsedMinutes >= LUNCH_BREAK_TRIGGER_MINUTES) {
      lunchBreak = LUNCH_BREAK_MINUTES * 60 * 1000; // 30 minutes in milliseconds
    }
    
    const updatedSession = { 
      ...activeSession, 
      end: timestamp.toString(),
      lunchDeducted: lunchBreak > 0
    };
    const updatedSessions = sessions.map((s: Session) => s.id === activeSession.id ? updatedSession : s);
    setSessions(updatedSessions);
    setCheckedIn(false);
    setCurrentSessionStart(null);
    setElapsedTime(0);
    
    // Calculate today's work time with lunch deduction
    const todayWorkMinutes = calculateTodayWorkMinutes(updatedSessions.filter((s: Session) => {
      const sessionDate = new Date(parseInt(s.start));
      const today = new Date();
      return sessionDate.toDateString() === today.toDateString();
    }));
    
    const newCumulativeFlex = calculateCumulativeFlex(updatedSessions);
    const newFlexStats = [
      { label: 'Akkumuleret flex', value: `${newCumulativeFlex > 0 ? '+' : ''}${newCumulativeFlex}t` },
      { label: 'Dagens saldo', value: `${Math.floor(todayWorkMinutes / 60)}t ${Math.round(todayWorkMinutes % 60)}m` },
      { label: 'Sidste fravær', value: '13. nov · Ferie' },
    ];
    setFlexStats(newFlexStats);
    saveToStorage({ sessions: updatedSessions, flexStats: newFlexStats, checkedIn: false });
  };

  const calculateTodayWorkMinutes = (todaySessions: Session[]) => {
    return todaySessions.reduce((acc, session: Session) => {
      if (session.start && session.end) {
        const start = parseInt(session.start);
        const end = parseInt(session.end);
        const totalElapsed = end - start;
        
        // Calculate lunch break deduction for this session
        let lunchBreak = 0;
        const totalElapsedMinutes = totalElapsed / (1000 * 60);
        
        if (totalElapsedMinutes >= LUNCH_BREAK_TRIGGER_MINUTES) {
          lunchBreak = LUNCH_BREAK_MINUTES * 60 * 1000; // 30 minutes in milliseconds
        }
        
        const actualWorkTime = totalElapsed - lunchBreak;
        const workMinutes = actualWorkTime / (1000 * 60);
        return acc + workMinutes;
      }
      return acc;
    }, 0);
  };

  const calculateCumulativeFlex = (allSessions: Session[]) => {
    const totalWorkMinutes = allSessions.reduce((acc, session: Session) => {
      if (session.start && session.end) {
        const start = parseInt(session.start);
        const end = parseInt(session.end);
        const totalElapsed = end - start;
        
        // Calculate lunch break deduction for this session
        let lunchBreak = 0;
        const totalElapsedMinutes = totalElapsed / (1000 * 60);
        
        if (totalElapsedMinutes >= LUNCH_BREAK_TRIGGER_MINUTES) {
          lunchBreak = LUNCH_BREAK_MINUTES * 60 * 1000; // 30 minutes in milliseconds
        }
        
        const actualWorkTime = totalElapsed - lunchBreak;
        const workMinutes = actualWorkTime / (1000 * 60);
        return acc + workMinutes;
      }
      return acc;
    }, 0);
    
    // Count unique workdays, not sessions
    const uniqueWorkDays = new Set(
      allSessions
        .filter((s: Session) => s.start && s.end)
        .map((s: Session) => new Date(parseInt(s.start)).toDateString())
    ).size;
    const expectedWorkMinutes = uniqueWorkDays * 8 * 60; // 8 hours per unique workday
    const flexMinutes = totalWorkMinutes - expectedWorkMinutes;
    const flexHours = Math.round(flexMinutes / 60 * 10) / 10; // Convert to hours, round to 1 decimal
    
    return flexHours;
  };

  const handleRegisterAbsence = () => {
    if (!absenceType) return;
    
    const timestamp = Number(new Date());
    const newAbsence = {
      id: `a${timestamp}`,
      type: absenceType,
      date: new Date(timestamp).toISOString(),
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
    const sessionDate = new Date(parseInt(s.start));
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  });

  const todayWorkMinutes = calculateTodayWorkMinutes(todaySessions);
  const cumulativeFlex = calculateCumulativeFlex(sessions);

  // Format elapsed time for display
  const formatElapsedTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate current elapsed time with lunch deduction
  const getCurrentWorkTime = () => {
    if (!currentSessionStart) return 0;
    
    const totalElapsed = elapsedTime;
    const totalElapsedMinutes = totalElapsed / (1000 * 60);
    
    let lunchBreak = 0;
    if (totalElapsedMinutes >= LUNCH_BREAK_TRIGGER_MINUTES) {
      lunchBreak = LUNCH_BREAK_MINUTES * 60 * 1000;
    }
    
    return totalElapsed - lunchBreak;
  };

  // Update flex stats dynamically for display
  const displayFlexStats = [
    { label: 'Akkumuleret flex', value: `${cumulativeFlex > 0 ? '+' : ''}${cumulativeFlex}t` },
    { label: 'Dagens saldo', value: checkedIn ? formatElapsedTime(getCurrentWorkTime()) : `${Math.floor(todayWorkMinutes / 60)}t ${Math.round(todayWorkMinutes % 60)}m` },
    { label: 'Sidste fravær', value: flexStats[2]?.value || '13. nov · Ferie' },
  ];

  const calculateSessionHours = (session: Session) => {
    const start = parseInt(session.start);
    const end = session.end ? parseInt(session.end) : new Date().getTime();
    // Use timestamps directly for accurate local time calculation
    const workMinutes = (end - start) / (1000 * 60);
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
            <span className={`text-2xl font-bold ${checkedIn ? 'text-accent' : todayWorkMinutes >= 480 ? 'text-accent' : 'text-danger'}`}>
              {displayFlexStats[1].value}
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
                  {format(new Date(parseInt(session.start)), 'dd. MMM yyyy')}
                </div>
                <div className="text-sm text-text-secondary mt-1">
                  {format(new Date(parseInt(session.start)), 'HH:mm')} - 
                  {session.end ? format(new Date(parseInt(session.end)), 'HH:mm') : 'Aktiv'}
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
