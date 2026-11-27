import { readFileSync,lstatSync,realpathSync,mkdirSync,mkdtempSync,writeFileSync,renameSync,rmSync,chmodSync } from 'node:fs';
import { resolve,relative,join,dirname,isAbsolute,sep } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const read=n=>JSON.parse(readFileSync(new URL('../references/'+n,import.meta.url),'utf8'));
export const lock=read('upstream-lock.json');
const catalog=new Map(read('catalog.json').tools.map(t=>[t.id,t]));
const capabilities=new Set(read('capabilities.json').capabilities.map(c=>c.id));
const hosts={cursor:'.cursor/skills',codex:'.agents/skills','claude-code':'.claude/skills'};
const primary=new Set(['taste','impeccable','uiux-pro-max','hallmark','anthropic-frontend']);
const web=s=>['react-web','other-web'].includes(s);
const extra={'emil-pick-ui':['react-web','other-web'],'emil-opportunities':['react-web','other-web'],'emil-improve':['react-web','other-web']};
const stat=p=>{try{return lstatSync(p)}catch(e){if(e.code==='ENOENT')return null;throw e;}};
const blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
const sha=b=>createHash('sha256').update(b).digest('hex');
function safeRel(p){
 if(typeof p!=='string'||!p||isAbsolute(p)||p.includes('\\')||/[\x00-\x1f:]/.test(p)||p.split('/').some(x=>!x||x==='.'||x==='..'||/[. ]$/.test(x)||/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i.test(x)))throw Error('Unsafe path '+p);
 return p;
}
function scoped(root,rel){let p=root;for(const part of safeRel(rel).split('/')){p=join(p,part);if(stat(p)?.isSymbolicLink())throw Error('Symlink forbidden: '+rel);}const r=relative(root,p);if(r==='..'||r.startsWith('..'+sep)||isAbsolute(r))throw Error('Path escaped root');return p;}
function variant(s,agent){return s.variants[agent]||s.variants.all;}
function manifest(s,v){
 if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(s.repo)||!/^[a-f0-9]{40}$/.test(s.revision)||!/^[a-z0-9-]+$/.test(s.name))throw Error('Invalid original identity');
 safeRel(v.directory);
 const entries=[...v.files.map(([p,h,n,m])=>({path:p,upstream:v.directory+'/'+p,hash:h,size:n,mode:m})),...s.licenses.map(([p,h,n,m])=>({path:'UPSTREAM-'+p,upstream:p,hash:h,size:n,mode:m}))];
 const keys=new Set();let bytes=0;
 for(const e of entries){safeRel(e.path);safeRel(e.upstream);if(!/^[a-f0-9]{40}$/.test(e.hash)||!Number.isSafeInteger(e.size)||e.size<0||e.size>25*1024*1024||!['100644','100755'].includes(e.mode)||keys.has(e.path.toLowerCase()))throw Error('Invalid locked entry '+e.path);keys.add(e.path.toLowerCase());bytes+=e.size;}
 if(!keys.has('skill.md')||entries.length>2500||bytes>100*1024*1024)throw Error('Invalid manifest bounds');
 return entries;
}
const official=read('native-actions.json');
export function select(q){
 if(!q||typeof q!=='object'||Array.isArray(q)||Object.keys(q).some(k=>!['agent','stack','goal','designMode','surfaceType','motion','capabilities','tools','primary','policy','browserAccess'].includes(k))||!Object.hasOwn(hosts,q.agent)||!['react-web','other-web','react-native','flutter'].includes(q.stack)||!['new-ui','redesign','ux-planning','motion','visual-qa'].includes(q.goal)||q.designMode!==undefined&&!['rebuild','refine','reference-match','new'].includes(q.designMode)||q.surfaceType!==undefined&&!['marketing','product','native','unknown'].includes(q.surfaceType)||q.motion!==undefined&&typeof q.motion!=='boolean'||q.capabilities!==undefined&&(!Array.isArray(q.capabilities)||q.capabilities.some(x=>!capabilities.has(x)))||q.tools!==undefined&&(!Array.isArray(q.tools)||q.tools.some(x=>!catalog.has(x)&&!Object.hasOwn(extra,x)))||q.primary!==undefined&&q.primary!=='none'&&!primary.has(q.primary)||q.policy!==undefined&&!['minimal','no-new-tools'].includes(q.policy)||q.browserAccess!==undefined&&!['present','absent','unknown'].includes(q.browserAccess))throw Error('Invalid connection task');
 const mode=q.designMode||(q.goal==='redesign'?'rebuild':q.goal==='new-ui'?'new':'refine');
 if(mode==='rebuild'&&q.goal!=='redesign')throw Error('Rebuild requires redesign goal');
 const c=q.capabilities||[];let ids=[...(q.tools||[])];const named=ids.filter(x=>primary.has(x));
 if(named.length>1||q.primary&&named.some(x=>x!==q.primary))throw Error('Select one primary provider');
 let owner=q.primary??named[0];
 if(!owner&&['new-ui','redesign','ux-planning','visual-qa'].includes(q.goal))owner=q.goal==='ux-planning'||!web(q.stack)?'uiux-pro-max':q.goal==='new-ui'&&q.surfaceType==='marketing'?'taste':'impeccable';
 if(owner&&owner!=='none')ids.unshift(owner);
 const motion=q.motion===true||q.goal==='motion'||c.some(x=>['micro-interactions','choreography','scroll-motion','layout-transitions','gesture'].includes(x));
 if(motion)ids.push(web(q.stack)?'emil-web':q.stack==='react-native'?'emil-native':'flutter-built-in');
 if(q.stack==='flutter'&&['new-ui','redesign'].includes(q.goal))ids.push('flutter-built-in');
 if(web(q.stack)&&c.includes('choreography'))ids.push('emil-choreograph');
 if(web(q.stack)&&c.includes('gesture'))ids.push('emil-gestures');
 if(web(q.stack)&&c.includes('motion-review')&&!ids.includes('emil-review'))ids.push('emil-improve');
 if(web(q.stack)&&c.includes('motion-performance'))ids.push('emil-performance');
 if(q.stack==='react-web'&&c.includes('product-illustration'))ids.push('stageshow');
 if(q.stack==='react-web'&&c.includes('section-blocks')&&!ids.some(x=>['shadcn','magic-ui'].includes(x)))ids.push('shadcn');
 if(q.stack==='react-web'&&c.includes('decorative-effect'))ids.push('magic-ui');
 if(q.stack==='react-web'&&c.includes('component-discovery'))ids.push('shadcn-mcp');
 if(web(q.stack)&&q.browserAccess==='absent'&&q.goal!=='ux-planning')ids.push('playwright-mcp');
 if(ids.some(x=>['emil-web','emil-gestures'].includes(x)))ids.push('emil-pick-ui');
 if(ids.includes('emil-review'))ids.push('emil-choreograph');
 const selections=[...new Set(ids)].map(id=>{
  const t=catalog.get(id),s=lock.skills[id],supported=t?.stacks||extra[id];
  if(!supported?.includes(q.stack)||t?.eligibleAgents&&!t.eligibleAgents.includes(q.agent))throw Error('Incompatible provider: '+id);
  if(s){const v=variant(s,q.agent),files=manifest(s,v);return {id,type:'native-skill',name:s.name,repo:s.repo,revision:s.revision,originalDirectory:v.directory,entry:hosts[q.agent]+'/'+s.name+'/SKILL.md',files:files.length,bytes:files.reduce((n,x)=>n+x.size,0),hooks:s.hooks,manual:s.manual,referenceOnly:s.manual&&!q.tools?.includes(id),invocation:s.manual?'Explicit user invocation required':(q.agent==='codex'?'$':'/')+s.name};}
  return {id,type:'official-tool',kind:t.kind,source:t.source,docs:t.docs,officialAction:official[id]||{execution:'Use the actual original official reference; do not report installed.',verify:'Inspect actual source.'},status:'native-action-required'};
 });
 return {status:'planned',agent:q.agent,stack:q.stack,goal:q.goal,designMode:mode,primary:owner||'none',policy:q.policy||'minimal',selections,notice:'Connection only. Original provider owns the design workflow.'};
}
function checked(e,b){if(b.length!==e.size||blob(b)!==e.hash)throw Error('Original blob mismatch: '+e.upstream);return b;}
function verify(dir,files){for(const e of files){const p=scoped(dir,e.path),s=stat(p);if(!s?.isFile()||s.size!==e.size)throw Error('Missing or changed original file: '+e.path);checked(e,readFileSync(p));}return files.length;}
function write(stage,e,b){const p=scoped(stage,e.path);mkdirSync(dirname(p),{recursive:true});writeFileSync(p,b,{flag:'wx'});if(process.platform!=='win32'&&e.mode==='100755')chmodSync(p,0o755);}
function git(cwd,args){
 const env={...process.env,GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:process.platform==='win32'?'NUL':'/dev/null',GIT_TERMINAL_PROMPT:'0',GIT_LFS_SKIP_SMUDGE:'1'};
 for(const k of Object.keys(env))if(/^GIT_(DIR|WORK_TREE|INDEX_FILE|CONFIG_COUNT|CONFIG_KEY_|CONFIG_VALUE_|OBJECT_DIRECTORY|ALTERNATE_OBJECT_DIRECTORIES)/.test(k))delete env[k];
 const r=spawnSync('git',['-c','core.autocrlf=false','-c','core.longpaths=true',...args],{cwd,env,encoding:'utf8',timeout:150000,maxBuffer:2*1024*1024});
 if(r.error||r.status!==0)throw Error('Git transport failed: '+(r.error?.message||String(r.stderr||r.stdout).slice(-600)));return r.stdout;
}
function fromGit(s,v,files,stage){
 const tmp=mkdtempSync(join(tmpdir(),'agentic-upstream-'));
 try{git(tmp,['init','-q','--template=']);git(tmp,['remote','add','origin','https://github.com/'+s.repo+'.git']);git(tmp,['fetch','--depth=1','--filter=blob:none','--no-tags','origin',s.revision]);if(git(tmp,['rev-parse','FETCH_HEAD']).trim()!==s.revision)throw Error('Wrong upstream commit');git(tmp,['sparse-checkout','init','--no-cone']);git(tmp,['sparse-checkout','set','--no-cone','/'+v.directory+'/',...s.licenses.map(x=>'/'+x[0])]);git(tmp,['checkout','--detach','--no-recurse-submodules',s.revision]);for(const e of files)write(stage,e,checked(e,readFileSync(scoped(tmp,e.upstream))));}
 finally{rmSync(tmp,{recursive:true,force:true});}
}
async function fromRaw(s,files,stage,fetcher){
 let idx=0;const work=Array.from({length:Math.min(8,files.length)},async()=>{while(idx<files.length){const e=files[idx++],url='https://raw.githubusercontent.com/'+s.repo+'/'+s.revision+'/'+e.upstream.split('/').map(encodeURIComponent).join('/');const r=await fetcher(url,{redirect:'error',signal:AbortSignal.timeout(30000)});if(!r.ok||!r.body)throw Error('HTTP '+r.status+' '+e.upstream);let total=0;const chunks=[];for await(const c of r.body){total+=c.byteLength;if(total>e.size)throw Error('Unexpected length '+e.upstream);chunks.push(Buffer.from(c));}write(stage,e,checked(e,Buffer.concat(chunks)));}});
 const r=await Promise.allSettled(work),bad=r.find(x=>x.status==='rejected');if(bad)throw bad.reason;
}
export async function connect(q,project,o={}){
 const plan=select(q),root=realpathSync(resolve(project));if(!stat(root)?.isDirectory())throw Error('Existing project directory required');if(!o.apply)return plan;
 const results=[];
 for(const a of plan.selections){
  if(a.type!=='native-skill'){results.push({...a,status:'native-action-required'});continue;}
  const s=lock.skills[a.id],v=variant(s,q.agent),files=manifest(s,v);let stage;
  try{
   if(s.hooks&&!o.allowHooks)throw Error('Original skill has executable hooks; separate explicit approval required (--allow-hooks).');
   const choices=[hosts[q.agent]+'/'+s.name];if(q.agent==='cursor')choices.push('.agents/skills/'+s.name);
   const found=choices.filter(p=>stat(scoped(root,p)));if(found.length>1)throw Error('Duplicate native skills; resolve before proceeding.');
   if(found.length){const rel=found[0],dir=scoped(root,rel),old=rel.startsWith('.agents/')?variant(s,'codex'):v;if(!stat(dir)?.isDirectory())throw Error('Existing skill path not directory');const count=verify(dir,manifest(s,old).filter(e=>!e.path.startsWith('UPSTREAM-')||stat(scoped(dir,e.path))));results.push({...a,status:'original-files-verified',method:'reuse',entry:join(dir,'SKILL.md'),verifiedFiles:count,entrySha256:sha(readFileSync(join(dir,'SKILL.md'))),hostActivation:'unverified'});continue;}
   if(plan.policy==='no-new-tools')throw Error('No-new-tools policy: original native skill not installed.');
   const dst=scoped(root,hosts[q.agent]+'/'+s.name),parent=dirname(dst);mkdirSync(parent,{recursive:true});stage=mkdtempSync(join(parent,'.agentic-stage-'));let method;
   if(o.localSource){const local=scoped(realpathSync(resolve(o.localSource)),s.repo);for(const e of files)write(stage,e,checked(e,readFileSync(scoped(local,e.upstream))));method='local-pinned-source';}
   else{try{if(o.rawOnly)throw Error('raw-only transport');fromGit(s,v,files,stage);method='pinned-git-checkout';}catch(e){rmSync(stage,{recursive:true,force:true});stage=mkdtempSync(join(parent,'.agentic-stage-'));if(files.length>250&&!o.rawOnly)throw Error(e.message+'; large distribution requires Git or verified local checkout.');await fromRaw(s,files,stage,o.fetcher||fetch);method='pinned-raw-files';}}
   const count=verify(stage,files),entry=join(stage,'SKILL.md'),front=readFileSync(entry,'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
   if(!front||front.match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1]!==s.name||(/^hooks\s*:/m.test(front))!==s.hooks||(/^disable-model-invocation:\s*true\s*$/m.test(front))!==s.manual)throw Error('Original name/hooks/manual metadata mismatch');
   if(stat(dst))throw Error('Destination appeared; refuse overwrite');renameSync(stage,dst);stage=null;
   results.push({...a,status:'original-files-verified',method,entry:join(dst,'SKILL.md'),verifiedFiles:count,entrySha256:sha(readFileSync(join(dst,'SKILL.md'))),hostActivation:'unverified'});
  }catch(e){results.push({...a,status:'blocked',error:e.message,hostActivation:'unverified'});}finally{if(stage)rmSync(stage,{recursive:true,force:true});}
 }
 return {...plan,status:results.some(x=>x.status==='blocked')?'blocked':results.some(x=>x.status==='native-action-required')?'native-actions-required':'original-files-verified',results,finish:'Invoke original native skill through host or reload if required. If only file-based use is available, read its full original entry and required files, use its own setup/workflow, and distinguish from native invocation. Execute required official tools and verify real output.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const [file,project,...args]=process.argv.slice(2);if(!file||!project)throw Error('Usage: connect.mjs <task.json> <project-directory> [--apply] [--allow-hooks] [--local-source <checkout-root>]');const o={};for(let i=0;i<args.length;i++){if(args[i]==='--apply')o.apply=true;else if(args[i]==='--allow-hooks')o.allowHooks=true;else if(args[i]==='--local-source'&&args[i+1])o.localSource=args[++i];else throw Error('Unknown option '+args[i]);}const out=await connect(JSON.parse(readFileSync(file,'utf8')),project,o);console.log(JSON.stringify(out,null,2));if(out.status==='blocked')process.exitCode=2;}catch(e){console.error('Connection blocked:',e.message);process.exitCode=2;}}
