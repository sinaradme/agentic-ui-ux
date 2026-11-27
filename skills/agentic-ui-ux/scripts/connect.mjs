import { readFileSync,lstatSync,realpathSync,mkdirSync,mkdtempSync,writeFileSync,renameSync,rmSync,chmodSync } from 'node:fs';
import { resolve,relative,join,dirname,isAbsolute,sep } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const read=n=>JSON.parse(readFileSync(new URL('../references/'+n,import.meta.url),'utf8'));
export const lock=read('upstream-lock.json');
const catalog=new Map(read('catalog.json').tools.map(t=>[t.id,t]));
const hosts={cursor:'.cursor/skills',codex:'.agents/skills','claude-code':'.claude/skills'};
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
const providerIds = [...new Set([...catalog.keys(), ...Object.keys(lock.skills)])];

function sourceDetails(id) {
 const entry = catalog.get(id);
 const skill = lock.skills[id];
 const source = skill ? `https://github.com/${skill.repo}` : entry.source;
 return {
  id,
  name: skill?.name ?? entry.name ?? id,
  kind: skill ? 'native-skill' : entry.kind,
  source,
  docs: entry?.docs ?? source,
  ...(entry?.stacks ? { stacks: entry.stacks } : {}),
  ...(skill ? { manual: skill.manual, userInvocable: skill.userInvocable !== false } : {}),
 };
}

export function listProviders() {
 return providerIds.map(sourceDetails);
}

export function select(request) {
 const keys = ['agent', 'tools', 'policy'];
 if (!request || typeof request !== 'object' || Array.isArray(request)
  || Object.keys(request).some(key => !keys.includes(key))
  || !Object.hasOwn(hosts, request.agent)
  || !Array.isArray(request.tools) || request.tools.some(id => typeof id !== 'string')
  || (request.policy !== undefined && !['minimal', 'no-new-tools'].includes(request.policy))) {
  throw Error('Use { "agent": "codex|cursor|claude-code", "tools": ["provider-id"] } (optional: policy). Choose provider IDs with --list.');
 }

 const { agent, tools, policy = 'minimal' } = request;
 const selections = [...new Set(tools)].map(id => {
  if (!providerIds.includes(id)) throw Error('Unknown provider: ' + id + '. Use --list.');
  const details = sourceDetails(id);
  const skill = lock.skills[id];
  const nativeAction = official[id] ?? null;
  if (!skill) {
   return {
    ...details,
    type: 'official-tool',
    officialAction: nativeAction,
    status: nativeAction ? 'native-action-required' : 'open-official-source',
   };
  }

  const distribution = variant(skill, agent);
  if (!distribution) throw Error(`No official ${agent} distribution for ${id}.`);
  const files = manifest(skill, distribution);
  return {
   ...details,
   type: 'native-skill',
   repo: skill.repo,
   revision: skill.revision,
   originalDirectory: distribution.directory,
   originalUrl: `${details.source}/tree/${skill.revision}/${distribution.directory}`,
   entry: `${hosts[agent]}/${skill.name}/SKILL.md`,
   files: files.length,
   bytes: files.reduce((total, file) => total + file.size, 0),
   hooks: skill.hooks,
   providerPermissions: skill.providerPermissions === true,
   activation: skill.manual ? 'explicit-user-only' : skill.userInvocable === false ? 'host-selection' : 'host-or-original-files',
   nativeAction,
  };
 });
 return { status: 'planned', agent, policy, selections };
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
 if(!plan.selections.length)return {...plan,status:'no-tools-selected',results:[]};
 const results=[];
 for(const a of plan.selections){
  if(a.type!=='native-skill'){results.push(a);continue;}
  const s=lock.skills[a.id],v=variant(s,q.agent),files=manifest(s,v);let stage;
  try{
   if(s.hooks&&!o.allowHooks)throw Error('Original skill has executable hooks; separate explicit approval required (--allow-hooks).');
   if(s.providerPermissions&&!o.allowProviderPermissions)throw Error('Original skill declares broad allowed-tools and executable context; explicit approval required (--allow-provider-permissions).');
   const choices=[hosts[q.agent]+'/'+s.name];if(q.agent==='cursor')choices.push('.agents/skills/'+s.name);
   const found=choices.filter(p=>stat(scoped(root,p)));if(found.length>1)throw Error('Duplicate native skills; resolve before proceeding.');
   if(found.length){const rel=found[0],dir=scoped(root,rel),old=rel.startsWith('.agents/')?variant(s,'codex'):v;if(!stat(dir)?.isDirectory())throw Error('Existing skill path not directory');const count=verify(dir,manifest(s,old).filter(e=>!e.path.startsWith('UPSTREAM-')||stat(scoped(dir,e.path))));results.push({...a,status:'original-files-verified',method:'reuse',entry:join(dir,'SKILL.md'),verifiedFiles:count,entrySha256:sha(readFileSync(join(dir,'SKILL.md'))),hostActivation:'unverified'});continue;}
   if(plan.policy==='no-new-tools')throw Error('No-new-tools policy: original native skill not installed.');
   const dst=scoped(root,hosts[q.agent]+'/'+s.name),parent=dirname(dst);mkdirSync(parent,{recursive:true});stage=mkdtempSync(join(dirname(parent),'.agentic-stage-'));let method;
   if(o.localSource){const local=scoped(realpathSync(resolve(o.localSource)),s.repo);for(const e of files)write(stage,e,checked(e,readFileSync(scoped(local,e.upstream))));method='local-pinned-source';}
   else{try{if(o.rawOnly)throw Error('raw-only transport');fromGit(s,v,files,stage);method='pinned-git-checkout';}catch(e){rmSync(stage,{recursive:true,force:true});stage=mkdtempSync(join(dirname(parent),'.agentic-stage-'));if(files.length>250&&!o.rawOnly)throw Error(e.message+'; large distribution requires Git or verified local checkout.');try{await fromRaw(s,files,stage,o.fetcher||fetch);}catch(rawError){throw Error(`${e.message}; GitHub raw failed: ${rawError.cause?.code ?? rawError.message}. Use --local-source with verified upstream files if direct network access is unavailable.`);}method='pinned-raw-files';}}
   const count=verify(stage,files),entry=join(stage,'SKILL.md'),front=readFileSync(entry,'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
   if(!front||front.match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1]!==s.name||(/^hooks\s*:/m.test(front))!==s.hooks||(/^disable-model-invocation:\s*true\s*$/m.test(front))!==s.manual||(/^allowed-tools\s*:/m.test(front))!==Boolean(s.providerPermissions)||(/^user-invocable:\s*false\s*$/m.test(front))!==(s.userInvocable===false))throw Error('Original name/hooks/manual metadata mismatch');
   if(stat(dst))throw Error('Destination appeared; refuse overwrite');renameSync(stage,dst);stage=null;
   results.push({...a,status:'original-files-verified',method,entry:join(dst,'SKILL.md'),verifiedFiles:count,entrySha256:sha(readFileSync(join(dst,'SKILL.md'))),hostActivation:'unverified'});
  }catch(e){results.push({...a,status:'blocked',error:e.message,hostActivation:'unverified'});}finally{if(stage)rmSync(stage,{recursive:true,force:true});}
 }
 const status = results.some(x => x.status === 'blocked') ? 'blocked'
  : results.some(x => x.status === 'native-action-required' || x.nativeAction) ? 'native-actions-required'
  : results.some(x => x.status === 'open-official-source') ? 'official-source-required'
  : 'original-files-verified';
 return {...plan,status,results};
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
 try {
  const [file, project, ...args] = process.argv.slice(2);
  if (file === '--list' && project === undefined) {
   console.log(JSON.stringify(listProviders(), null, 2));
  } else {
   if (!file || !project) throw Error('Usage: connect.mjs --list | <request.json> <project-directory> [--apply] [--allow-hooks] [--allow-provider-permissions] [--local-source <checkout-root>]');
   const options = {};
   for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
     case '--apply': options.apply = true; break;
     case '--allow-hooks': options.allowHooks = true; break;
     case '--allow-provider-permissions': options.allowProviderPermissions = true; break;
     case '--local-source':
      if (!args[i + 1] || args[i + 1].startsWith('--')) throw Error('--local-source requires a directory');
      options.localSource = args[++i];
      break;
     default: throw Error('Unknown option ' + args[i]);
    }
   }
   const result = await connect(JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, '')), project, options);
   console.log(JSON.stringify(result, null, 2));
   if (result.status === 'blocked') process.exitCode = 2;
  }
 } catch (error) {
  console.error('Connection blocked:', error.message);
  process.exitCode = 2;
 }
}
