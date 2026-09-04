import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ds';
import { Logo } from '../components/layout/Logo';
import { useAuth } from '../lib/AuthProvider';
import { supabase } from '../lib/supabase';

export function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signUp(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    // If email confirmation is required in the Supabase Auth settings, there's
    // no session yet — tell the user to confirm rather than redirecting them
    // into a route that requires auth.
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      navigate('/checkout');
    } else {
      setNeedsConfirmation(true);
    }
  }

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid hsl(0 0% 10%)' }}>
        <Logo />
      </nav>

      <div style={{ maxWidth: 420, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
          Create Account
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 32, letterSpacing: '-0.02em', margin: '0 0 32px' }}>
          Begin Your <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Journey</span>
        </h1>

        {needsConfirmation ? (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.65, color: 'var(--mt-clay)' }}>
            Check <strong>{email}</strong> for a confirmation link, then{' '}
            <Link to="/login">log in</Link>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="michael@moontuner.xyz" />
            <Input label="Password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
            {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'hsl(0 84% 65%)', margin: 0 }}>{error}</p>}
            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? 'Creating Account…' : 'Create Account'}
            </Button>
          </form>
        )}

        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mt-muted-fg)', marginTop: 24, textAlign: 'center' }}>
          Already enrolled? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
