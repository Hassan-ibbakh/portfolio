// src/lib/supabase.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Do not throw at import time: a missing env var would blank the whole site.
// The contact form checks for null and falls back to email instead.
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase) {
  console.warn("Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Contact form will fall back to email.");
}
