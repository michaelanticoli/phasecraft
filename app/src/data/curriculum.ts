import type { MoonPhase } from '../components/ds';

export interface Module {
  num: string;
  title: string;
  sub: string;
  phase: MoonPhase;
  color: string;
  desc: string;
}

export interface ModuleDetailed extends Module {
  status: 'Complete' | 'In Progress' | 'Locked';
  lessons: string[];
}

export const modules: Module[] = [
  { num: '01', title: 'Foundations of Lunar Living', sub: 'Week 1 · 4 Lessons', phase: 'new', color: '#e5432c', desc: 'The Moontuner philosophy, resonance science, and sacred space preparation.' },
  { num: '02', title: 'The Waxing Journey', sub: 'Weeks 2–3 · 5 Lessons', phase: 'waxing-crescent', color: '#e8792b', desc: 'New Moon through Full Moon — intention, momentum, action, and refinement.' },
  { num: '03', title: 'Moon Signs & Daily Alignment', sub: 'Week 4 · 7 Lessons', phase: 'waxing-gibbous', color: '#1f9aa6', desc: 'Zodiac sign energy, void-of-course navigation, and daily planning.' },
  { num: '04', title: 'The Waning Wisdom', sub: 'Weeks 5–6 · 5 Lessons', phase: 'waning-gibbous', color: '#c0397f', desc: 'Full Moon expression, release rituals, deep rest, and cycle renewal.' },
  { num: '05', title: 'Advanced Frequency', sub: 'Week 7 · 6 Lessons', phase: 'last-quarter', color: '#7a4ea3', desc: 'Tuning forks, singing bowls, ceremony design, and movement practice.' },
  { num: '06', title: 'Integration & Mastery', sub: 'Week 8 · 6 Lessons', phase: 'full', color: '#2b4c8c', desc: 'Personal frequency map, sustainable practice, and teaching foundations.' },
];

export const modulesDetailed: ModuleDetailed[] = [
  { ...modules[0], status: 'Complete', lessons: ['1.1 The Moontuner Philosophy', '1.2 Science of Resonance', '1.3 Preparing Your Space', '1.4 Daily Practice'] },
  { ...modules[1], status: 'In Progress', lessons: ['2.1 New Moon', '2.2 Waxing Crescent', '2.3 First Quarter', '2.4 Waxing Gibbous', '2.5 Full Moon'] },
  { ...modules[2], status: 'Locked', lessons: ['3.1 Moon Signs Overview', '3.2 Fire Signs', '3.3 Earth Signs', '3.4 Air Signs', '3.5 Water Signs', '3.6 Void of Course', '3.7 Moon Sign Calendar'] },
  { ...modules[3], status: 'Locked', lessons: ['4.1 Full Moon', '4.2 Waning Gibbous', '4.3 Last Quarter', '4.4 Waning Crescent', '4.5 Transition Practice'] },
  { ...modules[4], status: 'Locked', lessons: ['5.1 Tuning Forks', '5.2 Singing Bowls', '5.3 Lunar Ceremonies', '5.4 Movement & Dance', '5.5 Frequency Map', '5.6 Teaching Others'] },
  { ...modules[5], status: 'Locked', lessons: ['6.1 Personal Frequency Map', '6.2 Your Unique Practice', '6.3 Teaching Practices', '6.4 Accountability', '6.5 Long-Term Planning', '6.6 Path to Mastery'] },
];

export const bonusModules = [
  { title: 'Lunar Business', desc: 'Product launches, meetings, strategy' },
  { title: 'Creativity & Art', desc: 'Creative blocks, scheduling, flow' },
  { title: 'Relationships', desc: 'Communication, timing, connection' },
];

export interface CommunityPost {
  id: string;
  initial: string;
  avatarColor: string;
  avatarBg: string;
  author: string;
  meta: string;
  category: string;
  title: string;
  body: string;
  replies: number;
  resonances: number;
  pinned?: boolean;
}

export const communityPosts: CommunityPost[] = [
  {
    id: 'p1',
    initial: 'S',
    avatarColor: 'var(--mt-teal)',
    avatarBg: 'hsl(168 75% 45% / 0.15)',
    author: 'Sarah K.',
    meta: '2 hours ago · Module 4',
    category: 'Ceremonies',
    title: 'Full Moon Release Ceremony — My Experience',
    body: 'I just completed my first Full Moon release ceremony from Module 4 and wanted to share. I burned my release list under the moonlight and felt a weight lift that I did not expect. The toning practice beforehand really helped me get into a receptive state...',
    replies: 12,
    resonances: 24,
  },
  {
    id: 'p2',
    initial: 'D',
    avatarColor: 'var(--mt-gold)',
    avatarBg: 'hsl(42 50% 58% / 0.15)',
    author: 'David R.',
    meta: '5 hours ago · Module 3',
    category: 'Questions',
    title: 'Scorpio Moon energy — how to work with intensity?',
    body: 'Every time the moon moves through Scorpio I feel this deep, almost overwhelming intensity. Module 3 talks about using it for transformation, but I find it hard to channel productively. Anyone else experience this?',
    replies: 8,
    resonances: 15,
  },
  {
    id: 'p3',
    initial: 'A',
    avatarColor: '#7a4ea3',
    avatarBg: 'hsl(280 50% 50% / 0.15)',
    author: 'Amara T.',
    meta: 'Yesterday · Module 5',
    category: 'Frequency Work',
    title: 'My 256 Hz tuning fork practice — one month report',
    body: 'I have been using the 256 Hz fork every New Moon for the past four cycles. The grounding effect is real. I have noticed my meditation practice deepening and my sleep quality improving notably during dark moon phases...',
    replies: 19,
    resonances: 42,
  },
];
