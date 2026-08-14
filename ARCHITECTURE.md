项目架构

浏览器
  │
  ├─ 文本 / 文件
  ├─ PBKDF2 或随机 AES Key
  ├─ AES-GCM
  └─ 8 MB 加密分片
       │ HTTPS
       ▼
Cloudflare Worker
       │
   ┌───┴────┐
   ▼        ▼
Workers KV  R2

Manifest

文件名、MIME、大小、每个分片 IV、文字说明等放在 Manifest 中；Manifest 本身也会 AES-GCM 加密。

KV Keys

m6:<shareId>
b6:<shareId>:manifest
b6:<shareId>:file:<fileIndex>:chunk:<chunkIndex>

R2 Keys

shares/<shareId>/meta6.json
shares/<shareId>/manifest6.bin
shares/<shareId>/file/<fileIndex>/chunk/<chunkIndex>.bin

服务器必要元数据

Worker 仍需要保存少量非秘密元数据：schema、storage、auth、kdf、salt（密码模式）、iterations、manifestIv、createdAt、expiresAt、fileCount、chunkCounts 等，以便定位、过期判断和读取分片。

双存

客户端只加密一次。同一加密分片由 Worker 同时写入 KV 与 R2；读取时优先 KV，失败时回退 R2。

安全边界

Worker 不需要文件解密密钥，但部署者控制 worker.js 及客户端 JavaScript，因此建议自己部署并控制域名。
