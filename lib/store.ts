export type Find={id:string;query:string;createdAt:number};
let watching:Find[]=[]; let saved:Find[]=[];
export const Store={watching,saved,watch(q:string){if(!watching.some(x=>x.query===q)) watching.unshift({id:String(Date.now()),query:q,createdAt:Date.now()});},save(q:string){if(!saved.some(x=>x.query===q)) saved.unshift({id:String(Date.now()),query:q,createdAt:Date.now()});}};
