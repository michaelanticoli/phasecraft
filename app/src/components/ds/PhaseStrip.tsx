import type { CSSProperties } from 'react';
import { MOON_PHASES, MoonPhaseGlyph, type MoonPhase } from './MoonPhaseGlyph';

const LABELS: Record<MoonPhase, string> = {
  new: 'New',
  'waxing-crescent': 'Waxing',
  'first-quarter': 'First Qtr',
  'waxing-gibbous': 'Gibbous',
  full: 'Full',
  'waning-gibbous': 'Waning',
  'last-quarter': 'Last Qtr',
  'waning-crescent': 'Balsamic',
};

interface PhaseStripProps {
  active?: MoonPhase;
  showLabels?: boolean;
  size?: number;
  style?: CSSProperties;
}

/**
 * PhaseStrip — the eight-phase cycle laid out horizontally, with the
 * active phase highlighted in teal. Reads as a timeline / progress row.
 */
export function PhaseStrip({ active = 'full', showLabels = true, size = 26, style = {} }: PhaseStripProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', ...style }}>
      {MOON_PHASES.map((p) => {
        const on = p === active;
        return (
          <div key={p} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem', flex: 1 }}>
            <MoonPhaseGlyph phase={p} size={size} glow={on} style={{ color: on ? 'var(--mt-teal)' : 'hsl(var(--foreground) / 0.4)' }} />
            {showLabels && (
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  color: on ? 'var(--mt-teal)' : 'hsl(var(--foreground) / 0.4)',
                }}
              >
                {LABELS[p]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
