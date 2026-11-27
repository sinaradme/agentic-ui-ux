import { lstatSync,realpathSync,readFileSync } from 'node:fs';
import { resolve,relative,isAbsolute,sep } from 'node:path';
import { createHash } from 'node:crypto';
const image=b=>b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||b[0]===255&&b[1]===216&&b[2]===255||b.subarray(0,4).toString()==='RIFF'&&b.subarray(8,12).toString()==='WEBP';
export function verifyArtifacts(record,evidenceRoot){
 const errors=[],blockers=[],hashes=new Map();
 const fail=(m)=>errors.push(m);
 if(!evidenceRoot){blockers.push('Local rebuild requires --evidence-root <directory> with real rendered/sketch artifacts.');return {errors,blockers,verified:0};}
 let root;try{root=realpathSync(resolve(evidenceRoot));if(!lstatSync(root).isDirectory())throw Error();}catch{blockers.push('Evidence root is not an accessible directory.');return {errors,blockers,verified:0};}
 const load=(path,label,asImage=false)=>{
   try{
     if(typeof path!=='string'||!path||isAbsolute(path)||/^[A-Za-z]:|\\|[\x00-\x1f]/.test(path)||path.split('/').some(x=>!x||x==='.'||x==='..'))throw Error('Use a relative path inside evidence root');
     let p=root;for(const part of path.split('/')){p=resolve(p,part);if(lstatSync(p).isSymbolicLink())throw Error('Symlink forbidden');}
     const rel=relative(root,p);if(rel==='..'||rel.startsWith('..'+sep)||isAbsolute(rel))throw Error('Path escaped evidence root');
     const st=lstatSync(p);if(!st.isFile()||st.size<1||st.size>30*1024*1024)throw Error('Expected non-empty regular file <=30 MiB');
     const cached=hashes.get(p);if(cached){if(asImage&&!cached.image)throw Error('Expected PNG/JPEG/WebP screenshot');return cached.hash;}
     const b=readFileSync(p);const img=image(b);if(asImage&&!img)throw Error('Expected PNG/JPEG/WebP screenshot');
     const hash=createHash('sha256').update(b).digest('hex');hashes.set(p,{hash,image:img});return hash;
   }catch(e){fail(label+': '+e.message);return null;}
 };
 if(!record?.rebuild||!Array.isArray(record.rebuild.sections)){fail('No rebuild sections');return {errors,blockers,verified:0};}
 load(record.rebuild.baseline,'Page baseline',true);
 for(const s of record.rebuild.sections){
   const before=load(s.baseline?.evidence,s.id+' baseline',true);
   if(!s.exception&&Array.isArray(s.concepts)){
     const sketchHashes=s.concepts.map(c=>load(c.sketch,s.id+' sketch '+c.id));
     if(sketchHashes.every(Boolean)&&new Set(sketchHashes).size!==sketchHashes.length)fail(s.id+': concept artifacts have identical bytes');
     if(record.phase==='final'){
       const after=load(s.actual?.screenshot,s.id+' rendered screenshot',true);
       if(after&&before===after)fail(s.id+': before and after screenshot bytes identical');
       if(after&&sketchHashes.includes(after))fail(s.id+': final screenshot is a concept artifact, not new rendered evidence');
       if(s.actual?.interaction)load(s.actual.interaction,s.id+' interaction evidence');
     }
   }else if(record.phase==='final'){load(s.actual?.screenshot,s.id+' preserved screenshot',true);if(s.actual?.interaction)load(s.actual.interaction,s.id+' interaction evidence');}
 }
 return {errors,blockers,verified:hashes.size};
}
export function attachArtifactVerification(out,record,root){
 if(out.status!=='pass')return out;
 const a=verifyArtifacts(record,root);
 return {...out,status:a.errors.length?'invalid':a.blockers.length?'blocked':'pass',errors:[...out.errors,...a.errors],blockers:[...out.blockers,...a.blockers],artifactFilesVerified:a.verified,notice:out.notice+' File checks verify existence, type and non-identical bytes only; human/agent visual review remains mandatory.'};
}
