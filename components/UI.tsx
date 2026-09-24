import { ReactNode } from 'react'; import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
export const C={bg:'#08090b',card:'#121419',line:'#252936',muted:'#959ba8',text:'#fff',accent:'#ff3b30'};
export function Brand(){return <Text style={s.brand}>FIND<Text style={{color:C.accent}}>R</Text></Text>}
export function Title({children}:{children:ReactNode}){return <Text style={s.title}>{children}</Text>}
export function Card({children}:{children:ReactNode}){return <View style={s.card}>{children}</View>}
export function Button({children,onPress,secondary=false,disabled=false}:{children:ReactNode,onPress?:()=>void,secondary?:boolean,disabled?:boolean}){return <TouchableOpacity disabled={disabled} onPress={onPress} style={[s.btn,secondary&&s.secondary,disabled&&{opacity:.5}]}><Text style={s.btnText}>{children}</Text></TouchableOpacity>}
const s=StyleSheet.create({brand:{fontSize:30,fontWeight:'900',letterSpacing:-1.5,color:C.text},title:{fontSize:36,fontWeight:'900',letterSpacing:-1.5,color:C.text,lineHeight:38},card:{backgroundColor:C.card,borderColor:C.line,borderWidth:1,borderRadius:20,padding:18,marginTop:12},btn:{backgroundColor:C.accent,padding:15,borderRadius:14,alignItems:'center',marginTop:12},secondary:{backgroundColor:'transparent',borderColor:C.line,borderWidth:1},btnText:{color:C.text,fontWeight:'800',fontSize:15}})
