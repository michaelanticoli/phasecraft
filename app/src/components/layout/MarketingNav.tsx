import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ds';
import { Logo } from './Logo';

const linkStyle = {
  fontFamily: 'var(--font-ui)',
  fontSize: 11,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color: 'var(--mt-muted-fg)',
  cursor: 'pointer',
};

/** Nav for the public landing page. */
export function MarketingNav() {
  const navigate = useNavigate();
  return (
    <nav
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        borderBottom: '1px solid hsl(0 0% 10%)',
      }}
    >
      <Logo />
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <span style={linkStyle}>Curriculum</span>
        <span style={linkStyle}>Method</span>
        <Link to="/community" style={linkStyle}>Community</Link>
        <Link to="/dashboard" style={{ ...linkStyle, color: 'var(--mt-ivory)' }}>Log In</Link>
        <div onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
          <Button size="sm">Enroll Now</Button>
        </div>
      </div>
    </nav>
  );
}
