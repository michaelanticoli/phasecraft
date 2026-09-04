import { useEffect, useState } from 'react';
import { Badge, Button } from '../components/ds';
import { AppNav } from '../components/layout/AppNav';
import { useAuth } from '../lib/AuthProvider';
import { supabase } from '../lib/supabase';

const categories = ['Ceremonies', 'Questions', 'Frequency Work', 'Moon Circles'];
const filterOptions = ['All Posts', ...categories];

const AVATAR_PALETTE = [
  { bg: 'hsl(168 75% 45% / 0.15)', fg: 'var(--mt-teal)' },
  { bg: 'hsl(42 50% 58% / 0.15)', fg: 'var(--mt-gold)' },
  { bg: 'hsl(280 50% 50% / 0.15)', fg: '#a377c9' },
  { bg: 'hsl(18 80% 55% / 0.15)', fg: 'hsl(18 85% 68%)' },
];

function avatarFor(userId: string) {
  const idx = [...userId].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[idx];
}

function relativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'Yesterday' : `${days}d ago`;
}

interface Post {
  id: string;
  user_id: string;
  category: string;
  title: string;
  body: string;
  created_at: string;
  author: string;
  resonances: number;
}

export function Community() {
  const { user } = useAuth();
  const [active, setActive] = useState('All Posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [myResonances, setMyResonances] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [newBody, setNewBody] = useState('');
  const [posting, setPosting] = useState(false);

  async function loadPosts() {
    setLoading(true);
    const { data: postRows } = await supabase
      .from('community_posts')
      .select('id, user_id, category, title, body, created_at, profiles(display_name)')
      .order('created_at', { ascending: false });

    const { data: resonanceRows } = await supabase.from('community_resonances').select('post_id, user_id');

    const countByPost = new Map<string, number>();
    const mine = new Set<string>();
    for (const r of resonanceRows ?? []) {
      countByPost.set(r.post_id, (countByPost.get(r.post_id) ?? 0) + 1);
      if (r.user_id === user?.id) mine.add(r.post_id);
    }

    setPosts(
      (postRows ?? []).map((p) => ({
        id: p.id,
        user_id: p.user_id,
        category: p.category,
        title: p.title,
        body: p.body,
        created_at: p.created_at,
        author: p.profiles?.display_name ?? 'Someone',
        resonances: countByPost.get(p.id) ?? 0,
      }))
    );
    setMyResonances(mine);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleResonance(postId: string) {
    if (!user) return;
    const resonated = myResonances.has(postId);
    setMyResonances((prev) => {
      const next = new Set(prev);
      if (resonated) next.delete(postId);
      else next.add(postId);
      return next;
    });
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, resonances: p.resonances + (resonated ? -1 : 1) } : p)));
    if (resonated) {
      await supabase.from('community_resonances').delete().eq('post_id', postId).eq('user_id', user.id);
    } else {
      await supabase.from('community_resonances').insert({ post_id: postId, user_id: user.id });
    }
  }

  async function submitNewPost() {
    if (!user || !newTitle.trim() || !newBody.trim()) return;
    setPosting(true);
    await supabase.from('community_posts').insert({ user_id: user.id, category: newCategory, title: newTitle.trim(), body: newBody.trim() });
    setPosting(false);
    setShowNewPost(false);
    setNewTitle('');
    setNewBody('');
    loadPosts();
  }

  const visible = active === 'All Posts' ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="theme-core" style={{ background: 'var(--mt-night)', color: 'var(--mt-ivory)', minHeight: '100vh' }}>
      <AppNav active="community" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mt-teal)', marginBottom: 8 }}>
              Community Forum
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 28, letterSpacing: '-0.02em', margin: 0 }}>
              Moon <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--mt-gold)' }}>Circle</span>
            </h1>
          </div>
          <Button size="sm" onClick={() => setShowNewPost((v) => !v)}>
            {showNewPost ? 'Cancel' : 'New Post'}
          </Button>
        </div>

        {showNewPost && (
          <div style={{ padding: 24, marginBottom: 24, background: 'hsl(0 0% 7%)', border: '1px solid hsl(168 75% 45% / 0.25)', borderRadius: 14 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {categories.map((c) => (
                <div
                  key={c}
                  onClick={() => setNewCategory(c)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    background: c === newCategory ? 'hsl(168 75% 45% / 0.1)' : 'hsl(0 0% 9%)',
                    border: `1px solid ${c === newCategory ? 'var(--mt-teal)' : 'hsl(0 0% 15%)'}`,
                    color: c === newCategory ? 'var(--mt-teal)' : 'var(--mt-muted-fg)',
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Give your post a title"
              style={{
                width: '100%',
                marginBottom: 10,
                padding: '10px 14px',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: 'hsl(var(--foreground))',
                background: 'hsl(var(--input))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                boxSizing: 'border-box',
              }}
            />
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Share your experience, question, or reflection…"
              style={{
                width: '100%',
                minHeight: 90,
                marginBottom: 12,
                padding: '10px 14px',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: 'hsl(var(--foreground))',
                background: 'hsl(var(--input))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                boxSizing: 'border-box',
              }}
            />
            <Button size="sm" disabled={posting || !newTitle.trim() || !newBody.trim()} onClick={submitNewPost}>
              {posting ? 'Posting…' : 'Post'}
            </Button>
          </div>
        )}

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {filterOptions.map((c) => {
            const on = c === active;
            return (
              <div
                key={c}
                onClick={() => setActive(c)}
                style={{
                  padding: '8px 16px',
                  background: on ? 'hsl(168 75% 45% / 0.1)' : 'hsl(0 0% 8%)',
                  border: `1px solid ${on ? 'var(--mt-teal)' : 'hsl(0 0% 15%)'}`,
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: on ? 'var(--mt-teal)' : 'var(--mt-muted-fg)',
                  cursor: 'pointer',
                }}
              >
                {c}
              </div>
            );
          })}
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {loading && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-muted-fg)' }}>Loading…</div>}

          {!loading &&
            visible.map((post) => {
              const avatar = avatarFor(post.user_id);
              const resonated = myResonances.has(post.id);
              return (
                <div key={post.id} style={{ padding: 24, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: avatar.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 13,
                        color: avatar.fg,
                      }}
                    >
                      {post.author[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>{post.author}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-muted-fg)' }}>{relativeTime(post.created_at)}</div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, marginBottom: 8 }}>{post.title}</div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--mt-clay)', margin: '0 0 14px' }}>{post.body}</p>
                  <div
                    onClick={() => toggleResonance(post.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: resonated ? 'var(--mt-teal)' : 'var(--mt-muted-fg)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>◐</span>
                    <span>
                      {post.resonances} {post.resonances === 1 ? 'resonance' : 'resonances'}
                    </span>
                  </div>
                </div>
              );
            })}

          {(active === 'All Posts' || active === 'Moon Circles') && (
            <div style={{ padding: 24, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderLeft: '2px solid var(--mt-teal)', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'hsl(168 75% 45% / 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    color: 'var(--mt-teal)',
                  }}
                >
                  ☽
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-teal)' }}>Moon Circle Event</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-muted-fg)' }}>Pinned · Next: Aug 19</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <Badge>Moon Circles</Badge>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, marginBottom: 8 }}>Full Moon Circle — August 19, 8pm EST</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--mt-clay)', margin: '0 0 14px' }}>
                Join us for our monthly Full Moon gathering. This month we will practice the Full Moon expression ceremony
                from Module 4 together. Bring your singing bowl or tuning fork if you have one.
              </p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Button variant="outline" size="sm">RSVP</Button>
              </div>
            </div>
          )}

          {!loading && visible.length === 0 && active !== 'Moon Circles' && (
            <div style={{ padding: 24, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-muted-fg)' }}>
              No posts in {active} yet — be the first.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
