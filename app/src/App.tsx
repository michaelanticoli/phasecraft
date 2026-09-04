import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Landing } from './pages/Landing';
import { Checkout } from './pages/Checkout';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { Dashboard } from './pages/Dashboard';
import { Modules } from './pages/Modules';
import { Lesson } from './pages/Lesson';
import { Workbook } from './pages/Workbook';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { RequireAuth } from './components/auth/RequireAuth';
import { RequireEnrollment } from './components/auth/RequireEnrollment';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <RequireAuth>
              <CheckoutSuccess />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireEnrollment>
              <Dashboard />
            </RequireEnrollment>
          }
        />
        <Route
          path="/modules"
          element={
            <RequireEnrollment>
              <Modules />
            </RequireEnrollment>
          }
        />
        <Route
          path="/lesson"
          element={
            <RequireEnrollment>
              <Lesson />
            </RequireEnrollment>
          }
        />
        <Route
          path="/workbook"
          element={
            <RequireEnrollment>
              <Workbook />
            </RequireEnrollment>
          }
        />
        <Route
          path="/community"
          element={
            <RequireEnrollment>
              <Community />
            </RequireEnrollment>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireEnrollment>
              <Settings />
            </RequireEnrollment>
          }
        />
      </Routes>
    </>
  );
}

export default App;
