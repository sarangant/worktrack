import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAtom } from 'jotai';
import { authAtom, setAuthToken } from '../state/auth';

export function ProfilePage() {
  const [auth] = useAtom(authAtom);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: auth.user?.name ?? '',
    email: auth.user?.email ?? '',
  });

  const handleSave = () => {
    if (!auth.user) return;
    const updatedUser = { ...auth.user, name: form.name, email: form.email };
    setAuthToken(auth.accessToken ?? '', updatedUser);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ name: auth.user?.name ?? '', email: auth.user?.email ?? '' });
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Min profil</h1>
        <p className="text-slate-300">Opdater dine oplysninger.</p>
      </div>

      <Card title="Profiloplysninger">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Navn</label>
            {editing ? (
              <Input value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })} />
            ) : (
              <p className="text-slate-900">{auth.user?.name}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-slate-600">E-mail</label>
            {editing ? (
              <Input value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })} />
            ) : (
              <p className="text-slate-900">{auth.user?.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-slate-600">Rolle</label>
            <p className="text-slate-900">{auth.user?.role === 'admin' ? 'Administrator' : 'Medarbejder'}</p>
          </div>
          <div>
            <label className="text-sm text-slate-600">Bruger-ID</label>
            <p className="text-slate-900">{auth.user?.id}</p>
          </div>
          <div className="flex gap-2 pt-2">
            {editing ? (
              <>
                <Button onClick={handleSave}>Gem</Button>
                <Button variant="ghost" onClick={handleCancel}>
                  Annullér
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Redigér</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
