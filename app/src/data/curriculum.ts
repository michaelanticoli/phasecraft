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
  { ...modules[0], lessons: ['1.1 The Moontuner Philosophy', '1.2 Science of Resonance', '1.3 Preparing Your Space', '1.4 Daily Practice'] },
  { ...modules[1], lessons: ['2.1 New Moon', '2.2 Waxing Crescent', '2.3 First Quarter', '2.4 Waxing Gibbous', '2.5 Full Moon'] },
  { ...modules[2], lessons: ['3.1 Moon Signs Overview', '3.2 Fire Signs', '3.3 Earth Signs', '3.4 Air Signs', '3.5 Water Signs', '3.6 Void of Course', '3.7 Moon Sign Calendar'] },
  { ...modules[3], lessons: ['4.1 Full Moon', '4.2 Waning Gibbous', '4.3 Last Quarter', '4.4 Waning Crescent', '4.5 Transition Practice'] },
  { ...modules[4], lessons: ['5.1 Tuning Forks', '5.2 Singing Bowls', '5.3 Lunar Ceremonies', '5.4 Movement & Dance', '5.5 Frequency Map', '5.6 Teaching Others'] },
  { ...modules[5], lessons: ['6.1 Personal Frequency Map', '6.2 Your Unique Practice', '6.3 Teaching Practices', '6.4 Accountability', '6.5 Long-Term Planning', '6.6 Path to Mastery'] },
];

export const bonusModules = [
  { title: 'Lunar Business', desc: 'Product launches, meetings, strategy' },
  { title: 'Creativity & Art', desc: 'Creative blocks, scheduling, flow' },
  { title: 'Relationships', desc: 'Communication, timing, connection' },
];

/** "2.3 First Quarter" -> "2.3". This is the lesson_key stored in lesson_progress. */
export function lessonKey(lessonLabel: string): string {
  return lessonLabel.split(' ')[0];
}

/** Only Lesson 2.3 has a fully authored reading view today (see src/pages/Lesson.tsx). */
export const AUTHORED_LESSON_KEY = '2.3';

export const totalLessonCount = modulesDetailed.reduce((sum, m) => sum + m.lessons.length, 0);
