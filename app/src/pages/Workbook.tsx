import { useNavigate } from 'react-router-dom';
import { SidebarShell } from '../components/layout/SidebarShell';
import { AUTHORED_EXERCISE_KEY, module2Workbook } from '../data/workbook';
import { useWorkbookProgress, useWorkbookResponses } from '../lib/useWorkbook';

const prompts = [
  { key: 'intention', label: 'Your chosen intention', placeholder: 'What intention from your New Moon ceremony are you developing?', minHeight: 80 },
  { key: 'learn', label: 'What do you need to learn?', placeholder: 'What information, skills, or knowledge do you need to gather?', minHeight: 100 },
  { key: 'resources', label: 'Resources and connections', placeholder: 'Who might help? What tools or resources do you need?', minHeight: 100 },
  { key: 'plan', label: 'Action plan for the First Quarter', placeholder: 'Based on your research, what specific actions will you take at the First Quarter?', minHeight: 100 },
];

const textareaStyle = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid rgba(28,26,23,0.12)',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.5)',
  fontSize: 15,
  lineHeight: 1.6,
  color: 'var(--riso-ink)',
} as const;

const parts = Array.from(new Set(module2Workbook.map((e) => e.part)));

export function Workbook() {
  const navigate = useNavigate();
  const progress = useWorkbookProgress();
  const { responses, setResponses, completed, save, saving, savedAt } = useWorkbookResponses(AUTHORED_EXERCISE_KEY);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--mt-night)' }}>
      <SidebarShell>
        <div style={{ padding: 20, borderBottom: '1px solid hsl(0 0% 10%)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-gold)', marginBottom: 8 }}>
            Workbook
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--mt-ivory)' }}>Module 2 Exercises</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)', marginTop: 4 }}>
            {progress.completedCount} of {module2Workbook.length} complete
          </div>
        </div>
        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {parts.map((part) => (
            <div key={part}>
              <div style={{ padding: '10px 12px', borderRadius: 8, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-clay)' }}>{part}</div>
              {module2Workbook
                .filter((e) => e.part === part)
                .map((ex) => {
                  const isAuthored = ex.key === AUTHORED_EXERCISE_KEY;
                  const done = isAuthored ? completed : progress.isDone(ex.key);
                  return (
                    <div
                      key={ex.key}
                      onClick={isAuthored ? undefined : () => progress.toggle(ex.key)}
                      style={{
                        padding: '8px 12px 8px 24px',
                        borderRadius: 6,
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        cursor: isAuthored ? 'default' : 'pointer',
                        color: isAuthored ? 'var(--mt-ivory)' : done ? 'var(--mt-muted-fg)' : 'var(--mt-clay)',
                        background: isAuthored ? 'hsl(42 50% 58% / 0.08)' : 'transparent',
                        border: isAuthored ? '1px solid hsl(42 50% 58% / 0.15)' : 'none',
                      }}
                    >
                      {done ? '✓' : isAuthored ? '◐' : '○'} {ex.label}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </SidebarShell>

      {/* Workbook content */}
      <div style={{ flex: 1, background: 'var(--riso-paper)', color: 'var(--riso-ink)', overflowY: 'auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 48px',
            borderBottom: '1px solid rgba(28,26,23,0.08)',
            position: 'sticky',
            top: 0,
            background: 'var(--riso-paper)',
            zIndex: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(28,26,23,0.35)' }}>
            Module 2 · Part C · Exercise 5
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--riso-teal)' }}>
            {saving ? 'Saving…' : savedAt ? 'Draft saved' : completed ? 'Completed' : ''}
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            save(responses);
          }}
          style={{ maxWidth: 700, padding: '40px 48px 64px' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--riso-teal)', marginBottom: 12 }}>
            Exercise 2.5
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 32, lineHeight: 1.15, margin: '0 0 24px' }}>
            Research and <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--riso-blue)' }}>Preparation Project</span>
          </h1>

          <div style={{ padding: '20px 24px', marginBottom: 32, background: 'rgba(31,154,166,0.04)', border: '1px solid rgba(31,154,166,0.12)', borderRadius: 10 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.65, color: 'rgba(28,26,23,0.65)', margin: 0 }}>
              Choose one intention from your New Moon ceremony and spend the Waxing Crescent phase researching everything you
              need to move forward. Create a resource list, identify connections, and develop a clear plan for action.
            </p>
          </div>

          {prompts.map((p) => (
            <div key={p.key} style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(28,26,23,0.5)', marginBottom: 10 }}>
                {p.label}
              </div>
              <textarea
                style={{ ...textareaStyle, minHeight: p.minHeight }}
                placeholder={p.placeholder}
                value={responses[p.key] ?? ''}
                onChange={(e) => setResponses({ ...responses, [p.key]: e.target.value })}
              />
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.7rem 1.6rem',
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: 9999,
                background: 'var(--riso-teal)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Save Progress
            </button>
            <button
              type="button"
              onClick={() => save(responses, true).then(() => navigate('/dashboard'))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.7rem 1.6rem',
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: 9999,
                border: '1px solid rgba(28,26,23,0.2)',
                background: completed ? 'rgba(31,154,166,0.1)' : 'transparent',
                color: 'var(--riso-ink)',
                cursor: 'pointer',
              }}
            >
              {completed ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
