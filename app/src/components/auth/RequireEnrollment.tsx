import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useEnrollment } from '../../lib/useEnrollment';
import { FullScreenLoader } from './FullScreenLoader';
import { RequireAuth } from './RequireAuth';

function EnrollmentGate({ children }: { children: ReactNode }) {
  const { isActive, loading } = useEnrollment();

  if (loading) return <FullScreenLoader />;
  if (!isActive) return <Navigate to="/checkout" replace />;
  return <>{children}</>;
}

/** Requires both a logged-in user and an active (paid) enrollment. */
export function RequireEnrollment({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <EnrollmentGate>{children}</EnrollmentGate>
    </RequireAuth>
  );
}
