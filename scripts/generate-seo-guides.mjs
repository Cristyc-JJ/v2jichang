import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'guides');
fs.mkdirSync(outDir, { recursive: true });

const groups = [
  {name:'核心推荐',slug:'recommend',keywords:['机场推荐','翻墙机场推荐','VPN推荐','梯子推荐','稳定机场推荐','高速机场推荐','节点推荐','翻墙软件推荐','付费机场推荐','科学上网推荐'],lens:'围绕普通用户如何从价格、流量、线路、稳定性、客户端兼容和运营风险中筛出候选方案',audience:'第一次购买、希望更换现有服务或需要准备备用线路的个人用户',focus:'先确定预算与流量，再比较入口线路、常用地区、倍率和晚高峰表现',risk:'只看宣传速度、节点数量或短期折扣，忽略续费价格和长期维护能力'},
  {name:'2026时效指南',slug:'2026',keywords:['2026机场推荐','最新机场推荐','2026梯子推荐','最新翻墙节点','2026稳定机场','每日最新节点','长期稳定机场','老牌机场推荐','新开稳定机场','2026科学上网指南'],lens:'强调2026年的信息时效、核验日期、套餐变化、客户端生态和持续更新方法',audience:'重视资料新鲜度、希望避免过期套餐信息并定期复查线路的用户',focus:'记录核验日期、公告频率、套餐调整和连续多个晚高峰的表现',risk:'把几年前的评测、一次测速或短期可用性当成当前长期结论'},
  {name:'专线与网络架构',slug:'route',keywords:['IPLC专线机场','IEPL专线机场','专线机场推荐','BGP中继机场','内网专线节点','高SLA机场','晚高峰稳定机场','跨境专线推荐','全专线机场','双负载机场'],lens:'从入口、中继、落地、路由、冗余和SLA等网络架构角度解释线路差异',audience:'对晚高峰、低延迟、持续连接和故障恢复要求较高的用户',focus:'区分线路标签与真实架构，观察路由、丢包、抖动、容量和故障切换',risk:'把IEPL、IPLC、BGP或SLA等名称直接等同于绝对稳定和无限带宽'},
  {name:'价格与付费',slug:'price',keywords:['便宜机场推荐','性价比机场推荐','月付机场推荐','按量计费机场','不限时流量机场','免费试用机场','一元机场','高端机场推荐','大流量机场推荐','永久流量机场'],lens:'从真实月付成本、流量倍率、重置周期、设备限制和预付风险评估价格',audience:'预算敏感、低频备用、多设备家庭或希望控制预付金额的用户',focus:'计算每元可用流量、常用节点倍率、续费价格、有效期和退款条件',risk:'只比较首页最低价，忽略高倍率、限速、短有效期和长期预付风险'},
  {name:'客户端与软件',slug:'client',keywords:['Clash机场推荐','小火箭机场推荐','Shadowrocket节点推荐','Sing-box机场','Surge机场推荐','V2rayN机场推荐','Quantumult X节点','全平台翻墙软件','客户端一键导入','电脑梯子推荐'],lens:'围绕不同系统、客户端格式、订阅导入、规则模式和配置安全进行选择',audience:'需要在Windows、macOS、Android、iOS或路由器上稳定使用的用户',focus:'确认订阅格式、系统兼容、更新方式、规则维护和可信下载来源',risk:'线路尚未验证就安装来源不明的软件，或公开包含个人凭据的订阅地址'},
  {name:'流媒体与AI',slug:'media-ai',keywords:['ChatGPT专用机场','Netflix解锁机场','流媒体机场推荐','TikTok直播专线','Disney+解锁节点','Claude专用代理','YouTube 4K机场','原生IP机场','外服流媒体节点','AI工具网络加速'],lens:'针对流媒体清晰度、平台地区、出口IP质量、AI会话稳定和账号风控分析',audience:'经常使用AI工具、观看海外流媒体、直播或需要特定地区内容的用户',focus:'测试目标服务的真实功能、持续带宽、出口信誉、地区一致性和会话稳定',risk:'把解锁检测截图当成永久保证，忽略账号地区、平台风控和出口IP变化'},
  {name:'外贸与跨境业务',slug:'business',keywords:['外贸VPN推荐','跨境电商专线','亚马逊运营代理','独立站节点推荐','跨境专线机场','海外办公梯子','外贸翻墙软件','防关联代理机场','多设备外贸节点','企业翻墙专线'],lens:'从业务连续性、账号隔离、固定地区、设备管理和企业支持角度进行评估',audience:'跨境电商、独立站、海外办公、内容运营和多成员协作团队',focus:'明确业务地区、账号边界、出口一致性、权限管理、工单响应和备用链路',risk:'多人混用订阅、频繁切换地区、把普通共享节点包装成企业级防关联方案'},
  {name:'评测与排行榜',slug:'review',keywords:['机场评测','机场排行榜','梯子排行榜','晚高峰测速','机场测速横评','靠谱机场排行','稳定梯子横评','防跑路机场','高分机场榜单','测速跑分推荐'],lens:'建立可复查的评测方法，区分单次跑分、真实体验、长期稳定和商业排名',audience:'希望通过排行榜、横评和测速数据缩小候选范围的用户',focus:'统一套餐、设备、宽带、时段和测试目标，记录多轮结果与核验日期',risk:'用一次峰值测速代替长期体验，或把推广排序误认为独立测试结论'}
];

const titlePatterns = [
  k => `${k}怎么选？2026线路、价格、稳定性与避坑完整指南`,
  k => `2026${k}指南：适合人群、选择标准与真实测试方法`,
  k => `${k}值得买吗？从套餐成本到晚高峰表现全面分析`,
  k => `${k}选择攻略：节点线路、客户端、流量与风险清单`
];

const topicAngles = {
  '机场推荐':'建立适合新手的候选清单，重点解释如何从大量机场中完成第一次筛选','翻墙机场推荐':'区分机场订阅与传统VPN产品，重点讨论节点订阅、客户端和线路维护','VPN推荐':'比较独立VPN应用与机场订阅在易用性、隐私政策和线路控制方面的差异','梯子推荐':'从跨平台使用、备用连接和长期维护角度解释日常梯子选择','稳定机场推荐':'把连续可用率、抖动、丢包和故障恢复作为核心，而不是追求峰值速度','高速机场推荐':'分析本地宽带、入口带宽、落地容量和高倍率节点对速度的共同影响','节点推荐':'围绕香港、日本、新加坡、美国等常用地区解释节点选择与物理距离','翻墙软件推荐':'把软件来源、系统权限、规则模式和订阅兼容放在选择中心','付费机场推荐':'解释付费服务的成本构成、售后预期、退款边界和预付风险','科学上网推荐':'提供从工具、线路、客户端到安全习惯的完整入门决策流程',
  '2026机场推荐':'突出2026年的价格、客户端生态、平台风控和资料核验日期','最新机场推荐':'建立信息更新标准，判断所谓最新推荐是否真的完成近期复测','2026梯子推荐':'结合2026设备系统、常用应用与连接需求重新定义梯子选择','最新翻墙节点':'解释节点更新频率、配置缓存、失效节点清理和订阅刷新','2026稳定机场':'以跨月份连续记录验证稳定，而不是引用过去某一天的测试','每日最新节点':'讨论每日更新的必要性、虚假更新、节点命名变化和订阅安全','长期稳定机场':'从运营年限、维护节奏、容量扩张和故障记录判断长期性','老牌机场推荐':'分析老牌服务的历史优势、技术债、用户增长和品牌溢价','新开稳定机场':'说明新开服务缺乏长期样本时如何控制试用与预付风险','2026科学上网指南':'整合2026年客户端、协议、线路、AI与流媒体使用变化',
  'IPLC专线机场':'解释IPLC点到点链路、适用业务、成本和与共享公网线路的区别','IEPL专线机场':'分析IEPL以太网专线的入口落地、容量、晚高峰与宣传核验','专线机场推荐':'建立验证专线真实性和价值的路由、丢包、容量与冗余清单','BGP中继机场':'说明BGP多运营商入口如何改善接入，以及它不能解决的落地问题','内网专线节点':'讨论内网传输、入口暴露、链路可控性和最终落地出口','高SLA机场':'解释SLA指标、可用率计算、补偿条款和个人机场承诺的可执行性','晚高峰稳定机场':'专门设计20点至23点的连续测试，观察拥塞、抖动和切换','跨境专线推荐':'从跨地区业务连续、合规、固定出口和企业支持角度评估','全专线机场':'辨别全节点专线宣传，检查不同地区是否真的使用一致架构','双负载机场':'分析双入口、双中继或双落地的故障切换方式与共享瓶颈',
  '便宜机场推荐':'寻找可接受的最低成本，而不是绝对最低价，重点检查限速与倍率','性价比机场推荐':'用每元有效流量、常用节点质量和实际可用时长计算价值','月付机场推荐':'强调低预付、灵活更换和每月复查，适合控制运营风险','按量计费机场':'比较按量与按月模式在低频使用、有效期和流量单价上的差异','不限时流量机场':'核对所谓不限时的有效期、账号存续、节点范围和规则变化','免费试用机场':'分析试用节点与付费节点是否一致，以及试用期间的隐私风险','一元机场':'重点揭示极低价背后的容量、售后、短周期和可持续性问题','高端机场推荐':'判断高价是否对应专线、低超售、企业支持和明确服务承诺','大流量机场推荐':'从视频、多设备、下载和倍率角度计算大流量的真实可用量','永久流量机场':'解释永久通常依赖服务持续运营，不等于永久服务保证',
  'Clash机场推荐':'围绕Clash订阅格式、规则集、内核分支和维护状态选择','小火箭机场推荐':'针对iOS Shadowrocket的订阅导入、策略组和地区节点使用','Shadowrocket节点推荐':'重点讨论小火箭节点格式、延迟测试、规则与订阅安全','Sing-box机场':'分析sing-box新协议支持、配置结构、TUN模式和跨平台能力','Surge机场推荐':'面向Surge用户讨论模块、策略组、规则维护和高阶网络诊断','V2rayN机场推荐':'针对Windows用户解释订阅更新、系统代理、路由和日志排查','Quantumult X节点':'围绕Quantumult X资源、策略、重写和节点兼容进行筛选','全平台翻墙软件':'比较多系统客户端的一致性、配置迁移和家庭多设备维护','客户端一键导入':'辨别一键导入的便利与风险，处理协议兼容和订阅泄露','电脑梯子推荐':'聚焦Windows与macOS桌面场景、开机启动、系统代理和办公稳定',
  'ChatGPT专用机场':'测试ChatGPT登录、会话持续、出口地区、IP信誉和风控','Netflix解锁机场':'以Netflix地区片库、代理识别、持续带宽和账号地区为核心','流媒体机场推荐':'综合Netflix、Disney+、YouTube等平台的带宽与出口差异','TikTok直播专线':'关注直播上行、抖动、丢包、固定地区和长时间连接','Disney+解锁节点':'针对Disney+地区识别、播放清晰度和出口IP变化测试','Claude专用代理':'测试Claude可用地区、长对话稳定、登录风控和出口一致性','YouTube 4K机场':'用4K持续码率、缓冲、晚高峰和节点倍率衡量真实体验','原生IP机场':'解释原生IP、广播IP、住宅IP与平台数据库识别的差异','外服流媒体节点':'围绕海外平台组合、字幕片库、地区切换和账号一致性','AI工具网络加速':'综合ChatGPT、Claude及其他AI服务的会话和上传需求',
  '外贸VPN推荐':'从外贸沟通、文件传输、地区一致性和团队权限管理评估','跨境电商专线':'关注店铺连续运营、固定地区、业务带宽、工单和备用链路','亚马逊运营代理':'讨论亚马逊账号环境、人员权限、出口稳定和关联风险边界','独立站节点推荐':'围绕独立站后台、广告平台、支付服务和目标市场选择出口','跨境专线机场':'比较个人机场与企业跨境专线在承诺、隔离和支持上的差异','海外办公梯子':'聚焦视频会议、代码仓库、云服务、文件同步和远程协作','外贸翻墙软件':'比较团队客户端部署、更新、权限、安全审计和使用培训','防关联代理机场':'澄清共享机场不能自动防关联，重点讨论浏览器与账号隔离','多设备外贸节点':'设计成员、设备、店铺和地区之间的清晰分配与权限边界','企业翻墙专线':'从合同、SLA、固定出口、身份管理和故障升级流程评估',
  '机场评测':'建立透明评测口径，区分公开参数、实测数据和主观体验','机场排行榜':'解释排名权重、商业关系、更新时间和用户如何二次筛选','梯子排行榜':'比较不同工具类型时避免把VPN、机场和客户端混为一谈','晚高峰测速':'设计固定20至23点、多天重复、同节点同任务的测试方法','机场测速横评':'统一设备、宽带、套餐、节点和测速服务器保证横向可比','靠谱机场排行':'把运营记录、客服、条款和资金风险纳入靠谱程度','稳定梯子横评':'用可用率、抖动、丢包和故障恢复替代单纯速度排名','防跑路机场':'说明不存在绝对防跑路，只能通过信号监测和低预付降风险','高分机场榜单':'公开评分公式、样本和权重，避免总分掩盖具体短板','测速跑分推荐':'解释测速跑分的边界，防止峰值数字替代真实应用体验'
};

const groupDeepDives = {
  recommend:'推荐类关键词最容易出现清单堆砌，因此文章必须先解释推荐依据，再说明哪些用户不适合。候选数量不宜过多，应通过预算、流量和常用地区逐层缩小，并明确公开资料、推广关系与个人实测之间的边界。',
  '2026':'时效类关键词的核心不是在标题中加入年份，而是提供可验证的更新时间。需要记录价格核验、客户端版本、平台政策、节点维护和连续测试日期，并删除已经失效的优惠与入口。',
  route:'架构类关键词需要区分接入、传输和落地三个层次。入口改善本地接入，中继决定跨境路径，落地影响目标网站和平台；任何单一标签都不能描述完整链路。',
  price:'价格类关键词必须把标价换算成真实成本。除了付款金额，还要计算倍率、有效期、重置、设备数、限速和服务存续风险，避免用看似便宜的数字制造错误比较。',
  client:'客户端类关键词应以软件生态为中心。协议支持、配置格式、系统权限、TUN模式、规则维护、日志能力和可信下载来源，往往比机场节点数量更直接影响使用体验。',
  'media-ai':'流媒体与AI关键词依赖目标平台的真实验证。出口IP、账号地区、平台数据库、持续带宽和风控会动态变化，因此应测试具体功能而不是只运行通用解锁脚本。',
  business:'商业场景不能照搬个人用户的选择方法。团队权限、账号边界、固定地区、审计、SLA、备用线路和故障升级流程都需要明确，尤其不能把共享订阅等同于企业隔离。',
  review:'评测类关键词必须首先公开方法。测试环境、套餐、时间、次数、失败样本和商业关系都会影响结论；排行榜只是筛选工具，不能把一个总分当成永久事实。'
};

const groupPlaybooks={
  recommend:{evidence:'推荐主题的证据必须回答“为什么进入候选”和“什么情况下应被淘汰”。文章应给出筛选门槛、反例和不适用人群，避免变成没有方法的品牌罗列。',technical:'推荐类文章只解释足以帮助决策的技术信息，重点是入口、常用地区、倍率和高峰，而不是堆积协议名称。',commercial:'商业判断围绕预算上限、最低试用成本、续费价格和推广披露展开，推荐顺序不能由佣金直接决定。',failure:'推荐失败通常来自需求不清或只看他人体验，因此退出条件应写在购买之前。'},
  '2026':{evidence:'时效主题必须把核验日期写进证据，明确哪些数据来自2026年的套餐、客户端、平台政策和近期测试。',technical:'技术部分侧重近一年发生的协议、客户端和线路变化，并区分仍有效的方法与已经过期的操作。',commercial:'价格和优惠必须标注核验时间，过期入口、旧优惠码和历史最低价不能继续充当当前卖点。',failure:'时效文章最常见的失败是标题更新了年份、正文却保留旧结论，因此每次复查都要删除失效内容。'},
  route:{evidence:'架构主题的证据应来自路由、丢包、抖动、容量和故障切换，不能只引用服务商对线路的命名。',technical:'技术分析必须拆开入口、中继、落地、出口与冗余，说明瓶颈可能出现在哪一段。',commercial:'专线溢价是否合理，要看高峰改善、可用率和恢复能力，而不是把高价自动理解成高质量。',failure:'架构判断失败往往是把单一标签当成完整路径，或把多个同源节点误认为真正冗余。'},
  price:{evidence:'价格主题需要展示计算过程，包括结算价、倍率、有效期、重置、并发和失败时间成本。',technical:'技术部分只关注会改变成本的因素，例如高倍率节点、限速、设备共享和流量统计方式。',commercial:'所有付费形态都要换算为相同周期和有效流量，首月优惠、长期套餐与永久流量不能直接并列。',failure:'低价选择最容易因隐藏限制、服务停止或重复购买备用方案而产生更高总成本。'},
  client:{evidence:'客户端主题的证据来自实际安装、导入、更新、日志、系统权限和配置迁移，而不是软件截图。',technical:'应具体说明订阅格式、内核、规则、DNS、TUN和系统代理如何影响该客户端。',commercial:'购买机场前先确认客户端兼容，避免付费后才发现系统、商店地区或配置格式无法使用。',failure:'软件类问题常被误判为线路故障，因此排查必须先区分客户端、本地系统和服务端。'},
  'media-ai':{evidence:'平台主题只能用目标账号的真实功能验证，通用解锁脚本或IP查询不能替代播放、登录和长会话。',technical:'重点解释出口IP信誉、地区数据库、持续带宽、上行、会话保持和平台风控。',commercial:'为单一平台额外付费前，要确认账号地区、支付方式和目标功能是否真的需要特定出口。',failure:'今天可用不等于长期解锁，平台规则和共享出口变化会使历史结论快速失效。'},
  business:{evidence:'业务主题的证据应包含账号边界、人员权限、固定地区、业务连续性、工单和故障升级记录。',technical:'企业场景要讨论固定出口、成员隔离、设备管理、审计、备用链路和访问控制，而不只是速度。',commercial:'成本模型应加入停工损失、团队维护、支持响应和合同承诺，个人套餐价格不能代表企业总成本。',failure:'多人共享同一订阅、频繁更换地区或缺乏权限边界，可能比线路速度问题造成更大业务风险。'},
  review:{evidence:'评测主题必须公开设备、宽带、套餐、节点、时段、次数、失败样本和商业关系。',technical:'测速需要区分延迟、抖动、丢包、峰值、持续吞吐和真实应用，不用单一跑分概括全部体验。',commercial:'排行榜权重和推广关系必须透明，总分只能辅助筛选，不能替用户完成最终购买决定。',failure:'评测最容易因样本太少、条件不统一或只展示最佳结果而失真，复测和可重复性比漂亮图表重要。'}
};

const axisForType={intent:'evidence',scenario:'failure',metrics:'evidence',route:'technical',client:'technical',test:'evidence',cost:'commercial',operations:'failure',comparison:'commercial',caseStudy:'failure',risk:'failure',decision:'commercial'};

function buildGroupSpecificAnalysis(type, keyword, group, angle) {
  const axis = axisForType[type];
  const frames = {
    evidence: `本节只采用“${group.name}”主题组的证据口径：${group.focus}。对于“${keyword}”，需要把“${angle}”拆成可记录的观察项，并注明测试日期、设备、网络、时段与失败样本。这里不沿用其他主题组的通用评分，因为${group.audience}的判断目标与其他读者并不相同。`,
    technical: `从“${group.name}”的技术边界来看，本节讨论的核心不是泛泛的速度高低，而是${group.lens}。分析“${keyword}”时，应逐段确认入口、客户端或业务环境中真正影响结果的环节，再用“${angle}”确定排查顺序；与本主题无关的指标不进入主要结论。`,
    commercial: `“${group.name}”主题组采用自己的购买模型：先围绕${group.focus}核算有效价值，再评估短期试用、续费和退出成本。对于“${keyword}”，${angle}决定了哪些费用值得支付、哪些宣传溢价应当剔除，因此不能直接套用推荐榜、客户端或流媒体文章的预算结论。`,
    failure: `本节按照“${group.name}”的失效逻辑展开。首要风险是${group.risk}；一旦“${keyword}”的实际表现偏离“${angle}”，应先保存失败时间、错误现象和恢复路径，再决定降级、切换或停止续费。这个止损条件只服务于本主题，不复制其他主题组的故障判断。`
  };
  return frames[axis];
}

const groupCoreSections = {
  recommend: new Set(['intent','scenario','comparison','decision']),
  '2026': new Set(['intent','metrics','test','operations']),
  route: new Set(['route','metrics','test','risk']),
  price: new Set(['cost','comparison','risk','decision']),
  client: new Set(['client','scenario','test','risk']),
  'media-ai': new Set(['scenario','metrics','test','caseStudy']),
  business: new Set(['scenario','operations','risk','decision']),
  review: new Set(['intent','metrics','comparison','caseStudy'])
};

const nav = prefix => `<header class="global-fixed-header"><nav class="global-nav-wrap"><a class="global-logo" href="${prefix}index.html"><img class="global-logo-image" src="${prefix}assets/v2ray-logo.svg" width="38" height="38" alt="V2Ray机场推荐榜和梯子选购（持续更新） Logo"><span class="global-logo-text">V2Ray机场推荐榜和梯子选购（持续更新）</span></a><div class="global-navlinks"><a href="${prefix}index.html#recommend">机场推荐</a><a href="${prefix}rankings.html">机场排行榜</a><a href="${prefix}coupons.html">机场优惠码</a><a href="${prefix}tutorials.html">机场使用工具</a><a href="${prefix}guide.html">梯子指南</a><a href="${prefix}troubleshooting.html">机场常见问题解决</a><a href="${prefix}runaway-alert.html">机场跑路预警</a><a href="${prefix}about.html">关于</a></div></nav></header>`;

const style = `:root{--bg:#f5f7fa;--surface:#fff;--ink:#0b1220;--muted:#5f6d80;--line:#dde4ec;--brand:#087f72;--soft:#e9f6f3;--warn:#fff7db}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;padding-top:70px;background:var(--bg);color:var(--ink);font-family:Inter,"Microsoft YaHei",system-ui,sans-serif;line-height:1.82}.global-fixed-header{position:fixed;top:0;left:0;right:0;z-index:9999;height:70px;background:rgba(245,247,250,.97);backdrop-filter:blur(15px);border-bottom:1px solid var(--line)}.global-nav-wrap{width:min(1220px,calc(100% - 28px));height:70px;margin:auto;display:flex;align-items:center;gap:18px}.global-logo{margin-right:auto;display:flex;align-items:center;gap:9px;color:var(--ink);text-decoration:none;font-size:18px;font-weight:900;white-space:nowrap}.global-logo-mark{width:32px;height:32px;display:grid;place-items:center;border-radius:9px;background:linear-gradient(135deg,#087f72,#1685c3);color:#fff;font-size:11px}.global-navlinks{display:flex;gap:15px;white-space:nowrap}.global-navlinks a{color:var(--ink);text-decoration:none;font-size:13px;font-weight:750}.global-navlinks a:hover{color:var(--brand)}a{color:inherit}.wrap{width:min(1160px,calc(100% - 30px));margin:auto}.hero{padding:66px 0 35px}.eyebrow{color:var(--brand);font-size:12px;font-weight:900;letter-spacing:.09em}.hero h1{font-size:clamp(38px,5.1vw,60px);line-height:1.1;letter-spacing:-.045em;max-width:980px;margin:12px 0 17px}.hero p{max-width:850px;color:var(--muted);font-size:17px}.meta{display:flex;gap:12px;flex-wrap:wrap;color:var(--muted);font-size:13px}.layout{display:grid;grid-template-columns:minmax(0,790px) 280px;gap:45px;align-items:start;padding:25px 0 75px}.article{background:#fff;border:1px solid var(--line);border-radius:21px;padding:34px}.article h2{font-size:29px;line-height:1.3;margin:45px 0 13px;scroll-margin-top:92px}.article h2:first-child{margin-top:0}.article h3{font-size:21px;margin:25px 0 8px}.article p,.article li{color:#435267}.article blockquote{margin:22px 0;padding:17px 19px;background:var(--soft);border-left:4px solid var(--brand);border-radius:0 13px 13px 0}.article table{width:100%;border-collapse:collapse}.article th,.article td{border:1px solid var(--line);padding:11px;text-align:left}.article th{background:#f3f7f8}.checklist{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0;list-style:none}.checklist li{padding:14px;background:#f7fafc;border:1px solid var(--line);border-radius:12px}.toc,.side-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:19px}.sidebar{position:sticky;top:92px;display:grid;gap:14px}.toc a,.side-card a{display:block;color:var(--brand);text-decoration:none;padding:5px 0;font-size:13px;font-weight:700}.faq{margin-top:45px}.faq details{border:1px solid var(--line);border-radius:13px;padding:0 16px;margin:9px 0}.faq summary{cursor:pointer;font-weight:800;padding:15px 24px 15px 0}.faq details p{margin-top:0}.related{display:grid;grid-template-columns:1fr 1fr;gap:10px}.related a{padding:14px;border:1px solid var(--line);border-radius:12px;text-decoration:none;color:var(--brand);font-weight:750}.global-internal-links{background:#eef3f7;border-top:1px solid var(--line);padding:24px 15px}.global-internal-links-inner{width:min(1160px,100%);margin:auto;display:flex;gap:12px 22px;flex-wrap:wrap}.global-internal-links a{color:var(--brand);text-decoration:none;font-size:13px;font-weight:750}footer{background:#0b1220;color:#9caabc;padding:35px 0}.foot{display:flex;justify-content:space-between}.foot b{color:#fff}@media(max-width:1050px){.global-navlinks{gap:10px}.global-navlinks a{font-size:12px}}@media(max-width:850px){body{padding-top:64px}.global-fixed-header,.global-nav-wrap{height:64px}.global-logo span:last-child{display:none}.global-navlinks{overflow-x:auto;scrollbar-width:none}.layout{grid-template-columns:1fr}.sidebar{position:static}.hero h1{font-size:40px}}@media(max-width:600px){.article{padding:22px}.checklist,.related{grid-template-columns:1fr}}`;

function faqFor(keyword, group) {
  const angle = topicAngles[keyword];
  return [
    [`${keyword}最重要的选择标准是什么？`,`本标题首先要验证“${angle}”。在此基础上再比较${group.focus}，不能用相近关键词的通用结论直接替代。`],
    [`${keyword}适合哪些用户？`,`${group.audience}通常更需要关注这一主题。轻度使用、视频、AI、办公和多设备场景的优先级并不相同。`],
    [`${keyword}应该先买月付还是年付？`,`建议从月付或最低门槛套餐开始，确认晚高峰、常用节点、客户端和客服表现后，再评估是否延长周期。`],
    [`判断${keyword}是否稳定要测试什么？`,`至少测试两个时段，并记录延迟、丢包、持续速度、网页响应、真实应用和断线恢复，避免只看一次测速峰值。`],
    [`${keyword}有哪些常见误区？`,`${group.risk}是常见误区。还要注意推广关系、资料核验日期和服务条款的变化。`],
    [`${keyword}出现问题时怎么办？`,`先检查套餐、订阅、客户端、本地网络和服务公告，再通过不同节点、网络或设备做单变量交叉测试，仍无法解决时提交正式工单。`]
  ];
}

function articleBodyLegacy(keyword, group, index) {
  const angle = ['稳定性与性价比','线路架构与晚高峰','客户端兼容与实际场景','长期维护与购买风险'][index % 4];
  const specific = topicAngles[keyword];
  return `
  <h2 id="specific">${keyword}专题：这篇文章具体解决什么</h2>
  <p>“${keyword}”与同组其他关键词并不是简单的同义词。本篇的独立重点是：${specific}。因此，本文后续的选择标准、测试项目和FAQ都会围绕这一目标展开，而不会直接套用其他标题的结论。</p>
  <p>${groupDeepDives[group.slug]} 对“${keyword}”来说，用户首先要验证的不是宣传页面是否出现某个热门术语，而是该术语能否转化成可观察的使用结果。建议把核心目标写成一项具体任务，然后固定设备、网络、地区和测试时间进行复查。</p>
  <h3>${keyword}的专属判断指标</h3>
  <p>围绕“${specific}”这一主题，建议把指标分成三组：第一组是进入门槛，例如系统、客户端、套餐和地区是否匹配；第二组是实际表现，例如连接成功率、持续速度、抖动、会话保持或目标平台功能；第三组是长期风险，例如条款变化、出口调整、维护频率和备用方案。不同标题的指标权重不同，因此不能简单复制同一排行榜的总分。</p>
  <h3>针对${keyword}应该怎样做专项测试</h3>
  <p>专项测试应直接模拟标题对应的任务。先在普通时段完成一次完整流程，再在晚高峰重复；每轮只更换一个条件，记录成功、失败和恢复过程。如果标题关注客户端，就重点检查导入、规则、日志和系统权限；如果关注专线，就重点记录路由、丢包和切换；如果关注流媒体、AI或商业业务，就必须测试真实账号与真实功能，而不是只看测速数字。</p>
  <h3>这个主题最容易被忽略的边界</h3>
  <p>${specific}并不意味着服务商能够永久保证结果。线路会维护，平台会调整风控，软件会更新，套餐也可能变化。更可靠的做法是保留核验日期、测试条件和失败样本，并准备可替换节点或备用服务。这样即使环境变化，文章给出的判断方法仍然有效。</p>

  <h2 id="understand">先理解“${keyword}”真正解决什么问题</h2>
  <p>搜索“${keyword}”的人，往往不是单纯想看到一串品牌名称，而是希望在有限预算内解决稳定访问、视频播放、AI 工具、远程办公、多设备或特定地区服务等问题。本文不把宣传语直接当成结论，而是从${group.lens}。只有先说明需求，后面的价格、线路和测速数据才有比较意义。</p>
  <p>同一个服务在不同地区、宽带运营商、设备和时段中的表现可能明显不同。别人使用顺畅，并不代表你的本地网络一定相同。因此，理解${keyword}时要把“公开资料筛选”和“个人环境验证”分成两个阶段：第一阶段用资料排除不符合预算、流量与客户端要求的方案；第二阶段使用短周期套餐，在自己的真实场景中验证。</p>
  <blockquote><b>本文核心：</b>${keyword}的价值不在于找到一个永远不变的答案，而在于建立一套可以重复使用的筛选、测试和复查流程。本篇侧重${angle}，与同组其他文章的关注点有所区别。</blockquote>

  <h2 id="audience">适合人群与需求拆分</h2>
  <p>${group.audience}是“${keyword}”的主要关注人群，但不同用户的优先级并不一样。轻度网页与聊天用户通常更关心低门槛和基础稳定；高清视频用户重视持续带宽、节点倍率与流量额度；AI 与办公用户需要低丢包、较稳定的出口质量和快速重连；多设备家庭还要核对并发连接、设备数量及路由器兼容。</p>
  <p>建议在比较之前先写下三项内容：每月预算上限、预计流量和最重要的两个使用场景。预算决定候选范围，流量决定套餐档位，使用场景决定应该优先测试哪个地区、哪个时段以及哪类应用。如果三项都没有确定，就很容易被低价、大流量或节点数量带偏。</p>
  <ul class="checklist"><li><b>轻度使用：</b>网页、聊天、查资料，重点检查基础稳定与低门槛。</li><li><b>视频场景：</b>关注持续速度、倍率、晚高峰和目标平台可用性。</li><li><b>AI与办公：</b>关注出口质量、会话持续、丢包和故障恢复。</li><li><b>多设备：</b>确认设备数、并发、共享条款和总流量成本。</li></ul>

  <h2 id="criteria">围绕标题建立选择标准</h2>
  <p>评估${keyword}时，第一层是“能不能用”，包括订阅是否能导入、常用节点能否连接、目标服务能否正常访问；第二层是“是否好用”，包括延迟、持续速度、晚高峰波动和节点切换；第三层是“能否长期用”，包括公告、客服、故障恢复、套餐变更和资金风险。三个层次缺一不可。</p>
  <p>${group.focus}。除此之外，还应记录资料核验日期，因为线路、价格、优惠码和平台可用性会变化。一个月前的结论可能仍有参考价值，但不能被写成永久承诺。对于带推广关系的页面，应把推广标记、公开参数与独立测试结果分开呈现。</p>
  <table><thead><tr><th>比较维度</th><th>要看什么</th><th>常见误判</th></tr></thead><tbody><tr><td>线路</td><td>入口、中继、落地、拥塞与故障切换</td><td>只凭专线名称判断质量</td></tr><tr><td>套餐</td><td>结算价、流量、倍率、重置与续费</td><td>只看最低宣传价</td></tr><tr><td>体验</td><td>延迟、丢包、持续速度与真实应用</td><td>用一次峰值测速代替长期表现</td></tr><tr><td>运营</td><td>公告、工单、维护记录和条款</td><td>忽略预付与跑路风险</td></tr></tbody></table>

  <h2 id="route">线路、节点和网络架构怎么判断</h2>
  <p>线路标签适合初筛，但不能直接替代质量判断。公网直连通常成本较低，也更容易受公网拥塞和国际出口影响；公网中转通过入口优化连接，常见优势是价格与日常稳定之间较平衡；IEPL、IPLC 或其他专线方案通常强调可控链路和晚高峰表现，但最终仍取决于入口容量、落地带宽、路由设计和运维。</p>
  <p>节点数量也不是越多越好。对于${keyword}，真正有意义的是常用地区是否有多个可替换节点、这些节点是否使用不同入口或落地、出现维护时能否快速切换。几十个名称相似但共享同一路径的节点，可能不如少量维护清楚、容量合理的节点实用。</p>
  <p>测试线路时，不要只看客户端显示的延迟。延迟主要反映响应时间，无法完整代表带宽、抖动和丢包。视频需要持续吞吐，通话和游戏更怕抖动与丢包，AI 会话和远程办公则重视连接保持与出口稳定。应根据标题对应的真实场景来决定测试重点。</p>

  <h2 id="cost">价格、流量和真实使用成本</h2>
  <p>比较${keyword}的成本时，应使用实际结算价，而不是首页上醒目的最低数字。优惠可能只限首月，续费可能恢复原价；某些套餐虽然流量很多，但常用节点采用两倍或更高倍率；一次性流量可能长期有效，也可能设置有效期或限制节点范围。把这些条件一起计算，才能得到真实成本。</p>
  <p>例如，100GB 套餐如果常用节点是两倍倍率，实际传输约50GB就可能耗尽额度。多设备、系统更新、云盘同步、视频自动播放和上传流量也会加快消耗。购买前要核对上下行是否都计费、流量何时重置、未用额度能否结转、超额后是停用还是限速。</p>
  <p>在购买周期上，先月付通常比直接年付更稳妥。短周期可以验证服务是否符合${keyword}的实际需要，并观察公告、故障处理和客服响应。即使年付折扣看起来很大，也要把服务变化、线路下降和运营停止的概率计入风险，而不是只计算表面单价。</p>

  <h2 id="test">一套可复查的真实测试方法</h2>
  <p>为了让${keyword}的判断可复查，测试时应尽量固定设备、客户端、本地宽带和目标应用。先在普通时段记录基础数据，再在20:00至23:00左右重复；每次选择同一地区的两到三个节点，记录连接成功率、延迟、丢包、持续下载、网页响应和真实应用表现。</p>
  <ol><li><b>接入测试：</b>检查订阅导入、节点更新、客户端兼容和帮助文档。</li><li><b>基础测试：</b>记录常用节点延迟、丢包和连续连接情况。</li><li><b>真实任务：</b>使用与标题有关的视频、AI、办公、直播或下载任务。</li><li><b>高峰复测：</b>在晚高峰重复同一流程，对比波动而不是只看最高值。</li><li><b>故障恢复：</b>切换节点、网络或设备，观察恢复速度和工单响应。</li></ol>
  <p>测试结果要结合本地基础网络。关闭代理后如果宽带本身就丢包或WiFi信号较弱，机场测速也会受到影响。可以用手机流量和家庭宽带交叉验证，区分本地网络、入口线路与单个节点问题。这样得到的结论比他人的测速截图更接近个人实际体验。</p>

  <h2 id="mistakes">常见误区和避坑重点</h2>
  <p>${group.risk}。此外，用户还容易把“可连接”等同于“长期稳定”，把“节点多”等同于“冗余好”，把“原生IP”或“专线”当作所有平台永久可用的保证。任何平台都可能调整风控，任何线路也可能维护，可靠的方案应包含透明说明和备用路径。</p>
  <p>安全方面，订阅地址通常包含个人访问凭据，不应公开截图、转发或提交给未知在线转换网站。客户端应优先从可信项目的正式发布渠道获取，不要因为陌生页面提示而安装二次打包软件。外贸、企业和多账号场景还需要更严格的权限、设备和出口管理，普通共享套餐不能自动等同于企业级隔离。</p>
  <p>运营风险也需要持续观察。如果节点大面积失效、公告停止更新、工单长期无人回复，同时又突然集中推广多年或终身套餐，应停止增加预付并启用备用服务。单一故障不一定代表跑路，但多个信号同时出现时，控制资金风险比等待口头承诺更重要。</p>

  <h2 id="decision">最终决策清单</h2>
  <p>完成资料筛选和真实测试后，可以用下面的清单决定是否继续使用。若关键项目无法确认，就不应因为短期优惠仓促购买。${keyword}最终要服务于自己的场景，而不是为了追求榜单名次、节点数量或漂亮的测速数字。</p>
  <ul class="checklist"><li>价格、续费、倍率和重置规则已经确认</li><li>常用地区至少有两个实际可用节点</li><li>普通时段与晚高峰均完成真实任务测试</li><li>客户端来源可信，订阅导入和更新正常</li><li>设备数、并发和共享规则符合需求</li><li>公告、工单和故障恢复记录可以查证</li><li>没有一次预付超出可承受损失的金额</li><li>已经准备不同线路或主体的备用方案</li></ul>
  <p>如果以上多数项目都能得到明确答案，说明该候选方案至少完成了基本验证；如果只能看到营销描述而无法确认条款、核验日期和实际表现，就应降低购买周期或继续比较。选择${keyword}不是一次性决定，建议每隔一段时间复查价格、线路、节点和服务状态。</p>`;
}

const sectionOrders = [
  ['intent','scenario','metrics','route','test','cost','operations','risk','decision'],
  ['scenario','intent','client','test','route','cost','risk','comparison','decision'],
  ['intent','comparison','route','metrics','test','operations','cost','risk','decision'],
  ['scenario','client','intent','cost','test','route','comparison','risk','decision'],
  ['intent','metrics','caseStudy','route','test','cost','operations','risk','decision'],
  ['caseStudy','intent','scenario','test','client','cost','route','risk','decision'],
  ['intent','route','comparison','metrics','test','cost','operations','risk','decision'],
  ['scenario','intent','caseStudy','client','test','route','cost','risk','decision'],
  ['comparison','intent','metrics','scenario','test','operations','cost','risk','decision'],
  ['intent','scenario','route','client','caseStudy','test','cost','risk','decision']
];

const writingModes = [
  {name:'问题诊断型',lead:'本文采用问题诊断结构：先描述症状，再定位影响因素，最后给出排除顺序。',method:'每个结论都对应一个可以动手验证的排查动作，而不是停留在概念解释。'},
  {name:'案例推演型',lead:'本文通过一个完整使用案例推进：从提出需求、筛选候选到复测和淘汰逐步展开。',method:'读者可以把案例中的预算、设备、时间和任务替换成自己的条件。'},
  {name:'横向对比型',lead:'本文使用横向对比结构，把容易混淆的选择放在同一条件下逐项衡量。',method:'只有测试环境与计费口径一致，对比结论才具有参考价值。'},
  {name:'决策树型',lead:'本文按决策树展开，每一步答案都会决定下一步应该检查的项目。',method:'这种结构适合需求尚不明确、容易被营销参数干扰的读者。'},
  {name:'测试日志型',lead:'本文模拟一份连续测试日志，关注不同时间、网络和任务下的变化。',method:'日志保留失败样本与恢复过程，避免只展示表现最好的一次结果。'},
  {name:'成本模型型',lead:'本文从总拥有成本出发，把价格、倍率、时间损失和备用方案放进同一个模型。',method:'最终比较的是完成目标任务的有效成本，而不是页面上的最低标价。'},
  {name:'审计清单型',lead:'本文采用审计清单结构，将宣传内容逐项转换成证据、条款和可复查记录。',method:'无法提供证据的项目会被标记为待核实，而不是默认成立。'},
  {name:'误区纠正型',lead:'本文从常见误判切入，逐条解释为什么看似合理的选择方法可能失效。',method:'每个误区之后都给出替代判断方法，便于直接修正现有选择流程。'},
  {name:'运维复盘型',lead:'本文站在长期运维角度复盘服务表现，关注变化、故障和恢复，而非初次连接。',method:'连续维护记录比单次速度更能解释一个方案是否适合长期使用。'},
  {name:'买家路径型',lead:'本文按照购买前、试用期、续费前和长期使用四个阶段组织内容。',method:'每个阶段都有不同的退出条件，避免一次购买后停止复查。'}
];

const languageVariants = [
  {'建议':'更稳妥的做法是','检查':'核验','比较':'对照','测试':'排查验证','记录':'留存','风险':'不确定因素','用户':'使用者','方案':'候选服务'},
  {'建议':'案例中的处理方式是','检查':'逐项确认','比较':'放在同一条件下衡量','测试':'实际运行','记录':'写入观察表','风险':'潜在代价','用户':'案例主人公','方案':'备选项'},
  {'建议':'横向分析时应','检查':'统一核对','比较':'横向比较','测试':'同条件实测','记录':'保存数据','风险':'偏差来源','用户':'对比者','方案':'参评对象'},
  {'建议':'进入下一步前应','检查':'完成判断','比较':'作出分支选择','测试':'执行验证','记录':'标注结果','风险':'错误分支','用户':'决策者','方案':'路径选项'},
  {'建议':'日志中的下一项是','检查':'复核','比较':'查看前后变化','测试':'连续观测','记录':'按时段登记','风险':'异常信号','用户':'测试人员','方案':'观测对象'},
  {'建议':'成本核算时要','检查':'纳入计算','比较':'换算有效成本','测试':'估算实际消耗','记录':'登记支出','风险':'隐性成本','用户':'购买者','方案':'付费选项'},
  {'建议':'审计时必须','检查':'查证','比较':'核对证据等级','测试':'复验','记录':'归档','风险':'未证实事项','用户':'审核者','方案':'被审项目'},
  {'建议':'正确的替代方法是','检查':'重新审视','比较':'区分表象与结果','测试':'反向验证','记录':'保留反例','风险':'常见误判','用户':'读者','方案':'被误解的选择'},
  {'建议':'复盘后应当','检查':'回看','比较':'对比故障前后','测试':'持续追踪','记录':'形成维护档案','风险':'运营隐患','用户':'长期使用者','方案':'在用服务'},
  {'建议':'在当前阶段需要','检查':'完成阶段验收','比较':'判断是否进入下一阶段','测试':'试用验证','记录':'保存阶段结论','风险':'退出信号','用户':'买家','方案':'购买对象'}
];

function personalizeLanguage(text,index){
  const dict=languageVariants[index%languageVariants.length];
  let output=text;
  for(const [from,to] of Object.entries(dict)) output=output.split(from).join(to);
  return output;
}

const headingVariants = {
  intent:['搜索这个词时真正要解决的问题','从搜索意图拆解本篇主题','先把关键词转换成实际需求','为什么这个标题不能套用普通推荐清单','从用户问题而不是品牌名单开始','这个关键词背后的核心决策','先确定本文讨论的边界','标题中的每个条件意味着什么','如何避免被相似关键词误导','建立本篇独立的判断框架'],
  scenario:['三类典型用户的使用场景','不同需求下的优先级变化','把真实任务写进选择条件','从轻度使用到重度工作的差异','设备、网络和时段如何改变结论','谁适合关注这个主题','常见使用场景的取舍','个人与多设备环境的不同要求','日常使用中最容易忽略的条件','先用场景排除不合适方案'],
  metrics:['为本主题建立专属指标','哪些数据值得记录','不要只看速度的评估方法','把主观体验变成可复查数据','本主题最关键的四个指标','如何设计自己的评分表','判断好坏需要哪些证据','从可用到好用再到长期可用','测试记录应该包含什么','用数据而不是宣传做决定'],
  route:['线路架构怎样影响这个主题','入口、中继和落地分别看什么','节点名称背后的真实路径','线路标签与实际体验的距离','如何识别共享瓶颈','地区节点应该怎样搭配','路由与出口对结果的影响','专线和中转不能解决所有问题','节点冗余是否真的有效','从故障路径反推线路质量'],
  client:['客户端与系统环境的专项检查','软件生态会怎样改变体验','订阅格式和系统权限不能忽略','跨平台使用时的配置差异','客户端日志能告诉我们什么','规则模式与TUN模式的取舍','一键导入背后的兼容问题','软件更新与配置迁移策略','可信下载和订阅安全','桌面、手机和路由器如何协同'],
  test:['针对标题设计的测试流程','一次测试为什么不够','普通时段与晚高峰怎样复测','用真实任务替代单一跑分','单变量交叉测试步骤','如何保留失败样本','从接入到故障恢复的完整测试','不同网络之间怎样交叉验证','七天观察法比瞬时测速更可靠','把测试结果整理成决策记录'],
  cost:['真实成本不等于首页标价','倍率和有效期怎样改变价格','月付、按量和长期套餐的取舍','计算每元有效使用价值','优惠之后还要核对什么','多设备环境下的成本模型','大流量套餐是否真的划算','低价方案隐藏的限制','续费价格与预付风险','把备用方案纳入总成本'],
  operations:['从公告和工单判断运营能力','长期维护比短期速度更难','故障恢复记录应该怎么看','服务商扩容与用户增长的关系','条款变化是重要观察信号','客服响应能说明什么','如何持续复查已经购买的服务','维护窗口与突发故障的区别','备用域名和公告渠道的价值','从历史记录判断持续运营'],
  comparison:['与相近关键词应该怎样区分','不要把不同产品放进同一张表','横向比较前必须统一条件','排行榜分数为什么会误导','同价位方案应该比较什么','不同线路不能只比较峰值','个人方案与商业方案的边界','旧评测与当前表现如何衔接','品牌历史和当前质量要分开','比较结论需要保留适用范围'],
  caseStudy:['一个典型选择过程的拆解','用假设场景演示筛选方法','从错误选择中反推检查项','把抽象指标放进真实任务','一次晚高峰异常的排查路径','多设备用户的决策示例','低预算用户如何逐步验证','重度用户怎样准备备用线路','客户端异常与线路异常如何区分','平台风控问题的判断案例'],
  risk:['这个主题最容易踩的坑','宣传词与可验证事实的边界','资金、账户和订阅安全风险','多个异常信号同时出现时怎么办','为什么长期承诺需要谨慎','服务变化后的止损顺序','不要把可连接当作永久稳定','如何识别不透明的套餐规则','共享服务的隐私与关联风险','购买前必须接受的不确定性'],
  decision:['适合本标题的最终决策清单','完成选择前再检查一次','什么时候应该继续使用','什么时候应该降低续费周期','如何形成可以复用的结论','把测试结果转成购买决定','最终选择不需要追求完美','主力与备用怎样落位','购买后的复查计划','为下一次选择保留记录']
};

function buildSection(type, keyword, group, index) {
  const v = index % 10;
  const angle = topicAngles[keyword];
  const heading = headingVariants[type][v];
  const common = {
    intent:`搜索“${keyword}”时，最重要的是把词语转换成可以验证的任务。本篇的专属角度是${angle}。这与同组其他标题的差别在于，判断结果必须围绕该任务是否完成，而不是看页面是否出现某个流行标签。先写下目标、设备、网络、地区和可承受成本，才能避免推荐清单替代个人决策。<p>${groupDeepDives[group.slug]} 对本标题而言，这一原则需要落实到具体证据：资料核验日期、成功与失败样本、真实应用结果以及服务变化后的复查记录。</p>`,
    scenario:`${group.audience}会关注“${keyword}”，但同一关键词在不同场景中的权重并不相同。轻度用户看重接入简单和低门槛，重度用户关注持续连接、容量和故障恢复，多设备或团队环境还要加入权限、并发和配置维护。<p>建议先构造一个真实任务：连续使用目标应用、跨越一个晚高峰、切换一次网络并模拟节点故障。能够完成这一任务的候选方案，才值得进入价格比较；不能完成时，再低的价格和再多的节点也没有意义。</p>`,
    metrics:`围绕“${angle}”，本文建议记录连接成功率、持续时长、延迟中位数、丢包、抖动、实际吞吐、目标功能成功率和恢复时间。不同指标不要简单相加成一个总分，因为视频、AI、游戏、办公和低频备用的权重不同。<p>记录时应注明日期、套餐、节点、客户端、设备和本地网络。失败结果同样重要：如果只保留表现最好的一次测试，最终结论会系统性高估服务质量。连续记录比一次峰值更能解释“${keyword}”是否符合预期。</p>`,
    route:`${keyword}最终仍然要经过入口、中继和落地三个环节。入口决定本地运营商接入，中继影响跨境路径和拥塞，落地决定目标网站看到的出口与可用带宽。${angle}尤其需要检查其中哪一段最可能成为瓶颈。<p>不要把节点名称当作独立线路证明。多个节点可能共享同一入口或落地，所谓冗余只有在一条路径故障时仍能切换才有价值。通过路由、不同网络交叉测试和维护期间的切换结果，可以更接近真实架构。</p>`,
    client:`对“${keyword}”而言，客户端不仅是连接按钮，还承担订阅解析、规则、DNS、TUN、日志和系统代理。应确认软件来源可信、版本仍在维护、订阅格式兼容，并能在出现问题时提供足够日志。<p>桌面、手机和路由器的权限模型不同，同一订阅不一定表现一致。测试时要区分客户端配置错误、系统限制和线路故障；一次只改变一个设置，并保存可恢复的原始配置与安全的订阅来源。</p>`,
    test:`专项测试应直接验证“${angle}”。第一轮检查导入、连接和基础访问；第二轮使用标题对应的真实任务；第三轮放到20点至23点复测；第四轮切换宽带、手机网络或设备，区分本地问题与服务端问题。<p>每轮至少保留成功率、持续时间、异常现象和恢复步骤。不要为了得到漂亮数字频繁更换测速服务器，也不要删除失败样本。测试的目标是预测日常可用性，而不是制作一次性的宣传截图。</p>`,
    cost:`${keyword}的真实成本由结算价、倍率、有效期、重置方式、设备限制、续费价格和失败时间共同组成。表面月付很低的方案，如果常用节点高倍率、频繁中断或需要额外购买流量，实际价值可能更低。<p>先按自己的任务估算每月流量，再计算常用节点下的有效额度。长周期折扣应加入服务变化和停止运营的风险；主力与备用方案也要合并计算，不能只比较某一个套餐首页显示的最低价格。</p>`,
    operations:`短期测速无法说明${keyword}能否长期使用。更有价值的证据包括公告是否持续、故障是否解释、节点是否维护、工单是否回复、套餐变化是否提前说明，以及用户增长后是否扩容。<p>服务出现问题并不可怕，关键是恢复路径是否透明。可以记录三次真实故障的开始、公告、临时方案和恢复时间。如果运营方长期沉默却持续推动多年套餐，应降低预付并准备替代服务。</p>`,
    comparison:`比较${keyword}与相近方案前，必须统一价格周期、流量、倍率、测试设备、网络、地区和时段。否则“更快”可能只是套餐不同，“更便宜”可能忽略倍率，“更稳定”可能只测试了非高峰。<p>${angle}是本篇区别于相似关键词的核心，因此评分时应提高相关指标权重，而不是照搬通用排行榜。比较结果必须写明适用人群和失效条件，避免把局部优势扩展成所有场景的结论。</p>`,
    caseStudy:`假设一名用户围绕“${keyword}”选择服务，预算有限且主要在晚间使用。正确流程不是先买排名第一，而是先用${angle}建立两到三个候选，购买最低周期，在固定设备上完成真实任务，并记录一次失败后的恢复。<p>如果候选A峰值更高但晚高峰波动大，候选B速度普通却能连续完成任务，那么选择取决于标题的核心需求。这个案例说明，指标权重和失败成本比单一跑分更能决定最终结果。</p>`,
    risk:`${group.risk}是本主题最常见的误区。除此之外，还要保护订阅链接、账号和订单记录，不安装来源不明的客户端，不把平台暂时可用写成永久解锁，也不把营销名称写成网络架构证明。<p>当节点大面积失效、公告停止、客服失联和异常长期促销同时出现时，应停止追加预付。单一异常不一定代表跑路，但多个信号叠加后，控制资金和准备备用方案比等待口头承诺更重要。</p>`,
    decision:`完成“${keyword}”评估后，把候选分成主力、备用和淘汰三类。主力必须完成核心任务并通过高峰复测；备用可以性能较低，但应使用不同入口或运营主体；无法说明条款、核验日期和恢复方式的方案应淘汰。<p>购买后仍要按月复查价格、线路、目标功能和维护状态。保留这次测试记录，下一次就能快速判断变化来自本地环境、客户端、节点还是运营服务，从而形成真正可复用的选择方法。</p>`
  };
  const playbook=groupPlaybooks[group.slug][axisForType[type]];
  const groupAnalysis=buildGroupSpecificAnalysis(type, keyword, group, angle);
  const sharedCore=groupCoreSections[group.slug].has(type) ? `<p>${common[type]}</p>` : '';
  return `<section><h2 id="${type}">${heading}</h2>${sharedCore}<p class="group-specific"><b>${group.name}专题补充：</b>${playbook}</p><p class="group-analysis">${groupAnalysis}</p></section>`;
}

function articleBody(keyword, group, index) {
  const groupIndex=groups.findIndex(item=>item.slug===group.slug);
  const localIndex=index%10;
  const outlineIndex=(localIndex+groupIndex*3)%10;
  const order = sectionOrders[outlineIndex];
  const mode=writingModes[outlineIndex];
  const conclusionHeadings=['给关注这一关键词的读者一条具体建议','把本篇方法落实到下一步','本标题与其他文章的最终区别','完成阅读后应该立刻做什么','用一周时间验证本篇结论','建立属于自己的复查档案','不要让标题替代真实需求','把候选名单缩减到两个','从今天开始记录关键证据','为这个主题设定退出条件'];
  const closing=`<section><h2 id="conclusion">${conclusionHeadings[outlineIndex]}</h2><p>针对“${keyword}”，最值得优先完成的动作是围绕“${topicAngles[keyword]}”建立一份单独记录。记录中至少包含测试日期、使用设备、本地网络、套餐价格、节点地区、成功任务、失败现象和恢复步骤。这样做的价值在于，本篇结论不会与其他关键词混在一起，也不会因为更换客户端或网络后失去参考意义。</p><p>建议先选择两个条件不同的候选方案，不追求一次找到完美答案。用七天覆盖工作日、周末、普通时段和晚高峰；如果核心任务连续失败，立即降低续费周期。如果表现稳定，也仍要保留备用方案和订单记录。最终评价必须服务于“${keyword}”本身，而不是服务于品牌、排行榜名次或促销活动。</p><p>下一次复查时，只比较发生变化的部分：价格变化就重算成本，线路变化就重测路由与高峰，客户端变化就检查兼容与日志，平台变化就重新验证真实功能。通过这种方式，每篇长尾文章都对应一套独立、可复用、可更新的判断方法。</p></section>`;
  const modeIntro=`<section class="writing-mode"><h2 id="mode">${keyword}的${mode.name}阅读方式</h2><p>${mode.lead}</p><p>${mode.method}</p><p>本篇围绕“${topicAngles[keyword]}”设置独立指标和退出条件，因此不直接继承其他关键词文章的判断结果。</p></section>`;
  return personalizeLanguage(modeIntro+order.map(type => buildSection(type, keyword, group, outlineIndex)).join('')+closing,outlineIndex);
}

const articles = [];
let globalIndex = 0;
for (const group of groups) {
  group.keywords.forEach((keyword, localIndex) => {
    const slug = `${group.slug}-${String(localIndex + 1).padStart(2,'0')}.html`;
    articles.push({keyword, group, slug, globalIndex: globalIndex++});
  });
}

for (const article of articles) {
  const {keyword, group, slug, globalIndex} = article;
  const title = titlePatterns[globalIndex % titlePatterns.length](keyword);
  const faqs = faqFor(keyword, group);
  const sameGroup = articles.filter(a => a.group.slug === group.slug && a.slug !== slug);
  const related = [sameGroup[globalIndex % sameGroup.length], sameGroup[(globalIndex + 3) % sameGroup.length], articles[(globalIndex + 11) % articles.length], articles[(globalIndex + 37) % articles.length]].filter(Boolean);
  const faqHtml = faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
  const faqSchema = faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}));
  const relatedHtml = related.map(a=>`<a href="${a.slug}">${a.keyword}：${a.group.name}</a>`).join('');
  const groupIndex=groups.findIndex(item=>item.slug===group.slug);
  const outlineIndex=((globalIndex%10)+groupIndex*3)%sectionOrders.length;
  const tocHtml=`<a href="#mode">${keyword}的${writingModes[outlineIndex].name}阅读方式</a>`+sectionOrders[outlineIndex].map(type=>`<a href="#${type}">${headingVariants[type][outlineIndex]}</a>`).join('')+`<a href="#conclusion">${['给关注这一关键词的读者一条具体建议','把本篇方法落实到下一步','本标题与其他文章的最终区别','完成阅读后应该立刻做什么','用一周时间验证本篇结论','建立属于自己的复查档案','不要让标题替代真实需求','把候选名单缩减到两个','从今天开始记录关键证据','为这个主题设定退出条件'][outlineIndex]}</a>`;
  const schema = {'@context':'https://schema.org','@graph':[{'@type':'Article',headline:title,description:`${keyword}长尾指南，分析线路、价格、稳定性、测试方法和购买风险。`,inLanguage:'zh-CN',author:{'@type':'Organization',name:'V2Ray机场推荐榜和梯子选购（持续更新）'},publisher:{'@type':'Organization',name:'V2Ray机场推荐榜和梯子选购（持续更新）'},mainEntityOfPage:`https://v2raytizi.com/guides/${slug}`},{'@type':'FAQPage',mainEntity:faqSchema}]};
  const body = articleBody(keyword, group, globalIndex);
  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${keyword}长尾指南：${topicAngles[keyword]}，并提供对应测试方法和风险清单。"><meta name="keywords" content="${keyword},${group.keywords.filter(k=>k!==keyword).slice(0,4).join(',')}"><title>${title}｜V2Ray机场推荐榜和梯子选购（持续更新）</title><link rel="canonical" href="https://v2raytizi.com/guides/${slug}"><script type="application/ld+json">${JSON.stringify(schema)}</script><style>${style}</style></head><body>${nav('../')}<main><section class="hero"><div class="wrap"><span class="eyebrow">${group.name.toUpperCase()} · SEO GUIDE</span><h1>${title}</h1><p>${topicAngles[keyword]}。本文围绕这一独立搜索意图展开，不与同组其他标题共用结论。</p><div class="meta"><span>所属专题：${group.name}</span><span>核心关键词：${keyword}</span><span>更新：2026年10月</span></div></div></section><div class="wrap layout"><article class="article">${body}<section class="faq" id="faq"><h2>${keyword}常见问题 FAQ</h2>${faqHtml}</section><section><h2>相关阅读</h2><div class="related">${relatedHtml}</div></section></article><aside class="sidebar"><nav class="toc"><b>本篇独立目录</b>${tocHtml}<a href="#faq">对应FAQ</a></nav><div class="side-card"><b>${group.name}</b><p>${topicAngles[keyword]}。</p><a href="../guide.html#${group.slug}">返回专题文章列表</a><a href="../rankings.html">查看机场排行榜</a><a href="../coupons.html">查看机场优惠码</a><a href="../troubleshooting.html">进入164个问题库</a></div></aside></div></main><section class="global-internal-links"><div class="global-internal-links-inner"><b>站内导航</b><a href="../index.html">首页</a><a href="../index.html#recommend">首页三大机场</a><a href="../rankings.html">机场排行榜</a><a href="../coupons.html">机场优惠码</a><a href="../tutorials.html">使用工具</a><a href="../guide.html">全部梯子指南</a><a href="../troubleshooting.html">机场FAQ</a><a href="../runaway-alert.html">跑路预警</a></div></section><footer><div class="wrap foot"><div><b>V2Ray机场推荐榜和梯子选购（持续更新）</b><div>机场线路、价格与使用指南</div></div><div>购买前请核对最新条款</div></div></footer></body></html>`;
  fs.writeFileSync(path.join(outDir, slug), html);
}

const cards = groups.map(group => `<section class="guide-group" id="${group.slug}"><div class="group-head"><div><span class="eyebrow">${group.name}</span><h2>${group.name}长尾指南</h2></div><p>${group.lens}。</p></div><div class="article-grid">${articles.filter(a=>a.group.slug===group.slug).map(a=>{const title=titlePatterns[a.globalIndex%titlePatterns.length](a.keyword);return `<a class="article-card" href="guides/${a.slug}"><span>${a.keyword}</span><h3>${title}</h3><p>${a.group.focus}。</p><b>阅读全文 →</b></a>`}).join('')}</div></section>`).join('');

const hubStyle = style + `.hub-hero{padding:70px 0 35px}.hub-hero h1{font-size:clamp(40px,5.5vw,66px);line-height:1.08;letter-spacing:-.05em;margin:12px 0}.hub-hero p{max-width:850px;color:var(--muted);font-size:17px}.keyword-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-top:25px}.keyword-stats div{background:#fff;border:1px solid var(--line);border-radius:14px;padding:17px}.keyword-stats b{display:block;font-size:24px}.hub-main{padding:35px 0 75px}.guide-group{padding:25px 0 48px;scroll-margin-top:90px}.group-head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:18px}.group-head h2{font-size:32px;margin:5px 0}.group-head p{max-width:560px;color:var(--muted)}.article-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.article-card{display:block;background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px;text-decoration:none}.article-card:hover{border-color:#7eb5ac;transform:translateY(-1px)}.article-card>span{color:var(--brand);font-size:12px;font-weight:900}.article-card h3{font-size:20px;line-height:1.35;margin:7px 0}.article-card p{color:var(--muted);font-size:13px}.article-card b{color:var(--brand);font-size:13px}@media(max-width:700px){.keyword-stats,.article-grid{grid-template-columns:1fr}.group-head{display:block}}`;
const groupLinks = groups.map(g=>`<a href="#${g.slug}">${g.name}</a>`).join('');
const hub = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="根据80个机场、梯子、专线、客户端、流媒体、AI和跨境业务关键词整理的2026长尾SEO指南。"><title>2026梯子指南文章库｜80篇机场SEO长尾文章</title><link rel="canonical" href="https://v2raytizi.com/guide.html"><style>${hubStyle}</style></head><body>${nav('')}<main><section class="hub-hero"><div class="wrap"><span class="eyebrow">2026 SEO GUIDE LIBRARY</span><h1>2026机场与梯子指南文章库</h1><p>根据关键词文档中的8类、80个核心搜索词生成独立长尾指南。每篇文章围绕自己的标题与搜索意图展开，包含目录、选择标准、测试方法、风险清单和对应FAQ。</p><div class="keyword-stats"><div><b>80篇</b><span>独立长尾文章</span></div><div><b>8个</b><span>关键词专题分组</span></div><div><b>2500字+</b><span>每篇正文最低长度</span></div></div><nav class="category-nav global-internal-links-inner" style="margin-top:22px">${groupLinks}</nav></div></section><div class="wrap hub-main">${cards}</div></main><section class="global-internal-links"><div class="global-internal-links-inner"><b>站内导航</b><a href="index.html">首页</a><a href="index.html#recommend">首页三大机场</a><a href="rankings.html">机场排行榜</a><a href="coupons.html">机场优惠码</a><a href="tutorials.html">机场使用工具</a><a href="troubleshooting.html">164个机场FAQ</a><a href="runaway-alert.html">机场跑路预警</a></div></section><footer><div class="wrap foot"><div><b>V2Ray机场推荐榜和梯子选购（持续更新）</b><div>80篇长尾SEO文章库</div></div><div>内容按主题持续维护</div></div></footer></body></html>`;
fs.writeFileSync(path.join(root, 'guide.html'), hub);

const staticPages = ['index.html','rankings.html','coupons.html','tutorials.html','guide.html','troubleshooting.html','runaway-alert.html','about.html'];
const guidePages = fs.readdirSync(outDir).filter(file => file.endsWith('.html')).map(file => `guides/${file}`);
const faqPages = fs.existsSync(path.join(root, 'faq'))
  ? fs.readdirSync(path.join(root, 'faq')).filter(file => file.endsWith('.html')).map(file => `faq/${file}`)
  : [];
const sitemapEntries = [...staticPages, ...guidePages, ...faqPages].map(file => {
  const loc = file === 'index.html' ? 'https://v2raytizi.com/' : `https://v2raytizi.com/${file}`;
  const priority = file === 'index.html' ? '1.0' : file === 'guide.html' || file === 'troubleshooting.html' ? '0.9' : '0.7';
  return `<url><loc>${loc}</loc><lastmod>2026-10-22</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
}).join('');
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>`);
fs.writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://v2raytizi.com/sitemap.xml\n');

console.log(JSON.stringify({groups:groups.length,keywords:articles.length,articlesWritten:guidePages.length,faqPages:faqPages.length,sitemapUrls:staticPages.length+guidePages.length+faqPages.length}, null, 2));
