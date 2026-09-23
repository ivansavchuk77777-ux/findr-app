import { getSupabase } from './supabase';

export async function getCurrentUser(){
  const { data, error } = await getSupabase().auth.getUser();
  if(error) throw error;
  return data.user;
}

export async function addSearch(query:string, keepLooking=false){
  const user=await getCurrentUser();
  if(!user) throw new Error('Please sign in first');
  const { data, error }=await getSupabase().from('searches').insert({user_id:user.id,query,keep_looking:keepLooking,active:true}).select().single();
  if(error) throw error;
  return data;
}

export async function listSearches(keepLooking?:boolean){
  const user=await getCurrentUser();
  if(!user) return [];
  let request=getSupabase().from('searches').select('*').eq('user_id',user.id).order('created_at',{ascending:false});
  if(typeof keepLooking==='boolean') request=request.eq('keep_looking',keepLooking);
  const { data, error }=await request;
  if(error) throw error;
  return data || [];
}

export async function addSavedResult(title:string, description?:string){
  const user=await getCurrentUser();
  if(!user) throw new Error('Please sign in first');
  const { data, error }=await getSupabase().from('saved_results').insert({user_id:user.id,title,description}).select().single();
  if(error) throw error;
  return data;
}

export async function listSavedResults(){
  const user=await getCurrentUser();
  if(!user) return [];
  const { data, error }=await getSupabase().from('saved_results').select('*').eq('user_id',user.id).order('created_at',{ascending:false});
  if(error) throw error;
  return data || [];
}
