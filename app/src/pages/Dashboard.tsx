import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, LivePill, PhaseStrip } from '../components/ds';
import { AppNav } from '../components/layout/AppNav';
import { AUTHORED_LESSON_KEY, lessonKey, modulesDetailed, totalLessonCount } from '../data/curriculum';
import { module2Workbook } from '../data/workbook';
import { useLessonProgress } from '../lib/useLessonProgress';
import { useWorkbookProgress } from '../lib/useWorkbook';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthProvider';

const module2 = modulesDetailed[1];

function LessonRow({ label, done, current, onClick }: { label: string; done: boolean; current: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 14px',
        background: current ? 'hsl(168 75% 45% / 0.06)' : 'hsl(0 0% 9%)',
        border: current ? '1px solid hsl(168 75% 45% / 0.15)' : 'none',
        borderRadius: 8,
        cursor: 'pointer',
      }}
    >
      {done ? (
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--mt-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <span style={{ fontSize: 10, color: 'var(--mt-night)' }}>✓</span>
        </div>
      ) : current ? (
        <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--mt-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mt-teal)' }} />
        </div>
      ) : (
        <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid hsl(0 0% 20%)', flex: 'none' }} />
      )}
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: current ? 'var(--mt-ivory)' : 'var(--mt-clay)' }}>{label}</span>
      {current && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-teal)' }}>Open lesson</span>}
    </div>
  );
}

interface RecentPost {
  id: string;
  title: string;
  author: string;
  created_at: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const lessons = useLessonProgress();
  const workbook = useWorkbookProgress();
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);

  useEffect(() => {
    supabase
      .from('community_posts')
      .select('id, title, created_at, profiles(display_name)')
      .order('created_at', { ascending: false })
      .limit(2)
      .then(({ data }) => {
        setRecentPosts(
          (data ?? []).map((p) => ({
            id: p.id,
            title: p.title,
            created_at: p.created_at,
            author: p.profiles?.display_name ?? 'Someone',
          }))
        );
      });
  }, []);

  const coursePercent = Math.round((lessons.completedCount / totalLessonCount) * 100);

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <AppNav active="dashboard" />

      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Welcome */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>
                {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 28, letterSpacing: '-0.02em', margin: '8px 0 0' }}>
                Welcome back, <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>{user?.email?.split('@')[0]}</span>
              </h1>
            </div>
            <LivePill>Waxing Gibbous in Sagittarius</LivePill>
          </div>

          {/* Progress */}
          <div style={{ padding: 24, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Course Progress</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--mt-teal)' }}>{coursePercent}%</span>
            </div>
            <div style={{ height: 4, background: 'hsl(0 0% 12%)', borderRadius: 2, marginBottom: 20 }}>
              <div style={{ height: '100%', width: `${coursePercent}%`, background: 'var(--mt-teal)', borderRadius: 2, transition: 'width 0.3s ease' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {modulesDetailed.map((m) => {
                const keys = m.lessons.map(lessonKey);
                const frac = keys.filter(lessons.isDone).length / keys.length;
                return (
                  <div key={m.num} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: '100%', height: 3, background: m.color, borderRadius: 2, opacity: 0.35 + frac * 0.65 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--mt-muted-fg)' }}>{m.num}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Module */}
          <div style={{ padding: 28, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderLeft: '2px solid #e8792b', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)', marginBottom: 6 }}>
                  Currently Studying
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>
                  Module {module2.num}: {module2.title}
                </div>
              </div>
              <Badge>{module2.sub}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {module2.lessons.map((label) => {
                const key = lessonKey(label);
                const isAuthored = key === AUTHORED_LESSON_KEY;
                return (
                  <LessonRow
                    key={key}
                    label={label}
                    done={lessons.isDone(key)}
                    current={isAuthored}
                    onClick={() => (isAuthored ? navigate('/lesson') : lessons.toggle(key))}
                  />
                );
              })}
            </div>
            <div style={{ marginTop: 16 }}>
              <Button size="sm" onClick={() => navigate('/lesson')}>
                Continue Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              padding: 24,
              background: 'linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 5%) 100%)',
              border: '1px solid hsl(0 0% 13%)',
              borderLeft: '2px solid var(--mt-teal)',
              borderRadius: 16,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 14 }}>
              Today's Directive · Refinement
            </div>
            <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.4, margin: '0 0 16px' }}>
              Refine, don't restart. Polish the work you've already begun.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" size="sm">Log Alignment</Button>
              <Button variant="ghost" size="sm">Breathwork</Button>
            </div>
          </div>

          <div style={{ padding: 20, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Current Cycle</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-teal)' }}>Day 11 of 29</span>
            </div>
            <PhaseStrip active="waxing-gibbous" />
          </div>

          <div onClick={() => navigate('/workbook')} style={{ padding: 20, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Workbook</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-gold)' }}>
                {workbook.completedCount} / {module2Workbook.length} complete
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {module2Workbook.slice(0, 2).map((ex) => {
                const done = workbook.isDone(ex.key);
                return (
                  <div key={ex.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'hsl(0 0% 9%)', borderRadius: 8 }}>
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: done ? '50%' : 3,
                        background: done ? 'var(--mt-teal)' : 'transparent',
                        border: done ? 'none' : '1.5px solid var(--mt-gold)',
                        flex: 'none',
                      }}
                    />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: done ? 'var(--mt-clay)' : 'var(--mt-ivory)' }}>{ex.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div onClick={() => navigate('/community')} style={{ padding: 20, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 16, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mt-muted-fg)' }}>Community</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentPosts.length === 0 && (
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mt-muted-fg)' }}>No posts yet — be the first.</div>
              )}
              {recentPosts.map((p) => (
                <div key={p.id} style={{ padding: '10px 12px', background: 'hsl(0 0% 9%)', borderRadius: 8 }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 3 }}>{p.title}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--mt-muted-fg)' }}>
                    {p.author} · {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
