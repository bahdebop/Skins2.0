import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvhyydvitbydxgkixggw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2aHl5ZHZpdGJ5ZHhna2l4Z2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3Mzg1NzYsImV4cCI6MjA1NTMxNDU3Nn0.dXHIqA_jVLw0AOFlnScunjPhLP2_onoc6gaFhye7OvQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
