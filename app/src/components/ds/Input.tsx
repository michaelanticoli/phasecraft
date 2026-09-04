import { useState, type CSSProperties, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

/** Input — bordered text field with a teal focus ring and optional label. */
export function Input({ label, hint, id, style = {}, onFocus, onBlur, ...props }: InputProps) {
  const [focus, setFocus] = useState(false);
  const inputId = id || (label ? `mt-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--mt-muted-fg)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        onFocus={(e) => {
          setFocus(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          onBlur?.(e);
        }}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.95rem',
          color: 'hsl(var(--foreground))',
          background: 'hsl(var(--input))',
          border: '1px solid',
          borderColor: focus ? 'var(--mt-teal)' : 'hsl(var(--border))',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          outline: 'none',
          boxShadow: focus ? '0 0 0 3px hsl(168 75% 45% / 0.12)' : 'none',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          width: '100%',
          boxSizing: 'border-box',
          ...(style as CSSProperties),
        }}
        {...props}
      />
      {hint && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--mt-muted-fg)' }}>
          {hint}
        </span>
      )}
    </div>
  );
}
