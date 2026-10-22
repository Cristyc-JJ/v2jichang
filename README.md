# v2raytizi.com

基于 Astro + TypeScript 的静态内容站，包含机场榜单、详情、VPN 指南、教程、博客、归档、搜索、RSS、SEO 和推广披露。

## 立即预览

- 直接双击根目录的 `index.html`，无需安装任何依赖。
- `dist/` 中同时包含可上传到静态主机的免依赖预览产物。
- 如需通过本地服务器预览，可在项目目录运行：

```bash
python -m http.server 4321 --directory dist
```

然后访问 `http://127.0.0.1:4321/`。

当前 `dist/BUILD-NOTICE.txt` 会说明该目录是免依赖预览包还是正式 Astro 构建包。

## 本地开发

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

构建结果位于 `dist/`，可部署到 Cloudflare Pages、Vercel、Netlify 或任意静态主机。

## 部署与域名

- Cloudflare Pages：构建命令 `npm run build`，输出目录 `dist`
- Node 版本：建议 20 或更高
- 在托管平台添加自定义域名 `v2raytizi.com` 和 `www.v2raytizi.com`
- DNS 根域使用平台提供的 CNAME flattening/ALIAS 或 A 记录；`www` 使用 CNAME
- 将其中一个域名 301 重定向到主域 `https://v2raytizi.com`
- 启用自动 HTTPS，并在上线后提交 `/sitemap-index.xml`

## 内容维护

- 文章：`src/content/posts/`
- 机场详情：`src/content/airports/`
- 所有示例品牌、价格和评分均为演示数据，上线前必须替换为真实且持续核验的数据
- 将 `example.com` 推广链接替换为真实链接，并保留“推广内容”标记
