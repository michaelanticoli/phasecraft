import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoonPhaseGlyph } from '../components/ds';
import { useEnrollment } from '../lib/useEnrollment';

const POLL_INTERVAL_MS = 1500;
const MAX_POLLS = 20; // ~30s — the Stripe webhook usually lands in well under a second

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const { isActive, refresh } = useEnrollment();
  const [polls, setPolls] = useState(0);
  const timedOut = polls >= MAX_POLLS;

  useEffect(() => {
    if (isActive) {
      navigate('/dashboard', { replace: true });
      return;
    }
    if (timedOut) return;
    const id = setTimeout(async () => {
      await refresh();
      setPolls((p) => p + 1);
    }, POLL_INTERVAL_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, polls, timedOut]);

  return (
    <div
      className="theme-core"
      style={{
        background: 'var(--mt-night)',
        color: 'var(--mt-ivory)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 32,
      }}
    >
      <div style={{ color: 'var(--mt-teal)', width: 56, height: 56, marginBottom: 24 }}>
        <MoonPhaseGlyph phase="full" size={56} glow />
      </div>
      {timedOut ? (
        <>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 26, margin: '0 0 12px' }}>
            Still confirming your payment
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-clay)', maxWidth: 420 }}>
            This is taking longer than expected. Your payment likely succeeded — refresh this page in a minute, or check
            your email for a receipt from Stripe.
          </p>
        </>
      ) : (
        <>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 26, margin: '0 0 12px' }}>
            Confirming your payment<span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>…</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-clay)' }}>One moment — this only takes a second.</p>
        </>
      )}
    </div>
  );
}
