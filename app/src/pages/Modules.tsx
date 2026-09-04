import { Badge, MoonPhaseGlyph } from '../components/ds';
import { AppNav } from '../components/layout/AppNav';
import { bonusModules, modulesDetailed } from '../data/curriculum';

export function Modules() {
  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <AppNav active="modules" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
          Complete Curriculum
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 32, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
          Lunar Phasecraft <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Mastery</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--mt-clay)', margin: '0 0 36px' }}>6 modules · 33 lessons · 8-week transformation</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {modulesDetailed.map((md) => (
            <div key={md.num} style={{ padding: 28, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderLeft: `3px solid ${md.color}`, borderRadius: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ color: md.color, display: 'inline-block', width: 32, height: 32 }}>
                    <MoonPhaseGlyph phase={md.phase} size={32} />
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--mt-muted-fg)', marginBottom: 4 }}>{md.sub}</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>{md.title}</div>
                  </div>
                </div>
                <Badge>{md.status}</Badge>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--mt-clay)', margin: '0 0 16px' }}>{md.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {md.lessons.map((ls) => (
                  <div key={ls} style={{ padding: '8px 14px', background: 'hsl(0 0% 9%)', borderRadius: 8, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mt-muted-fg)' }}>
                    {ls}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bonus */}
        <div style={{ marginTop: 32, padding: 24, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-gold)', marginBottom: 14 }}>
            Bonus Modules
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {bonusModules.map((b) => (
              <div key={b.title} style={{ padding: 16, background: 'hsl(0 0% 9%)', borderRadius: 10 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
