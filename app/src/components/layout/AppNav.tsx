import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

type AppTab = 'dashboard' | 'modules' | 'community' | 'settings';

const tabs: { key: AppTab; label: string; to: string }[] = [
  { key: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { key: 'modules', label: 'Modules', to: '/modules' },
  { key: 'community', label: 'Community', to: '/community' },
];

interface AppNavProps {
  active: AppTab;
}

/** Top nav shared by the logged-in app screens (dashboard, modules, community, settings). */
export function AppNav({ active }: AppNavProps) {
  const navigate = useNavigate();
  const linkStyle = (isActive: boolean) => ({
    fontFamily: 'var(--font-ui)',
    fontSize: 11,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    color: isActive ? 'var(--mt-teal)' : 'var(--mt-muted-fg)',
    padding: '6px 0',
    borderBottom: isActive ? '2px solid var(--mt-teal)' : '2px solid transparent',
    cursor: 'pointer',
  });

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 32px',
        background: 'hsl(0 0% 5%)',
        borderBottom: '1px solid hsl(0 0% 12%)',
      }}
    >
      <Logo compact />
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {tabs.map((t) => (
          <Link key={t.key} to={t.to} style={linkStyle(active === t.key)}>
            {t.label}
          </Link>
        ))}
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 11,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--mt-muted-fg)',
            cursor: 'pointer',
          }}
        >
          Practice
        </span>
        <Link to="/workbook" style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>
          Workbook
        </Link>
      </div>
      <div
        onClick={() => navigate('/settings')}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: active === 'settings' ? 'var(--mt-teal)' : 'hsl(0 0% 15%)',
          border: active === 'settings' ? 'none' : '1px solid hsl(0 0% 20%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 11,
            color: active === 'settings' ? 'var(--mt-night)' : 'var(--mt-ivory)',
            fontWeight: active === 'settings' ? 600 : 400,
          }}
        >
          M
        </span>
      </div>
    </nav>
  );
}
