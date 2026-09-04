import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, MoonPhaseGlyph } from '../components/ds';
import { Logo } from '../components/layout/Logo';

const summaryLines = [
  '6 Core Modules (33 lessons)',
  '3 Bonus Modules',
  'Downloadable Workbooks',
  'Audio Guides',
  'Community Access',
  'Lifetime Updates',
];

export function Checkout() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<'once' | 'installments'>('once');

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid hsl(0 0% 10%)' }}>
        <Logo />
        <span
          onClick={() => navigate('/')}
          style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', cursor: 'pointer' }}
        >
          ← Back to Course
        </span>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 48, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
        {/* Left: form */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
            Enrollment
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 32, letterSpacing: '-0.02em', margin: '0 0 32px' }}>
            Complete Your <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Registration</span>
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="First Name" placeholder="Michael" required />
              <Input label="Last Name" placeholder="Anticoli" required />
            </div>
            <Input label="Email Address" type="email" placeholder="michael@moontuner.xyz" required />

            <div style={{ paddingTop: 12, borderTop: '1px solid hsl(0 0% 12%)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 16 }}>
                Payment
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <div
                  onClick={() => setPlan('once')}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
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
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 24, marginTop: 4, color: plan === 'once' ? 'var(--mt-ivory)' : 'var(--mt-muted-fg)' }}>
                    $197
                  </div>
                </div>
                <div
                  onClick={() => setPlan('installments')}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
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
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 24, marginTop: 4, color: plan === 'installments' ? 'var(--mt-ivory)' : 'var(--mt-muted-fg)' }}>
                    $75/mo
                  </div>
                </div>
              </div>
              <Input label="Card Number" placeholder="4242 4242 4242 4242" required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <Input label="Expiry" placeholder="12 / 28" required />
                <Input label="CVC" placeholder="123" required />
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <Button type="submit" fullWidth size="lg">
                Complete Enrollment
              </Button>
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', textAlign: 'center' }}>
              Secure checkout · 30-day money-back guarantee
            </div>
          </form>
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
