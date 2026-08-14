Cloudflare 部署教程

推荐方案：Dashboard 单文件部署

1. 创建 Worker

Workers & Pages → Create → Worker → Edit code

删除默认代码，复制仓库 worker.js 全部内容，点击 Deploy。

2. 创建 KV

Storage & Databases → Workers KV → Create

建议名称：private-share-kv。

Worker → Settings → Bindings → Add binding → KV Namespace：

Variable name: SHARES

绑定刚创建的 KV。

3. 创建 R2

R2 Object Storage → Create bucket

建议名称：private-share-files。

Worker → Settings → Bindings → Add binding → R2 bucket：

Variable name: FILES

选择刚创建的 Bucket。Bucket 不需要 Public Access。

4. 检查

最终应看到：

KV Namespace: SHARES
R2 Bucket: FILES

5. 自定义域名

Worker → Settings → Domains & Routes → Add → Custom Domain，例如：

share.example.com

只用 KV

可以，只绑定 SHARES。适合文本、小文件。大文件虽然能 8 MB 分片，但会大量消耗 KV 写入和容量。

只用 R2

可以，只绑定 FILES。适合视频、ZIP、大文件。若要继续访问 V2-V4 旧 KV 分享，建议保留 SHARES。

KV + R2

推荐两个都绑定，再选择“自动”。

Wrangler（可选）

复制：

cp wrangler.toml.example wrangler.toml

修改 KV ID / R2 Bucket，然后：

npm install -D wrangler
npx wrangler login
npx wrangler deploy

Cloudflare 当前仍支持 wrangler.toml 和 wrangler.json/jsonc。
