import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRoute } from './route.mjs';
const read = name => JSON.parse(readFileSync(new URL('../references/'+name,import.meta.url),'utf8'));
const catalog=read('catalog.json'), registry=read('capabilities.json'), policy=read('priority-policy.json');
const byId=new Map(catalog.tools.map(t=>[t.id,t]));
assert.equal(new Set(registry.capabilities.map(c=>c.id)).size,registry.capabilities.length);
for(const c of registry.capabilities){assert.ok(registry.groups[c.group]);assert.ok(existsSync(new URL('../'+registry.groups[c.group].path,import.meta.url)));for(const p of c.providers){assert.ok(byId.has(p.tool),p.tool);assert.ok(p.stacks.every(s=>byId.get(p.tool).stacks.includes(s)));}}
const fixtures=JSON.parse(readFileSync(new URL('./route-fixtures.json',import.meta.url),'utf8'));
for(const c of fixtures){const o=createRoute(c.input);assert.equal(o.status,c.expectedStatus||'planned',c.name);assert.deepEqual(o.actions.map(a=>a.id),c.expectedIds,c.name);for(const [id,s] of Object.entries(c.expectedStatuses))assert.equal(o.routes.find(r=>r.id===id)?.status,s,c.name);assert.equal(o.executionAuthorized,false);assert.equal(new Set(o.actions.map(a=>a.id)).size,o.actions.length);assert.ok(o.actions.filter(a=>a.status==='candidate'&&['primary','alternative-primary'].includes(byId.get(a.id).role)).length<=1);assert.ok(o.actions.filter(a=>a.status==='candidate'&&a.kind==='skill'&&!['primary','alternative-primary'].includes(byId.get(a.id).role)).length<=policy.limits.newSpecialistSkills);assert.ok(o.actions.every(a=>a.status!=='candidate'||['preferred','specialized'].includes(a.tier)));assert.ok(o.actions.every(a=>a.status!=='configure-existing'||(!a.commandExample&&!a.commandExamples)));assert.ok(o.actions.every(a=>byId.get(a.id).stacks.includes(c.input.context.stack)));console.log('PASS',c.name);}
const a=createRoute(fixtures[0].input),b=createRoute(fixtures[1].input);assert.deepEqual(a,b,'Route should be stable regardless of capability input order');
console.log(fixtures.length+'/'+fixtures.length+' route fixtures passed; registry integrity and deterministic order passed');
