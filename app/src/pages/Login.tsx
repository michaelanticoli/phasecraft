import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ds';
import { Logo } from '../components/layout/Logo';
import { useAuth } from '../lib/AuthProvider';

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    const from = (location.state as { from?: Location })?.from;
    navigate(from ? `${from.pathname}${from.search}` : '/dashboard', { replace: true });
  }

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid hsl(0 0% 10%)' }}>
        <Logo />
      </nav>

      <div style={{ maxWidth: 420, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
          Welcome Back
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 32, letterSpacing: '-0.02em', margin: '0 0 32px' }}>
          Log <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>In</span>
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="michael@moontuner.xyz" />
          <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'hsl(0 84% 65%)', margin: 0 }}>{error}</p>}
          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? 'Logging In…' : 'Log In'}
          </Button>
        </form>

        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mt-muted-fg)', marginTop: 24, textAlign: 'center' }}>
          New here? <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
