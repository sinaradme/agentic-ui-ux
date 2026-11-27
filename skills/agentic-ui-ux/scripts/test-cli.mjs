import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const catalog=JSON.parse(readFileSync(join(root,'references/catalog.json'),'utf8'));
assert.equal(catalog.edition,'1.0');
assert.equal(new Set(catalog.tools.map(x=>x.id)).size,catalog.tools.length);
for(const t of catalog.tools){
  assert.ok(t.id && t.source.startsWith('https://') && t.docs.startsWith('https://') && t.license && t.verify && t.lastRepositoryPush,t.id);
}
const temp=mkdtempSync(join(tmpdir(),'agentic-ui-ux-cli-'));
try{
  // Exercise an isolated copy of the exact skill directory, not the repository root.
  const copied=join(temp,'skill');cpSync(root,copied,{recursive:true});
  const skill=readFileSync(join(copied,'SKILL.md'),'utf8');
  assert.match(skill,/^---\nname: agentic-ui-ux\n/);assert.match(skill,/^license: MIT$/m);assert.ok(readFileSync(join(copied,'LICENSE'),'utf8').includes('MIT License'));assert.ok(skill.split('\n').length<500);
  for(const [,p] of skill.matchAll(/\]\((references\/[^)]+)\)/g))assert.ok(readFileSync(join(copied,p)).length,p);
  const target=join(temp,'project');const {mkdirSync}=await import('node:fs');mkdirSync(target);
  writeFileSync(join(target,'package.json'),JSON.stringify({dependencies:{next:'16','@mui/material':'7'}}));
  writeFileSync(join(target,'package-lock.json'),'{}');
  const run=(script,args)=>spawnSync(process.execPath,[join(copied,'scripts',script),...args],{cwd:target,encoding:'utf8',timeout:10000});
  const inspection=run('inspect.mjs',[target]);assert.equal(inspection.status,0,inspection.stderr);
  const draft=JSON.parse(inspection.stdout).contextDraft;assert.equal(draft.stack,'react-web');assert.equal(draft.inventoryComplete,false);
  const contextFile=join(temp,'context.json');writeFileSync(contextFile,JSON.stringify(draft));
  const blocked=run('plan.mjs',[contextFile]);assert.equal(blocked.status,2);assert.equal(JSON.parse(blocked.stdout).status,'blocked');
  const context={...draft,goal:'new-ui',agent:'codex',inventoryComplete:true,primarySkill:'none',componentSystem:'present',browserAccess:'present',deviceAccess:'not-applicable'};
  writeFileSync(contextFile,JSON.stringify(context));
  const result=run('plan.mjs',[contextFile]);assert.equal(result.status,0,result.stderr);
  const plan=JSON.parse(result.stdout);assert.deepEqual(plan.actions.map(a=>a.id),['taste']);assert.equal(plan.executionAuthorized,false);
  assert.equal(readFileSync(join(target,'package-lock.json'),'utf8'),'{}');
  console.log('PASS isolated skill folder, inspector CLI, blocked incomplete context, confirmed plan CLI, target lockfile unchanged');
}finally{rmSync(temp,{recursive:true,force:true});}
