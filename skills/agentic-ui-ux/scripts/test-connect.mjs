import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { listProviders, select, connect, lock } from './connect.mjs';

const request = { agent: 'codex', tools: ['emil-web', 'emil-choreograph', 'emil-web'] };
const plan = select(request);
assert.deepEqual(plan.selections.map(x => x.id), ['emil-web', 'emil-choreograph']);
assert.deepEqual(select({ ...request, tools: ['magic-ui'] }).selections.map(x => x.id), ['magic-ui']);
assert.deepEqual(select({ ...request, tools: [] }).selections, []);
assert.deepEqual(select({ ...request, tools: ['taste', 'impeccable'] }).selections.map(x => x.id), ['taste', 'impeccable']);
const one = (id, agent = 'codex') => select({ agent, tools: [id] }).selections[0];
assert.equal(one('impeccable', 'cursor').originalDirectory, '.cursor/skills/impeccable');
assert.equal(one('impeccable', 'claude-code').originalDirectory, '.claude/skills/impeccable');
assert.equal(one('emil-native').name, 'animate-expo');
assert.equal(one('emil-pick-ui').activation, 'explicit-user-only');
assert.equal(one('shadcn').activation, 'host-selection');
assert.equal(one('shadcn').providerPermissions, true);
assert.equal(one('flutter-built-in').status, 'native-action-required');
assert.equal(one('make-interfaces').status, 'open-official-source');
assert.equal(one('emil-web').originalUrl, 'https://github.com/emilkowalski/skills/tree/' + lock.skills['emil-web'].revision + '/skills/animate');
assert.equal(new Set(listProviders().map(x => x.id)).size, listProviders().length);
assert.ok(Object.keys(lock.skills).every(id => listProviders().some(entry => entry.id === id)));
assert.throws(() => select({ agent: 'codex', tools: ['unknown'] }), /Unknown provider/);
assert.throws(() => select({ ...request, goal: 'redesign' }), /Choose provider IDs/);

const root = mkdtempSync(join(tmpdir(), 'agentic-connect-test-'));
try {
 const app = join(root, 'package.json');
 const before = '{"name":"fixture","private":true}';
 writeFileSync(app, before);
 assert.equal((await connect(request, root)).status, 'planned');
 assert.equal((await connect({ ...request, tools: [] }, root, { apply: true })).status, 'no-tools-selected');
 assert.ok(!existsSync(join(root, '.agents')));

 const noNew = await connect({ ...request, policy: 'no-new-tools' }, root, { apply: true });
 assert.equal(noNew.status, 'blocked');
 assert.ok(noNew.results.every(x => /No-new-tools/.test(x.error)));
 assert.ok(!existsSync(join(root, '.agents')));

 const hook = await connect({ ...request, tools: ['taste'] }, root, { apply: true });
 assert.match(hook.results[0].error, /hooks/);
 const permissions = await connect({ ...request, tools: ['shadcn'] }, root, { apply: true });
 assert.match(permissions.results[0].error, /allowed-tools/);
 assert.ok(!existsSync(join(root, '.agents')));

 const official = await connect({ ...request, tools: ['motion-web', 'make-interfaces'] }, root, { apply: true });
 assert.equal(official.status, 'native-actions-required');
 assert.deepEqual(official.results.map(x => x.status), ['native-action-required', 'open-official-source']);
 assert.ok(!existsSync(join(root, '.agents')));

 const original = join(root, '.agents/skills/impeccable/SKILL.md');
 mkdirSync(join(root, '.agents/skills/impeccable'), { recursive: true });
 writeFileSync(original, 'user content');
 const conflict = await connect({ ...request, tools: ['impeccable'] }, root, { apply: true });
 assert.equal(conflict.status, 'blocked');
 assert.equal(readFileSync(original, 'utf8'), 'user content');

 const bad = await connect({ ...request, tools: ['emil-web'] }, root, {
  apply: true, rawOnly: true, fetcher: async () => new Response('wrong bytes'),
 });
 assert.equal(bad.status, 'blocked');
 assert.match(bad.results[0].error, /Original blob mismatch/);
 assert.ok(!existsSync(join(root, '.agents/skills/animate')));
 assert.equal(readFileSync(app, 'utf8'), before);
 console.log('PASS exact provider IDs, discovery, host variants, no-write plan, original permissions, existing conflict and mismatched bytes');
} finally {
 rmSync(root, { recursive: true, force: true });
}
