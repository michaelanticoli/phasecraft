export function FullScreenLoader() {
  return (
    <div
      className="theme-core"
      style={{
        background: 'var(--mt-night)',
        color: 'var(--mt-muted-fg)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}
    >
      Loading…
    </div>
  );
}
