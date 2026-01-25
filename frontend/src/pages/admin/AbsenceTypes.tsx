import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Table, TableCell, TableRow } from '../../components/ui/Table';

const initialTypes = [
  { id: 'a1', name: 'Ferie', color: '#22c55e', policy: 'Godkendelse kræves', status: 'Aktiv' },
  { id: 'a2', name: 'Sygdom', color: '#3b82f6', policy: 'Auto-accept', status: 'Aktiv' },
  { id: 'a3', name: 'Barn syg', color: '#f59e0b', policy: 'Auto-accept', status: 'Inaktiv' },
];

export function AbsenceTypesPage() {
  const [types, setTypes] = useState(initialTypes);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<typeof initialTypes[0] | null>(null);
  const [form, setForm] = useState({ name: '', color: '#22c55e', policy: 'Godkendelse kræves' });

  const handleAdd = () => {
    if (!form.name) return;
    const newType = {
      id: `a${Date.now()}`,
      name: form.name,
      color: form.color,
      policy: form.policy,
      status: 'Aktiv' as const,
    };
    setTypes([...types, newType]);
    setForm({ name: '', color: '#22c55e', policy: 'Godkendelse kræves' });
    setShowAdd(false);
  };

  const handleEdit = (type: typeof initialTypes[0]) => {
    setEditing(type);
    setForm({ name: type.name, color: type.color, policy: type.policy });
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    setTypes(types.map(t => (t.id === editing.id ? { ...t, ...form } : t)));
    setEditing(null);
    setForm({ name: '', color: '#22c55e', policy: 'Godkendelse kræves' });
  };

  const toggleStatus = (id: string) => {
    setTypes(types.map(t => (t.id === id ? { ...t, status: t.status === 'Aktiv' ? 'Inaktiv' : 'Aktiv' } : t)));
  };

  const handleDelete = (id: string) => {
    setTypes(types.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Fraværstyper</h1>
          <p className="text-muted">Konfigurér farver, godkendelsesregler og status.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>Ny type</Button>
      </div>

      {(showAdd || editing) && (
        <Card title={editing ? 'Redigér type' : 'Ny type'}>
          <div className="space-y-4">
            <Input placeholder="Navn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <div className="flex gap-2 items-center">
              <label className="text-sm text-muted">Farve</label>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="h-10 w-20 rounded border border-border bg-panel"
              />
              <code className="text-xs text-muted">{form.color}</code>
            </div>
            <select
              value={form.policy}
              onChange={(e) => setForm({ ...form, policy: e.target.value })}
              className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-slate-100"
            >
              <option value="Godkendelse kræves">Godkendelse kræves</option>
              <option value="Auto-accept">Auto-accept</option>
            </select>
            <div className="flex gap-2">
              <Button onClick={editing ? handleSaveEdit : handleAdd}>
                {editing ? 'Gem' : 'Opret'}
              </Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setEditing(null); setForm({ name: '', color: '#22c55e', policy: 'Godkendelse kræves' }); }}>
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card title="Typer">
        <Table headers={['Navn', 'Farve', 'Politik', 'Status', 'Handling']}>
          {types.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t.color }} />
                  <code className="text-xs text-muted">{t.color}</code>
                </span>
              </TableCell>
              <TableCell>{t.policy}</TableCell>
              <TableCell>
                <Badge variant={t.status === 'Aktiv' ? 'success' : 'warning'}>{t.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(t)}>
                    Redigér
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toggleStatus(t.id)}>
                    {t.status === 'Aktiv' ? 'Deaktiver' : 'Aktivér'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(t.id)}>
                    Slet
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
