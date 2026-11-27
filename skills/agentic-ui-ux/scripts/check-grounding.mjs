import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createRoute } from './route.mjs';
import { checkRebuild } from './check-rebuild.mjs';
const read=name=>JSON.parse(readFileSync(new URL('../references/'+name,import.meta.url),'utf8'));
const registry=read('capabilities.json'),catalog=read('catalog.json'),knowledge=read('knowledge.json');
function check(record,route,registry,catalog,knowledge){
 const errors=[],blockers=[],surfaceIds=new Set(),covered=new Set(),groundedSurfaces=new Set(),verifiedSurfaces=new Set();
 const str=(v,max=2000)=>typeof v==="string"&&v.trim().length>0&&v.length<=max;
 const obj=v=>v&&typeof v==="object"&&!Array.isArray(v);
 const only=(o,keys)=>obj(o)&&Object.keys(o).every(k=>keys.includes(k));
 const arr=(x,min=0,max=100)=>Array.isArray(x)&&x.length>=min&&x.length<=max;
 const result=()=>({status:errors.length?"invalid":blockers.length?"blocked":"pass",phase:record?.phase||null,errors,blockers,structuralOnly:true,executionAuthorized:false,notice:"Record structure only; not proof of source inspection, permission, actual execution or visual quality."});
 if(!only(record,["phase","request","surfaces","decisions","acceptance","toolVerification","rebuild"])||!["preflight","final"].includes(record.phase)||!arr(record.surfaces,1,100)||!arr(record.decisions,1,100)){errors.push("Invalid record shape.");return result();}
 if(!route||route.status!=="planned"){errors.push("A valid planned route request is required.");return result();}
 const isPlanning=route.goal==="ux-planning", capMap=new Map(registry.capabilities.map(c=>[c.id,c])), routes=new Map(route.routes.map(r=>[r.id,r])), toolMap=new Map(catalog.tools.map(t=>[t.id,t]));
 const relPath=v=>str(v,500)&&!v.startsWith("/")&&!/^[a-zA-Z]:|\\|[\r\n]/.test(v)&&v.split("/").every(x=>x&&x!==".."&&x!==".");
 const https=v=>{try{const u=new URL(v);return u.protocol==="https:"&&!u.username&&!u.password;}catch{return false;}};
 const sourceMatch=(location,registered)=>{if(location===registered.url)return true;if(!registered.allowDescendants||!https(location))return false;try{const u=new URL(location),b=new URL(registered.url);const prefix=b.pathname.replace(/\/$/,"");return u.origin===b.origin&&!u.search&&!u.hash&&!/%2e|%2f|%5c/i.test(u.pathname)&&(u.pathname.startsWith(prefix+"/"));}catch{return false;}};
 for(const s of record.surfaces){
   if(!only(s,["id","description"])||!str(s.id,100)||!str(s.description)||surfaceIds.has(s.id)){errors.push("Invalid/duplicate surface.");continue;}surfaceIds.add(s.id);
 }
 for(const d of record.decisions){
   if(!only(d,["capability","surfaces","status","sources","adaptation","verificationPlan","verification","reason"])||!routes.has(d.capability)||!["grounded","blocked","not-applicable"].includes(d.status)||!arr(d.surfaces,1,100)||new Set(d.surfaces).size!==d.surfaces.length||d.surfaces.some(s=>!surfaceIds.has(s))){errors.push("Invalid decision or unknown capability/surface.");continue;}
   const r=routes.get(d.capability),cap=capMap.get(d.capability);
   const pairs=d.surfaces.map(s=>d.capability+"\0"+s);
   if(pairs.some(k=>covered.has(k))){errors.push("Duplicate capability/surface decision: "+d.capability);continue;}pairs.forEach(k=>covered.add(k));
   if(d.status==="not-applicable"){if(r.status!=="not-applicable"||!str(d.reason))errors.push("Not-applicable must match router and include reason: "+d.capability);continue;}
   if(d.status==="blocked"){if(!str(d.reason))errors.push("Blocked decision needs a reason: "+d.capability);else blockers.push(d.capability+": "+d.reason);continue;}
   if(["blocked","not-applicable","needs-verification"].includes(r.status)){errors.push("Cannot ground an unresolved route: "+d.capability);continue;}
   if(!arr(d.sources,1,8)||!str(d.adaptation)||!str(d.verificationPlan)){errors.push("Grounded decision needs sources, adaptation and verification plan: "+d.capability);continue;}
   let valid=true;
   for(const s of d.sources){
     if(!only(s,["kind","location","locator","observed","revision","toolId","sourceId","approved"])||!["project","user","upstream"].includes(s.kind)||!str(s.location,1000)||!str(s.locator,500)||!str(s.observed)){errors.push("Invalid inspected source: "+d.capability);valid=false;continue;}
     if(s.kind==="project"&&!relPath(s.location)){errors.push("Project source must be a scoped relative path: "+d.capability);valid=false;}
     if(s.kind==="user"&&s.approved!==true){errors.push("User reference requires explicit recorded approval: "+d.capability);valid=false;}
     if(s.kind==="upstream"){
       const t=toolMap.get(s.toolId),k=knowledge.tools[s.toolId],registered=k?.sources.find(x=>x.id===s.sourceId);
       const mapped=cap.providers.some(p=>p.tool===s.toolId&&p.stacks.includes(route.stack));
       const tierOK=t&&["preferred","specialized"].includes(t.selectionTier);
       const selected=r.provider===s.toolId||r.referenceTool===s.toolId;
       if(!t||!k||!registered||!mapped||(!selected&&(!tierOK||r.provider))||!https(s.location)||!sourceMatch(s.location,registered)||!str(s.revision,200)||(registered.revision&&s.revision!==registered.revision)){errors.push("Unmapped, unreviewed, mismatched or unpinned upstream source: "+d.capability);valid=false;}
     }
   }
   if(!valid)continue;
   // QA/tooling sources are not by themselves a visual pattern for a modified surface.
   if(isPlanning||route.goal==="visual-qa"||!["review","tooling"].includes(cap.kind))d.surfaces.forEach(s=>groundedSurfaces.add(s));
   if(record.phase==="final"){
     if(r.coverage==="unknown")blockers.push("Resolve unknown coverage before final acceptance: "+d.capability);
     if(!arr(d.verification,1,12)||d.verification.some(v=>!only(v,["kind","location","result","status"])||!["screenshot","recording","interaction","test","trace","document-review"].includes(v.kind)||!str(v.location,1000)||!str(v.result)||!["pass","fail","blocked"].includes(v.status))){errors.push("Final decision needs actual evidence records: "+d.capability);continue;}
     const kinds=new Set(d.verification.map(v=>v.kind));
     for(const v of d.verification)if(v.status!=="pass")blockers.push(d.capability+": "+v.kind+" verification "+v.status+" — "+v.result);
     if(!isPlanning&&route.goal!=="visual-qa"&&["primary","implementation","guidance"].includes(cap.kind)&&!["motion","interactions"].includes(cap.group)&&!kinds.has("screenshot"))errors.push("Visual implementation requires rendered screenshot evidence: "+d.capability);
     if(!isPlanning&&["motion","interactions"].includes(cap.group)&&!["recording","interaction","trace"].some(k=>kinds.has(k)))errors.push("Motion/interaction requires dynamic evidence: "+d.capability);
     if(d.capability==="functional-regression"&&!["test","interaction"].some(k=>kinds.has(k)))errors.push("Functional regression requires executed test/interaction evidence.");
     if(kinds.has("screenshot"))d.surfaces.forEach(s=>verifiedSurfaces.add(s));
   }
 }
 if(route.designMode==="rebuild"){const audit=checkRebuild(record.rebuild,route,record.phase,[...surfaceIds]);errors.push(...audit.errors.map(e=>"Rebuild: "+e));blockers.push(...audit.blockers.map(e=>"Rebuild: "+e));}
 for(const r of route.routes)if(![...covered].some(k=>k.startsWith(r.id+"\0")))errors.push("Missing decision for routed capability: "+r.id);
 if(record.phase==="final"){
   const required=isPlanning?["brief","design-system"]:["rendered-ui","functional","accessibility","responsive-or-native","build-or-validation"];
   if(route.routes.some(r=>["motion","interactions"].includes(r.group)&&r.status!=="not-applicable"))required.push("dynamic-interaction");
   if(route.routes.some(r=>["motion-performance","page-performance","browser-diagnostics"].includes(r.id)&&r.status!=="not-applicable"))required.push("performance");
   const checks=record.acceptance;
   if(!arr(checks,1,100))errors.push("Final acceptance checklist is mandatory.");
   else {
     const keys=new Set();
     for(const a of checks){
       if(!only(a,["id","status","location","result"])||!required.includes(a.id)||keys.has(a.id)||!["pass","fail","blocked"].includes(a.status)||!str(a.location,1000)||!str(a.result)){errors.push("Invalid/duplicate acceptance check.");continue;}
       keys.add(a.id);if(a.status!=="pass")blockers.push("Acceptance "+a.id+": "+a.status+" — "+a.result);
     }
     for(const id of required)if(!keys.has(id))errors.push("Missing mandatory acceptance check: "+id);
   }
   const access=record.request.context;
   if(!isPlanning&&((route.stack==="react-web"||route.stack==="other-web")?access.browserAccess!=="present":access.deviceAccess!=="present"))blockers.push("Confirm actual browser/native device access in the final request; rendered QA cannot pass without it.");
   const expected=new Map(route.actions.map(a=>[a.id,a]));
   const tv=record.toolVerification;
   if(!Array.isArray(tv))errors.push("Final tool verification list is required (empty when no tools selected).");
   else {const seenTools=new Set();for(const t of tv){if(!only(t,["id","status","revision","location","result"])||!expected.has(t.id)||seenTools.has(t.id)||!["pass","fail","blocked"].includes(t.status)||!str(t.revision,200)||!str(t.location,1000)||!str(t.result)){errors.push("Invalid/duplicate tool verification.");continue;}seenTools.add(t.id);if(t.status!=="pass")blockers.push("Tool "+t.id+" verification "+t.status);if(expected.get(t.id).status!=="reuse")blockers.push("Re-inspect and reroute after approved installation/configuration: "+t.id);}
     for(const id of expected.keys())if(!seenTools.has(id))errors.push("Missing tool verification: "+id);}
 }
 for(const id of surfaceIds){if(!groundedSurfaces.has(id))blockers.push("No grounded design decision for surface "+id);if(record.phase==="final"&&!isPlanning&&!verifiedSurfaces.has(id))blockers.push("No rendered screenshot evidence for surface "+id);}
 return result();
}
export function checkGrounding(record){let route;try{route=createRoute(record?.request);}catch{}return check(record,route,registry,catalog,knowledge);}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const record=JSON.parse(readFileSync(process.argv[2]||0,'utf8'));const out=checkGrounding(record);console.log(JSON.stringify(out,null,2));if(out.status!=='pass')process.exitCode=2;}catch(e){console.error('Grounding check failed:',e.message);process.exitCode=2;}}
