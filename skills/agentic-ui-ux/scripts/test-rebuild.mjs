import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRoute } from './route.mjs';
import { checkRebuild } from './check-rebuild.mjs';
import { checkGrounding } from './check-grounding.mjs';
const cases=JSON.parse(readFileSync(new URL('./rebuild-fixtures.json',import.meta.url),'utf8'));
for(const c of cases){const r=c.record,route=createRoute(r.request);assert.equal(route.designMode,'rebuild');const out=checkRebuild(r.rebuild,route,r.phase,r.surfaces.map(s=>s.id));assert.equal(out.status,c.expected,c.name+' '+JSON.stringify(out));assert.equal(out.executionAuthorized,false);console.log('PASS',c.name);}
const first=cases[0].record;assert.equal(checkGrounding(first).status,'pass',JSON.stringify(checkGrounding(first)));
const missing=structuredClone(first);delete missing.rebuild;assert.notEqual(checkGrounding(missing).status,'pass');
const routed=createRoute(first.request);assert.ok(routed.discoveryRequired);assert.ok(routed.actions.some(a=>a.id==='impeccable'&&a.invocations.some(i=>i.includes('new-work'))));assert.ok(!routed.actions.some(a=>a.invocations.includes('layout')||a.invocations.includes('bolder / quieter')));
const refine=createRoute({...first.request,designMode:'refine'});assert.equal(refine.designMode,'refine');assert.equal(refine.discoveryRequired,false);
const adequate=structuredClone(first.request);adequate.context.primarySkill='none';adequate.context.installedTools=[];adequate.tasks.forEach(t=>{t.coverage='adequate';t.provider='project';});const reused=createRoute(adequate);assert.equal(reused.actions.length,0);assert.equal(reused.discoveryRequired,true);assert.ok(reused.discoveryPlan.sources.some(s=>s.id==='replacement-world'));assert.ok(reused.discoveryPlan.sources.every(s=>s.command.includes('source.mjs read')));assert.ok(!refine.discoveryPlan);
console.log(cases.length+'/'+cases.length+' rebuild fixtures passed; integrated preflight gate, mode-specific routing, mandatory discovery on zero-install route verified');
