import type { CSSProperties, ReactNode } from 'react';

type BadgeTone = 'neutral' | 'teal' | 'gold' | 'fire' | 'water' | 'earth' | 'air';

const tones: Record<BadgeTone, { bg: string; fg: string; bd: string }> = {
  neutral: { bg: 'hsl(var(--foreground) / 0.08)', fg: 'hsl(var(--foreground) / 0.8)', bd: 'hsl(var(--foreground) / 0.14)' },
  teal: { bg: 'hsl(168 75% 45% / 0.12)', fg: 'var(--mt-teal)', bd: 'hsl(168 75% 45% / 0.3)' },
  gold: { bg: 'hsl(42 50% 58% / 0.14)', fg: 'var(--mt-gold)', bd: 'hsl(42 50% 58% / 0.3)' },
  fire: { bg: 'hsl(18 80% 55% / 0.12)', fg: 'hsl(18 85% 63%)', bd: 'hsl(18 80% 55% / 0.3)' },
  water: { bg: 'hsl(210 80% 55% / 0.12)', fg: 'hsl(210 80% 65%)', bd: 'hsl(210 80% 55% / 0.3)' },
  earth: { bg: 'hsl(150 40% 45% / 0.12)', fg: 'hsl(150 45% 58%)', bd: 'hsl(150 40% 45% / 0.3)' },
  air: { bg: 'hsl(195 70% 55% / 0.12)', fg: 'hsl(195 75% 65%)', bd: 'hsl(195 70% 55% / 0.3)' },
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  outline?: boolean;
  style?: CSSProperties;
}

/** Badge — small pill for phase / sign / element tags. */
export function Badge({ children, tone = 'neutral', outline = false, style = {} }: BadgeProps) {
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: 'var(--font-ui)',
        fontSize: '0.6875rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '0.3rem 0.7rem',
        borderRadius: 'var(--radius-full)',
        background: outline ? 'transparent' : t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
