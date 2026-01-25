import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Table, TableCell, TableRow } from '../../components/ui/Table';

const initialUsers = [
  { id: 'u1', name: 'Anna Holm', email: 'anna@firma.dk', role: 'admin', status: 'Aktiv' },
  { id: 'u2', name: 'Mark Jensen', email: 'mark@firma.dk', role: 'employee', status: 'Aktiv' },
  { id: 'u3', name: 'Sofie Lau', email: 'sofie@firma.dk', role: 'employee', status: 'Deaktiveret' },
];

export function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<typeof initialUsers[0] | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'employee' as 'employee' | 'admin' });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const newUser = {
      id: `u${Date.now()}`,
      name: form.name,
      email: form.email,
      role: form.role,
      status: 'Aktiv' as const,
    };
    setUsers([...users, newUser]);
    setForm({ name: '', email: '', role: 'employee' });
    setShowAdd(false);
  };

  const handleEdit = (user: typeof initialUsers[0]) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, role: user.role as 'admin' | 'employee' });
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    setUsers(users.map(u => (u.id === editing.id ? { ...u, ...form } : u)));
    setEditing(null);
    setForm({ name: '', email: '', role: 'employee' });
  };

  const toggleStatus = (user: typeof initialUsers[0]) => {
    setUsers(users.map(u => (u.id === user.id ? { ...u, status: u.status === 'Aktiv' ? 'Deaktiveret' : 'Aktiv' } : u)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Brugere</h1>
          <p className="text-muted">Administrér medarbejdere, roller og status.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>Tilføj bruger</Button>
      </div>

      {(showAdd || editing) && (
        <Card title={editing ? 'Redigér bruger' : 'Ny bruger'}>
          <div className="space-y-4">
            <Input placeholder="Navn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'employee' })}
              className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-slate-100"
            >
              <option value="employee">Medarbejder</option>
              <option value="admin">Administrator</option>
            </select>
            <div className="flex gap-2">
              <Button onClick={editing ? handleSaveEdit : handleAdd}>
                {editing ? 'Gem' : 'Opret'}
              </Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setEditing(null); setForm({ name: '', email: '', role: 'employee' }); }}>
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card title="Brugeroversigt">
        <Table headers={['Navn', 'E-mail', 'Rolle', 'Status', 'Handling']}>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-muted">{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === 'admin' ? 'accent' : 'neutral'}>
                  {user.role === 'admin' ? 'Administrator' : 'Medarbejder'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'Aktiv' ? 'success' : 'warning'}>{user.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(user)}>
                    Redigér
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toggleStatus(user)}>
                    {user.status === 'Aktiv' ? 'Deaktiver' : 'Aktivér'}
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
