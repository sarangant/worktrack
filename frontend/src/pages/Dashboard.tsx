import { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Table, TableCell, TableRow } from '../components/ui/Table';
import { useAtom } from 'jotai';
import { authAtom } from '../state/auth';

const initialSessions: Array<{ id: string; start: string; end?: string; balance: string }> = [
  { id: 's1', start: '2024-11-20T08:00:00Z', end: '2024-11-20T16:02:00Z', balance: '+12m' },
  { id: 's2', start: '2024-11-19T08:15:00Z', end: '2024-11-19T15:55:00Z', balance: '-10m' },
  { id: 's3', start: '2024-11-18T07:58:00Z', end: '2024-11-18T16:10:00Z', balance: '+18m' },
];

const initialFlexStats = [
  { label: 'Akkumuleret flex', value: '+2t 35m' },
  { label: 'Dagens saldo', value: '+12m' },
  { label: 'Sidste fravær', value: '13. nov · Ferie' },
];

export function DashboardPage() {
  const [auth] = useAtom(authAtom);
  const [sessions, setSessions] = useState(initialSessions);
  const [flexStats, setFlexStats] = useState(initialFlexStats);
  const [checkedIn, setCheckedIn] = useState(false);
  const [showAbsence, setShowAbsence] = useState(false);
  const [absenceForm, setAbsenceForm] = useState({ type: 'Ferie', from: '', to: '', note: '' });

  const handleCheckIn = () => {
    const now = new Date();
    const newSession = {
      id: `s${Date.now()}`,
      start: now.toISOString(),
      end: undefined,
      balance: '',
    };
    setSessions([newSession, ...sessions]);
    setCheckedIn(true);
    setFlexStats([
      { ...flexStats[0] },
      { ...flexStats[1], value: `Check-in kl. ${format(now, 'HH:mm')}` },
      flexStats[2],
    ]);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setSessions(sessions.map(s => {
      if (!s.end && s.id === sessions[0].id) {
        const duration = Math.round((now.getTime() - new Date(s.start).getTime()) / 60000);
        const balance = duration > 480 ? `+${duration - 480}m` : `-${480 - duration}m`;
        return { ...s, end: now.toISOString(), balance };
      }
      return s;
    }));
    setCheckedIn(false);
    setFlexStats([
      { ...flexStats[0] },
      { ...flexStats[1], value: `Check-ud kl. ${format(now, 'HH:mm')}` },
      flexStats[2],
    ]);
  };

  const handlePause = (minutes: number) => {
    alert(`Pause registreret: ${minutes} minutter (simuleret)`);
  };

  const handleAbsenceSubmit = () => {
    if (!absenceForm.from || !absenceForm.to) return;
    alert(`Fravær registreret: ${absenceForm.type} fra ${absenceForm.from} til ${absenceForm.to}`);
    setAbsenceForm({ type: 'Ferie', from: '', to: '', note: '' });
    setShowAbsence(false);
  };

  const userName = auth.user?.name ?? 'Medarbejder';

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card title="Velkommen" description={`God arbejdsdag, ${userName}!`}>
          <p className="text-sm text-muted">
            Start eller slut din dag, registrer fravær eller se dine nøgletal. Dine handlinger synkroniseres automatisk
            med statusboardet.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={handleCheckIn} disabled={checkedIn}>Check ind</Button>
            <Button variant="secondary" size="sm" onClick={handleCheckOut} disabled={!checkedIn}>
              Check ud
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAbsence(true)}>
              Registrér fravær
            </Button>
          </div>
        </Card>

        <Card title="Dagens status">
          <div className="space-y-3">
            {flexStats.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-border/70 bg-panel/60 px-3 py-3"
              >
                <span className="text-sm text-muted">{item.label}</span>
                <span className="text-base font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Hurtige handlinger">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Button size="sm" variant="secondary" onClick={() => handlePause(15)}>
              Pause 15m
            </Button>
            <Button size="sm" variant="secondary" onClick={() => handlePause(30)}>
              Pause 30m
            </Button>
            <Button size="sm" variant="ghost">
              Notér note
            </Button>
            <Button size="sm" variant="ghost">
              Vis rapport
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Se detaljer under Historik for at rette tider og tilføje bemærkninger.
          </p>
        </Card>
      </div>

      {showAbsence && (
        <Card title="Registrér fravær">
          <div className="space-y-4">
            <select
              value={absenceForm.type}
              onChange={(e) => setAbsenceForm({ ...absenceForm, type: e.target.value })}
              className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-slate-100"
            >
              <option value="Ferie">Ferie</option>
              <option value="Sygdom">Sygdom</option>
              <option value="Barn syg">Barn syg</option>
            </select>
            <Input placeholder="Fra (dd/mm)" value={absenceForm.from} onChange={(e) => setAbsenceForm({ ...absenceForm, from: e.target.value })} />
            <Input placeholder="Til (dd/mm)" value={absenceForm.to} onChange={(e) => setAbsenceForm({ ...absenceForm, to: e.target.value })} />
            <Input placeholder="Note (valgfri)" value={absenceForm.note} onChange={(e) => setAbsenceForm({ ...absenceForm, note: e.target.value })} />
            <div className="flex gap-2">
              <Button onClick={handleAbsenceSubmit}>Registrér</Button>
              <Button variant="ghost" onClick={() => { setShowAbsence(false); setAbsenceForm({ type: 'Ferie', from: '', to: '', note: '' }); }}>
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card title="Seneste registreringer" description="Kontroller dine sidste check-ins og saldoændringer.">
        <Table headers={['Start', 'Slut', 'Saldo']}>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{format(new Date(session.start), 'dd. MMM HH:mm')}</TableCell>
              <TableCell>{session.end ? format(new Date(session.end), 'dd. MMM HH:mm') : '—'}</TableCell>
              <TableCell>
                {session.balance && (
                  <Badge variant={session.balance.startsWith('-') ? 'warning' : 'success'}>{session.balance}</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
