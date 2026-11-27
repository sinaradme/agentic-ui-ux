import assert from 'node:assert/strict';
import { readFileSync,mkdtempSync,mkdirSync,writeFileSync,rmSync,symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { verifyArtifacts } from './rebuild-artifacts.mjs';
const cases=JSON.parse(readFileSync(new URL('./rebuild-fixtures.json',import.meta.url),'utf8'));
const record=cases.find(x=>x.name==='final matches chosen structure and dynamic evidence').record;
const root=mkdtempSync(join(tmpdir(),'rebuild-artifacts-'));
try{
 mkdirSync(join(root,'fixture'));
 const put=(p,b)=>writeFileSync(join(root,p),b);
 // Synthetic bytes for file checks only; not visual-quality evidence.
 const png=Buffer.from([137,80,78,71,13,10,26,10,0,0,0,0]);
 put('fixture/before-page.png',png);put('fixture/before-hero.png',png);
 for(const [i,c] of record.rebuild.sections[0].concepts.entries())put(c.sketch,'<html>fixture '+i+'</html>');
 put('fixture/after.png',Buffer.concat([png,Buffer.from('different fixture bytes')]));
 put('fixture/interaction.webm','synthetic interaction artifact');
 assert.equal(verifyArtifacts(record,root).errors.length,0);
 assert.ok(verifyArtifacts(record).blockers.length);
 put('fixture/after.png',png);assert.ok(verifyArtifacts(record,root).errors.some(x=>x.includes('identical')));
 put('fixture/after.png','fake screenshot');assert.ok(verifyArtifacts(record,root).errors.some(x=>x.includes('screenshot')));
 const bad=structuredClone(record);bad.rebuild.sections[0].concepts[0].sketch='../outside';assert.ok(verifyArtifacts(bad,root).errors.some(x=>x.includes('relative path')));
 put('fixture/matrix.html','<html>fixture 0</html>');assert.ok(verifyArtifacts(record,root).errors.some(x=>x.includes('identical bytes')));
 symlinkSync(join(root,'fixture','stage.html'),join(root,'fixture','linked.html'));bad.rebuild.sections[0].concepts[0].sketch='fixture/linked.html';assert.ok(verifyArtifacts(bad,root).errors.some(x=>x.includes('Symlink')));
 console.log('PASS actual local artifact path, file type, missing root, identical bytes, traversal and symlink checks');
}finally{rmSync(root,{recursive:true,force:true});}
