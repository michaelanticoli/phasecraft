import { useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'teal';
type ButtonSize = 'sm' | 'md' | 'lg';

const sizes: Record<ButtonSize, { padding: string; fontSize: string }> = {
  sm: { padding: '0.5rem 1rem', fontSize: '0.6875rem' },
  md: { padding: '0.85rem 1.6rem', fontSize: '0.8125rem' },
  lg: { padding: '1rem 2.25rem', fontSize: '0.875rem' },
};

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  as?: ElementType;
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

/** Button — Moontuner's primary action control. Uppercase Work Sans label, pill geometry. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  as: Tag = 'button',
  style = {},
  ...props
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const s = sizes[size] || sizes.md;

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-full)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : 'auto',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    ...s,
  };

  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: {
      background: hover ? 'var(--mt-gold)' : 'var(--mt-ivory)',
      color: 'var(--mt-night)',
      borderColor: hover ? 'var(--mt-gold)' : 'var(--mt-ivory)',
    },
    outline: {
      background: hover ? 'hsl(var(--foreground))' : 'transparent',
      color: hover ? 'hsl(var(--background))' : 'hsl(var(--foreground))',
      borderColor: 'hsl(var(--foreground))',
    },
    ghost: {
      background: hover ? 'hsl(var(--foreground) / 0.06)' : 'transparent',
      color: 'hsl(var(--foreground))',
      borderColor: hover ? 'hsl(var(--foreground) / 0.7)' : 'hsl(var(--foreground) / 0.25)',
    },
    teal: {
      background: hover ? 'var(--mt-teal-light)' : 'var(--mt-teal)',
      color: 'var(--mt-night)',
      borderColor: hover ? 'var(--mt-teal-light)' : 'var(--mt-teal)',
    },
  };

  return (
    <Tag
      style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      disabled={Tag === 'button' ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...props}
    >
      {children}
    </Tag>
  );
}
