import assert from 'node:assert/strict';
import { mkdtempSync,writeFileSync,rmSync,readFileSync,mkdirSync,readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn,spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { createInterface } from 'node:readline';
const root=mkdtempSync(join(tmpdir(),'agentic-native-tools-'));
const actions=JSON.parse(readFileSync(new URL('../references/native-actions.json',import.meta.url),'utf8'));
const env={...process.env,CI:'true',DO_NOT_TRACK:'1',DISABLE_TELEMETRY:'1'};
let server,child;
function run(cmd,args){const r=spawnSync(cmd,args,{cwd:root,env,encoding:'utf8',timeout:180000,maxBuffer:12*1024*1024});if(r.status!==0)throw Error(cmd+' '+args.slice(0,3).join(' ')+' failed: '+(r.error?.message||String(r.stderr||r.stdout).slice(-1800)));return r.stdout;}
try{
 writeFileSync(join(root,'package.json'),'{"name":"agentic-native-fixture","private":true}');
 const versions=['shadcn','motion-web','playwright-mcp'].map(id=>actions[id].package+'@'+actions[id].reviewedVersion);
 run('npm',['install','--save-exact','--ignore-scripts','--no-audit','--no-fund',...versions,'react@19','react-dom@19']);
 const req=createRequire(join(root,'package.json')),motion=req('motion/react');
 assert.ok(motion.motion&&typeof motion.useScroll==='function'&&typeof motion.useSpring==='function');
 console.log('LIVE original Motion import resolved',actions['motion-web'].reviewedVersion);
 const shadcn=join(root,'node_modules/shadcn/dist/index.js');
 const viewed=run(process.execPath,[shadcn,'view','https://magicui.design/r/bento-grid.json']);
 assert.match(viewed,/bento-grid|BentoGrid/i);assert.ok(viewed.length>200);
 console.log('LIVE official shadcn CLI fetched real Magic UI registry item',actions.shadcn.reviewedVersion,viewed.length,'characters');
 // Exercise the real original add path in a disposable, preconfigured fixture.
 mkdirSync(join(root,'src'),{recursive:true});writeFileSync(join(root,'src/index.css'),'@import "tailwindcss";\n');
 writeFileSync(join(root,'tsconfig.json'),JSON.stringify({compilerOptions:{baseUrl:'.',paths:{'@/*':['./src/*']},jsx:'react-jsx'}}));
 writeFileSync(join(root,'components.json'),JSON.stringify({"$schema":"https://ui.shadcn.com/schema.json",style:'new-york',rsc:false,tsx:true,tailwind:{config:'',css:'src/index.css',baseColor:'neutral',cssVariables:true,prefix:''},aliases:{components:'@/components',utils:'@/lib/utils',ui:'@/components/ui',lib:'@/lib',hooks:'@/hooks'},iconLibrary:'lucide'}));
 const added=run(process.execPath,[shadcn,'add','https://magicui.design/r/bento-grid.json','--yes']);
 const scan=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?scan(join(dir,e.name)):[join(dir,e.name)]);
 const files=scan(join(root,'src'));const actual=files.find(p=>/bento-grid\.(tsx|jsx|ts|js)$/.test(p));
 assert.ok(actual,'Official add did not produce the real bento component: '+added.slice(-1000));
 assert.match(readFileSync(actual,'utf8'),/BentoGrid/);
 console.log('LIVE official shadcn CLI added actual Magic UI Bento Grid source',actual.slice(root.length+1));
 server=createServer((q,r)=>{r.writeHead(200,{'content-type':'text/html'});r.end('<!doctype html><html><head><title>Agentic native fixture</title></head><body><h1>Native MCP fixture</h1><button>Test</button></body></html>');});
 await new Promise((ok,fail)=>{server.once('error',fail);server.listen(0,'127.0.0.1',ok)});
 const url='http://127.0.0.1:'+server.address().port+'/';
 child=spawn(process.execPath,[join(root,'node_modules/@playwright/mcp/cli.js'),'--headless','--isolated','--browser','chrome'],{cwd:root,env,stdio:['pipe','pipe','pipe']});
 let err='',seq=0;child.stderr.on('data',d=>err=(err+d.toString()).slice(-4000));const pending=new Map(),lines=createInterface({input:child.stdout});
 lines.on('line',line=>{try{const m=JSON.parse(line),p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}}catch{}});
 child.on('exit',()=>{for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('MCP exited: '+err));}pending.clear();});
 function rpc(method,params={}){return new Promise((resolve,reject)=>{const id=++seq,timer=setTimeout(()=>{pending.delete(id);reject(Error('MCP timeout '+method+' '+err));},40000);pending.set(id,{resolve,reject,timer});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});}
 const initialized=await rpc('initialize',{protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'agentic-native-fixture',version:'1.0.0'}});assert.ok(initialized.serverInfo);child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const list=await rpc('tools/list');assert.ok(list.tools.some(t=>t.name==='browser_navigate'));assert.ok(list.tools.some(t=>t.name==='browser_take_screenshot'));
 const nav=await rpc('tools/call',{name:'browser_navigate',arguments:{url}});assert.ok(!nav.isError,JSON.stringify(nav));assert.match(JSON.stringify(nav),/Native MCP fixture|Agentic native fixture/i);
 const shot=await rpc('tools/call',{name:'browser_take_screenshot',arguments:{type:'png'}});assert.ok(!shot.isError,JSON.stringify(shot).slice(0,1200));assert.ok(shot.content?.length);
 console.log('LIVE original Playwright MCP initialized, listed',list.tools.length,'tools, navigated local fixture and captured screenshot',actions['playwright-mcp'].reviewedVersion);
 console.log('LIVE official non-skill tools smoke passed; actual host configuration and design not tested');
}finally{if(child){child.stdin.end();child.kill();}if(server)server.close();rmSync(root,{recursive:true,force:true});}
