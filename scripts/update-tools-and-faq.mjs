import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const nav = prefix => `<header class="global-fixed-header"><nav class="global-nav-wrap"><a class="global-logo" href="${prefix}index.html"><img class="global-logo-image" src="${prefix}assets/v2ray-logo.svg" width="38" height="38" alt="V2Ray机场推荐榜和梯子选购（持续更新） Logo"><span class="global-logo-text">V2Ray机场推荐榜和梯子选购（持续更新）</span></a><div class="global-navlinks"><a href="${prefix}index.html#recommend">机场推荐</a><a href="${prefix}rankings.html">机场排行榜</a><a href="${prefix}coupons.html">机场优惠码</a><a href="${prefix}tutorials.html">机场使用工具</a><a href="${prefix}guide.html">梯子指南</a><a href="${prefix}troubleshooting.html">机场常见问题解决</a><a href="${prefix}runaway-alert.html">机场跑路预警</a><a href="${prefix}about.html">关于</a></div></nav></header>`;

const baseStyle = `:root{--bg:#f5f7fa;--card:#fff;--ink:#0b1220;--muted:#637083;--line:#dde4ec;--brand:#087f72;--blue:#1685c3;--soft:#e9f6f3}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;padding-top:70px;background:var(--bg);color:var(--ink);font-family:Inter,"Microsoft YaHei",system-ui,sans-serif;line-height:1.75}a{color:inherit;text-decoration:none}.wrap{width:min(1160px,calc(100% - 30px));margin:auto}.global-fixed-header{position:fixed;top:0;left:0;right:0;z-index:9999;height:70px;background:rgba(245,247,250,.97);backdrop-filter:blur(15px);border-bottom:1px solid var(--line)}.global-nav-wrap{width:min(1220px,calc(100% - 28px));height:70px;margin:auto;display:flex;align-items:center;gap:18px}.global-logo{margin-right:auto;display:flex;align-items:center;gap:9px;font-size:18px;font-weight:900;white-space:nowrap}.global-logo-mark{width:32px;height:32px;display:grid;place-items:center;border-radius:9px;background:linear-gradient(135deg,var(--brand),var(--blue));color:#fff;font-size:11px}.global-navlinks{display:flex;gap:15px;white-space:nowrap}.global-navlinks a{font-size:13px;font-weight:750}.global-navlinks a:hover{color:var(--brand)}.hero{padding:68px 0 40px;border-bottom:1px solid var(--line)}.eyebrow{color:var(--brand);font-size:12px;font-weight:900;letter-spacing:.09em}.hero h1{font-size:clamp(40px,5.5vw,66px);line-height:1.08;letter-spacing:-.05em;margin:12px 0 16px;max-width:1000px}.hero p{max-width:850px;color:var(--muted);font-size:17px}.section{padding:38px 0 70px}.section h2{font-size:31px;margin:42px 0 9px}.category-nav{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}.category-nav a{padding:7px 12px;background:#fff;border:1px solid var(--line);border-radius:999px;color:var(--brand);font-size:12px;font-weight:800}.tool-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.tool-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:21px;display:flex;flex-direction:column;min-height:250px}.tool-card:hover{border-color:#8abbb3;transform:translateY(-1px)}.tool-card .platform{color:var(--brand);font-size:12px;font-weight:900}.tool-card h3{font-size:22px;margin:7px 0}.tool-card p{color:var(--muted);font-size:14px;flex:1}.tool-card .actions{display:flex;gap:8px;flex-wrap:wrap}.tool-card .button{display:inline-block;padding:9px 12px;border-radius:10px;background:var(--ink);color:#fff;font-size:13px;font-weight:800}.tool-card .secondary{background:var(--soft);color:var(--brand)}.note{margin:22px 0;padding:18px 20px;border-left:4px solid var(--brand);background:var(--soft);border-radius:0 13px 13px 0;color:#3e5661}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.step{background:#fff;border:1px solid var(--line);border-radius:15px;padding:18px}.step b{display:block;color:var(--brand);margin-bottom:6px}.global-internal-links{background:#eef3f7;border-top:1px solid var(--line);padding:24px 15px}.global-internal-links-inner{width:min(1160px,100%);margin:auto;display:flex;gap:12px 22px;flex-wrap:wrap}.global-internal-links a{color:var(--brand);font-size:13px;font-weight:750}footer{background:#0b1220;color:#9caabc;padding:35px 0}.foot{display:flex;justify-content:space-between}.foot b{color:#fff}@media(max-width:950px){.tool-grid{grid-template-columns:1fr 1fr}.steps{grid-template-columns:1fr 1fr}.global-navlinks{gap:10px}.global-navlinks a{font-size:12px}}@media(max-width:720px){body{padding-top:64px}.global-fixed-header,.global-nav-wrap{height:64px}.global-logo span:last-child{display:none}.global-navlinks{overflow-x:auto;scrollbar-width:none}.tool-grid,.steps{grid-template-columns:1fr}.hero h1{font-size:42px}}`;

const toolGroups = [
  {id:'windows',name:'Windows 工具',items:[
    ['Clash Verge Rev','Windows / macOS / Linux','支持订阅导入、规则模式、系统代理与 TUN，适合希望使用图形界面的用户。','https://github.com/clash-verge-rev/clash-verge-rev/releases'],
    ['v2rayN','Windows','成熟的 Windows 多协议客户端，适合需要查看日志、手动切换核心与精细排查的用户。','https://github.com/2dust/v2rayN/releases'],
    ['Hiddify','Windows / macOS / Linux','跨平台界面统一，适合希望减少不同系统配置差异的用户。','https://github.com/hiddify/hiddify-app/releases']
  ]},
  {id:'mobile',name:'手机与平板工具',items:[
    ['FlClash','Android / Windows / macOS / Linux','跨平台 Mihomo 客户端，可导入订阅并使用规则分流。','https://github.com/chen08209/FlClash/releases'],
    ['Shadowrocket','iPhone / iPad','iOS 常用付费代理客户端；下载前请核对 App Store 开发者与所在地区。','https://apps.apple.com/us/app/shadowrocket/id932747118'],
    ['Stash','iPhone / iPad / Mac','面向规则分流用户的 Apple 平台客户端，适合需要图形化策略管理的用户。','https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349']
  ]},
  {id:'advanced',name:'进阶与多平台工具',items:[
    ['sing-box','Windows / macOS / Linux / Android / iOS','适合了解配置文件、路由规则和新协议的进阶用户，建议先阅读官方安装文档。','https://sing-box.sagernet.org/installation/'],
    ['Clash Nyanpasu','Windows / macOS / Linux','桌面端图形客户端，适合希望管理配置、订阅和内核运行状态的用户。','https://github.com/libnyanpasu/clash-nyanpasu/releases'],
    ['Surge 5','iPhone / iPad / Mac','面向网络调试、规则和自动化需求的专业工具，功能丰富但学习成本较高。','https://apps.apple.com/us/app/surge-5/id1442620678']
  ]},
  {id:'router',name:'路由器与家庭网络',items:[
    ['OpenClash','OpenWrt 路由器','适用于支持 OpenWrt 的路由器。安装前必须确认设备架构、固件空间和恢复方式。','https://github.com/vernesong/OpenClash/releases'],
    ['Mihomo','命令行 / 路由器 / 服务器','Mihomo 核心发布页，适合已了解配置文件和服务管理的高级用户。','https://github.com/MetaCubeX/mihomo/releases'],
    ['Quantumult X','iPhone / iPad','Apple 平台规则与自动化工具，适合已有配置经验的用户。','https://apps.apple.com/us/app/quantumult-x/id1443988620']
  ]}
];

const toolSections = toolGroups.map(group => `<section id="${group.id}"><h2>${group.name}</h2><div class="tool-grid">${group.items.map(([name,platform,desc,url])=>`<article class="tool-card"><span class="platform">${platform}</span><h3>${name}</h3><p>${desc}</p><div class="actions"><a class="button" href="${url}" target="_blank" rel="noopener noreferrer">前往官方下载 ↗</a><a class="button secondary" href="troubleshooting.html#client">查看配置FAQ</a></div></article>`).join('')}</div></section>`).join('');

const tutorials = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="机场使用工具下载导航，整理Windows、macOS、Android、iOS、Linux和OpenWrt常用客户端的官方下载入口与安全提示。"><title>机场使用工具下载｜客户端与路由器工具导航</title><link rel="canonical" href="https://v2raytizi.com/tutorials.html"><style>${baseStyle}</style></head><body>${nav('')}<main><section class="hero"><div class="wrap"><span class="eyebrow">AIRPORT CLIENT TOOLS</span><h1>机场使用工具：常用客户端下载与安全使用指南</h1><p>按系统整理常用代理客户端、跨平台工具和路由器组件。所有下载按钮均跳转至项目发布页、官方文档或 App Store；本站不托管安装包，也不会要求上传订阅地址。</p><nav class="category-nav"><a href="#windows">Windows</a><a href="#mobile">手机与平板</a><a href="#advanced">进阶工具</a><a href="#router">路由器工具</a><a href="#safe">下载安全</a></nav></div></section><section class="section"><div class="wrap"><div class="note"><b>下载前先确认：</b>客户端只是导入和运行订阅的工具，不等于机场服务本身。优先使用项目发布页或官方应用商店，核对开发者、版本日期、系统架构与文件签名，拒绝来历不明的二次打包安装包。</div>${toolSections}<section id="safe"><h2>安全下载与导入顺序</h2><div class="steps"><div class="step"><b>1. 确认系统</b><span>区分 Windows、macOS、Android、iOS、Linux 和路由器架构。</span></div><div class="step"><b>2. 只走官方入口</b><span>从项目发布页、官方文档或 App Store 获取客户端。</span></div><div class="step"><b>3. 备份原配置</b><span>升级或更换核心前保存可恢复的配置和规则。</span></div><div class="step"><b>4. 私密导入订阅</b><span>不要把订阅链接粘贴到陌生网站、群聊或公开截图中。</span></div></div></section><section><h2>参考资料与更多下载说明</h2><p>工具范围参考了机场检测网的客户端下载分类，并重新核对为项目发布页或应用商店外链。若需要查看该页面的原始分类，可访问 <a href="https://jichangjiance.net/downloads/" target="_blank" rel="noopener noreferrer" style="color:var(--brand);font-weight:800">机场检测网客户端下载页 ↗</a>。具体兼容性、收费和版本状态以各工具官方页面为准。</p></section></div></section></main><section class="global-internal-links"><div class="global-internal-links-inner"><b>站内导航</b><a href="index.html">返回首页</a><a href="index.html#recommend">首页三大机场</a><a href="rankings.html">完整机场排行榜</a><a href="guide.html">梯子选购指南</a><a href="troubleshooting.html">机场FAQ问题库</a><a href="runaway-alert.html">机场跑路预警</a></div></section><footer><div class="wrap foot"><div><b>V2Ray机场推荐榜和梯子选购（持续更新）</b><div>机场客户端与使用工具导航</div></div><div>下载与版本信息以官方页面为准</div></div></footer></body></html>`;

fs.writeFileSync(path.join(root,'tutorials.html'), tutorials, 'utf8');

const additions = [
  ['机场、VPN和代理软件分别是什么','机场通常提供订阅与多个代理节点，VPN更常以完整应用和单一服务形态出现，代理软件则只是读取配置并建立连接的客户端。三者不能只凭名称判断安全性或稳定性。'],
  ['使用机场前需要了解哪些法律与合规问题','应遵守所在地法律法规、单位网络政策以及目标平台条款。不要把代理工具用于未经授权的访问、攻击、侵权或其他违法活动。'],
  ['机场订阅链接为什么不能公开','订阅链接通常相当于访问凭证，泄露后他人可能消耗流量、占用设备数或读取节点信息。发现泄露应立即在后台重置订阅。'],
  ['节点、订阅和客户端之间是什么关系','订阅是一组会更新的节点配置，节点是具体连接入口，客户端负责读取订阅、选择节点并执行系统代理或规则分流。'],
  ['规则模式、全局模式和直连模式怎么区分','规则模式按域名或地址决定是否代理；全局模式让大多数流量走代理；直连模式不使用代理。日常优先规则模式，排查时才短暂切换。'],
  ['为什么客户端能打开却不代表配置正确','客户端启动只说明程序能运行，还需要检查订阅是否更新、节点是否可用、系统代理是否生效、DNS与规则是否匹配。'],
  ['Clash Verge Rev怎么导入机场订阅','从机场后台复制个人订阅，在配置或订阅页面添加并更新，选择可用配置后开启系统代理。界面名称可能随版本变化，应以项目说明为准。'],
  ['v2rayN怎么导入机场订阅','在订阅分组中添加个人订阅地址，更新服务器列表，选择节点后启用系统代理。出现失败时先查看日志、核心版本和系统时间。'],
  ['FlClash适合哪些设备','FlClash覆盖 Android 和多个桌面系统，适合希望不同设备使用接近界面的用户。下载时仍需按系统和CPU架构选择安装包。'],
  ['Hiddify导入订阅时要注意什么','只从可信来源复制订阅，不要把链接交给在线转换网站；导入后先测试少量节点，并确认路由和DNS设置符合使用需求。'],
  ['macOS提示客户端来自未知开发者怎么办','先确认下载来源和项目签名，再在系统隐私与安全设置中查看拦截原因。不要为了安装未知软件长期关闭系统安全保护。'],
  ['iPhone为什么搜索不到Shadowrocket等客户端','应用是否显示与 Apple ID 地区、当地商店政策和设备系统版本有关。不要购买来源不明的共享账号，也不要在陌生页面输入 Apple ID。'],
  ['iOS客户端为什么通常需要付费购买','许多 iOS 网络工具通过 App Store 一次性或订阅收费，费用属于客户端开发者，不包含机场套餐和节点服务。'],
  ['Linux用户应该选择图形客户端还是命令行核心','桌面新手可选跨平台图形客户端；服务器或熟悉配置管理的用户可使用 sing-box、Mihomo 等核心。命令行方案需要自行维护服务、日志和配置权限。'],
  ['电视盒子如何选择机场工具','先确认系统是否为 Android TV、是否允许安装应用以及是否支持遥控操作。不能安装客户端时，可考虑由路由器或旁路由统一提供网络。'],
  ['浏览器代理扩展可以代替完整客户端吗','浏览器扩展通常只处理浏览器流量，无法覆盖桌面应用、游戏或系统服务。使用前还要核对扩展权限和开发者来源。'],
  ['游戏主机没有客户端时怎么连接','可通过支持代理的路由器、旁路由或电脑共享网络，但需要额外关注NAT、UDP、延迟和稳定性，不能只看网页测速。'],
  ['路由器安装OpenClash前要准备什么','确认路由器型号、CPU架构、固件空间与备份恢复方法。刷写或安装插件存在断网和设备不可用风险，新手应先保留原固件。'],
  ['订阅转换工具什么时候才需要使用','只有客户端无法识别原订阅格式时才考虑转换，并优先使用机场自带或本地可信工具。第三方在线转换可能记录订阅凭证。'],
  ['客户端核心需要频繁更新吗','不必为了版本号每天更新。遇到安全修复、协议兼容或明确故障时再升级，并在升级前备份配置和确认回退方法。'],
  ['机场工具应该从哪里下载最安全','优先项目官方网站、GitHub发布页或官方应用商店；核对开发者、仓库名称、发布时间和校验信息，避免搜索广告中的仿冒站。'],
  ['安装多个代理客户端会互相冲突吗','可能冲突。多个客户端同时修改系统代理、TUN、DNS或端口时会导致无法联网。排查时只保留一个客户端运行。'],
  ['卸载机场客户端后为什么仍然无法上网','可能遗留系统代理、TUN适配器、DNS或开机服务。先关闭代理并恢复自动网络设置，再按客户端文档清理残留组件。'],
  ['更换客户端后原来的节点还能使用吗','只要新客户端支持订阅中的协议和配置格式，通常可以继续使用；但规则、策略组和脚本未必能直接迁移。'],
  ['如何判断应该换节点、换客户端还是换机场','同一客户端切换多个节点可判断节点问题；同一订阅换可信客户端可判断软件问题；跨网络仍全部失败并且公告异常时，再评估服务本身。'],
  ['机场工具的测速结果为什么不能直接当排行榜','客户端测速受测试服务器、线程、缓存、本地宽带和时段影响。排行榜应结合多日可用率、丢包、实际任务和故障恢复记录。']
];

const faqStyle = `${baseStyle}.article{padding:58px 0 80px}.breadcrumbs{font-size:13px;color:var(--muted);margin-bottom:24px}.article-shell{display:grid;grid-template-columns:minmax(0,780px) 270px;gap:42px;align-items:start}.article-main{background:#fff;border:1px solid var(--line);border-radius:20px;padding:34px}.article-main h1{font-size:clamp(32px,4.5vw,50px);line-height:1.15;margin:8px 0 20px}.article-main h2{font-size:25px;margin:34px 0 10px}.article-main p,.article-main li{color:#465568}.answer-box{padding:18px;border-left:4px solid var(--brand);background:var(--soft);border-radius:0 13px 13px 0}.side{position:sticky;top:92px}.side-card{background:#fff;border:1px solid var(--line);border-radius:15px;padding:19px}.side-card a{display:block;color:var(--brand);font-weight:750;margin-top:8px}@media(max-width:820px){.article-shell{grid-template-columns:1fr}.side{position:static}}`;

function faqPage(number, question, answer) {
  const schema = {'@context':'https://schema.org','@type':'FAQPage',mainEntity:[{'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}]};
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${question}：机场工具、客户端与基础知识FAQ解答。"><title>${question}｜机场FAQ问题库</title><link rel="canonical" href="https://v2raytizi.com/faq/q${String(number).padStart(3,'0')}.html"><script type="application/ld+json">${JSON.stringify(schema)}</script><style>${faqStyle}</style></head><body>${nav('../')}<main class="article"><div class="wrap"><div class="breadcrumbs"><a href="../index.html">首页</a> / <a href="../troubleshooting.html">机场FAQ问题库</a> / 基础知识与使用工具</div><div class="article-shell"><article class="article-main"><span class="eyebrow">基础知识与使用工具</span><h1>${question}</h1><div class="answer-box"><b>简短回答</b><p>${answer}</p></div><h2>建议操作顺序</h2><ol><li>先确认自己的系统、设备、网络环境和真实使用需求。</li><li>只从项目发布页、官方文档或应用商店获取客户端。</li><li>导入个人订阅后先测试一个节点，不要同时修改多个设置。</li><li>保存错误提示和日志，按节点、客户端、本地网络和服务状态逐层排查。</li></ol><h2>安全提醒</h2><p>不要公开订阅链接、账号密码或包含个人凭证的截图。软件版本、系统权限和服务规则会变化，具体操作应以工具官方说明和机场最新帮助文档为准。</p></article><aside class="side"><div class="side-card"><b>问题分类</b><p>基础概念、客户端选择、下载安全与配置方法</p><a href="../tutorials.html">查看机场使用工具</a><a href="../troubleshooting.html#tools">返回本分类</a><a href="../troubleshooting.html">查看全部问题</a></div></aside></div></div></main><section class="global-internal-links"><div class="global-internal-links-inner"><b>站内导航</b><a href="../index.html">返回首页</a><a href="../rankings.html">机场排行榜</a><a href="../tutorials.html">机场使用工具</a><a href="../guide.html">梯子选购指南</a><a href="../runaway-alert.html">机场跑路预警</a></div></section><footer><div class="wrap foot"><div><b>V2Ray机场推荐榜和梯子选购（持续更新）</b><div>机场FAQ问题库</div></div><div>问题答案仅供排查参考</div></div></footer></body></html>`;
}

additions.forEach(([question,answer],index)=>{
  const number=131+index;
  fs.writeFileSync(path.join(root,'faq',`q${String(number).padStart(3,'0')}.html`),faqPage(number,question,answer),'utf8');
});

const troubleshootingPath=path.join(root,'troubleshooting.html');
let troubleshooting=fs.readFileSync(troubleshootingPath,'utf8');
troubleshooting=troubleshooting
  .replace(/机场常见问题FAQ问题库｜130个问题解答/g,`机场常见问题FAQ问题库｜${130+additions.length}个问题解答`)
  .replace(/收录130个机场使用问题/g,`收录${130+additions.length}个机场使用问题`)
  .replace(/查看全部130个问题/g,`查看全部${130+additions.length}个问题`)
  .replace(/130个机场FAQ/g,`${130+additions.length}个机场FAQ`);

const categoryButton=`<a href="#tools">基础知识与使用工具</a>`;
if(!troubleshooting.includes('href="#tools"')) troubleshooting=troubleshooting.replace('</nav></div></section><section class="library">',`${categoryButton}</nav></div></section><section class="library">`);
const faqCards=additions.map(([question],index)=>`<a class="question" href="faq/q${String(131+index).padStart(3,'0')}.html"><span>${question}</span><small>查看答案 →</small></a>`).join('');
const newSection=`<section class="category" id="tools"><div class="category-head"><div><span class="eyebrow">基础知识与使用工具</span><h2>机场基础知识与客户端工具</h2></div><p>概念、合规、下载、平台客户端与配置安全 · ${additions.length}个问题</p></div><div class="question-grid">${faqCards}</div><p style="margin-top:16px;color:var(--muted)">本分类参考并重新整理了 <a href="https://yifenjichang.net/faq/" target="_blank" rel="noopener noreferrer" style="color:var(--brand);font-weight:800">一分机场FAQ的主题范围 ↗</a>，未复制其机场产品推荐和原文答案。</p></section>`;
if(!troubleshooting.includes('id="tools"')) troubleshooting=troubleshooting.replace('</div></section></main>',`${newSection}</div></section></main>`);
troubleshooting=troubleshooting.replace('共130个问题',`共${130+additions.length}个问题`);
fs.writeFileSync(troubleshootingPath,troubleshooting,'utf8');

const htmlFiles=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name==='.git'||entry.name==='node_modules')continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.name.endsWith('.html'))htmlFiles.push(full);}}
walk(root);
for(const file of htmlFiles){
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/>机场使用教程</g,'>机场使用工具<').replace(/>使用教程</g,'>使用工具<');
  if(path.basename(file)==='index.html'){
    html=html.replace('2026机场推荐与梯子选购指南｜V2Ray机场推荐榜和梯子选购（持续更新）','2026机场推荐排行榜与梯子选购指南｜V2Ray机场推荐榜和梯子选购（持续更新）');
    html=html.replace('2026机场推荐和梯子选购指南：15家机场线路、价格与稳定性对比','2026机场推荐排行榜和梯子选购指南：15家机场线路、价格与稳定性对比');
    html=html.replace(/<h2>机场使用教程<\/h2>/g,'<h2>机场使用工具</h2>');
  }
  fs.writeFileSync(file,html,'utf8');
}

console.log(JSON.stringify({tools:toolGroups.reduce((sum,g)=>sum+g.items.length,0),newFaq:additions.length,totalFaq:130+additions.length,htmlUpdated:htmlFiles.length},null,2));
