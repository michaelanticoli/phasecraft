import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarShellProps {
  children: ReactNode;
}

/** Dark 280px sidebar shell shared by the Lesson and Workbook screens. */
export function SidebarShell({ children }: SidebarShellProps) {
  const navigate = useNavigate();
  return (
    <div
      className="theme-core"
      style={{
        width: 280,
        flex: 'none',
        background: 'hsl(0 0% 5%)',
        borderRight: '1px solid hsl(0 0% 12%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        onClick={() => navigate('/dashboard')}
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid hsl(0 0% 12%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-muted-fg)' }}>←</span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>
          Dashboard
        </span>
      </div>
      {children}
    </div>
  );
}
