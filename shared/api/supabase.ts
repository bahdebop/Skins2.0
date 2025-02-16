import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Database helpers
export const createGroup = async (name: string, adminId: string) => {
  const { data, error } = await supabase
    .from('groups')
    .insert([{ name, admin_id: adminId }])
    .select();
  return { data, error };
};

export const getGroupMembers = async (groupId: string) => {
  const { data, error } = await supabase
    .from('group_members')
    .select('*, users!inner(*)')
    .eq('group_id', groupId);
  return { data, error };
};

export const getEvents = async (type: 'PGA' | 'NHL', status: string) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('type', type)
    .eq('status', status);
  return { data, error };
};

export const createWager = async (eventId: string, groupId: string, userId: string, amount: number) => {
  const { data, error } = await supabase
    .from('wagers')
    .insert([{ event_id: eventId, group_id: groupId, user_id: userId, amount }])
    .select();
  return { data, error };
};
