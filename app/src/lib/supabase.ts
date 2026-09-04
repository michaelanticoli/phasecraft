import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Falls back to a placeholder URL when unconfigured so this module can still be imported
// without throwing — main.tsx checks isSupabaseConfigured and renders a setup screen
// instead of the app in that case, rather than crashing to a blank page.
export const supabase = createClient<Database>(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-anon-key');
