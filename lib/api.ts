export type SearchResult={id:string;title:string;subtitle?:string;price?:string;url?:string;provider:string;score:number};
export type SearchResponse={query:string;parsed:any;results:SearchResult[];demo?:boolean};

const SEARCH_URL='https://gdbsdmtipllzehbzweev.supabase.co/functions/v1/findr-search';

export async function searchFindr(query:string):Promise<SearchResponse>{
  const r=await fetch(SEARCH_URL,{
    method:'POST',
    headers:{'content-type':'application/json','x-findr-client':'findr-web-v1'},
    body:JSON.stringify({query})
  });
  if(!r.ok){
    let message=`Search failed (${r.status})`;
    try{const body=await r.json();if(body?.error)message=body.error}catch{}
    throw new Error(message);
  }
  return r.json();
}
