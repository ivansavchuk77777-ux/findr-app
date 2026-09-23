export type SearchResult={id:string;title:string;subtitle?:string;price?:string;url?:string;provider:string;score:number};
export type SearchResponse={query:string;parsed:any;results:SearchResult[];demo?:boolean};
const API=process.env.EXPO_PUBLIC_FINDR_API_URL || 'http://localhost:8787';
export async function searchFindr(query:string):Promise<SearchResponse>{
  const r=await fetch(`${API}/v1/search`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query})});
  if(!r.ok) throw new Error(`Search failed (${r.status})`); return r.json();
}
export async function createWatch(query:string,parsed:any){
  const r=await fetch(`${API}/v1/watches`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query,parsed})});
  if(!r.ok) throw new Error('Could not save watch'); return r.json();
}
