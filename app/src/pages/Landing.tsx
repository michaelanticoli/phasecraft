import { useNavigate } from 'react-router-dom';
import { Button, MoonPhaseGlyph, PhaseStrip } from '../components/ds';
import { MarketingNav } from '../components/layout/MarketingNav';
import { modules } from '../data/curriculum';

const features = [
  { icon: '▶', color: 'var(--mt-teal)', title: 'Video Lessons', desc: '33 lessons, 20–45 min' },
  { icon: '▤', color: 'var(--mt-gold)', title: 'Workbooks', desc: 'Exercises + journaling' },
  { icon: '♪', color: 'var(--mt-teal)', title: 'Audio Guides', desc: 'Meditations + breathwork' },
  { icon: '◎', color: 'var(--mt-gold)', title: 'Community', desc: 'Forum + moon circles' },
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(168 75% 45% / 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          animation: 'mt-orb 20s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 400,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(42 50% 58% / 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <MarketingNav />

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 48px 48px' }}>
        <div style={{ color: 'var(--mt-teal)', display: 'inline-block', width: 80, height: 80, marginBottom: 32 }}>
          <MoonPhaseGlyph phase="full" size={80} />
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 20 }}>
          The Complete Moontuner Method
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 60, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.08 }}>
          Lunar Phasecraft
          <br />
          <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Mastery</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.65, color: 'var(--mt-clay)', maxWidth: 520, margin: '24px auto 0' }}>
          Transform your life by aligning with the Moon's sacred rhythms. Six modules. Eight weeks. A lifetime of lunar wisdom.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 36 }}>
          <div onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
            <Button>Begin Your Journey — $197</Button>
          </div>
          <div onClick={() => navigate('/modules')} style={{ cursor: 'pointer' }}>
            <Button variant="outline">View Curriculum</Button>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 80px 56px' }}>
        <PhaseStrip />
      </div>

      {/* Problem / Solution */}
      <div style={{ position: 'relative', zIndex: 1, padding: '56px 80px', borderTop: '1px solid hsl(0 0% 10%)' }}>
        <div style={{ display: 'flex', gap: 64, maxWidth: 1040, margin: '0 auto' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 16 }}>
              The Problem
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7, color: 'var(--mt-clay)', margin: 0 }}>
              Modern life demands constant output, but humans are rhythmic beings in a rhythmic universe. Most productivity
              systems ignore this truth — the result is burnout, creative blocks, and the sense that something essential is
              missing.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-gold)', marginBottom: 16 }}>
              The Solution
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7, color: 'var(--mt-clay)', margin: 0 }}>
              Phasecraft translates the Moon's eight phases into actionable guidance for every area of life. Not a vibe — a
              system. Sound frequencies, breathwork, movement, and intention, synchronized with cosmic rhythms.
            </p>
          </div>
        </div>
      </div>

      {/* Module grid */}
      <div style={{ position: 'relative', zIndex: 1, padding: '56px 80px 72px', borderTop: '1px solid hsl(0 0% 10%)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
            8-Week Curriculum
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 36, letterSpacing: '-0.02em', margin: 0 }}>
            Your Lunar <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Journey</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 1040, margin: '0 auto' }}>
          {modules.map((m) => (
            <div
              key={m.num}
              style={{
                padding: 24,
                background: 'hsl(0 0% 7%)',
                border: '1px solid hsl(0 0% 13%)',
                borderLeft: `3px solid ${m.color}`,
                borderRadius: 14,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--mt-muted-fg)' }}>{m.sub}</span>
                <span style={{ color: m.color, display: 'inline-block', width: 24, height: 24 }}>
                  <MoonPhaseGlyph phase={m.phase} size={24} />
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, marginBottom: 6 }}>{m.title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.5, color: 'var(--mt-muted-fg)' }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-muted-fg)' }}>
          + 3 Bonus Modules: Business · Creativity · Relationships
        </div>
      </div>

      {/* Features */}
      <div style={{ position: 'relative', zIndex: 1, padding: '48px 80px', borderTop: '1px solid hsl(0 0% 10%)', background: 'hsl(0 0% 6%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 1040, margin: '0 auto' }}>
          {features.map((f) => (
            <div key={f.title} style={{ padding: '24px 20px', background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 14 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, color: f.color, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                {f.title}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ position: 'relative', zIndex: 1, padding: '72px 80px', borderTop: '1px solid hsl(0 0% 10%)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
          Investment
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 36, letterSpacing: '-0.02em', margin: '0 0 36px' }}>
          Begin Your <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Transformation</span>
        </h2>
        <div
          style={{
            maxWidth: 420,
            margin: '0 auto',
            padding: 40,
            background: 'hsl(0 0% 7%)',
            border: '1px solid var(--mt-teal)',
            borderRadius: 20,
            boxShadow: 'var(--glow-teal)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 20 }}>
            Early Bird — First 50 Students
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 56, letterSpacing: '-0.03em' }}>$197</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--mt-muted-fg)', textDecoration: 'line-through' }}>$297</span>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-clay)', marginBottom: 28 }}>
            One-time payment · Lifetime access · All future updates
          </div>
          <div onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
            <Button fullWidth>Enroll Now</Button>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', marginTop: 14 }}>
            Payment plans available at checkout
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '40px 80px', borderTop: '1px solid hsl(0 0% 10%)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 20, color: 'var(--mt-gold)', margin: '0 0 6px' }}>
          The moon has guided humanity for millions of years.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--mt-clay)', margin: 0 }}>Now it can guide you.</p>
      </div>
    </div>
  );
}
