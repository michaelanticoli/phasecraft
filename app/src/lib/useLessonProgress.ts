import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';

/** Tracks which lesson_key values the current user has completed, backed by lesson_progress. */
export function useLessonProgress() {
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
    const { data } = await supabase.from('lesson_progress').select('lesson_key').eq('user_id', user.id);
    setCompleted(new Set((data ?? []).map((row) => row.lesson_key)));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isDone = (key: string) => completed.has(key);

  async function toggle(key: string) {
    if (!user) return;
    const wasDone = completed.has(key);
    // Optimistic update so the UI feels immediate; refresh() below reconciles with the server.
    setCompleted((prev) => {
      const next = new Set(prev);
      if (wasDone) next.delete(key);
      else next.add(key);
      return next;
    });
    if (wasDone) {
      await supabase.from('lesson_progress').delete().eq('user_id', user.id).eq('lesson_key', key);
    } else {
      await supabase.from('lesson_progress').insert({ user_id: user.id, lesson_key: key });
    }
    refresh();
  }

  return { completed, isDone, toggle, refresh, loading, completedCount: completed.size };
}
