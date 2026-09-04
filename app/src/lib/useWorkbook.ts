import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';

/** Which workbook exercises (by exercise_key) the current user has marked complete. */
export function useWorkbookProgress() {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setCompleted(new Set());
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from('workbook_responses').select('exercise_key').eq('user_id', user.id).eq('completed', true);
    setCompleted(new Set((data ?? []).map((row) => row.exercise_key)));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isDone = (key: string) => completed.has(key);

  async function setDone(key: string, done: boolean) {
    if (!user) return;
    setCompleted((prev) => {
      const next = new Set(prev);
      if (done) next.add(key);
      else next.delete(key);
      return next;
    });
    await supabase.from('workbook_responses').upsert(
      { user_id: user.id, exercise_key: key, completed: done, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,exercise_key' }
    );
    refresh();
  }

  return { isDone, setDone, toggle: (key: string) => setDone(key, !completed.has(key)), loading, completedCount: completed.size };
}

/** Loads/saves the free-text responses for one exercise (the rich workbook form). */
export function useWorkbookResponses(exerciseKey: string) {
  const { user } = useAuth();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('workbook_responses')
      .select('responses, completed')
      .eq('user_id', user.id)
      .eq('exercise_key', exerciseKey)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setResponses(data.responses ?? {});
          setCompleted(data.completed);
        }
        setLoading(false);
      });
  }, [user, exerciseKey]);

  async function save(next: Record<string, string>, nextCompleted = completed) {
    if (!user) return;
    setSaving(true);
    await supabase.from('workbook_responses').upsert(
      {
        user_id: user.id,
        exercise_key: exerciseKey,
        responses: next,
        completed: nextCompleted,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,exercise_key' }
    );
    setCompleted(nextCompleted);
    setSaving(false);
    setSavedAt(new Date());
  }

  return { responses, setResponses, completed, save, loading, saving, savedAt };
}
