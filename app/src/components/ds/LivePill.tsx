import type { CSSProperties, ReactNode } from 'react';

interface LivePillProps {
  children?: ReactNode;
  color?: string;
  style?: CSSProperties;
}

/** LivePill — pulsing status indicator ("Waxing Gibbous in Sagittarius", etc). */
export function LivePill({ children = 'Live', color = 'var(--mt-teal)', style = {} }: LivePillProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', ...style }}>
      <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: color,
            opacity: 0.75,
            animation: 'mt-ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
          }}
        />
        <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: color }} />
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color,
        }}
      >
        {children}
      </span>
    </span>
  );
}
