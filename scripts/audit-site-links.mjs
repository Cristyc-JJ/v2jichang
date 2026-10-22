import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name==='.git'||entry.name==='node_modules'||entry.name==='dist')continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.name.endsWith('.html'))files.push(full);}}
walk(root);

const broken=[];
let internalLinks=0;
let externalLinks=0;
let missingFixedNav=0;
for(const file of files){
  const html=fs.readFileSync(file,'utf8');
  if(!html.includes('global-fixed-header'))missingFixedNav++;
  for(const match of html.matchAll(/href="([^"]+)"/g)){
    const href=match[1];
    if(href.includes('${'))continue;
    if(/^(https?:|mailto:|tel:|javascript:)/i.test(href)){externalLinks++;continue;}
    if(href.startsWith('#'))continue;
    internalLinks++;
    const [pathname,hash]=href.split('#');
    const target=path.resolve(path.dirname(file),pathname||path.basename(file));
    if(!fs.existsSync(target)){broken.push({from:path.relative(root,file),href,reason:'missing-file'});continue;}
    if(hash&&target.endsWith('.html')){
      const targetHtml=fs.readFileSync(target,'utf8');
      if(!targetHtml.includes(`id="${hash}"`))broken.push({from:path.relative(root,file),href,reason:'missing-anchor'});
    }
  }
}
console.log(JSON.stringify({htmlFiles:files.length,internalLinks,externalLinks,missingFixedNav,brokenCount:broken.length,broken:broken.slice(0,30)},null,2));
