import {useEffect,useState} from 'react';
import {SafeAreaView,ScrollView,Text,StyleSheet,TextInput,Alert} from 'react-native';
import {Brand,C,Card,Title,Button} from '../../components/UI';
import {getSupabase,isSupabaseConfigured} from '../../lib/supabase';

export default function Profile(){
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[userEmail,setUserEmail]=useState<string|null>(null);
  const[busy,setBusy]=useState(false);

  const refresh=async()=>{
    if(!isSupabaseConfigured) return;
    const {data}=await getSupabase().auth.getUser();
    setUserEmail(data.user?.email ?? null);
  };

  useEffect(()=>{
    refresh();
    if(!isSupabaseConfigured) return;
    const {data}=getSupabase().auth.onAuthStateChange(()=>refresh());
    return()=>data.subscription.unsubscribe();
  },[]);

  const login=async()=>{
    try{
      setBusy(true);
      const {error}=await getSupabase().auth.signInWithPassword({email:email.trim(),password});
      if(error) throw error;
      setPassword('');
      await refresh();
    }catch(e:any){Alert.alert('Sign in',e.message)}
    finally{setBusy(false)}
  };

  const signup=async()=>{
    try{
      setBusy(true);
      const {data,error}=await getSupabase().auth.signUp({email:email.trim(),password,options:{emailRedirectTo:'https://ivansavchuk77777-ux.github.io/findr-app/'}});
      if(error) throw error;
      setPassword('');
      if(data.session) await refresh();
      else Alert.alert('Check your email','Confirm your email, then return to FINDR and sign in.');
    }catch(e:any){Alert.alert('Create account',e.message)}
    finally{setBusy(false)}
  };

  const logout=async()=>{
    try{setBusy(true);await getSupabase().auth.signOut();setUserEmail(null)}
    catch(e:any){Alert.alert('Sign out',e.message)}
    finally{setBusy(false)}
  };

  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}>
    <Brand/><Title>Your FINDR</Title>
    <Text style={s.sub}>One place for your searches, alerts and preferences.</Text>
    {!isSupabaseConfigured?<Card><Text style={s.item}>Supabase not configured</Text><Text style={s.sub}>Add the public Supabase environment values before running FINDR.</Text></Card>:
    userEmail?<Card><Text style={s.item}>Signed in</Text><Text style={s.sub}>{userEmail}</Text><Button onPress={logout} disabled={busy}>Sign out</Button></Card>:
    <Card><Text style={s.item}>Sign in to FINDR</Text>
      <TextInput autoCapitalize="none" keyboardType="email-address" placeholder="Email" placeholderTextColor="#777" value={email} onChangeText={setEmail} style={s.input}/>
      <TextInput secureTextEntry placeholder="Password" placeholderTextColor="#777" value={password} onChangeText={setPassword} style={s.input}/>
      <Button onPress={login} disabled={busy}>Sign in</Button>
      <Button secondary onPress={signup} disabled={busy}>Create account</Button>
    </Card>}
    <Card><Text style={s.item}>Privacy first</Text><Text style={s.sub}>Your saved searches and results are tied to your signed-in account and protected by database row security.</Text></Card>
  </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:C.bg},page:{padding:22,gap:10},sub:{color:C.muted,fontSize:16,lineHeight:23},item:{color:'#fff',fontSize:18,fontWeight:'800',marginBottom:8},input:{backgroundColor:'#fff',color:'#111',borderRadius:12,padding:14,marginBottom:10}});
