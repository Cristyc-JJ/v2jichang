import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const brand = 'V2Ray机场推荐榜和梯子选购（持续更新）';
const previousBrand = 'V2Ray机场推荐榜和梯子选购';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const htmlFiles = walk(root).filter(file => file.endsWith('.html'));
const brandStyle = `<style id="brand-identity-style">.global-logo-image{width:38px!important;height:38px!important;display:block!important;flex:0 0 38px!important}.global-logo-text{font-size:14px!important;font-weight:900!important;letter-spacing:-.02em!important;color:#101827!important}.global-logo-mark{display:none!important}@media(max-width:1180px){.global-logo-text{max-width:128px!important;white-space:normal!important;line-height:1.15!important;font-size:12px!important}}@media(max-width:900px){.global-logo-text{display:none!important}.global-logo-image{width:36px!important;height:36px!important;flex-basis:36px!important}}</style>`;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(path.dirname(file), root).replaceAll('\\', '/');
  const prefix = rel ? `${rel}/` : '';
  const logo = `<img class="global-logo-image" src="${prefix}assets/v2ray-logo.svg" width="38" height="38" alt="${brand} Logo"><span class="global-logo-text">${brand}</span>`;

  html = html.replace(/<span class="global-logo-mark">V2<\/span><span>[^<]*<\/span>/g, logo);
  html = html.replaceAll('V2梯子', brand);
  html = html.replaceAll(previousBrand, brand);
  html = html.replaceAll(`${brand}（持续更新）`, brand);
  html = html.replace(/<div class="logo"><span class="mark">V2<\/span>([^<]+)<\/div>/g, `<div class="logo"><img class="global-logo-image" src="${prefix}assets/v2ray-logo.svg" width="38" height="38" alt="${brand} Logo"><span class="global-logo-text">$1</span></div>`);
  html = html.replaceAll('V2Ray机场推荐榜和梯子选购机场推荐榜和梯子选购', brand);

  if (!html.includes('id="brand-identity-style"')) html = html.replace('</head>', `${brandStyle}</head>`);
  if (!/rel=["']icon["']/.test(html)) {
    html = html.replace('</head>', `<link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg"><meta name="theme-color" content="#101827"></head>`);
  }
  fs.writeFileSync(file, html);
}

const sourceFiles = walk(root).filter(file => /\.(mjs|astro|ts|css)$/.test(file));
for (const file of sourceFiles) {
  let text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('update-branding.mjs')) continue;
  text = text.replaceAll('V2梯子', brand);
  text = text.replaceAll(previousBrand, brand);
  text = text.replaceAll(`${brand}（持续更新）`, brand);
  text = text.replaceAll('<span class="global-logo-mark">V2</span><span>V2Ray机场推荐榜和梯子选购</span>', '<img class="global-logo-image" src="${prefix}assets/v2ray-logo.svg" width="38" height="38" alt="V2Ray机场推荐榜和梯子选购 Logo"><span class="global-logo-text">V2Ray机场推荐榜和梯子选购</span>');
  text = text.replaceAll('<span class="logo-mark">V2</span><span>V2Ray机场推荐榜和梯子选购</span>', '<img class="logo-image" src="/logo.svg" width="38" height="38" alt="V2Ray机场推荐榜和梯子选购 Logo"><span>V2Ray机场推荐榜和梯子选购</span>');
  fs.writeFileSync(file, text);
}

console.log(`Updated branding in ${htmlFiles.length} HTML files and ${sourceFiles.length} source files.`);
