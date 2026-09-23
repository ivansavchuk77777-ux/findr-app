import {useCallback,useState} from 'react';
import {SafeAreaView,ScrollView,Text,StyleSheet} from 'react-native';
import {useFocusEffect} from 'expo-router';
import {Brand,C,Card,Title} from '../../components/UI';
import {listSavedResults} from '../../lib/findrData';

export default function Saved(){
  const[items,setItems]=useState<any[]>([]);
  const[message,setMessage]=useState('Loading…');

  useFocusEffect(useCallback(()=>{let active=true;(async()=>{try{const rows=await listSavedResults();if(active){setItems(rows);setMessage(rows.length?'':'No saved finds yet.')}}catch(e:any){if(active)setMessage(e.message)}})();return()=>{active=false}},[]));

  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}><Brand/><Title>Saved Finds</Title><Text style={s.sub}>Things you want to come back to.</Text>
    {items.length?items.map(x=><Card key={x.id}><Text style={s.item}>♡ {x.title}</Text>{x.description?<Text style={s.sub}>{x.description}</Text>:null}</Card>):<Card><Text style={s.item}>{message}</Text></Card>}
  </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:C.bg},page:{padding:22,gap:10},sub:{color:C.muted,fontSize:16},item:{color:'#fff',fontSize:18,fontWeight:'800'}});
