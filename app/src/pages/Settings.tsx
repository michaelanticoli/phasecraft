import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ds';
import { AppNav } from '../components/layout/AppNav';
import { useAuth } from '../lib/AuthProvider';
import { useEnrollmentDetail, useNotificationPreferences, useProfile, type NotificationPreferences } from '../lib/useProfile';

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

const prefRows: { key: keyof NotificationPreferences; title: string; desc: string }[] = [
  { key: 'daily_directive', title: 'Daily directive notifications', desc: 'Receive your phase-aligned directive each morning' },
  { key: 'phase_transition', title: 'Phase transition alerts', desc: 'Get notified when the moon changes phase' },
  { key: 'voc_reminders', title: 'Void-of-course reminders', desc: 'Heads up before VOC periods begin' },
  { key: 'community_digest', title: 'Community digest', desc: 'Weekly summary of top discussions' },
];

const PLAN_LABEL = { once: 'One-Time ($197)', installments: '3 Payments ($75/mo)' };

export function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const profile = useProfile();
  const { prefs, toggle } = useNotificationPreferences();
  const { enrollment } = useEnrollmentDetail();
  const initial = (profile.displayName || user?.email || '?')[0]?.toUpperCase();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

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
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 24, color: 'var(--mt-teal)' }}>{initial}</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>{profile.displayName || 'Set your name below'}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mt-muted-fg)' }}>{user?.email}</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Log Out
              </Button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input
              label="Display Name"
              placeholder="Michael"
              value={profile.displayName}
              onChange={(e) => profile.setDisplayName(e.target.value)}
              onBlur={() => profile.save({ display_name: profile.displayName })}
            />
            <Input
              label="Timezone"
              placeholder="EST (UTC-5)"
              value={profile.timezone}
              onChange={(e) => profile.setTimezone(e.target.value)}
              onBlur={() => profile.save({ timezone: profile.timezone })}
            />
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
                <Toggle on={prefs[row.key]} onToggle={() => toggle(row.key)} />
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
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>{enrollment?.plan ? PLAN_LABEL[enrollment.plan] : '—'}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', marginBottom: 4 }}>Enrolled</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>
                {enrollment?.enrolled_at ? new Date(enrollment.enrolled_at).toLocaleDateString() : '—'}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', marginBottom: 4 }}>Status</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: enrollment?.status === 'active' ? 'var(--mt-teal)' : 'var(--mt-muted-fg)' }}>
                {enrollment ? enrollment.status[0].toUpperCase() + enrollment.status.slice(1) : '—'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
