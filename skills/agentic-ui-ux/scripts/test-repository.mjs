import assert from 'node:assert/strict';
import { readFileSync,readdirSync,statSync,existsSync } from 'node:fs';
import { resolve,dirname,relative,sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../../../',import.meta.url));
const paths=[];function walk(dir){for(const e of readdirSync(dir,{withFileTypes:true})){if(e.name==='.git'||e.name==='node_modules')continue;const p=resolve(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile()&&e.name.endsWith('.md'))paths.push(p);}}walk(root);
const slug=t=>t.toLowerCase().replace(/<[^>]+>/g,'').replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-');
function anchors(content){const a=new Set();const counts=new Map();for(const line of content.split('\n')){const m=line.match(/^#{1,6}\s+(.+?)\s*#*$/);if(!m)continue;const s=slug(m[1].trim());const n=counts.get(s)||0;counts.set(s,n+1);a.add(n?s+'-'+n:s);}return a;}
let count=0;const failures=[];for(const path of paths){const body=readFileSync(path,'utf8').replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');for(const m of body.matchAll(/\]\(([^)\s]+)\)/g)){const link=m[1];if(/^(https?:|mailto:)/.test(link))continue;const [rel,anchor]=link.split('#');const dst=rel?resolve(dirname(path),decodeURIComponent(rel)):path;count++;if(!existsSync(dst)){failures.push(relative(root,path)+': '+link);continue;}if(anchor&&statSync(dst).isFile()&&dst.endsWith('.md')&&!anchors(readFileSync(dst,'utf8')).has(decodeURIComponent(anchor)))failures.push(relative(root,path)+': missing anchor '+link);}}
assert.deepEqual(failures,[],'Broken documentation links');
console.log(paths.length+' Markdown files; '+count+' internal links verified');
