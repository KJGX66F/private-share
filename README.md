密链 · Private Share V6

基于 Cloudflare Workers + Workers KV + R2 的客户端加密文本 / 多文件分享工具。单文件 Worker，无需 VPS，支持 KV、R2、自动选择、KV+R2 双存，大文件分片加密，以及图片 / PDF / 视频预览。






功能

浏览器本地 AES-GCM 加密 / 解密

密码可选，长度不限制

无密码模式：随机 AES Key 放在完整分享链接 #k=...

文本分享、多个文件分享

图片预览 / 大图

PDF 在线预览

MP4 / WebM / MOV 等视频播放

8 MB 分片加密上传，适合大文件

KV / R2 / 自动 / KV+R2 双存

默认永久，也支持 1小时 / 1天 / 7天 / 30天 / 90天

兼容 V2 / V3 / V4 / V5 旧分享

单文件 Worker，可直接在 Cloudflare Dashboard 粘贴部署

最简单部署

1. 创建 Worker

Cloudflare：

Workers & Pages → Create → Worker → Edit code

删除默认代码，将仓库根目录 worker.js 全部粘贴进去，然后 Deploy。

2. 创建 KV

Storage & Databases → Workers KV → Create

例如创建 private-share-kv，然后给 Worker 添加 Binding：

Type: KV Namespace
Variable name: SHARES
Namespace: private-share-kv

SHARES 必须完全一致。

3. 创建 R2

R2 Object Storage → Create bucket

例如创建 private-share-files，然后给 Worker 添加 Binding：

Type: R2 bucket
Variable name: FILES
Bucket: private-share-files

FILES 必须完全一致。R2 Bucket 不需要公开。

4. 完成

最终 Bindings：

SHARES → Workers KV
FILES  → R2 Bucket

访问 https://你的Worker.你的workers.dev 即可。

更详细教程见：docs/DEPLOY.md

存储模式

模式

建议用途

自动

推荐；小分享 KV，大分享 R2

仅 KV

文本 / 小文件

仅 R2

视频 / ZIP / 大文件

KV + R2

同一加密分片双存备份

V6 自动模式在同时绑定 KV 和 R2 时，分享总大小约 ≤18 MB 优先 KV，更大使用 R2。这是项目策略，不是 Cloudflare 的平台硬限制。

大文件架构

V6 使用：

文件 → 8 MB 分片 → 每片 AES-GCM → 逐片上传 → KV / R2

项目当前主动限制：

最多文件：30
单文件：2 GB
单次分享总文件量：4 GB
分片：8 MB

这是项目代码限制；实际可用容量还受你的 Cloudflare 套餐、KV/R2 配额影响。

视频

常见可尝试在线播放的格式：MP4 / WebM / MOV / M4V / OGG/OGV。实际是否能播放还取决于浏览器与编码格式。超大视频建议使用“下载”，因为当前在线播放会先将所有加密分片下载并解密为 Blob 再交给浏览器播放器。

加密模型

有密码

Password → PBKDF2-SHA256 → AES-256-GCM → 密文

无密码

浏览器随机生成 256-bit AES Key，并放在完整 URL：

https://example.com/s/xxxxxxxx#k=xxxxxxxx

正常 HTTP 请求不会把 URL Fragment（#...）发送给服务器。请务必复制完整链接；丢失 #k= 后服务器无法恢复解密密钥。

Cloudflare 平台限制提醒

截至 2026-08，Cloudflare 官方文档显示：Workers KV 单 Value 最大 25 MiB；Free KV 存储 1 GB，Free KV reads 100,000/day、writes 1,000/day。V6 采用 8 MB 分片，因此单个 KV 分片低于 25 MiB，但大文件会快速消耗 KV 的存储与写入次数。

Cloudflare Standard R2 当前免费额度包括 10 GB-month/月存储、1M Class A/月、10M Class B/月，Internet egress 不收费。R2 更适合大文件。

最新限制请以官方文档为准：

https://developers.cloudflare.com/kv/platform/limits/

https://developers.cloudflare.com/kv/platform/pricing/

https://developers.cloudflare.com/r2/pricing/

https://developers.cloudflare.com/r2/platform/limits/

https://developers.cloudflare.com/workers/platform/limits/

安全说明

本项目采用客户端加密，但不是经过第三方形式化审计的“零知识证明系统”。部署者控制发送给浏览器的 JavaScript，因此建议自己部署、使用自己控制的域名，并对重要分享使用密码。详见 SECURITY.md。

如果公开给所有人使用，建议额外加入 Turnstile、Rate Limiting、管理员删除、Abuse 举报、上传限频和 R2 定期清理。

过期清理

KV：使用 expirationTtl，可自动过期。

R2：V6 在访问分享时检查 expiresAt，发现过期后触发删除。已过期但以后再也没人访问的 R2 对象可能暂时继续占空间；公开运营建议增加 Cron 清理。

文档

部署教程

使用教程

架构说明

升级教程

FAQ

发布到 GitHub

安全说明

更新日志

可选 Wrangler 部署

复制 wrangler.toml.example 为 wrangler.toml，填写自己的 KV Namespace ID 与 R2 Bucket 后：

npx wrangler deploy

License

MIT，见 LICENSE。

声明

这是独立实现的开源项目，不是 share.freev2ray.top 或其他第三方 Private Share / Static Share 网站的官方源码。使用者应遵守所在地法律法规及 Cloudflare 服务条款。
