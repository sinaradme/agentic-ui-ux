import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const catalog = JSON.parse(readFileSync(new URL('../references/catalog.json', import.meta.url), 'utf8'));
const schema = JSON.parse(readFileSync(new URL('../references/context.schema.json', import.meta.url), 'utf8'));
function plan(context,catalog,schema){
 const fail=(reason)=>({schemaVersion:1,mode:"plan-only",status:"blocked",reason,actions:[],executionAuthorized:false});
 if(!context||typeof context!=="object"||Array.isArray(context))return fail("Supply a project context object.");
 for(const key of schema.required){if(!(key in context))return fail("Missing field: "+key);}
 for(const key of Object.keys(context)){if(!(key in schema.properties))return fail("Unknown field: "+key);}
 for(const [key,def] of Object.entries(schema.properties)){
   const v=context[key];
   if(def.enum&&!def.enum.includes(v))return fail("Invalid field: "+key);
   if(def.type==="boolean"&&typeof v!=="boolean")return fail("Invalid field: "+key);
   if(def.type==="string"&&typeof v!=="string")return fail("Invalid field: "+key);
   if(def.type==="array"&&(!Array.isArray(v)||v.some(x=>typeof x!=="string"||(def.items.enum&&!def.items.enum.includes(x)))||new Set(v).size!==v.length))return fail("Invalid field: "+key);
 }
 const byId=Object.assign(Object.create(null),Object.fromEntries(catalog.tools.map(t=>[t.id,t])));
 if(context.installedTools.some(x=>!byId[x]))return fail("installedTools must use known catalog IDs. Record other existing tools in your project notes.");
 const primary=context.primarySkill;
 const primaryKnown=byId[primary]&&["primary","alternative-primary"].includes(byId[primary].role);
 if(!["none","unknown","custom-compatible","custom-unknown"].includes(primary)&&!primaryKnown)return fail("primarySkill must identify an existing primary design skill or a supported sentinel.");
 const primaryInventory=context.installedTools.filter(x=>["primary","alternative-primary"].includes(byId[x].role));
 if(primary==="none"&&primaryInventory.length)return fail("Inventory lists a primary skill but primarySkill says none.");
 if(primaryKnown&&!context.installedTools.includes(primary))return fail("The selected existing primary skill must appear in installedTools.");
 if(context.stack==="unknown"||context.goal==="unknown")return fail("Identify the target stack and goal from project evidence before selecting tools.");
 if(context.inventoryComplete!==true||primary==="unknown")return fail("Inspect the existing skill/dependency inventory. Unknown is not absence.");
 const actions=[],notes=[];
 const add=(id,reason)=>{
   const t=byId[id];if(!t||!t.stacks.includes(context.stack)||actions.some(a=>a.id===id))return;
   const isInstalled=context.installedTools.includes(id);
   const required=t.install.requires||[];
   const agentRestricted=t.kind==="skill"?t.eligibleAgents:t.install.eligibleAgents;
   const gaps=required.filter(k=>context[k]!=="present").map(k=>k+" is "+context[k]);
   if(agentRestricted&&!agentRestricted.includes(context.agent))gaps.push("Verify agent support and installation method");
   let status=isInstalled?"reuse":t.install.mode==="none"?"built-in":gaps.length?"needs-verification":"candidate";
   if(isInstalled&&gaps.length)status="needs-verification";
   if(t.kind==="mcp"&&isInstalled&&gaps.length===0&&context.browserAccess==="absent"&&id==="playwright-mcp")status="configure-existing";
   const entry={id,name:t.name,kind:t.kind,status,reason,source:t.source,docs:t.docs,evidence:t.evidence};
   if(gaps.length)entry.blockers=gaps;
   if(status==="candidate"||status==="configure-existing"){
     entry.installMode=t.install.mode;
     if(t.install.command)entry.commandExample=t.install.command;
     if(t.install.config)entry.configExample=t.install.config;
     if(t.install.examples)entry.commandExamples=t.install.examples;
     if(t.install.agentExamples?.[context.agent])entry.commandExamples=t.install.agentExamples[context.agent];
     if(t.install.review)entry.reviewBeforeApproval=t.install.review;
   }
   if(t.install.activation?.[context.agent])entry.activationExample=t.install.activation[context.agent];
   actions.push(entry);
 };
 const isWeb=["react-web","other-web"].includes(context.stack);
 const isReactWeb=context.stack==="react-web";
 const isNative=context.stack==="react-native"||context.stack==="flutter";
 const need=(x)=>context.needs.includes(x);
 if(primaryInventory.length>1)notes.push("Multiple primary skills already exist; do not combine or install another. Select one compatible skill for this task.");
 if(primary==="custom-compatible"){notes.push("Reuse the existing compatible primary design skill; no new primary skill.");}
 else if(primary==="custom-unknown"){notes.push("Verify existing custom skill compatibility before using or replacing it; do not add another primary.");}
 else if(primaryKnown){
   if(byId[primary].stacks.includes(context.stack))add(primary,"An existing compatible primary design skill takes priority.");
   else notes.push("Existing primary skill is not cataloged for this stack. Review compatibility; do not replace automatically.");
 }else if(isWeb&&catalog.primaryByGoal[context.goal]){
   add(catalog.primaryByGoal[context.goal],"One primary candidate for the stated goal.");
 }else if(isNative&&context.goal==="ux-planning"){
   add("uiux-pro-max","Optional planning guidance only; verify native coverage.");
 }else notes.push("No new primary skill is necessary for this goal. Use the existing project guidance and the orchestration skill.");
 if(context.stack==="flutter")add("flutter-built-in","Start with SDK widgets, animations and tests.");
 if(need("components")||need("native-material-components")){
   if(context.componentSystem==="present")notes.push("Reuse the existing component system; do not add or reinitialize a competing system.");
   else if(context.componentSystem==="unknown")notes.push("Inspect the existing UI component system before recommending a new one.");
   else if(isReactWeb&&need("components"))add("shadcn","A compatible React web project has a confirmed component gap.");
   else if(context.stack==="react-native"&&need("native-material-components"))add("rn-paper","A native component gap exists and Material Design is explicitly suitable.");
   else if(context.stack!=="flutter")notes.push("Choose framework-compatible primitives from official documentation; no generic component library is selected.");
 }
 if(need("motion")||context.goal==="motion"){
   if(isWeb)add("emil-web","A web motion task or identified motion gap.");
   else if(context.stack==="react-native")add("emil-native","Native motion guidance for React Native/Expo.");
   else notes.push("Use Flutter's built-in animation APIs before considering packages.");
 }
 if(isReactWeb&&need("creative-effects"))add("magic-ui","Explicitly requested individual React web visual effects.");
 if(isReactWeb&&need("product-illustration"))add("stageshow","Explicitly requested React product illustration/motion.");
 if(isReactWeb&&need("registry-discovery")){
   if(context.installedTools.includes("shadcn"))add("shadcn-mcp","An existing shadcn system has a registry-discovery gap.");
   else notes.push("Use an existing registry or establish shadcn compatibility first; do not add a registry MCP alone.");
 }
 if(isWeb){
   if(context.browserAccess==="absent")add("playwright-mcp","No existing browser inspection capability was found.");
   else if(context.browserAccess==="unknown"||context.browserAccess==="not-applicable")notes.push("Confirm browser access before adding an MCP server.");
   else notes.push("Reuse existing browser access; no duplicate browser MCP.");
   if(need("browser-diagnostics"))add("chrome-devtools-mcp","Explicit diagnostics gap, not routine screenshots.");
 }
 if(isNative){
   if(context.deviceAccess!=="present")notes.push("Native visual QA requires a target device or emulator. Browser-only screenshots cannot satisfy native QA.");
   if(context.stack==="react-native"&&need("native-motion-runtime"))add("reanimated","Complex native animation runtime is explicitly needed and existing runtime is insufficient.");
   if(need("native-e2e"))add("maestro","An explicit native E2E gap exists; first confirm no adequate native E2E tool is already available.");
 }
 if(!actions.some(a=>["candidate","configure-existing"].includes(a.status)))notes.push("No new installation/configuration candidate is currently actionable.");
 return {schemaVersion:1,catalogEdition:catalog.edition,mode:"plan-only",status:"planned",stack:context.stack,goal:context.goal,agent:context.agent,actions,notes,executionAuthorized:false,requiredNextStep:"Present the plan, inspect compatibility/license/source and pin versions. Ask for explicit approval of exact commands, config and any global changes or hooks before execution. Verify installation and actual rendered UI afterwards."};
}
export function createPlan(context) { return plan(context, catalog, schema); }
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const input = JSON.parse(readFileSync(process.argv[2] || 0, 'utf8'));
    const result = createPlan(input);
    console.log(JSON.stringify(result, null, 2));
    if (result.status === 'blocked') process.exitCode = 2;
  } catch (error) { console.error('Cannot read context:', error.message); process.exitCode = 2; }
}
