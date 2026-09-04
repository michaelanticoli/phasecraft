import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';

export type EnrollmentStatus = 'pending' | 'active' | 'canceled';

/** Reads the current user's enrollment (payment) status. Re-checks on demand via `refresh`. */
export function useEnrollment() {
  const { user } = useAuth();
  const [status, setStatus] = useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!user) {
      setStatus(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from('enrollments').select('status').eq('user_id', user.id).single();
    setStatus(data?.status ?? 'pending');
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return { status, loading, isActive: status === 'active', refresh };
}
