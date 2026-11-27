import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkGrounding } from './check-grounding.mjs';
import { createRoute } from './route.mjs';
const read=name=>JSON.parse(readFileSync(new URL('../references/'+name,import.meta.url),'utf8'));
const cat=read('catalog.json'),knowledge=read('knowledge.json');
assert.equal(Object.keys(knowledge.tools).length,cat.tools.length);
for(const t of cat.tools){const k=knowledge.tools[t.id];assert.ok(k&&k.fit&&k.avoid&&k.use&&k.sources.length,t.id);assert.equal(k.sources[0].url,t.knowledge.primarySource);assert.match(k.sources[0].revision,/^[a-f0-9]{40}$/);assert.deepEqual(read('knowledge/'+t.id+'.json'),k);}
const cases=JSON.parse(readFileSync(new URL('./grounding-fixtures.json',import.meta.url),'utf8'));
for(const c of cases){const out=checkGrounding(c.record);assert.equal(out.status,c.expected,c.name+' '+JSON.stringify(out));assert.equal(out.structuralOnly,true);assert.equal(out.executionAuthorized,false);console.log('PASS',c.name);}
const ctx=cases[0].record.request.context;const r=createRoute({context:{...ctx,goal:'motion'},tasks:[{id:'motion-review',coverage:'gap',evidence:'Synthetic'}]});assert.ok(!r.actions.some(a=>a.id==='emil-review'));assert.equal(r.routes[0].referenceTool,'emil-review');console.log('PASS upstream explicit-invocation gate');
console.log(cases.length+'/'+cases.length+' grounding fixtures passed; '+cat.tools.length+' knowledge cards verified');
