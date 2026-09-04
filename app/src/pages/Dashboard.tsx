import { useNavigate } from 'react-router-dom';
import { Badge, Button, LivePill, PhaseStrip } from '../components/ds';
import { AppNav } from '../components/layout/AppNav';
import { modules } from '../data/curriculum';

type LessonStatus = 'done' | 'current' | 'locked';

const currentModuleLessons: { label: string; status: LessonStatus; meta: string }[] = [
  { label: '2.1 New Moon — The Quantum Zero-Point', status: 'done', meta: '45m' },
  { label: '2.2 Waxing Crescent — Building Momentum', status: 'done', meta: '35m' },
  { label: '2.3 First Quarter — Taking Decisive Action', status: 'current', meta: 'In progress' },
  { label: '2.4 Waxing Gibbous — Refining and Perfecting', status: 'locked', meta: '40m' },
  { label: '2.5 Full Moon — Culmination and Expression', status: 'locked', meta: '30m' },
];

function LessonRow({ label, status, meta }: { label: string; status: LessonStatus; meta: string }) {
  const navigate = useNavigate();
  const current = status === 'current';
  return (
    <div
      onClick={current ? () => navigate('/lesson') : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 14px',
        background: current ? 'hsl(168 75% 45% / 0.06)' : 'hsl(0 0% 9%)',
        border: current ? '1px solid hsl(168 75% 45% / 0.15)' : 'none',
        borderRadius: 8,
        cursor: current ? 'pointer' : 'default',
        opacity: status === 'locked' ? 0.45 : 1,
      }}
    >
      {status === 'done' && (
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--mt-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <span style={{ fontSize: 10, color: 'var(--mt-night)' }}>✓</span>
        </div>
      )}
      {status === 'current' && (
        <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--mt-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mt-teal)' }} />
        </div>
      )}
      {status === 'locked' && <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid hsl(0 0% 20%)', flex: 'none' }} />}
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: current ? 'var(--mt-ivory)' : 'var(--mt-clay)' }}>{label}</span>
      <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: current ? 'var(--mt-teal)' : 'var(--mt-muted-fg)' }}>{meta}</span>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <AppNav active="dashboard" />

      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Welcome */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>
                Fri · Aug 15 · 2026
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 28, letterSpacing: '-0.02em', margin: '8px 0 0' }}>
                Welcome back, <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Michael</span>
              </h1>
            </div>
            <LivePill>Waxing Gibbous in Sagittarius</LivePill>
          </div>

          {/* Progress */}
          <div style={{ padding: 24, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Course Progress</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--mt-teal)' }}>38%</span>
            </div>
            <div style={{ height: 4, background: 'hsl(0 0% 12%)', borderRadius: 2, marginBottom: 20 }}>
              <div style={{ height: '100%', width: '38%', background: 'var(--mt-teal)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {modules.map((m) => (
                <div key={m.num} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '100%', height: 3, background: m.color, borderRadius: 2, opacity: 0.35 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--mt-muted-fg)' }}>{m.num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Module */}
          <div style={{ padding: 28, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderLeft: '2px solid #e8792b', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 6 }}>
                  Currently Studying
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>Module 2: The Waxing Journey</div>
              </div>
              <Badge>Week 2</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {currentModuleLessons.map((l) => (
                <LessonRow key={l.label} {...l} />
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Button size="sm" onClick={() => navigate('/lesson')}>
                Continue Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              padding: 24,
              background: 'linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 5%) 100%)',
              border: '1px solid hsl(0 0% 13%)',
              borderLeft: '2px solid var(--mt-teal)',
              borderRadius: 16,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 14 }}>
              Today's Directive · Refinement
            </div>
            <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.4, margin: '0 0 16px' }}>
              Refine, don't restart. Polish the work you've already begun.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" size="sm">Log Alignment</Button>
              <Button variant="ghost" size="sm">Breathwork</Button>
            </div>
          </div>

          <div style={{ padding: 20, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Current Cycle</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-teal)' }}>Day 11 of 29</span>
            </div>
            <PhaseStrip active="waxing-gibbous" />
          </div>

          <div onClick={() => navigate('/workbook')} style={{ padding: 20, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Workbook</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-gold)' }}>4 / 14 complete</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'hsl(0 0% 9%)', borderRadius: 8 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--mt-teal)', flex: 'none' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mt-clay)' }}>Ex 2.3: Intention Ceremony</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'hsl(42 50% 58% / 0.06)', border: '1px solid hsl(42 50% 58% / 0.12)', borderRadius: 8 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, border: '1.5px solid var(--mt-gold)', flex: 'none' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13 }}>Ex 2.5: Research Project</span>
              </div>
            </div>
          </div>

          <div onClick={() => navigate('/community')} style={{ padding: 20, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Community</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-teal)' }}>3 new</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '10px 12px', background: 'hsl(0 0% 9%)', borderRadius: 8 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 3 }}>Full Moon Release Ceremony Share</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--mt-muted-fg)' }}>Sarah K. · 2h ago · 12 replies</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'hsl(0 0% 9%)', borderRadius: 8 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 3 }}>Scorpio moon energy this week</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--mt-muted-fg)' }}>David R. · 5h ago · 8 replies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
