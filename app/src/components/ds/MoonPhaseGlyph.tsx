import type { CSSProperties, ReactElement } from 'react';

export type MoonPhase =
  | 'new'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent';

export const MOON_PHASES: MoonPhase[] = [
  'new',
  'waxing-crescent',
  'first-quarter',
  'waxing-gibbous',
  'full',
  'waning-gibbous',
  'last-quarter',
  'waning-crescent',
];

interface MoonPhaseGlyphProps {
  phase?: MoonPhase;
  size?: number;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}

const svgStyle: CSSProperties = { width: '100%', height: '100%', display: 'block' };

const paths: Record<MoonPhase, ReactElement> = {
  new: (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="7" strokeOpacity="0.3" />
    </svg>
  ),
  'waxing-crescent': (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="currentColor">
      <path d="M12 3a9 9 0 1 0 0 18c-4.97 0-6-4.03-6-9s1.03-9 6-9z" />
    </svg>
  ),
  'first-quarter': (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="currentColor">
      <path d="M12 3a9 9 0 0 0 0 18V3z" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  ),
  'waxing-gibbous': (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-2 0-3 4.03-3 9s1 9 3 9" fill="var(--mt-night)" />
    </svg>
  ),
  full: (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="currentColor">
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  'waning-gibbous': (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c2 0 3 4.03 3 9s-1 9-3 9" fill="var(--mt-night)" />
    </svg>
  ),
  'last-quarter': (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="currentColor">
      <path d="M12 3a9 9 0 0 1 0 18V3z" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  ),
  'waning-crescent': (
    <svg viewBox="0 0 24 24" style={svgStyle} fill="currentColor">
      <path d="M12 3a9 9 0 1 1 0 18c4.97 0 6-4.03 6-9s-1.03-9-6-9z" />
    </svg>
  ),
};

/**
 * MoonPhaseGlyph — geometric lunar phase mark. Uses currentColor so it
 * inherits text color; drop a teal glow with `glow`.
 */
export function MoonPhaseGlyph({ phase = 'full', size = 24, glow = false, className, style = {} }: MoonPhaseGlyphProps) {
  const wrap: CSSProperties = {
    width: size,
    height: size,
    filter: glow ? 'drop-shadow(0 0 12px hsl(168 75% 45% / 0.4))' : undefined,
    ...style,
  };
  return (
    <span className={className} style={wrap}>
      {paths[phase] || paths.full}
    </span>
  );
}
