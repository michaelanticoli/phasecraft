import { useState } from 'react';
import { Button, MoonPhaseGlyph } from '../components/ds';
import { Logo } from '../components/layout/Logo';
import { useAuth } from '../lib/AuthProvider';
import { useEnrollment } from '../lib/useEnrollment';
import { supabase } from '../lib/supabase';

const summaryLines = [
  '6 Core Modules (33 lessons)',
  '3 Bonus Modules',
  'Downloadable Workbooks',
  'Audio Guides',
  'Community Access',
  'Lifetime Updates',
];

export function Checkout() {
  const { user, signOut } = useAuth();
  const { status } = useEnrollment();
  const [plan, setPlan] = useState<'once' | 'installments'>('once');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke<{ url: string }>('create-checkout-session', {
      body: { plan },
    });
    setSubmitting(false);
    if (error || !data?.url) {
      setError('Something went wrong starting checkout. Please try again.');
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid hsl(0 0% 10%)' }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>{user?.email}</span>
          <span
            onClick={() => signOut()}
            style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', cursor: 'pointer' }}
          >
            Log Out
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 48, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
        {/* Left: plan selection */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
            Enrollment
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 32, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Complete Your <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Registration</span>
          </h1>

          {status === 'pending' && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-clay)', margin: '0 0 32px' }}>
              You'll pay securely on Stripe's page — we never see or store your card details.
            </p>
          )}
          {status === 'canceled' && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'hsl(42 60% 65%)', margin: '0 0 32px' }}>
              Your last enrollment attempt didn't go through. Pick a plan below to try again.
            </p>
          )}

          <div style={{ paddingTop: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 16 }}>
              Choose Your Plan
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              <div
                onClick={() => setPlan('once')}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  background: plan === 'once' ? 'hsl(168 75% 45% / 0.08)' : 'hsl(0 0% 8%)',
                  border: `1px solid ${plan === 'once' ? 'var(--mt-teal)' : 'hsl(0 0% 15%)'}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: plan === 'once' ? 'var(--mt-ivory)' : 'var(--mt-muted-fg)' }}>
                  One-Time
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 28, marginTop: 4, color: plan === 'once' ? 'var(--mt-ivory)' : 'var(--mt-muted-fg)' }}>
                  $197
                </div>
              </div>
              <div
                onClick={() => setPlan('installments')}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  background: plan === 'installments' ? 'hsl(168 75% 45% / 0.08)' : 'hsl(0 0% 8%)',
                  border: `1px solid ${plan === 'installments' ? 'var(--mt-teal)' : 'hsl(0 0% 15%)'}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: plan === 'installments' ? 'var(--mt-ivory)' : 'var(--mt-muted-fg)' }}>
                  3 Payments
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 28, marginTop: 4, color: plan === 'installments' ? 'var(--mt-ivory)' : 'var(--mt-muted-fg)' }}>
                  $75/mo
                </div>
              </div>
            </div>

            {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'hsl(0 84% 65%)', margin: '0 0 16px' }}>{error}</p>}

            <Button fullWidth size="lg" disabled={submitting} onClick={handleCheckout}>
              {submitting ? 'Redirecting to Stripe…' : 'Continue to Payment'}
            </Button>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', textAlign: 'center', marginTop: 14 }}>
              Secure checkout via Stripe · 30-day money-back guarantee
            </div>
          </div>
        </div>

        {/* Right: order summary */}
        <div>
          <div style={{ padding: 28, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16, position: 'sticky', top: 32 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 20 }}>
              Order Summary
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 20, borderBottom: '1px solid hsl(0 0% 12%)' }}>
              <div style={{ width: 56, height: 56, background: 'hsl(0 0% 10%)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--mt-teal)', display: 'inline-block', width: 28, height: 28 }}>
                  <MoonPhaseGlyph phase="full" size={28} />
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16 }}>Lunar Phasecraft Mastery</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>The Complete Moontuner Method</div>
              </div>
            </div>
            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 10, borderBottom: '1px solid hsl(0 0% 12%)' }}>
              {summaryLines.map((line) => (
                <div key={line} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mt-clay)' }}>
                  <span>{line}</span>
                  <span>✓</span>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Total</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 32 }}>{plan === 'once' ? '$197' : '$75/mo'}</div>
              </div>
              <div style={{ padding: '4px 12px', background: 'hsl(168 75% 45% / 0.1)', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--mt-teal)' }}>
                Save $100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
