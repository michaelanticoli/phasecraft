import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';

export function useProfile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    supabase
      .from('profiles')
      .select('display_name, timezone')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        setDisplayName(data?.display_name ?? '');
        setTimezone(data?.timezone ?? '');
        setLoading(false);
      });
  }, [user]);

  async function save(fields: { display_name?: string; timezone?: string }) {
    if (!user) return;
    await supabase.from('profiles').update(fields).eq('id', user.id);
  }

  return { displayName, setDisplayName, timezone, setTimezone, save, loading };
}

export interface NotificationPreferences {
  daily_directive: boolean;
  phase_transition: boolean;
  voc_reminders: boolean;
  community_digest: boolean;
}

const DEFAULT_PREFS: NotificationPreferences = {
  daily_directive: true,
  phase_transition: true,
  voc_reminders: false,
  community_digest: true,
};

export function useNotificationPreferences() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    supabase
      .from('notification_preferences')
      .select('daily_directive, phase_transition, voc_reminders, community_digest')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setPrefs(data);
        setLoading(false);
      });
  }, [user]);

  async function toggle(key: keyof NotificationPreferences) {
    if (!user) return;
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    const patch: Partial<NotificationPreferences> = { [key]: next[key] };
    await supabase.from('notification_preferences').update(patch).eq('user_id', user.id);
  }

  return { prefs, toggle, loading };
}

export interface EnrollmentDetail {
  status: 'pending' | 'active' | 'canceled';
  plan: 'once' | 'installments' | null;
  enrolled_at: string | null;
}

export function useEnrollmentDetail() {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<EnrollmentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    supabase
      .from('enrollments')
      .select('status, plan, enrolled_at')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        setEnrollment(data);
        setLoading(false);
      });
  }, [user]);

  return { enrollment, loading };
}
