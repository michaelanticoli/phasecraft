export interface WorkbookExercise {
  key: string; // "2.5" — matches workbook_responses.exercise_key
  label: string; // "Ex 2.5: Research Project"
  part: string; // "Part C: Waxing Crescent"
}

/**
 * Only Module 2's workbook is modeled today — it's the one the design fully
 * fleshed out (Part A-D). Exercise 2.5 has a full multi-prompt form (see
 * Workbook.tsx); the rest are simple mark-as-done items, same pattern as
 * the lesson chips on the Modules page.
 */
export const module2Workbook: WorkbookExercise[] = [
  { key: '2.1', label: 'Ex 2.1: Moon Phase Tracking', part: 'Part A: Phase Recognition' },
  { key: '2.2', label: 'Ex 2.2: Phase Identification', part: 'Part A: Phase Recognition' },
  { key: '2.3', label: 'Ex 2.3: Intention Ceremony', part: 'Part B: New Moon' },
  { key: '2.4', label: 'Ex 2.4: Shadow Exploration', part: 'Part B: New Moon' },
  { key: '2.5', label: 'Ex 2.5: Research Project', part: 'Part C: Waxing Crescent' },
  { key: '2.6', label: 'Ex 2.6: Momentum Assessment', part: 'Part C: Waxing Crescent' },
  { key: '2.7', label: 'Ex 2.7: Action Taking', part: 'Part D: First Quarter' },
  { key: '2.8', label: 'Ex 2.8: Obstacle Analysis', part: 'Part D: First Quarter' },
];

export const AUTHORED_EXERCISE_KEY = '2.5';
