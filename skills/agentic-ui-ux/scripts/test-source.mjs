import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { sources,rawUrl,retrieve,verifyBytes } from './source.mjs';
assert.equal(new Set(sources.map(x=>x.id)).size,sources.length);
assert.equal(sources.filter(x=>x.id.endsWith(':primary')).length,26);
for(const s of sources){assert.match(rawUrl(s),/^https:\/\/raw\.githubusercontent\.com\//);assert.match(s.revision,/^[a-f0-9]{40}$/);if(!s.id.endsWith(':primary'))assert.match(s.blob,/^[a-f0-9]{40}$/);}
const body=Buffer.from('# Test source\n');const blob=createHash('sha1').update('blob '+body.length+'\0').update(body).digest('hex');
assert.equal(verifyBytes({...sources[0],blob},body).gitBlob,blob);
assert.throws(()=>verifyBytes({...sources[0],blob:'0'.repeat(40)},body),/mismatch/);
assert.throws(()=>verifyBytes(sources[0],Buffer.from('<html>error</html>')),/HTML/);
assert.throws(()=>rawUrl({...sources[0],path:'../private'}));
assert.throws(()=>rawUrl({...sources[0],repo:'https://example.com/a'}));
await assert.rejects(retrieve('https://example.com'),/Unknown source/);
const result=await retrieve(sources[0].id,async(url,options)=>{assert.equal(url,rawUrl(sources[0]));assert.equal(options.redirect,'error');return new Response(body);});
assert.equal(result.content,body.toString());assert.match(result.sha256,/^[a-f0-9]{64}$/);
await assert.rejects(retrieve(sources[0].id,async()=>new Response('denied',{status:403})),/403/);
console.log('PASS '+sources.length+' registered source routes; hash, allowlist, response and error checks');
if(process.argv.includes('--live')){
 const failures=[];const unique=new Map();for(const s of sources){const url=rawUrl(s);if(!unique.has(url)||s.blob)unique.set(url,s);}
 for(const s of unique.values()){try{const got=await retrieve(s.id);console.log('LIVE PASS',s.id,got.bytes,got.gitBlob);}catch(e){failures.push(s.id+': '+e.message);console.error('LIVE FAIL',s.id,e.message);}}
 assert.deepEqual(failures,[],'Live upstream retrieval failures');console.log('LIVE '+unique.size+'/'+unique.size+' distinct pinned upstream files retrieved; no external tools installed');
}
