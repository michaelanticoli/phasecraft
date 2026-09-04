/** Shown instead of the app when VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY aren't set. */
export function ConfigNeeded() {
  return (
    <div
      style={{
        background: '#0a0a0a',
        color: '#e8e4dc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4dd4b0', marginBottom: 16 }}>
          Configuration needed
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 500, margin: '0 0 16px' }}>Supabase isn't connected yet</h1>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#a89f91', margin: '0 0 16px' }}>
          This app needs <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to run. Copy{' '}
          <code>.env.example</code> to <code>.env.local</code> in the <code>app/</code> folder, fill in your Supabase
          project's values (Project Settings → API), and restart the dev server.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#71685c', margin: 0 }}>See SETUP.md for the full checklist.</p>
      </div>
    </div>
  );
}
