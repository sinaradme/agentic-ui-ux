import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const read=name=>JSON.parse(readFileSync(new URL('../references/'+name,import.meta.url),'utf8'));
function renderIndex(reg,cat){
 const tools=new Map(cat.tools.map(t=>[t.id,t]));const result={};
 const rows=Object.entries(reg.groups).map(([id,g])=>`| ${g.title} | [${id}](playbooks/${id}.md) | [${reg.capabilities.filter(c=>c.group===id).length} routes](routes/${id}.md) |`);
 result["INDEX.md"]="# Capability index\n\nStart here. Choose only the groups relevant to the user's task. Read their playbooks and route tables; the router consumes the canonical JSON so the agent does not need to load it into context. Generated from capabilities.json and catalog.json; do not edit by hand.\n\n| Domain | Playbook | Routing table |\n| --- | --- | --- |\n"+rows.join("\n")+"\n\n[Routing workflow](routing.md) · [Priority policy](priority-policy.json) · [Acceptance](acceptance.md)\n";
 for(const [id,g] of Object.entries(reg.groups)){
 const caps=reg.capabilities.filter(c=>c.group===id);
 const lines=caps.map(c=>`| \`${c.id}\` | ${c.label} | ${c.kind} | ${c.stacks.join(", ")} | ${c.providers.map(p=>`[${tools.get(p.tool).name}](tools/${p.tool}.json) (${p.stacks.join(", ")}${p.invoke?"; "+p.invoke:""})`).join("; ")||"Bundled / project"} | ${[c.existingPrimaryOnly?"existing primary only":"",c.componentGate?"confirmed component gap":"",c.requiresAdvanced?"advanced + runtime inventory none":"",c.explicitMaterial?"explicit Material fit":"",c.explicitSpecialized?"specific specialist request":"",c.requiresInstalled?"requires "+c.requiresInstalled:"",c.browserGate?"confirmed browser absence":"",c.deviceGate?"confirmed native device":"",c.goals?"goals: "+c.goals.join(", "):""].filter(Boolean).join("; ")||"confirmed gap before external selection"} |`);
 result[`routes/${id}.md`]=`# ${g.title}: routing table\n\nGenerated from the canonical registry. [Playbook](../playbooks/${id}.md) · [Index](../INDEX.md). Apply compatibility, coverage, ownership, budget and priority gates before choosing any provider. A listed provider is not an installation recommendation.\n\n| Capability ID | Need | Role | Stacks | Providers / focused invocation | Gates |\n| --- | --- | --- | --- | --- | --- |\n${lines.join("\n").replaceAll("](tools/","](../tools/")}\n`;
 }
 for(const t of cat.tools)result[`tools/${t.id}.json`]=JSON.stringify(t,null,2)+"\n";
 return result;
}
const files=renderIndex(read('capabilities.json'),read('catalog.json'));const check=process.argv.includes('--check');for(const [p,content] of Object.entries(files)){const dest=fileURLToPath(new URL('../references/'+p,import.meta.url));if(check){if(readFileSync(dest,'utf8')!==content)throw Error('Generated reference drift: '+p);}else{mkdirSync(dirname(dest),{recursive:true});writeFileSync(dest,content);}}console.log(Object.keys(files).length+' generated reference files '+(check?'verified':'written'));
