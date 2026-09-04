import { useState } from 'react';
import { Badge, Button } from '../components/ds';
import { AppNav } from '../components/layout/AppNav';
import { communityPosts } from '../data/curriculum';

const categories = ['All Posts', 'Ceremonies', 'Questions', 'Frequency Work', 'Moon Circles'];

export function Community() {
  const [active, setActive] = useState('All Posts');
  const visible = active === 'All Posts' ? communityPosts : communityPosts.filter((p) => p.category === active);

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
          <Button size="sm">New Post</Button>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {categories.map((c) => {
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
          {visible.map((post) => (
            <div key={post.id} style={{ padding: 24, background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 13%)', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: post.avatarBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    color: post.avatarColor,
                  }}
                >
                  {post.initial}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>{post.author}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mt-muted-fg)' }}>{post.meta}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <Badge>{post.category}</Badge>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, marginBottom: 8 }}>{post.title}</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--mt-clay)', margin: '0 0 14px' }}>{post.body}</p>
              <div style={{ display: 'flex', gap: 20, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--mt-muted-fg)' }}>
                <span>{post.replies} replies</span>
                <span>◐ {post.resonances} resonances</span>
              </div>
            </div>
          ))}

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
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--mt-muted-fg)' }}>28 attending</span>
              </div>
            </div>
          )}

          {visible.length === 0 && active !== 'Moon Circles' && (
            <div style={{ padding: 24, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mt-muted-fg)' }}>
              No posts in {active} yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
