import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest, type LoginPayload } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export function LoginPage() {
  const [mode, setMode] = useState<'email' | 'employeeId'>('email');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload: LoginPayload =
        mode === 'email'
          ? { email, password }
          : {
              employeeId,
              password,
            };
      const res = await loginRequest(payload);
      const redirectTo = res.user.role === 'admin' ? '/admin/users' : '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch {
      setError('Login fejlede. Tjek dine oplysninger.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <p className="text-accent font-semibold">Worktrack</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            Tidsregistrering med fleks, fravær og rapporter.
          </h1>
          <p className="text-muted">
            Log ind med e-mail eller medarbejder-ID. Dine data er forbundet med din rolle, så du får det rette overblik.
          </p>
          <ul className="text-sm text-muted space-y-1">
            <li>• Swipe check ind / ud</li>
            <li>• Flexsaldo i realtid</li>
            <li>• Fraværsregistrering og eksport til PDF/Excel</li>
          </ul>
        </div>

        <Card title="Log ind" description="Adgang for medarbejdere og administratorer">
          <div className="flex rounded-lg bg-border/20 p-1 text-sm font-semibold">
            <button
              className={`flex-1 rounded-md px-3 py-2 ${mode === 'email' ? 'bg-panel text-white' : 'text-muted'}`}
              onClick={() => setMode('email')}
              type="button"
            >
              E-mail
            </button>
            <button
              className={`flex-1 rounded-md px-3 py-2 ${mode === 'employeeId' ? 'bg-panel text-white' : 'text-muted'}`}
              onClick={() => setMode('employeeId')}
              type="button"
            >
              Medarbejder-ID
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            {mode === 'email' ? (
              <div className="space-y-2">
                <label className="text-sm text-muted">E-mail</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="f.eks. alex@firma.dk"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm text-muted">Medarbejder-ID</label>
                <Input
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="f.eks. 10293"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-muted">Kode</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logger ind...' : 'Log ind'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
