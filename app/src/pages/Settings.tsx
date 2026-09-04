import { useState } from 'react';
import { Button, Input } from '../components/ds';
import { AppNav } from '../components/layout/AppNav';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      style={{
        width: 40,
        height: 22,
        background: on ? 'var(--mt-teal)' : 'hsl(0 0% 20%)',
        borderRadius: 11,
        position: 'relative',
        cursor: 'pointer',
        flex: 'none',
        transition: 'background 0.2s ease',
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          background: on ? 'white' : 'hsl(0 0% 40%)',
          borderRadius: '50%',
          position: 'absolute',
          top: 2,
          left: on ? 20 : 2,
          transition: 'left 0.2s ease',
        }}
      />
    </div>
  );
}

const initialPrefs = {
  directive: true,
  transition: true,
  voc: false,
  digest: true,
};

const prefRows: { key: keyof typeof initialPrefs; title: string; desc: string }[] = [
  { key: 'directive', title: 'Daily directive notifications', desc: 'Receive your phase-aligned directive each morning' },
  { key: 'transition', title: 'Phase transition alerts', desc: 'Get notified when the moon changes phase' },
  { key: 'voc', title: 'Void-of-course reminders', desc: 'Heads up before VOC periods begin' },
  { key: 'digest', title: 'Community digest', desc: 'Weekly summary of top discussions' },
];

export function Settings() {
  const [prefs, setPrefs] = useState(initialPrefs);

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <AppNav active="settings" />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 12 }}>
          Account
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 28, letterSpacing: '-0.02em', margin: '0 0 36px' }}>
          Settings & <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Profile</span>
        </h1>

        {/* Profile */}
        <div style={{ padding: 28, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16, marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 20 }}>
            Profile
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'hsl(168 75% 45% / 0.12)',
                border: '2px solid var(--mt-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 24, color: 'var(--mt-teal)' }}>M</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>Michael Moon Anticoli</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mt-muted-fg)' }}>michael@moontuner.xyz</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input label="Display Name" placeholder="Michael" />
            <Input label="Timezone" placeholder="EST (UTC-5)" />
          </div>
        </div>

        {/* Lunar Preferences */}
        <div style={{ padding: 28, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16, marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 20 }}>
            Lunar Preferences
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {prefRows.map((row, i) => (
              <div
                key={row.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: i < prefRows.length - 1 ? '1px solid hsl(0 0% 10%)' : 'none',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>{row.title}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>{row.desc}</div>
                </div>
                <Toggle on={prefs[row.key]} onToggle={() => setPrefs((p) => ({ ...p, [row.key]: !p[row.key] }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment info */}
        <div style={{ padding: 28, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 20 }}>
            Enrollment
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', marginBottom: 4 }}>Plan</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>Lifetime Access</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', marginBottom: 4 }}>Enrolled</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>Jul 15, 2026</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', marginBottom: 4 }}>Status</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-teal)' }}>Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
