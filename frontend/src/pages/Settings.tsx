import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAtom } from 'jotai';
import { authAtom, setAuthToken, clearAuthToken } from '../state/auth';

export function SettingsPage() {
  const [auth] = useAtom(authAtom);
  const [form, setForm] = useState({
    name: auth.user?.name ?? '',
    email: auth.user?.email ?? '',
    currentPassword: '',
    newPassword: '',
  });

  const handleSave = () => {
    if (!auth.user) return;
    const updatedUser = { ...auth.user, name: form.name, email: form.email };
    setAuthToken(auth.accessToken ?? '', updatedUser);
    // TODO: Update password if needed
    alert('Indstillinger gemt!');
  };

  const handleLogout = () => {
    clearAuthToken();
    window.location.href = '/login';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Indstillinger</h1>
        <p className="text-slate-300">Administrér dine kontoindstillinger.</p>
      </div>

      <Card title="Profiloplysninger">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Navn</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Dit navn"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">E-mail</label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="din@email.dk"
            />
          </div>
        </div>
      </Card>

      <Card title="Adgangskode">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Nuværende adgangskode</label>
            <Input
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              placeholder="Indtast nuværende kode"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Ny adgangskode</label>
            <Input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              placeholder="Indtast ny kode"
            />
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button onClick={handleSave} className="w-full">
          Gem indstillinger
        </Button>
        <Button variant="ghost" onClick={handleLogout} className="w-full">
          Log ud
        </Button>
      </div>
    </div>
  );
}
