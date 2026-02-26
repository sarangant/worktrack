import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest, type LoginPayload } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

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
    <div className="min-h-screen bg-[#cdcfe5] flex items-center justify-center p-4">
      {/* Phone-like container */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-white" style={{ height: '812px' }}>
        <div className="h-full flex flex-col">
          {/* Status bar */}
          <div className="bg-gradient-to-b from-[#4352dc] to-[#4352dc] px-6 py-2 flex justify-between items-center text-white text-xs flex-shrink-0">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 bg-white rounded-sm"></div>
              <div className="w-4 h-3 bg-white rounded-sm"></div>
              <div className="w-4 h-3 bg-white rounded-sm"></div>
            </div>
          </div>
          
          {/* Login content */}
          <div className="flex-1 bg-gradient-to-b from-[#4352dc] to-[#4352dc] flex flex-col justify-center px-4">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="h-12 w-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black mx-auto">
                  WT
                </div>
                <div>
                  <p className="text-accent font-semibold">Worktrack</p>
                  <h1 className="text-2xl font-bold text-white leading-snug">
                    Tidsregistrering
                  </h1>
                  <p className="text-slate-300 text-sm mt-2">
                    Log ind med e-mail eller medarbejder-ID
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Log ind</h2>
                <p className="text-sm text-slate-600 mb-4">Adgang for medarbejdere og administratorer</p>
                
                <div className="flex rounded-lg bg-slate-100 p-1 text-sm font-semibold mb-4">
                  <button
                    className={`flex-1 rounded-md px-3 py-2 ${mode === 'email' ? 'bg-white text-slate-900 border-2 border-accent' : 'text-slate-500'}`}
                    onClick={() => setMode('email')}
                    type="button"
                  >
                    E-mail
                  </button>
                  <button
                    className={`flex-1 rounded-md px-3 py-2 ${mode === 'employeeId' ? 'bg-white text-slate-900 border-2 border-accent' : 'text-slate-500'}`}
                    onClick={() => setMode('employeeId')}
                    type="button"
                  >
                    Medarbejder-ID
                  </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  {mode === 'email' ? (
                    <div className="space-y-2">
                      <label className="text-sm text-slate-600">E-mail</label>
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
                      <label className="text-sm text-slate-600">Medarbejder-ID</label>
                      <Input
                        required
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        placeholder="f.eks. 10293"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm text-slate-600">Kode</label>
                    <Input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logger ind...' : 'Log ind'}
                  </Button>
                </form>
              </div>

              <div className="text-center text-xs text-slate-300 space-y-1">
                <p>• Swipe check ind / ud</p>
                <p>• Automatisk flexberegning</p>
                <p>• Fraværshåndtering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
