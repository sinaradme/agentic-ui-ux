import { lstatSync, realpathSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
export function classify(observation) {
 const pkg=observation.packageJson&&typeof observation.packageJson==="object"?observation.packageJson:{};
 const deps={...(pkg.dependencies||{}),...(pkg.devDependencies||{})};
 const paths=new Set(observation.paths||[]);
 const has=(p)=>paths.has(p);
 const dep=(n)=>Object.hasOwn(deps,n);
 const flutter=observation.flutterSdk===true;
 const rn=dep("react-native")||dep("expo");
 const reactWeb=dep("next")||dep("react-dom")||dep("react")||dep("@vitejs/plugin-react");
 const otherWeb=["vue","nuxt","svelte","@sveltejs/kit","astro","@angular/core","solid-js"].some(dep);
 const multi=Boolean(pkg.workspaces)||has("pnpm-workspace.yaml")||has("lerna.json");
 let stack="unknown";
 const notes=[];
 if(multi){notes.push("Workspace/monorepo detected: choose the actual app directory; do not plan for the root.");}
 else if(flutter&&(rn||reactWeb||otherWeb)){notes.push("Mixed Flutter and JavaScript framework signals: identify the target manually.");}
 else if(flutter)stack="flutter";
 else if(rn)stack="react-native";
 else if(reactWeb&&otherWeb){notes.push("Multiple web framework signals; identify the target manually.");}
 else if(reactWeb)stack="react-web";
 else if(otherWeb||has("index.html"))stack="other-web";
 else notes.push("No conclusive framework signal; inspect source and ask if needed.");
 const installedSignals=[];
 if(has("components.json"))installedSignals.push("shadcn");
 if(dep("react-native-paper"))installedSignals.push("rn-paper");
 if(dep("react-native-reanimated"))installedSignals.push("reanimated");
 if(dep("motion")||dep("framer-motion"))installedSignals.push("motion-web");
 const skillMap={"design-taste-frontend":"taste","impeccable":"impeccable","ui-ux-pro-max":"uiux-pro-max","hallmark":"hallmark","frontend-design":"anthropic-frontend","animate":"emil-web","animate-expo":"emil-native","stageshow":"stageshow","choreograph":"emil-choreograph","gestures":"emil-gestures","animation-performance":"emil-performance","review-animations":"emil-review"};
 for(const name of observation.projectSkillNames||[])if(Object.hasOwn(skillMap,name))installedSignals.push(skillMap[name]);
 const runtimeSignals=["motion","framer-motion","gsap","animejs","@react-spring/web","@react-spring/native","react-native-reanimated","motion-v","@vueuse/motion"].filter(dep);
 const componentSignals=["@mui/material","antd","@chakra-ui/react","react-native-paper","tamagui","@mantine/core","@heroui/react","@nextui-org/react","native-base","vuetify","@headlessui/react","@radix-ui/react-dialog"].filter(dep);
 if(has("components.json"))componentSignals.push("components.json");
 for(const p of ["components/ui","src/components/ui","src/theme","lib/theme"])if(has(p))componentSignals.push(p);
 const managerSignals=[["pnpm-lock.yaml","pnpm"],["yarn.lock","yarn"],["package-lock.json","npm"],["bun.lock","bun"],["bun.lockb","bun"]].filter(([p])=>has(p)).map(([,m])=>m);
 const managers=[...new Set(managerSignals)];
 const declaredManager=typeof pkg.packageManager==="string"&&/^(npm|pnpm|yarn|bun)@/.test(pkg.packageManager)?pkg.packageManager.split("@")[0]:null;
 const manager=managers.length>1||(managers.length===1&&declaredManager&&managers[0]!==declaredManager)?"unknown":managers[0]||declaredManager||"unknown";
 if(manager==="unknown")notes.push("Package manager unknown or conflicting; verify before installation.");
 if(stack==="react-native")notes.push("React Native/Expo signals take priority over React DOM; verify the target platform.");
 if(observation.errors?.length)notes.push("Some project signals could not be read; inventory remains incomplete.");
 return {stack,packageManager:manager,frameworkSignals:{flutter,reactNative:rn,reactWeb,otherWeb,workspace:multi,expo:dep("expo")},componentSignals,runtimeSignals,toolSignals:[...new Set(installedSignals)].sort(),projectSkillNames:observation.projectSkillNames||[],notes,contextDraft:{stack,goal:"unknown",agent:"unknown",inventoryComplete:false,primarySkill:"unknown",installedTools:[],componentSystem:"unknown",browserAccess:"unknown",deviceAccess:"unknown",node:"present",python:"unknown",needs:[]},next:"Confirm these signals and inspect actual installed skills, agent tools, project rules, package versions and current UI. Fill context only from verified evidence. No commands were executed."};
}

// Read a small allowlist only. Do not follow symlinked descendants or read env/config secrets.
export function inspectProject(target) {
 const root=realpathSync(resolve(target));
 if(!lstatSync(root).isDirectory())throw Error('Target must be a directory');
 const errors=[];
 const safe=(p)=>{let current=root;for(const part of p.split('/')){if(!part||part==='.'||part==='..')return null;current=resolve(current,part);try{const st=lstatSync(current);if(st.isSymbolicLink())return null;}catch(e){if(e.code!=='ENOENT'&&e.code!=='ENOTDIR')errors.push(p+': inaccessible');return null;}}const rel=relative(root,current);if(rel==='..'||rel.startsWith('..'+sep)||isAbsolute(rel))return null;return current;};
 const read=(p)=>{const f=safe(p);if(!f)return null;try{const st=lstatSync(f);if(!st.isFile()||st.size>524288){errors.push(p+': not a small regular file');return null;}return readFileSync(f,'utf8');}catch{errors.push(p+': unreadable');return null;}};
 const allow=['package.json','pubspec.yaml','index.html','components.json','pnpm-workspace.yaml','lerna.json','pnpm-lock.yaml','yarn.lock','package-lock.json','bun.lock','bun.lockb','components/ui','src/components/ui','src/theme','lib/theme'];
 const paths=allow.filter(p=>safe(p));
 let packageJson={};const raw=read('package.json');if(raw){try{const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw Error();packageJson=parsed;}catch{errors.push('package.json: invalid JSON');}}
 const pubspec=read('pubspec.yaml')||'';
 const flutterSdk=/^\s*sdk:\s*flutter\s*(?:#.*)?$/m.test(pubspec);
 const projectSkillNames=new Set();for(const d of ['.agents/skills','.cursor/skills','.claude/skills']){const dir=safe(d);if(!dir)continue;try{for(const entry of readdirSync(dir,{withFileTypes:true})){if((entry.isDirectory()||entry.isSymbolicLink())&&/^[a-zA-Z0-9._-]{1,128}$/.test(entry.name))projectSkillNames.add(entry.name);}}catch{errors.push(d+': inaccessible');}}
 const out=classify({packageJson,paths,flutterSdk,projectSkillNames:[...projectSkillNames].sort(),errors});return {...out,observedPaths:paths,errors};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{if(!process.argv[2])throw Error('Usage: node inspect.mjs /path/to/target-project');console.log(JSON.stringify(inspectProject(process.argv[2]),null,2));}catch(e){console.error('Inspection failed:',e.message);process.exitCode=2;}}
