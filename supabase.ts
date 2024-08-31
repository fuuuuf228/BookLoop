import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afqwgphwdfkrjohuxngq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcXdncGh3ZGZrcmpvaHV4bmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMTM4MzYsImV4cCI6MjA0MDY4OTgzNn0.pAeNMvpheuZtiUV5QOuHdl7gmhtVr3ASizPo-QPjnVM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
