import { Link } from 'react-router-dom';
import { MoonPhaseGlyph } from '../ds';

interface LogoProps {
  compact?: boolean;
  to?: string;
}

/** Brand mark — moon glyph + wordmark, used across every nav. */
export function Logo({ compact = false, to = '/' }: LogoProps) {
  return (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--mt-ivory)' }}>
      <span style={{ color: 'var(--mt-teal)', display: 'inline-block', width: compact ? 18 : 20, height: compact ? 18 : 20 }}>
        <MoonPhaseGlyph phase="waxing-crescent" size={compact ? 18 : 20} />
      </span>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          fontSize: compact ? 11 : 12,
          letterSpacing: compact ? '0.14em' : '0.16em',
          textTransform: 'uppercase',
        }}
      >
        {compact ? 'Phasecraft' : 'School of Phasecraft'}
      </span>
    </Link>
  );
}
