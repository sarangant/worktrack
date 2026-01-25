import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Table, TableCell, TableRow } from '../../components/ui/Table';
import { useAtom } from 'jotai';
import { authAtom } from '../../state/auth';

const initialStatuses = [
  { id: 's1', name: 'Anna Holm', state: 'Checked in', since: '08:02', location: 'Kontor' },
  { id: 's2', name: 'Mark Jensen', state: 'Pause', since: '12:10', location: 'Kantine' },
  { id: 's3', name: 'Sofie Lau', state: 'Checked out', since: '15:45', location: 'Remote' },
];

export function StatusBoardPage() {
  const [auth] = useAtom(authAtom);
  const [statuses, setStatuses] = useState(initialStatuses);
  const [newStatus, setNewStatus] = useState({
    state: 'Checked in',
    location: 'Kontor',
  });

  const handlePostStatus = () => {
    const user = auth.user;
    if (!user) return;

    const existingIndex = statuses.findIndex(s => s.name === user.name);
    const updated = {
      id: user.id,
      name: user.name,
      state: newStatus.state,
      since: new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }),
      location: newStatus.location,
    };

    if (existingIndex >= 0) {
      const newList = [...statuses];
      newList[existingIndex] = updated;
      setStatuses(newList);
    } else {
      setStatuses([...statuses, updated]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Statusboard</h1>
        <p className="text-muted">Live overblik over registreringer og pauser.</p>
      </div>

      <Card title="Post din status">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted">Status</label>
              <select
                value={newStatus.state}
                onChange={(e) => setNewStatus({ ...newStatus, state: e.target.value })}
                className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-slate-100"
              >
                <option value="Checked in">Checked in</option>
                <option value="Pause">Pause</option>
                <option value="Checked out">Checked out</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted">Lokation</label>
              <Input
                value={newStatus.location}
                onChange={(e) => setNewStatus({ ...newStatus, location: e.target.value })}
                placeholder="f.eks. Kontor"
              />
            </div>
          </div>
          <Button onClick={handlePostStatus}>Opdater status</Button>
        </div>
      </Card>

      <Card title="Aktivitet">
        <Table headers={['Navn', 'Status', 'Siden', 'Lokation']}>
          {statuses.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>
                <Badge variant={s.state === 'Checked out' ? 'neutral' : s.state === 'Pause' ? 'warning' : 'success'}>
                  {s.state}
                </Badge>
              </TableCell>
              <TableCell>{s.since}</TableCell>
              <TableCell>{s.location}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
