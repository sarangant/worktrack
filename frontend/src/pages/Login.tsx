import { useState, type FormEvent, useEffect } from 'react';
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
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    <div className="min-h-screen bg-surface flex items-center justify-center">
      {isDesktop ? (
        /* Desktop version */
        <div className="w-full max-w-6xl flex items-center justify-center gap-12 p-6">
          {/* Left side - Branding and info */}
          <div className="flex-1 max-w-md">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black text-2xl">
                  WT
                </div>
                <div>
                  <p className="text-accent font-semibold text-lg">Worktrack</p>
                  <h1 className="text-4xl font-bold text-text-primary leading-tight">
                    Tidsregistrering
                  </h1>
                  <p className="text-text-secondary mt-3 text-lg">
                    Professionel tidsregistrering for moderne virksomheder
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-text-muted">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span>Swipe check ind / ud</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span>Automatisk flexberegning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span>Fraværshåndtering</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span>Avancerede rapporter</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full max-w-md">
            <div className="desktop-card p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-2">Log ind</h2>
                <p className="text-text-secondary">Adgang for medarbejdere og administratorer</p>
              </div>
              
              <div className="flex rounded-lg bg-panel p-1 text-sm font-medium mb-6">
                <button
                  className={`flex-1 rounded-md px-4 py-2 transition-colors ${
                    mode === 'email' 
                      ? 'bg-accent text-white' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setMode('email')}
                  type="button"
                >
                  E-mail
                </button>
                <button
                  className={`flex-1 rounded-md px-4 py-2 transition-colors ${
                    mode === 'employeeId' 
                      ? 'bg-accent text-white' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setMode('employeeId')}
                  type="button"
                >
                  Medarbejder-ID
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                {mode === 'email' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">E-mail</label>
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
                    <label className="text-sm font-medium text-text-primary">Medarbejder-ID</label>
                    <Input
                      required
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="f.eks. 10293"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Kode</label>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••"
                  />
                </div>

                {error && <p className="text-sm text-danger">{error}</p>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logger ind...' : 'Log ind'}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border text-center text-xs text-text-muted space-y-1">
                <p>Test login: Brug vilkårlig e-mail/ID og kode</p>
                <p>Admin → E-mail, Medarbejder → Medarbejder-ID</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile version - full screen web app style */
        <div className="w-full h-screen bg-gradient-to-b from-[#4352dc] to-[#4352dc] flex flex-col">
          <div className="flex-grow flex flex-col justify-center p-6">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="h-12 w-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white font-black mx-auto">
                  WT
                </div>
                <div>
                  <p className="text-white font-semibold">Worktrack</p>
                  <h1 className="text-2xl font-bold text-white leading-snug">
                    Tidsregistrering
                  </h1>
                  <p className="text-blue-100 text-sm mt-2">
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
                      placeholder="•••••••"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logger ind...' : 'Log ind'}
                  </Button>
                </form>
              </div>

              <div className="text-center text-xs text-blue-100 space-y-1">
                <p>• Swipe check ind / ud</p>
                <p>• Automatisk flexberegning</p>
                <p>• Fraværshåndtering</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
