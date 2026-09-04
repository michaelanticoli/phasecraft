import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App.tsx';
import { AuthProvider } from './lib/AuthProvider';
import { isSupabaseConfigured } from './lib/supabase';
import { ConfigNeeded } from './components/auth/ConfigNeeded';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isSupabaseConfigured ? (
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    ) : (
      <ConfigNeeded />
    )}
  </StrictMode>,
);
