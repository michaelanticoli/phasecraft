import { useNavigate } from 'react-router-dom';
import { Badge, MoonPhaseGlyph } from '../components/ds';
import { SidebarShell } from '../components/layout/SidebarShell';

type SidebarLessonStatus = 'done' | 'current' | 'locked';

const sidebarLessons: { label: string; status: SidebarLessonStatus }[] = [
  { label: '2.1 New Moon', status: 'done' },
  { label: '2.2 Waxing Crescent', status: 'done' },
  { label: '2.3 First Quarter', status: 'current' },
  { label: '2.4 Waxing Gibbous', status: 'locked' },
  { label: '2.5 Full Moon', status: 'locked' },
];

export function Lesson() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--mt-night)' }}>
      <SidebarShell>
        <div style={{ padding: 20, borderBottom: '1px solid hsl(0 0% 10%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ color: '#e8792b', display: 'inline-block', width: 20, height: 20 }}>
              <MoonPhaseGlyph phase="waxing-crescent" size={20} />
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>
              Module 02
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--mt-ivory)' }}>The Waxing Journey</div>
        </div>
        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sidebarLessons.map((l) => {
            const current = l.status === 'current';
            return (
              <div
                key={l.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: current ? 'hsl(168 75% 45% / 0.08)' : 'transparent',
                  border: current ? '1px solid hsl(168 75% 45% / 0.15)' : 'none',
                  borderRadius: 8,
                  opacity: l.status === 'locked' ? 0.4 : 1,
                }}
              >
                {l.status === 'done' && (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--mt-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <span style={{ fontSize: 9, color: 'var(--mt-night)' }}>✓</span>
                  </div>
                )}
                {l.status === 'current' && (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--mt-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--mt-teal)' }} />
                  </div>
                )}
                {l.status === 'locked' && <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid hsl(0 0% 20%)', flex: 'none' }} />}
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: current ? 'var(--mt-ivory)' : 'var(--mt-clay)' }}>{l.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '16px 20px', borderTop: '1px solid hsl(0 0% 10%)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 8 }}>
            Module Progress
          </div>
          <div style={{ height: 3, background: 'hsl(0 0% 12%)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: '55%', background: 'var(--mt-teal)', borderRadius: 2 }} />
          </div>
        </div>
      </SidebarShell>

      {/* Reading area */}
      <div style={{ flex: 1, background: 'var(--riso-paper)', color: 'var(--riso-ink)', overflowY: 'auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 48px',
            borderBottom: '1px solid rgba(28,26,23,0.08)',
            position: 'sticky',
            top: 0,
            background: 'var(--riso-paper)',
            zIndex: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(28,26,23,0.35)' }}>
            Module 2 · Lesson 3 of 5
          </span>
          <Badge>40 min</Badge>
        </div>

        {/* Video */}
        <div
          style={{
            margin: '32px 48px 0',
            aspectRatio: '16/9',
            maxWidth: 800,
            background: 'hsl(0 0% 8%)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, hsl(168 75% 45% / 0.06) 0%, transparent 60%)' }} />
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'hsl(0 0% 100% / 0.1)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ width: 0, height: 0, borderLeft: '22px solid hsl(40 20% 92%)', borderTop: '13px solid transparent', borderBottom: '13px solid transparent', marginLeft: 4 }} />
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ height: 3, flex: 1, background: 'hsl(0 0% 20%)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: '35%', background: 'var(--mt-teal)', borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'hsl(40 20% 92% / 0.6)' }}>14:22 / 40:00</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 700, padding: '40px 48px 64px' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--riso-teal)', marginBottom: 12 }}>
              Lesson 2.3
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 36, lineHeight: 1.15, margin: 0 }}>
              First Quarter — <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--riso-blue)' }}>Taking Decisive Action</span>
            </h1>
          </div>

          <div style={{ display: 'flex', height: 3, marginBottom: 36, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ flex: 1, background: 'var(--riso-red)' }} />
            <div style={{ flex: 1, background: 'var(--riso-orange)' }} />
            <div style={{ flex: 2, background: 'var(--riso-gold)' }} />
            <div style={{ flex: 1, background: 'rgba(28,26,23,0.08)' }} />
            <div style={{ flex: 1, background: 'rgba(28,26,23,0.08)' }} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 22, margin: '0 0 16px' }}>The Half-Moon Threshold</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.75, color: 'rgba(28,26,23,0.7)', margin: '0 0 20px' }}>
            The First Quarter Moon appears as a half-moon in the sky — a literal turning point where actions taken now directly
            influence future outcomes. This is the moment when the potential gathered at the New Moon and developed during
            the Waxing Crescent must translate into concrete action.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.75, color: 'rgba(28,26,23,0.7)', margin: '0 0 20px' }}>
            The energy of the First Quarter is dynamic, assertive, and momentum-building. You will often feel a sense of
            urgency or pressure — something is pushing you forward, demanding that you make decisions and take stands. This
            is not comfortable energy, but it is essential energy.
          </p>

          <div style={{ padding: '24px 28px', margin: '32px 0', borderLeft: '3px solid var(--riso-gold)', background: 'rgba(242,176,46,0.04)', borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.45, color: 'var(--riso-ink)', margin: 0 }}>
              The First Quarter is when most projects fail or succeed. The difference lies not in the difficulty of the phase
              but in how you relate to it.
            </p>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 22, margin: '36px 0 16px' }}>Confronting Obstacles</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.75, color: 'rgba(28,26,23,0.7)', margin: '0 0 20px' }}>
            The First Quarter Moon is famous for bringing obstacles and challenges. These are not random misfortunes — they
            are the natural resistance that arises when abstract intentions meet concrete reality. Every seed that
            germinates must push through soil. This is how growth happens.
          </p>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 22, margin: '36px 0 16px' }}>Sound Frequencies</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.75, color: 'rgba(28,26,23,0.7)', margin: '0 0 20px' }}>
            The First Quarter resonates with assertive frequencies in the 342–384 Hz range (F to G), supported by modes like
            Mixolydian that carry both grounding and uplifting qualities.
          </p>
          <div style={{ padding: '20px 24px', margin: '24px 0', background: 'hsl(0 0% 8%)', borderRadius: 12, color: 'hsl(40 20% 92%)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
              First Quarter Frequencies
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--mt-ivory)' }}>342 Hz</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>F — Assertion</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--mt-ivory)' }}>384 Hz</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>G — Breakthrough</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--mt-teal)' }}>◐</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>Mixolydian mode</div>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate('/workbook')}
            style={{
              padding: 28,
              margin: '40px 0',
              border: '1px solid rgba(28,26,23,0.1)',
              borderLeft: '3px solid var(--riso-teal)',
              borderRadius: '0 12px 12px 0',
              background: 'rgba(31,154,166,0.03)',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--riso-teal)', marginBottom: 12 }}>
              Workbook · Exercise 2.7
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, marginBottom: 10 }}>Action Taking Challenge</div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.65, color: 'rgba(28,26,23,0.6)', margin: '0 0 16px' }}>
              Identify one action you have been avoiding and take it during the next First Quarter. Notice what happens when
              you push through the resistance.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.6rem 1.2rem',
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: 9999,
                background: 'var(--riso-teal)',
                color: '#fff',
              }}
            >
              Open in Workbook
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, borderTop: '1px solid rgba(28,26,23,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <span style={{ color: 'rgba(28,26,23,0.4)' }}>←</span>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(28,26,23,0.35)' }}>Previous</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(28,26,23,0.6)' }}>2.2 Waxing Crescent</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'right', cursor: 'pointer' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(28,26,23,0.35)' }}>Next</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(28,26,23,0.6)' }}>2.4 Waxing Gibbous</div>
              </div>
              <span style={{ color: 'rgba(28,26,23,0.4)' }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
