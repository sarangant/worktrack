import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Table, TableCell, TableRow } from '../../components/ui/Table';

const initialCalendars = [
  { id: 'c1', name: 'Standard 37t', schedule: '08:00 - 16:00', breakMinutes: 30 },
  { id: 'c2', name: 'Aftenhold', schedule: '16:00 - 00:00', breakMinutes: 30 },
  { id: 'c3', name: 'Weekend', schedule: '09:00 - 17:00', breakMinutes: 45 },
];

export function CalendarsPage() {
  const [calendars, setCalendars] = useState(initialCalendars);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<typeof initialCalendars[0] | null>(null);
  const [form, setForm] = useState({ name: '', schedule: '', breakMinutes: 30 });

  const handleAdd = () => {
    if (!form.name || !form.schedule) return;
    const newCal = {
      id: `c${Date.now()}`,
      name: form.name,
      schedule: form.schedule,
      breakMinutes: form.breakMinutes,
    };
    setCalendars([...calendars, newCal]);
    setForm({ name: '', schedule: '', breakMinutes: 30 });
    setShowAdd(false);
  };

  const handleEdit = (cal: typeof initialCalendars[0]) => {
    setEditing(cal);
    setForm({ name: cal.name, schedule: cal.schedule, breakMinutes: cal.breakMinutes });
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    setCalendars(calendars.map(c => (c.id === editing.id ? { ...c, ...form } : c)));
    setEditing(null);
    setForm({ name: '', schedule: '', breakMinutes: 30 });
  };

  const handleDelete = (id: string) => {
    setCalendars(calendars.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Arbejdstidskalendere</h1>
          <p className="text-muted">Definér standardtider og pauser for teams.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>Ny kalender</Button>
      </div>

      {(showAdd || editing) && (
        <Card title={editing ? 'Redigér kalender' : 'Ny kalender'}>
          <div className="space-y-4">
            <Input placeholder="Navn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Tid (f.eks. 08:00 - 16:00)" value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} />
            <Input
              type="number"
              placeholder="Pause (minutter)"
              value={form.breakMinutes}
              onChange={(e) => setForm({ ...form, breakMinutes: Number(e.target.value) })}
            />
            <div className="flex gap-2">
              <Button onClick={editing ? handleSaveEdit : handleAdd}>
                {editing ? 'Gem' : 'Opret'}
              </Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setEditing(null); setForm({ name: '', schedule: '', breakMinutes: 30 }); }}>
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card title="Kalendere">
        <Table headers={['Navn', 'Tid', 'Pause', 'Handling']}>
          {calendars.map((cal) => (
            <TableRow key={cal.id}>
              <TableCell>{cal.name}</TableCell>
              <TableCell>{cal.schedule}</TableCell>
              <TableCell>{cal.breakMinutes} min</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(cal)}>
                    Redigér
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(cal.id)}>
                    Fjern
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
