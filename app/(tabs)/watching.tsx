import {useCallback,useState} from 'react';
import {SafeAreaView,ScrollView,Text,StyleSheet} from 'react-native';
import {useFocusEffect} from 'expo-router';
import {Brand,C,Card,Title} from '../../components/UI';
import {listSearches} from '../../lib/findrData';

export default function Watching(){
  const[items,setItems]=useState<any[]>([]);
  const[message,setMessage]=useState('Loading…');

  useFocusEffect(useCallback(()=>{let active=true;(async()=>{try{const rows=await listSearches(true);if(active){setItems(rows);setMessage(rows.length?'':'Nothing yet. Use “Keep looking for me” after a search.')}}catch(e:any){if(active)setMessage(e.message)}})();return()=>{active=false}},[]));

  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}><Brand/><Title>Watching</Title><Text style={s.sub}>Searches FINDR should keep checking.</Text>
    {items.length?items.map(x=><Card key={x.id}><Text style={s.item}>{x.query}</Text><Text style={s.live}>● ACTIVE</Text></Card>):<Card><Text style={s.item}>{message}</Text></Card>}
  </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:C.bg},page:{padding:22,gap:10},sub:{color:C.muted,fontSize:16,lineHeight:23},item:{color:'#fff',fontSize:18,fontWeight:'800'},live:{color:C.accent,fontSize:11,fontWeight:'900',marginTop:10}});
