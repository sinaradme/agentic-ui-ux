import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { sources,rawUrl } from './source.mjs';
import { createRoute } from './route.mjs';
import { attachArtifactVerification } from './rebuild-artifacts.mjs';
const read=n=>JSON.parse(readFileSync(new URL('../references/'+n,import.meta.url),'utf8'));
const catalog=read('catalog.json'),knowledge=read('knowledge.json');
export const axes={
  "topology": [
    "linear-stack",
    "equal-grid",
    "asymmetric-grid",
    "editorial-split",
    "full-bleed",
    "layered-scene",
    "horizontal-rail",
    "vertical-rail",
    "master-detail",
    "comparison-table",
    "timeline",
    "sticky-stage",
    "tabbed-panels",
    "map-or-canvas",
    "single-focus",
    "form-sequence"
  ],
  "hierarchy": [
    "equal-items",
    "single-dominant",
    "text-first",
    "visual-first",
    "data-first",
    "task-first",
    "progressive-disclosure",
    "chronological",
    "comparison-first",
    "evidence-first",
    "guided-sequence"
  ],
  "interaction": [
    "static-reading",
    "link-list",
    "stepper",
    "slide-controls",
    "drag-swipe",
    "indexed-selection",
    "expand-collapse",
    "tab-switch",
    "filter-sort",
    "scroll-linked",
    "direct-manipulation",
    "comparison",
    "form-submit",
    "modal-detail",
    "persistent-detail"
  ],
  "motion": [
    "none",
    "feedback-only",
    "entry",
    "crossfade",
    "shared-layout",
    "scroll-progress",
    "gesture-linked",
    "coordinated-sequence",
    "sticky-transition"
  ]
};
const structural=['topology','hierarchy','interaction'];
const str=(v,max=2000)=>typeof v==='string'&&v.trim().length>0&&v.length<=max;
const only=(o,keys)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).every(k=>keys.includes(k));
const arr=(v,min=0,max=200)=>Array.isArray(v)&&v.length>=min&&v.length<=max;
const same=(a,b)=>Object.keys(axes).every(k=>a?.[k]===b?.[k]);
const distance=(a,b)=>structural.filter(k=>a?.[k]!==b?.[k]).length;
const validAxes=a=>only(a,Object.keys(axes))&&Object.entries(axes).every(([k,v])=>v.includes(a[k]));
const sameScope=(a,b)=>a.length===b.length&&new Set(a).size===a.length&&a.every(x=>b.includes(x));
const exactSource=(u,b,allow)=>{try{const x=new URL(u),y=new URL(b);return x.protocol==='https:'&&!x.username&&!x.password&&!x.search&&!x.hash&&!/%2e|%2f|%5c/i.test(x.pathname)&&(u===b||allow&&x.origin===y.origin&&x.pathname.startsWith(y.pathname.replace(/\/$/,'')+'/'));}catch{return false;}};
const sourceMap=new Map(sources.map(s=>[s.id,s])),toolMap=new Map(catalog.tools.map(t=>[t.id,t]));
export function checkRebuild(record,route,phase,surfaceIds){
 const errors=[],blockers=[],receipts=new Map(),seen=new Set();
 const result=()=>({status:errors.length?'invalid':blockers.length?'blocked':'pass',errors,blockers,structuralOnly:true,executionAuthorized:false,notice:'Checks supplied structure and evidence metadata, not visual novelty, source truth or actual agent compliance.'});
 if(route?.status!=='planned'||route.designMode!=='rebuild'||!['preflight','final'].includes(phase)||!arr(surfaceIds,1,100)||new Set(surfaceIds).size!==surfaceIds.length||!only(record,['scope','baseline','sources','sections'])||!only(record.scope,['surfaceIds','authorization','constraints'])||!arr(record.scope.surfaceIds,1,100)||!sameScope(record.scope.surfaceIds,surfaceIds)||!str(record.scope.authorization)||!arr(record.scope.constraints,1,100)||!record.scope.constraints.every(x=>str(x))||!str(record.baseline,1000)||!arr(record.sources,0,100)||!arr(record.sections,1,100)){errors.push('Invalid rebuild scope/record. Explicit scope, preserved constraints, baseline and all sections required.');return result();}
 for(const s of record.sources){
   if(!only(s,['id','sourceId','toolId','location','revision','method','locator','observed','gitBlob','sha256','status'])||!str(s.id,100)||receipts.has(s.id)||!str(s.sourceId,150)||!str(s.toolId,100)||!str(s.location,1000)||!str(s.revision,200)||!str(s.locator,500)||!str(s.observed)||!['source-cli','github','browser','local'].includes(s.method)||!['read','blocked'].includes(s.status)){errors.push('Invalid source receipt');continue;}
   const t=toolMap.get(s.toolId),p=sourceMap.get(s.sourceId),doc=knowledge.tools[s.toolId]?.sources.find(x=>x.id===s.sourceId&&x.kind==='official-docs');
   if(!t||!t.stacks.includes(route.stack)||!['preferred','specialized'].includes(t.selectionTier)){errors.push('Source tool not eligible for this stack: '+s.toolId);continue;}
   if(p){const github='https://github.com/'+p.repo+'/blob/'+p.revision+'/'+p.path;
     if(p.tool!==s.toolId||p.revision!==s.revision||![github,rawUrl(p)].includes(s.location)||s.status==='read'&&p.blob&&s.gitBlob!==p.blob){errors.push('Pinned source/receipt mismatch: '+s.sourceId);continue;}
     if(s.method==='source-cli'&&s.status==='read'&&(!/^[a-f0-9]{64}$/.test(s.sha256||'')||!/^[a-f0-9]{40}$/.test(s.gitBlob||''))){errors.push('CLI receipt requires actual hash metadata');continue;}
   }else if(!doc||s.method==='source-cli'||!exactSource(s.location,doc.url,doc.allowDescendants)){errors.push('Unregistered source or out-of-scope official docs: '+s.sourceId);continue;}
   if(s.status==='blocked'){blockers.push('Source blocked: '+s.sourceId);continue;}
   // A generic repository README or docs root alone is not a concrete pattern reference.
   const generic=p&&/README\.md$/i.test(p.path)||doc&&s.location===doc.url&&(/\/docs\/?$/.test(new URL(doc.url).pathname)||/\/components\/?$/.test(new URL(doc.url).pathname));
   if(generic){errors.push('Retrieve a concrete pattern/API/skill section, not a generic overview: '+s.sourceId);continue;}
   const family=p?(p.id.startsWith('embla-')?'embla-carousel':p.repo+'/'+p.path):s.location;
   receipts.set(s.id,{...s,family});
 }
 for(const s of record.sections){
   if(!only(s,['id','baseline','concepts','selected','selectionReason','exception','actual'])||!str(s.id,100)||!surfaceIds.includes(s.id)||seen.has(s.id)||!only(s.baseline,['axes','evidence','observation'])||!validAxes(s.baseline.axes)||!str(s.baseline.evidence,1000)||!str(s.baseline.observation)){errors.push('Invalid/duplicate section baseline');continue;}seen.add(s.id);
   if(s.exception!==undefined){
     if(!only(s.exception,['approvedByUser','approvalEvidence','reason'])||s.exception.approvedByUser!==true||!str(s.exception.approvalEvidence)||!str(s.exception.reason)){errors.push('Preservation exception requires explicit user approval: '+s.id);continue;}
     if(phase==='final'&&(!only(s.actual,['axes','screenshot','interaction','comparison','reviewStatus'])||!validAxes(s.actual.axes)||!str(s.actual.screenshot)||!str(s.actual.comparison)||s.actual.reviewStatus!=='pass'))blockers.push('Verify preserved section in final output: '+s.id);
     continue;
   }
   if(!arr(s.concepts,3,3)||!str(s.selected,100)||!str(s.selectionReason)){errors.push('Exactly three concepts and a reasoned selection required: '+s.id);continue;}
   const ids=new Set(),families=new Set();let changed=0,selected;
   for(const c of s.concepts){
     if(!only(c,['id','axes','sources','sketch','rationale','tradeoff'])||!str(c.id,100)||ids.has(c.id)||!validAxes(c.axes)||!arr(c.sources,1,8)||new Set(c.sources).size!==c.sources.length||c.sources.some(id=>!receipts.has(id))||!str(c.sketch,1000)||!str(c.rationale)||!str(c.tradeoff)){errors.push('Invalid concept or missing inspected source: '+s.id);continue;}
     ids.add(c.id);c.sources.forEach(id=>families.add(receipts.get(id).family));if(distance(c.axes,s.baseline.axes)>=2)changed++;if(c.id===s.selected)selected=c;
   }
   if(ids.size!==3)continue;
   if(new Set(s.concepts.map(c=>c.sketch)).size!==3)errors.push('Three distinct reviewable sketches required: '+s.id);
   for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)if(distance(s.concepts[i].axes,s.concepts[j].axes)===0)errors.push('Concepts are cosmetic variants, not different structures: '+s.id);
   if(families.size<2)errors.push('Inspect at least two distinct external pattern families: '+s.id);
   if(changed<2||!selected||distance(selected.axes,s.baseline.axes)<2)blockers.push('Selected concept and at least two alternatives must change two structural axes: '+s.id);
   if(phase==='final'){
     const a=s.actual;
     if(!only(a,['axes','screenshot','interaction','comparison','reviewStatus'])||!validAxes(a.axes)||!str(a.screenshot,1000)||!str(a.comparison)||!['pass','fail','blocked'].includes(a.reviewStatus)){errors.push('Final rendered section evidence missing: '+s.id);continue;}
     if(a.screenshot===s.baseline.evidence||a.screenshot===selected?.sketch)errors.push('Final screenshot must be a different rendered artifact: '+s.id);
     if(!selected||!same(a.axes,selected.axes)||distance(a.axes,s.baseline.axes)<2||a.reviewStatus!=='pass')blockers.push('Rendered result regressed to baseline or differs from selected direction: '+s.id);
     if((a.axes.interaction!=='static-reading'&&a.axes.interaction!=='link-list'||a.axes.motion!=='none'&&a.axes.motion!=='feedback-only')&&!str(a.interaction,1000))errors.push('Dynamic interaction/motion evidence required: '+s.id);
   }
 }
 for(const id of surfaceIds)if(!seen.has(id))errors.push('Missing scoped section: '+id);
 return result();
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const r=JSON.parse(readFileSync(process.argv[2]||0,'utf8'));const route=createRoute(r.request);const args=process.argv.slice(3);if(args.length&&!(args.length===2&&args[0]==="--evidence-root"))throw Error("Use --evidence-root <directory>");const out=attachArtifactVerification(checkRebuild(r.rebuild,route,r.phase,r.surfaces?.map(s=>s.id)),r,args[1]);console.log(JSON.stringify(out,null,2));if(out.status!=='pass')process.exitCode=2;}catch(e){console.error('Rebuild gate failed:',e.message);process.exitCode=2;}}
