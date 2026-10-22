import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const coupons=[
  ['EdgeNova 边缘节点','xk808','优惠力度以结算页显示为准','https://vip.edgenovaaff.com/#/?code=2OqZX1IP'],
  ['极连云','JLY888','优惠力度以结算页显示为准','https://a1917.jlyvipaff.com/#/?code=vT32Xl9X'],
  ['快狸','kl888','优惠力度以结算页显示为准','https://yj2081.kuailiaff.com/#/register?code=531W9eSU'],
  ['速界','sujie888','优惠力度以结算页显示为准','https://wudaogang.speedworldaff.com/#/register?code=HOJbbjuY'],
  ['可信云','kxy80','优惠力度以结算页显示为准','https://shadow_vps.kosingaff.com/#/register?code=UvY3PsfK'],
  ['云图','yt88','优惠力度以结算页显示为准','https://super.ytjcok.org/#/register?code=75w0GoY2'],
  ['光年梯','GNT80','优惠力度以结算页显示为准','https://gnt001.gntvipaff.cc/#/?code=yAzo4IqK'],
  ['闪电鼠','sd88','参考七折优惠券','https://eothvip01.shandianshuaff.com/#/?code=EfJpujr9'],
  ['大佬云','dly88','参考七折优惠券','https://liu01.dalaoyunaff.com/#/?code=LqIwc3Nf'],
  ['神行加速','sx0077','参考七折优惠券','https://fugui0077.shenxingaff.com/#/?code=5L345JjO'],
  ['环球梯','hq66','参考七折优惠券','https://123pps01.huanqiutiaff.com/#/?code=1T3PsUTF'],
  ['榴莲云','ll88','参考七折优惠券','http://853vip01.liulianyunaff.com/#/?code=cFwn3C3v'],
  ['云界线','yjx88','参考七折优惠券','https://youxia01.yunjiexianaff.com/#/?code=Wj8f6Nh4']
];

const faqItems=[
  ['机场优惠码应该在哪里输入','通常在选择套餐后的订单确认页、优惠券或折扣码输入框中填写。输入后先确认应付金额发生变化，再完成支付。'],
  ['机场优惠码为什么提示无效','常见原因包括大小写错误、活动结束、仅限新用户、仅限指定套餐、已经使用过或不能与其他活动叠加。'],
  ['优惠码是否适用于所有机场套餐','不一定。月付、季付、年付、一次性流量和特价套餐可能使用不同规则，必须以结算页提示为准。'],
  ['机场优惠码可以和活动价格叠加吗','多数情况下不能自动叠加。应比较活动价与使用优惠码后的最终应付金额，而不是只比较标称折扣。'],
  ['优惠码区分大小写吗','部分系统区分大小写。建议直接复制本站展示的完整代码，并检查前后是否带有空格。'],
  ['输入优惠码后价格没有变化怎么办','不要立即付款。重新选择套餐、清空旧优惠、刷新订单或联系服务商确认适用范围，并保存结算页截图。'],
  ['年付优惠很大是否值得购买','折扣越大不代表风险越低。新用户应先月付或短周期测试线路、客户端和晚高峰表现，再决定是否延长周期。'],
  ['如何确认优惠码仍然有效','只有结算页显示折扣后的最终金额才能视为当前有效；本站收录仅用于查找，价格和活动可能随时调整。']
];

const nav=prefix=>`<header class="global-fixed-header"><nav class="global-nav-wrap"><a class="global-logo" href="${prefix}index.html"><img class="global-logo-image" src="${prefix}assets/v2ray-logo.svg" width="38" height="38" alt="V2Ray机场推荐榜和梯子选购（持续更新） Logo"><span class="global-logo-text">V2Ray机场推荐榜和梯子选购（持续更新）</span></a><div class="global-navlinks"><a href="${prefix}index.html#recommend">机场推荐</a><a href="${prefix}rankings.html">机场排行榜</a><a href="${prefix}coupons.html">机场优惠码</a><a href="${prefix}tutorials.html">机场使用工具</a><a href="${prefix}guide.html">梯子指南</a><a href="${prefix}troubleshooting.html">机场常见问题解决</a><a href="${prefix}runaway-alert.html">机场跑路预警</a><a href="${prefix}about.html">关于</a></div></nav></header>`;

const style=`:root{--bg:#f5f7fa;--card:#fff;--ink:#0b1220;--muted:#637083;--line:#dde4ec;--brand:#087f72;--blue:#1685c3;--soft:#e9f6f3;--accent:#fff7db}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;padding-top:70px;background:var(--bg);color:var(--ink);font-family:Inter,"Microsoft YaHei",system-ui,sans-serif;line-height:1.75}a{color:inherit;text-decoration:none}.wrap{width:min(1160px,calc(100% - 30px));margin:auto}.global-fixed-header{position:fixed;top:0;left:0;right:0;z-index:9999;height:70px;background:rgba(245,247,250,.97);backdrop-filter:blur(15px);border-bottom:1px solid var(--line)}.global-nav-wrap{width:min(1260px,calc(100% - 24px));height:70px;margin:auto;display:flex;align-items:center;gap:15px}.global-logo{margin-right:auto;display:flex;align-items:center;gap:9px;font-size:18px;font-weight:900;white-space:nowrap}.global-logo-mark{width:32px;height:32px;display:grid;place-items:center;border-radius:9px;background:linear-gradient(135deg,var(--brand),var(--blue));color:#fff;font-size:11px}.global-navlinks{display:flex;gap:13px;white-space:nowrap}.global-navlinks a{font-size:12px;font-weight:750}.global-navlinks a:hover{color:var(--brand)}.hero{padding:68px 0 42px;border-bottom:1px solid var(--line)}.eyebrow{color:var(--brand);font-size:12px;font-weight:900;letter-spacing:.09em}.hero h1{font-size:clamp(40px,5.5vw,66px);line-height:1.08;letter-spacing:-.05em;margin:12px 0 16px}.hero p{max-width:880px;color:var(--muted);font-size:17px}.notice{margin-top:22px;padding:17px 19px;border-left:4px solid var(--brand);background:var(--soft);border-radius:0 13px 13px 0}.section{padding:38px 0 70px}.coupon-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.coupon-card{background:#fff;border:1px solid var(--line);border-radius:17px;padding:21px;display:flex;flex-direction:column;min-height:245px}.coupon-card:hover{border-color:#8abbb3;transform:translateY(-1px)}.coupon-card h2{font-size:22px;margin:5px 0}.coupon-card p{color:var(--muted);font-size:13px;flex:1}.coupon-code{display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--accent);border:1px dashed #d7b954;border-radius:12px;padding:13px;margin:12px 0}.coupon-code code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:17px;font-weight:900}.coupon-code span{font-size:11px;color:#7a6514}.actions{display:flex;gap:8px}.btn{display:inline-block;padding:9px 12px;border-radius:10px;background:var(--ink);color:#fff;font-size:13px;font-weight:800}.btn.secondary{background:var(--soft);color:var(--brand)}.howto{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:40px 0}.howto div{background:#fff;border:1px solid var(--line);border-radius:14px;padding:17px}.howto b{display:block;color:var(--brand);margin-bottom:5px}.faq{margin-top:50px}.faq h2{font-size:32px}.faq details{background:#fff;border:1px solid var(--line);border-radius:13px;padding:0 16px;margin:9px 0}.faq summary{cursor:pointer;font-weight:800;padding:15px 24px 15px 0}.faq p{color:var(--muted)}.global-internal-links{background:#eef3f7;border-top:1px solid var(--line);padding:24px 15px}.global-internal-links-inner{width:min(1160px,100%);margin:auto;display:flex;gap:12px 22px;flex-wrap:wrap}.global-internal-links a{color:var(--brand);font-size:13px;font-weight:750}footer{background:#0b1220;color:#9caabc;padding:35px 0}.foot{display:flex;justify-content:space-between}.foot b{color:#fff}@media(max-width:1050px){.coupon-grid{grid-template-columns:1fr 1fr}.global-navlinks{gap:9px}.global-navlinks a{font-size:11px}}@media(max-width:760px){body{padding-top:64px}.global-fixed-header,.global-nav-wrap{height:64px}.global-logo span:last-child{display:none}.global-navlinks{overflow-x:auto;scrollbar-width:none}.coupon-grid,.howto{grid-template-columns:1fr}.hero h1{font-size:42px}}`;

const couponCards=coupons.map(([name,code,note,url])=>`<article class="coupon-card"><span class="eyebrow">机场优惠码</span><h2>${name}</h2><div class="coupon-code"><code>${code}</code><span>${note}</span></div><p>下单前复制优惠码，在订单结算页输入并核对最终金额。活动范围、套餐限制与有效期可能调整。</p><div class="actions"><a class="btn" href="${url}" rel="nofollow sponsored" target="_blank">前往服务商 · 推广 ↗</a><a class="btn secondary" href="troubleshooting.html#coupon">优惠码FAQ</a></div></article>`).join('');
const faqHtml=faqItems.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
const faqSchema=faqItems.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}));
const page=`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="整理EdgeNova、极连云、快狸、速界、可信云、云图、光年梯、闪电鼠、大佬云、神行加速、环球梯、榴莲云和云界线机场优惠码及使用FAQ。"><title>2026机场优惠码大全｜13家机场折扣码与使用FAQ</title><link rel="canonical" href="https://v2raytizi.com/coupons.html"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqSchema})}</script><style>${style}</style></head><body>${nav('')}<main><section class="hero"><div class="wrap"><span class="eyebrow">AIRPORT COUPON CODES</span><h1>2026机场优惠码大全：13家机场折扣码与使用说明</h1><p>集中整理本站机场排行榜对应优惠码，方便下单时核对。优惠活动、适用套餐和最终折扣可能随时变化，只有结算页显示的最终金额才是有效依据。</p><div class="notice"><b>使用提醒：</b>先选择套餐，再输入优惠码；确认订单金额确实下降后再付款。本站包含推广链接，可能从成交中获得佣金，但不会因此隐藏优惠限制和预付风险。</div></div></section><section class="section"><div class="wrap"><div class="coupon-grid">${couponCards}</div><div class="howto"><div><b>1. 复制代码</b><span>注意字母大小写和前后空格。</span></div><div><b>2. 选择套餐</b><span>确认月付、年付或一次性套餐是否适用。</span></div><div><b>3. 核对金额</b><span>折扣未反映到应付金额时不要支付。</span></div><div><b>4. 保存订单</b><span>保留套餐、金额、优惠和退款条款截图。</span></div></div><section class="faq" id="faq"><span class="eyebrow">COUPON FAQ</span><h2>机场优惠码常见问题</h2>${faqHtml}</section></div></section></main><section class="global-internal-links"><div class="global-internal-links-inner"><b>站内导航</b><a href="index.html">返回首页</a><a href="rankings.html">机场排行榜</a><a href="tutorials.html">机场使用工具</a><a href="guide.html">梯子选购指南</a><a href="troubleshooting.html#coupon">优惠码问题库</a><a href="runaway-alert.html">机场跑路预警</a></div></section><footer><div class="wrap foot"><div><b>V2Ray机场推荐榜和梯子选购（持续更新）</b><div>机场优惠码与选购指南</div></div><div>最终优惠以服务商结算页面为准</div></div></footer></body></html>`;
fs.writeFileSync(path.join(root,'coupons.html'),page,'utf8');

const faqBase=fs.readFileSync(path.join(root,'faq','q156.html'),'utf8');
faqItems.forEach(([question,answer],i)=>{
  const n=157+i;
  let html=faqBase
    .replace(/<title>.*?<\/title>/,`<title>${question}｜机场FAQ问题库</title>`)
    .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${question}：机场优惠码与折扣活动FAQ解答。">`)
    .replace(/https:\/\/v2raytizi\.com\/faq\/q156\.html/,`https://v2raytizi.com/faq/q${String(n).padStart(3,'0')}.html`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:[{'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}]})}</script>`)
    .replace(/基础知识与使用工具/g,'优惠码与活动规则')
    .replace(/<h1>.*?<\/h1>/,`<h1>${question}</h1>`)
    .replace(/<div class="answer-box"><b>简短回答<\/b><p>.*?<\/p><\/div>/,`<div class="answer-box"><b>简短回答</b><p>${answer}</p></div>`)
    .replace(/<p>基础概念、客户端选择、下载安全与配置方法<\/p>/,'<p>优惠码、活动期限、套餐限制与结算核对</p>')
    .replace(/<a href="\.\.\/tutorials\.html">查看机场使用工具<\/a>/,'<a href="../coupons.html">查看全部机场优惠码</a>')
    .replace(/troubleshooting\.html#tools/g,'troubleshooting.html#coupon');
  fs.writeFileSync(path.join(root,'faq',`q${String(n).padStart(3,'0')}.html`),html,'utf8');
});

const replacements={EdgeNova60:'xk808',WUDAO60:'sujie888',FAST60:'kl888',LIGHT30:'GNT80',JILIAN50:'JLY888',SDM30:'sd88',DALAOVIP:'dly88',SXJS30:'sx0077',GLOBAL20:'hq66',LIULIAN30:'ll88',YUNJIE20:'yjx88'};
const editable=[];
const selfPath=path.resolve(process.argv[1]);
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name==='.git'||entry.name==='node_modules')continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(/\.(html|md|astro|ts|mjs)$/.test(entry.name)&&path.resolve(full)!==selfPath)editable.push(full);}}
walk(root);
for(const file of editable){
  let text=fs.readFileSync(file,'utf8');
  for(const [from,to] of Object.entries(replacements))text=text.split(from).join(to);
  text=text.replace(/(\['可信云',[^\]]*?)'MvAmCcYh'/g,"$1'kxy80'").replace(/(\['云图',[^\]]*?)'MvAmCcYh'/g,"$1'yt88'");
  if(file.endsWith('.html')&&!text.includes('${prefix}')){
    text=text.replace(/(<a href="([^"]*)rankings\.html">[^<]*机场排行榜<\/a>)(?!<a href="[^"]*coupons\.html">)(<a href="([^"]*)tutorials\.html">机场使用工具<\/a>)/g,(m,ranking,prefix,tools)=>`${ranking}<a href="${prefix}coupons.html">机场优惠码</a>${tools}`);
  }
  fs.writeFileSync(file,text,'utf8');
}

let troubleshooting=fs.readFileSync(path.join(root,'troubleshooting.html'),'utf8');
troubleshooting=troubleshooting.replace(/156个机场使用问题/g,'164个机场使用问题').replace(/156个机场FAQ/g,'164个机场FAQ').replace(/查看全部156个问题/g,'查看全部164个问题').replace(/共156个问题/g,'共164个问题').replace(/｜156个问题解答/g,'｜164个问题解答');
if(!troubleshooting.includes('href="#coupon"'))troubleshooting=troubleshooting.replace('</nav></div></section><section class="library">','<a href="#coupon">优惠码与活动规则</a></nav></div></section><section class="library">');
const faqCards=faqItems.map(([q],i)=>`<a class="question" data-search="${q} 优惠码与活动规则" href="faq/q${String(157+i).padStart(3,'0')}.html"><span>${q}</span><small>查看答案 →</small></a>`).join('');
if(!troubleshooting.includes('id="coupon"'))troubleshooting=troubleshooting.replace('</div></section></main>',`<section class="category" id="coupon"><div class="category-head"><div><span class="eyebrow">优惠码与活动规则</span><h2>机场优惠码常见问题</h2></div><p>折扣码、适用套餐、叠加规则与结算核对 · ${faqItems.length}个问题</p></div><div class="question-grid">${faqCards}</div><p style="margin-top:16px"><a href="coupons.html" style="color:var(--brand);font-weight:800">查看13家机场优惠码汇总 →</a></p></section></div></section></main>`);
fs.writeFileSync(path.join(root,'troubleshooting.html'),troubleshooting,'utf8');

console.log(JSON.stringify({couponCount:coupons.length,newFaq:faqItems.length,totalFaq:164,filesUpdated:editable.length},null,2));
