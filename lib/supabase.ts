import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// AsyncStorage depends on window on web. During Expo static rendering there is no
// browser window, so only attach persistent storage in a real client runtime.
const isBrowser = Platform.OS === 'web' && typeof window !== 'undefined';
const storage = Platform.OS === 'web' ? (isBrowser ? window.localStorage : undefined) : AsyncStorage;

export const supabase = url && key ? createClient(url, key, {
  auth: {
    ...(storage ? { storage } : {}),
    autoRefreshToken: isBrowser || Platform.OS !== 'web',
    persistSession: Boolean(storage),
    detectSessionInUrl: isBrowser,
  }
}) : null;

export const isSupabaseConfigured = Boolean(supabase);
export function getSupabase(){ if(!supabase) throw new Error('Supabase is not configured'); return supabase; }
