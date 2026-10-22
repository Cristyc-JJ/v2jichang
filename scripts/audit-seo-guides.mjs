import fs from 'node:fs';
import path from 'node:path';

const rows = [];
const documents = [];
for (const file of fs.readdirSync('guides').filter(name => name.endsWith('.html'))) {
  const html = fs.readFileSync(path.join('guides', file), 'utf8');
  const match = html.match(/<article class="article">([\s\S]*?)<\/article>/);
  const text = (match?.[1] ?? '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, '');
  rows.push({
    file,
    length: [...text].length,
    toc: html.includes('class="toc"'),
    faqCount: (html.match(/<details>/g) ?? []).length,
    faqSchema: html.includes('FAQPage'),
    fixedNav: html.includes('global-fixed-header'),
    related: html.includes('class="related"'),
  });
  documents.push({file, text});
}
rows.sort((a, b) => a.length - b.length);
function shingles(text,size=8){const set=new Set();for(let i=0;i<=text.length-size;i++)set.add(text.slice(i,i+size));return set;}
const shingleDocs=documents.map(doc=>({...doc,set:shingles(doc.text)}));
let maxSimilarity={value:0,pair:[]};let maxCrossGroupSimilarity={value:0,pair:[]};let maxWithinGroupSimilarity={value:0,pair:[]};let sumSimilarity=0;let pairCount=0;
for(let i=0;i<shingleDocs.length;i++)for(let j=i+1;j<shingleDocs.length;j++){
  const a=shingleDocs[i].set,b=shingleDocs[j].set;let intersection=0;
  for(const item of a)if(b.has(item))intersection++;
  const similarity=intersection/(a.size+b.size-intersection);
  sumSimilarity+=similarity;pairCount++;
  if(similarity>maxSimilarity.value)maxSimilarity={value:similarity,pair:[shingleDocs[i].file,shingleDocs[j].file]};
  const groupA=shingleDocs[i].file.replace(/-\d{2}\.html$/,'');
  const groupB=shingleDocs[j].file.replace(/-\d{2}\.html$/,'');
  if(groupA===groupB&&similarity>maxWithinGroupSimilarity.value)maxWithinGroupSimilarity={value:similarity,pair:[shingleDocs[i].file,shingleDocs[j].file]};
  if(groupA!==groupB&&similarity>maxCrossGroupSimilarity.value)maxCrossGroupSimilarity={value:similarity,pair:[shingleDocs[i].file,shingleDocs[j].file]};
}
let brokenTocTargets=0;
for(const file of fs.readdirSync('guides').filter(name=>name.endsWith('.html'))){const html=fs.readFileSync(path.join('guides',file),'utf8');const toc=html.match(/<nav class="toc">([\s\S]*?)<\/nav>/)?.[1]??'';for(const match of toc.matchAll(/href="#([^"]+)"/g)){if(!html.includes(`id="${match[1]}"`))brokenTocTargets++;}}
console.log(JSON.stringify({
  count: rows.length,
  minimum: rows[0],
  maximum: rows.at(-1),
  under2500: rows.filter(row => row.length < 2500).length,
  missingToc: rows.filter(row => !row.toc).length,
  missingFaq: rows.filter(row => row.faqCount < 5).length,
  missingFaqSchema: rows.filter(row => !row.faqSchema).length,
  missingFixedNav: rows.filter(row => !row.fixedNav).length,
  missingRelated: rows.filter(row => !row.related).length,
  brokenTocTargets,
  averageEightCharShingleSimilarity: pairCount ? sumSimilarity / pairCount : 0,
  maximumEightCharShingleSimilarity: maxSimilarity,
  maximumWithinGroupSimilarity: maxWithinGroupSimilarity,
  maximumCrossGroupSimilarity: maxCrossGroupSimilarity,
  lowestTen: rows.slice(0, 10),
}, null, 2));
