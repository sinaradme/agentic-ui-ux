import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { createPlan } from './plan.mjs';
const catalog = JSON.parse(readFileSync(new URL('../references/catalog.json', import.meta.url), 'utf8'));
const fixtures = JSON.parse(readFileSync(new URL('./fixtures.json', import.meta.url), 'utf8'));
for (const c of fixtures) {
  const out = createPlan(c.input);
  assert.equal(out.status, c.expectedStatus, c.name);
  assert.deepEqual(out.actions.map(a => a.id), c.expectedIds, c.name);
  assert.equal(out.executionAuthorized, false, c.name);
  for (const [id,status] of Object.entries(c.expectedActions || {})) assert.equal(out.actions.find(a=>a.id===id)?.status,status,c.name);
  assert.ok(out.actions.filter(a=>['candidate','configure-existing'].includes(a.status)&&['primary','alternative-primary'].includes(catalog.tools.find(t=>t.id===a.id).role)).length<=1,c.name);
  assert.ok(out.actions.every(a=>a.status!=='needs-verification'||(!a.commandExample&&!a.commandExamples&&!a.configExample)),c.name);
  console.log('PASS', c.name);
}
console.log(fixtures.length + '/' + fixtures.length + ' passed');
