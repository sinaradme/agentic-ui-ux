import assert from 'node:assert/strict';
import { mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync,existsSync } from 'node:fs';
import { join,dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { connect } from './connect.mjs';
const root=mkdtempSync(join(tmpdir(),'agentic-live-'));
const env={...process.env,DO_NOT_TRACK:'1',DISABLE_TELEMETRY:'1',IMPECCABLE_HOME:join(root,'engine-cache')};
const target=agent=>{const p=join(root,agent);mkdirSync(p,{recursive:true});writeFileSync(join(p,'package.json'),'{"name":"fixture","private":true,"dependencies":{"react":"19"}}');return p;};
const base={stack:'react-web',goal:'redesign',surfaceType:'marketing',motion:true,capabilities:['choreography'],browserAccess:'present'};
function run(cmd,args,cwd){const r=spawnSync(cmd,args,{cwd,env,encoding:'utf8',timeout:120000,maxBuffer:5*1024*1024});if(r.status!==0)throw Error(cmd+' failed: '+(r.error?.message||String(r.stderr||r.stdout).slice(-1600)));return r.stdout;}
try{
 for(const agent of ['codex','cursor','claude-code']){
  const dir=target(agent),q={...base,agent};
  const r=await connect(q,dir,{apply:true});assert.equal(r.status,'original-files-verified',JSON.stringify(r.results));assert.ok(r.results.every(x=>existsSync(x.entry)&&x.verifiedFiles>0));
  assert.equal(readFileSync(join(dir,'package.json'),'utf8'),'{"name":"fixture","private":true,"dependencies":{"react":"19"}}');
  const i=r.results.find(x=>x.id==='impeccable');assert.ok(existsSync(join(dirname(i.entry),'reference/new-work.md')));
  const again=await connect(q,dir,{apply:true});assert.ok(again.results.every(x=>x.method==='reuse'));
  console.log('LIVE original distribution installed and verified',agent,r.results.map(x=>x.name+':'+x.verifiedFiles).join(', '));
  if(agent==='codex'&&process.platform!=='win32'){const out=run('sh',[join(dirname(i.entry),'scripts/impeccable'),'context'],dir);assert.ok(out.trim());console.log('LIVE original Impeccable context engine ran',out.length,'characters');}
 }
 const dir=target('additional'),r=await connect({agent:'codex',stack:'react-web',goal:'ux-planning',tools:['emil-gestures','emil-performance','stageshow']},dir,{apply:true});
 assert.equal(r.status,'original-files-verified',JSON.stringify(r.results));const u=r.results.find(x=>x.id==='uiux-pro-max'),st=r.results.find(x=>x.id==='stageshow');assert.ok(existsSync(join(dirname(u.entry),'data/styles.csv')));assert.ok(existsSync(join(dirname(st.entry),'kit/index.ts')));
 const search=run('python3',[join(dirname(u.entry),'scripts/search.py'),'financial analytics dashboard','--design-system','-p','Synthetic fixture'],dir);assert.ok(search.trim());console.log('LIVE original UI/UX Pro Max search ran',search.length,'characters');
 console.log('LIVE other originals verified',r.results.map(x=>x.name+':'+x.verifiedFiles).join(', '));
 const rn=await connect({agent:'codex',stack:'react-native',goal:'motion'},target('native'),{apply:true});assert.equal(rn.status,'original-files-verified',JSON.stringify(rn.results));console.log('LIVE React Native animate-expo verified');
 const raw=await connect({agent:'codex',stack:'react-web',goal:'motion',primary:'none'},target('raw'),{apply:true,rawOnly:true});assert.equal(raw.status,'original-files-verified',JSON.stringify(raw.results));assert.ok(raw.results.every(x=>x.method==='pinned-raw-files'));console.log('LIVE exact raw fallback installed originals');
 if(process.argv.includes('--all')){
  const alt=target('alternative');
  for(const id of ['hallmark','anthropic-frontend','emil-opportunities','emil-improve','emil-review']){const a=await connect({agent:'codex',stack:'react-web',goal:'motion',tools:[id]},alt,{apply:true});assert.equal(a.status,'original-files-verified',JSON.stringify(a.results));console.log('LIVE original alternative/focused files verified',id);}
  const t=await connect({agent:'codex',stack:'react-web',goal:'new-ui',surfaceType:'marketing'},target('taste'),{apply:true,allowHooks:true});assert.equal(t.status,'original-files-verified',JSON.stringify(t.results));console.log('LIVE original Taste files verified (fixture permission, no hook executed)',t.results[0].verifiedFiles);
 }
 console.log('LIVE direct upstream connection smoke passed; actual coding-agent host invocation and visual design not tested');
}finally{rmSync(root,{recursive:true,force:true});}
