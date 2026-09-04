import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Landing } from './pages/Landing';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { Modules } from './pages/Modules';
import { Lesson } from './pages/Lesson';
import { Workbook } from './pages/Workbook';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';

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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/workbook" element={<Workbook />} />
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
