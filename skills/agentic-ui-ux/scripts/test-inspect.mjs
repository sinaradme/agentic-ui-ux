import { readFileSync, mkdtempSync, writeFileSync, mkdirSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { classify, inspectProject } from './inspect.mjs';
import { createPlan } from './plan.mjs';
const fixtures=JSON.parse(readFileSync(new URL('./inspect-fixtures.json',import.meta.url),'utf8'));
for(const c of fixtures){const o=classify(c.input);for(const [k,v] of Object.entries(c.expected))assert.deepEqual(o[k],v,c.name);assert.equal(o.contextDraft.inventoryComplete,false);assert.equal(createPlan(o.contextDraft).status,'blocked');console.log('PASS',c.name);}
const target=mkdtempSync(join(tmpdir(),'agentic-ui-ux-'));try{
 writeFileSync(join(target,'package.json'),JSON.stringify({dependencies:{next:'16',react:'19','@mui/material':'7'}}));writeFileSync(join(target,'pnpm-lock.yaml'),'fixture');mkdirSync(join(target,'.agents/skills/design-taste-frontend'),{recursive:true});writeFileSync(join(target,'.env'),'DO_NOT_READ=secret');
 const out=inspectProject(target);assert.equal(out.stack,'react-web');assert.equal(out.packageManager,'pnpm');assert.deepEqual(out.toolSignals,['taste']);assert.ok(!JSON.stringify(out).includes('DO_NOT_READ'));assert.ok(!out.observedPaths.includes('.env'));
 const context={...out.contextDraft,goal:'redesign',agent:'cursor',inventoryComplete:true,primarySkill:'taste',installedTools:['taste'],componentSystem:'present',browserAccess:'present',deviceAccess:'not-applicable'};const p=createPlan(context);assert.deepEqual(p.actions.map(x=>[x.id,x.status]),[['taste','reuse']]);assert.equal(p.executionAuthorized,false);console.log('PASS filesystem inspection → confirmed context → plan');
 // A symlink pointing at a non-project manifest must not be read.
 const sub=join(target,'linked');mkdirSync(sub);try{symlinkSync(join(target,'package.json'),join(sub,'package.json'),'file');assert.equal(inspectProject(sub).stack,'unknown');console.log('PASS symlink isolation');}catch(e){if(!['EPERM','EACCES','ENOSYS'].includes(e.code))throw e;console.log('SKIP symlink unavailable on host');}
}finally{rmSync(target,{recursive:true,force:true});}
