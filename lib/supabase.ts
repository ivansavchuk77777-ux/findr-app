import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const isWeb = Platform.OS === 'web';
const isBrowser = isWeb && typeof window !== 'undefined';

const authOptions = isWeb
  ? {
      autoRefreshToken: isBrowser,
      persistSession: isBrowser,
      detectSessionInUrl: isBrowser,
    }
  : {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    };

export const supabase = url && key ? createClient(url, key, { auth: authOptions }) : null;

export const isSupabaseConfigured = Boolean(supabase);
export function getSupabase(){ if(!supabase) throw new Error('Supabase is not configured'); return supabase; }
