import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createPlan } from './plan.mjs';
const read = name => JSON.parse(readFileSync(new URL('../references/'+name, import.meta.url), 'utf8'));
const catalog=read('catalog.json'), registry=read('capabilities.json'), policy=read('priority-policy.json');
function route(input,catalog,registry,policy,validateContext){
 const blocked=(reason)=>({schemaVersion:1,mode:"plan-only",status:"blocked",reason,routes:[],actions:[],playbooks:[],executionAuthorized:false});
 if(!input||typeof input!=="object"||Array.isArray(input)||Object.keys(input).some(k=>!["context","tasks","policy","asOf","surfaceType"].includes(k)))return blocked("Invalid route request.");
 const ctx=input.context; const checked=validateContext(ctx);if(checked.status==="blocked")return blocked(checked.reason);
 if(input.policy!==undefined&&!["minimal","no-new-tools"].includes(input.policy))return blocked("Invalid policy.");
 if(input.surfaceType!==undefined&&!["marketing","product","native","unknown"].includes(input.surfaceType))return blocked("Invalid surfaceType.");
 const date=input.asOf||catalog.reviewedAt;const dateMs=Date.parse(date);if(typeof date!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(dateMs)||new Date(dateMs).toISOString().slice(0,10)!==date||dateMs<Date.parse(catalog.reviewedAt))return blocked("Invalid asOf date; use current date or the catalog snapshot date.");
 const tasks=input.tasks;if(!Array.isArray(tasks)||tasks.length<1||tasks.length>policy.limits.maxTaskCapabilities)return blocked("Choose 1–"+policy.limits.maxTaskCapabilities+" relevant capability IDs.");
 const caps=new Map(registry.capabilities.map(c=>[c.id,c]));const tools=new Map(catalog.tools.map(t=>[t.id,t]));const seen=new Set();
 for(const task of tasks){
   if(!task||typeof task!=="object"||Array.isArray(task)||Object.keys(task).some(k=>!["id","coverage","evidence","provider","advanced","materialFit","priority","runtimeInventory"].includes(k))||!caps.has(task.id)||seen.has(task.id)||!["adequate","gap","unknown"].includes(task.coverage))return blocked("Invalid or duplicate capability.");
   if(task.evidence!==undefined&&(typeof task.evidence!=="string"||task.evidence.length>1000))return blocked("Invalid evidence for "+task.id);
   if(task.coverage!=="unknown"&&!task.evidence?.trim())return blocked("Evidence required for "+task.id+"; use unknown if not checked.");
   if(task.provider!==undefined&&(task.coverage!=="adequate"||typeof task.provider!=="string"||(task.provider!=="project"&&(!tools.has(task.provider)||!ctx.installedTools.includes(task.provider)))))return blocked("Provider must be a confirmed existing tool for adequate coverage.");
   if(["advanced","materialFit"].some(k=>task[k]!==undefined&&typeof task[k]!=="boolean"))return blocked("Invalid capability flags.");
   if(task.priority!==undefined&&!["core","supporting"].includes(task.priority))return blocked("Invalid capability priority.");
   if(task.runtimeInventory!==undefined&&!["none","present","unknown"].includes(task.runtimeInventory))return blocked("Invalid runtime inventory.");
   seen.add(task.id);
 }
 const requested=new Map(tasks.map(t=>[t.id,t]));
 const surfaceType=input.surfaceType|| (requested.has("dashboard-layout")&&requested.get("dashboard-layout").priority!=="supporting"?"product":(["react-native","flutter"].includes(ctx.stack)?"native":"unknown"));
 if(surfaceType==="native"&&!["react-native","flutter"].includes(ctx.stack)||["marketing","product"].includes(surfaceType)&&["react-native","flutter"].includes(ctx.stack))return blocked("Surface type conflicts with target platform.");const ordered=registry.capabilities.filter(c=>requested.has(c.id)).sort((a,b)=>Number(requested.get(a.id).priority==="supporting")-Number(requested.get(b.id).priority==="supporting"));
 const routes=[],actions=new Map(),notes=[],playbooks=new Set();let newSpecialists=0;const runtimeFamilies=new Set();
 const noNew=input.policy==="no-new-tools";
 let owner=ctx.primarySkill==="none"?null:ctx.primarySkill;
 const primaryRole=t=>["primary","alternative-primary"].includes(t.role);
 const applicable=(c,p)=>p.stacks.includes(ctx.stack)&&tools.get(p.tool)?.stacks.includes(ctx.stack);
 const tierAllowed=t=>["preferred","specialized"].includes(t.selectionTier);
 const prereqs=t=>{const gaps=(t.install.requires||[]).filter(k=>ctx[k]!=="present").map(k=>k+" is "+ctx[k]);const agents=t.kind==="skill"?t.eligibleAgents:t.install.eligibleAgents;if(agents&&!agents.includes(ctx.agent))gaps.push("Verify agent support");return gaps;};
 const pickAction=(t,reason,invoke,existing=false,configure=false)=>{
   const gaps=prereqs(t);if(!existing&&(t.credibility?.archived!==false||!t.credibility?.checkedAt||dateMs-Date.parse(t.credibility.checkedAt)>60*86400000))gaps.push("Source metadata is archived, missing or older than 60 days; re-review upstream before selection.");if(gaps.length)return {blocked:gaps};
   const prev=actions.get(t.id);
   if(prev){if(invoke&&!t.knowledge?.manualInvocation&&!prev.invocations.includes(invoke))prev.invocations.push(invoke);return {status:prev.status};}
   const status=configure?"configure-existing":existing?"reuse":"candidate";
   const a={id:t.id,name:t.name,kind:t.kind,status,reason,source:t.source,docs:t.docs,license:t.license,tier:t.selectionTier,evidenceLevel:t.evidenceLevel,qualityBenchmark:t.qualityBenchmark,credibility:t.credibility,lastRepositoryPush:t.lastRepositoryPush,verification:t.verify,invocations:invoke&&!t.knowledge?.manualInvocation?[invoke]:[],documentation:t.knowledge,invocationPolicy:t.knowledge?.manualInvocation?"reference-only-unless-explicit-user-invocation":"reviewed-focused-invocation"};
   if(!existing||configure){a.installMode=t.install.mode;a.reviewBeforeApproval=t.install.review||[];if(t.install.command)a.commandExample=t.install.command;if(t.install.examples)a.commandExamples=t.install.examples;if(t.install.agentExamples?.[ctx.agent])a.commandExamples=t.install.agentExamples[ctx.agent];if(t.install.config)a.configExample=t.install.config;}
   actions.set(t.id,a);return {status};
 };
 const choosePrimary=()=>{
   if(owner||noNew||["motion","visual-qa"].includes(ctx.goal))return;
   const pending=ordered.filter(c=>c.kind==="primary"&&c.stacks.includes(ctx.stack)&&c.goals?.includes(ctx.goal)&&requested.get(c.id).coverage==="gap");
   if(!pending.length)return;
   const preferred=ctx.goal==="new-ui"&&surfaceType==="product"?"impeccable":catalog.primaryByGoal[ctx.goal];const preferredTool=tools.get(preferred);
   // Native defaults only for planning; never use a web-only owner on native.
   if(preferredTool&&preferredTool.stacks.includes(ctx.stack)&&(ctx.stack==="react-web"||ctx.stack==="other-web"||ctx.goal==="ux-planning")&&pending.some(c=>c.providers.some(p=>p.tool===preferred&&applicable(c,p)))){owner=preferred;return;}
   // Narrow capability-specific owner only if the task goal does not have a supported default.
   const fallback=pending.flatMap(c=>c.providers).find(p=>applicable(pending.find(c=>c.providers.includes(p)),p)&&tools.get(p.tool).selectionTier==="preferred");
   if(fallback&&ctx.goal==="ux-planning")owner=fallback.tool;
 };
 choosePrimary();
 for(const c of ordered){
   const task=requested.get(c.id);
   if(!c.stacks.includes(ctx.stack)){routes.push({id:c.id,group:c.group,status:"not-applicable",reason:"Capability is not defined for "+ctx.stack});continue;}
   const playbook=registry.groups[c.group].path;playbooks.add(playbook);
   const r={id:c.id,group:c.group,kind:c.kind,playbook,coverage:task.coverage,priority:task.priority||"core",status:"playbook",reason:"Use bundled guidance and project primitives first."};
   const providers=c.providers.filter(p=>applicable(c,p));
   const finish=(status,reason,extra={})=>{Object.assign(r,{status,reason},extra);routes.push(r);};
   if(task.coverage==="adequate"){
     if(c.browserGate&&ctx.browserAccess!=="present"){finish("needs-verification","Adequate browser coverage conflicts with unconfirmed browser access.");continue;}
     if(c.deviceGate&&ctx.deviceAccess!=="present"){finish("blocked","Adequate native coverage conflicts with unconfirmed device access.");continue;}
     if(c.componentGate&&ctx.componentSystem!=="present"){finish("needs-verification","Adequate component coverage conflicts with the component inventory.");continue;}
     if(task.provider&&task.provider!=="project"){
       const match=providers.find(p=>p.tool===task.provider);
       if(!match){finish("needs-verification","Existing provider is not mapped to this capability; verify fit manually.");continue;}
       const t=tools.get(match.tool);
       if(primaryRole(t)&&owner!==t.id){finish("reuse-project","Existing capability is adequate; avoid loading another primary owner.");continue;}
       if(!tierAllowed(t)&&!primaryRole(t)){finish("reuse-project","Existing capability is adequate; no automatic invocation of a manual or exploratory reference.");continue;}
       const res=pickAction(t,"Confirmed adequate existing provider",match.invoke,true);
       if(res.blocked){finish("needs-verification","Existing provider prerequisites are unverified.",{blockers:res.blocked});continue;}
       finish("reuse","Confirmed existing provider.",{provider:t.id,invoke:t.knowledge?.manualInvocation?undefined:match.invoke||undefined});continue;
     }
     finish("reuse-project","Confirmed project capability already covers this need.");continue;
   }
   if(c.componentGate&&ctx.componentSystem!=="absent"){finish(ctx.componentSystem==="present"?"reuse-project":"needs-verification",ctx.componentSystem==="present"?"Extend the existing component system; do not install a competing system.":"Confirm component inventory first.");continue;}
   if(c.requiresInstalled&&!ctx.installedTools.includes(c.requiresInstalled)){finish("needs-verification","Requires an existing compatible "+c.requiresInstalled+" system.");continue;}
   if(c.browserGate&&ctx.browserAccess==="present"){finish("reuse-project","Reuse working browser access.");continue;}
   if(c.browserGate&&ctx.browserAccess!=="absent"){finish("needs-verification","Confirm browser access before adding an MCP server.");continue;}
   if(c.deviceGate&&ctx.deviceAccess!=="present"){finish("blocked","Native device/emulator access is not confirmed; do not substitute a web screenshot.");continue;}
   if(c.id==="device-inspection"){finish("reuse-project","Use the confirmed native device or emulator.");continue;}
   if(c.explicitMaterial&&task.materialFit!==true){finish("needs-verification","Confirm Material Design fits the native product.");continue;}
   if(c.requiresAdvanced&&task.advanced!==true){finish("playbook","Use built-in or existing runtime first; advanced gap not confirmed.",{builtin:c.builtin});continue;}
   if(c.exclusive&&(task.runtimeInventory==="present"||ctx.installedTools.some(id=>tools.get(id)?.role==="motion-runtime"))){finish("needs-verification","An animation runtime is already present; review or extend it instead of installing another.");continue;}
   if(c.exclusive&&task.runtimeInventory!=="none"){finish("needs-verification","Confirm that no suitable animation runtime is installed, including uncataloged runtimes.");continue;}
   if(task.coverage==="unknown"){
     finish(["tooling","implementation"].includes(c.kind)?"needs-verification":"playbook","Unknown coverage is not a confirmed gap. Use the playbook and inspect the project.");continue;
   }
   if(c.kind==="primary"||c.existingPrimaryOnly){
     const match=providers.find(p=>p.tool===owner);
     if(!match){finish("playbook",owner?"Preserve the current primary owner; use bundled guidance for this uncovered capability.":"Use bundled guidance; do not install a general design skill for a narrow task.");continue;}
     if(c.existingPrimaryOnly&&!ctx.installedTools.includes(owner)&&!ordered.some(k=>k.kind==="primary"&&k.goals?.includes(ctx.goal)&&k.stacks.includes(ctx.stack)&&requested.get(k.id).coverage==="gap"&&k.providers.some(p=>p.tool===owner&&applicable(k,p)))){
       finish("playbook","Narrow task does not justify a separate primary skill.");continue;
     }
     const t=tools.get(owner);const existing=ctx.installedTools.includes(owner);
     if(existing){finish("needs-verification","The existing primary was reported insufficient for this capability; review its focused command before adding another.");continue;}
     if(!existing&&(noNew||!tierAllowed(t))){finish("playbook","No new primary installation under this policy.");continue;}
     const res=pickAction(t,"Single design owner for this task",match.invoke,existing);
     if(res.blocked){finish("needs-verification","Preferred primary prerequisites missing; no automatic alternative.",{blockers:res.blocked});continue;}
     finish(res.status,"One primary owner; reuse the same skill across capabilities.",{provider:t.id,invoke:match.invoke||undefined});continue;
   }
   if(noNew){finish(["tooling","implementation"].includes(c.kind)?"blocked":"playbook","No-new-tools policy; use existing/project guidance or report an unresolved gap.");continue;}
   if(c.browserGate&&ctx.installedTools.includes("playwright-mcp")){const t=tools.get("playwright-mcp");const res=pickAction(t,"Existing browser server is not working; review configuration rather than reinstall.",null,true,true);if(res.blocked){finish("needs-verification","Existing browser server prerequisites missing.",{blockers:res.blocked});continue;}finish(res.status,"Review and repair the existing browser server configuration.",{provider:t.id});continue;}
   if(providers.some(p=>ctx.installedTools.includes(p.tool))){finish("needs-verification","A mapped provider is already installed but reported insufficient; diagnose it instead of silently installing another.");continue;}
   const match=[...providers].sort((a,b)=>Number(tools.get(a.tool).selectionTier!=="preferred")-Number(tools.get(b.tool).selectionTier!=="preferred")).find(p=>tierAllowed(tools.get(p.tool))&&(tools.get(p.tool).selectionTier!=="specialized"||c.explicitSpecialized===true));
   if(!match){finish(["tooling","implementation"].includes(c.kind)?"blocked":"playbook","No eligible external default for this capability; use bundled guidance and report unmet requirements.");continue;}
   const t=tools.get(match.tool);
   if(t.knowledge?.manualInvocation){finish("playbook","Upstream disables automatic model invocation. Read the reviewed source as reference; explicit user invocation is needed for activation.",{referenceTool:t.id});continue;}
   if(t.kind==="skill"&&!actions.has(t.id)&&newSpecialists>=policy.limits.newSpecialistSkills){finish("playbook","Specialist skill budget reached; use bundled guidance or request a justified follow-up.");continue;}
   if(c.exclusive&&runtimeFamilies.has(c.exclusive)){finish("needs-verification","Runtime family already selected; do not add another.");continue;}
   const fresh=!actions.has(t.id);const res=pickAction(t,"Confirmed gap: "+c.label,match.invoke);
   if(res.blocked){finish("needs-verification","Preferred provider prerequisites missing; no automatic lower-tier fallback.",{blockers:res.blocked});continue;}
   if(fresh&&t.kind==="skill")newSpecialists++;
   if(c.exclusive)runtimeFamilies.add(c.exclusive);
   finish(res.status,"Best eligible default for this confirmed capability gap.",{provider:t.id,invoke:match.invoke||undefined});
 }
 // QA remains explicit even when the user asks only for styling.
 if(["new-ui","redesign","motion"].includes(ctx.goal)){
   playbooks.add(registry.groups["visual-qa"].path);
   if(["react-web","other-web"].includes(ctx.stack)&&ctx.browserAccess!=="present"&&!seen.has("browser-inspection"))notes.push("Rendered QA not verified: inspect browser access; add browser-inspection only if its gap is confirmed.");
   if(["react-native","flutter"].includes(ctx.stack)&&ctx.deviceAccess!=="present")notes.push("Rendered native QA blocked until a device/emulator is available.");
 }
 if(ctx.stack==="flutter")notes.push("Flutter SDK widgets, animations and tests are the default; no web-only runtime.");
 if(!input.asOf)notes.push("Using the catalog snapshot date for deterministic routing; verify current upstream metadata before approval.");
 if(!actions.size)notes.push("No external installation/invocation is currently selected; bundled guidance remains available.");
 return {schemaVersion:1,edition:catalog.edition,asOf:date,mode:"plan-only",status:"planned",stack:ctx.stack,goal:ctx.goal,surfaceType,primaryOwner:owner,primaryOwnerStatus:owner?(actions.has(owner)?"selected":ctx.primarySkill===owner?"existing-not-invoked":"unresolved"):"none",playbooks:[...playbooks],routes,actions:[...actions.values()],notes,executionAuthorized:false,next:"Review relevant playbooks only. Resolve verification gaps; check pinned upstream versions, license, source, exact changes and approval before any install or activation. Capture real rendered evidence and report blocked checks."};
}
export function createRoute(input){return route(input,catalog,registry,policy,createPlan);}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const input=JSON.parse(readFileSync(process.argv[2]||0,'utf8'));const out=createRoute(input);console.log(JSON.stringify(out,null,2));if(out.status==='blocked')process.exitCode=2;}catch(e){console.error('Route failed:',e.message);process.exitCode=2;}}
