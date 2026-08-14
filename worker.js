const HTML = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>密链 · Private Share V6</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#f5f7fb;color:#172033;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
main{width:min(820px,calc(100% - 24px));margin:auto;padding:40px 0}
.brand{text-align:center;margin-bottom:18px}.brand h1{margin:0;font-size:30px}.brand p{margin:5px 0;color:#7b8497}
.tip{text-align:center;color:#6f7890;font-size:13px;margin-bottom:18px}
.card{background:#fff;border:1px solid #e4e8f0;border-radius:20px;padding:24px;box-shadow:0 18px 55px rgba(40,55,90,.08)}
h2{margin:0 0 18px;font-size:21px}
label{display:block;font-weight:700;font-size:14px;margin:15px 0 7px}
textarea,input,select{width:100%;border:1px solid #dbe0ea;border-radius:12px;padding:12px 13px;font:inherit;background:#fff;outline:none}
textarea{min-height:190px;resize:vertical;line-height:1.6}
textarea:focus,input:focus,select:focus{border-color:#7aa2ff;box-shadow:0 0 0 4px rgba(50,105,235,.09)}
.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
button{border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}
button:disabled{cursor:not-allowed;opacity:.6}
.primary{width:100%;margin-top:18px;background:#316de8;color:#fff}.primary:hover{background:#285cca}
.secondary{background:#eef4ff;color:#285cca}.ghost{background:#f1f3f7;color:#515b6e}
.small,.meta{color:#7d8798;font-size:12px;line-height:1.6}
.hidden{display:none!important}
.result{margin-top:18px;padding:16px;border-radius:14px;background:#f7faff;border:1px solid #d8e5ff}
.shareline{display:flex;gap:8px}.shareline input{min-width:0}.shareline button{white-space:nowrap}
.actions{display:flex;gap:8px;flex-wrap:wrap}
pre{white-space:pre-wrap;word-break:break-word;background:#f8fafc;border:1px solid #e1e5ec;border-radius:14px;padding:16px;min-height:120px;line-height:1.65}
.toast{position:fixed;left:50%;bottom:25px;transform:translateX(-50%);background:#141b2a;color:#fff;padding:10px 14px;border-radius:10px;font-size:13px;z-index:120;max-width:calc(100vw - 32px)}
.mode-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 6px}
.mode-btn{border:1px solid #dbe0ea;background:#f7f8fb;color:#596276}
.mode-btn.active{border-color:#9bb9fb;background:#eef4ff;color:#285cca}
.dropzone{border:1.5px dashed #b8c4d8;border-radius:14px;padding:18px;text-align:center;background:#fafcff;transition:.15s}
.dropzone.drag{border-color:#316de8;background:#f2f6ff}.dropzone.busy{opacity:.72}
.dropzone input{display:none}.dropzone strong{display:block;margin-bottom:4px}
.file-list{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.file-item{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border:1px solid #e4e8f0;border-radius:12px;background:#fbfcfe}
.file-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:700}
.file-info{color:#7d8798;font-size:11px}
.file-remove{padding:7px 9px;background:#f1f3f7;color:#596276;font-size:12px}
.section-title{margin:18px 0 8px;font-size:14px;font-weight:800}
.note-box{margin-top:10px;padding:10px 12px;border-radius:10px;background:#fff8e8;color:#8a5a00;font-size:12px;line-height:1.6}
.info-box{margin-top:10px;padding:10px 12px;border-radius:10px;background:#f3f6fb;color:#475467;font-size:12px;line-height:1.6}
.error-box{margin-top:10px;padding:10px 12px;border-radius:10px;background:#fff1f1;color:#b42318;font-size:12px;line-height:1.6}
.progress{height:8px;background:#edf0f5;border-radius:99px;overflow:hidden;margin-top:10px}
.progress>div{height:100%;width:0;background:#316de8;transition:width .15s}
.storage-badge{display:inline-flex;align-items:center;padding:5px 9px;border-radius:999px;background:#eef4ff;color:#285cca;font-size:11px;font-weight:800;margin-left:6px}
.file-card{margin-top:10px;padding:12px;border:1px solid #e1e5ec;border-radius:14px;background:#fbfcfe}
.file-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.file-head .left{min-width:0}.file-head .name{font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.file-head .desc{color:#7d8798;font-size:11px;margin-top:3px}
.file-actions{display:flex;gap:8px;flex-wrap:wrap}
.file-actions button{background:#eef4ff;color:#285cca;padding:9px 12px;font-size:13px}
.preview-slot{margin-top:10px}
.image-preview{display:block;max-width:100%;max-height:440px;margin:auto;border-radius:12px;object-fit:contain;background:#f2f4f7;cursor:zoom-in}
.video-wrap{background:#0b0f17;border-radius:12px;overflow:hidden}
.video-player{display:block;width:100%;max-height:520px;background:#000}
.pdf-wrap{border:1px solid #e1e5ec;border-radius:12px;overflow:hidden;background:#fff}
.pdf-frame{display:block;width:100%;height:620px;border:0}
.file-progress{margin-top:9px}
.file-progress-text{font-size:11px;color:#667085;margin-bottom:4px}
.lightbox{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:24px}
.lightbox img{max-width:96vw;max-height:92vh;object-fit:contain}
.lightbox-close{position:fixed;right:20px;top:18px;background:#fff;color:#111827;border-radius:999px;width:42px;height:42px;padding:0;font-size:22px}
@media(max-width:600px){
  main{padding-top:24px}.card{padding:18px}.row{grid-template-columns:1fr}
  .shareline{flex-direction:column}.shareline button{width:100%}
  .file-head{align-items:flex-start;flex-direction:column}.file-actions{width:100%}.file-actions button{flex:1}
  .pdf-frame{height:480px}.video-player{max-height:360px}
}
</style>
</head>
<body>
<main>
<div class="brand"><h1>密链</h1><p>Private Share V6</p></div>
<div class="tip">服务器仅存密文 · KV / R2 可选 · 大文件分片加密 · 图片/PDF/视频预览</div>

<section id="createView" class="card">
<h2>创建加密分享</h2>

<div class="mode-tabs">
<button id="textModeBtn" class="mode-btn active" type="button">文本模式</button>
<button id="fileModeBtn" class="mode-btn" type="button">文件模式</button>
</div>

<form id="createForm">
<label id="contentLabel">分享内容</label>
<textarea id="content" maxlength="400000" placeholder="粘贴需要分享的文本……"></textarea>

<div id="fileArea" class="hidden">
<label>添加文件</label>
<div id="dropzone" class="dropzone">
<input id="fileInput" type="file" multiple>
<strong>点击选择文件，或拖拽多个文件到这里</strong>
<span class="small">小文件立即缓存；大文件采用 8 MB 分片读取，不会整份塞进浏览器内存</span>
<div id="readProgress" class="progress hidden"><div id="readProgressBar"></div></div>
</div>
<div id="readStatus" class="small" style="margin-top:8px"></div>
<div id="fileError" class="error-box hidden"></div>
<div id="fileList" class="file-list"></div>
<p id="fileSummary" class="small">已选择 0 个文件</p>
</div>

<label>存储模式</label>
<select id="storageMode">
<option value="auto" selected>自动（推荐：小分享 KV，大文件 R2）</option>
<option value="kv">仅 KV</option>
<option value="r2">仅 R2</option>
<option value="both">KV + R2 双存备份</option>
</select>
<div id="storageHelp" class="info-box">自动模式：同时绑定 KV 和 R2 时，小分享优先 KV，大分享自动使用 R2。</div>

<div class="row">
<div>
<label>访问密码 <span class="small">（可选）</span></label>
<input id="password" type="password" placeholder="可留空，也可任意设置">
</div>
<div>
<label>确认密码 <span class="small">（有密码时填写）</span></label>
<input id="password2" type="password" placeholder="再次输入密码">
</div>
</div>

<label>有效期</label>
<select id="expires">
<option value="0" selected>永久</option>
<option value="3600">1 小时</option>
<option value="86400">1 天</option>
<option value="604800">7 天</option>
<option value="2592000">30 天</option>
<option value="7776000">90 天</option>
</select>

<div id="uploadProgressWrap" class="hidden">
<div id="uploadStatus" class="small" style="margin-top:14px"></div>
<div class="progress"><div id="uploadProgressBar"></div></div>
</div>

<button id="createBtn" class="primary" type="submit">生成密链</button>
<p class="small">无密码时仍然 AES-GCM 加密，随机密钥只放在完整分享链接的 #k=... 中。</p>
</form>

<div id="result" class="result hidden">
<strong>分享链接</strong><span id="actualStorage" class="storage-badge"></span>
<div class="shareline" style="margin-top:9px">
<input id="shareUrl" readonly>
<button id="copyLink" class="secondary" type="button">复制链接</button>
</div>
<p id="expireText" class="small" style="margin-bottom:0"></p>
<div id="noPasswordNote" class="note-box hidden">无密码分享必须复制完整链接；如果丢失 #k=...，服务器也无法恢复解密密钥。</div>
</div>
</section>

<section id="unlockView" class="card hidden">
<div id="lockPanel">
<h2>输入密码解锁</h2>
<label>访问密码</label>
<div class="shareline">
<input id="unlockPassword" type="password" placeholder="输入访问密码">
<button id="unlockBtn" class="primary" style="width:auto;margin:0" type="button">解锁</button>
</div>
<p class="small">密码不会发送到服务器，解密只在当前浏览器完成。</p>
</div>

<div id="autoPanel" class="hidden">
<h2>正在打开分享…</h2>
<p class="small">正在使用完整链接中的本地密钥解密。</p>
</div>

<div id="plainPanel" class="hidden">
<div style="display:flex;justify-content:space-between;gap:12px;align-items:center">
<h2 style="margin:0">分享内容</h2>
<div class="actions">
<button id="copyContent" class="secondary" type="button">复制文本</button>
<button id="lockAgain" class="ghost" type="button">重新锁定</button>
</div>
</div>

<div id="textResultWrap">
<div class="section-title">文本</div>
<pre id="plainText"></pre>
</div>

<div id="filesResultWrap" class="hidden">
<div class="section-title">文件</div>
<div id="downloadList"></div>
</div>

<div id="meta" class="meta" style="margin-top:12px"></div>
</div>
</section>
</main>

<div id="lightbox" class="lightbox hidden" aria-hidden="true">
<button id="lightboxClose" class="lightbox-close" type="button">×</button>
<img id="lightboxImage" alt="图片预览">
</div>
<div id="toast" class="toast hidden"></div>

<script>
const ITERATIONS=250000;
const CHUNK_SIZE=8*1024*1024;
const SMALL_CACHE_LIMIT=20*1024*1024;
const MAX_FILES=30;
const MAX_SINGLE_FILE=2*1024*1024*1024;
const MAX_TOTAL_BYTES=4*1024*1024*1024;
const $=s=>document.querySelector(s);

let timer=null,currentMode="text",readingFiles=false;
let selectedFiles=[];
let shareState=null,activeKey=null,currentManifest=null;
let objectUrls=new Map();

function toast(t){
  clearTimeout(timer);
  $("#toast").textContent=t;
  $("#toast").classList.remove("hidden");
  timer=setTimeout(()=>$("#toast").classList.add("hidden"),3000);
}
function toB64(bytes){
  let s="";
  for(let i=0;i<bytes.length;i+=32768)s+=String.fromCharCode(...bytes.subarray(i,i+32768));
  return btoa(s);
}
function fromB64(s){
  const x=atob(s),a=new Uint8Array(x.length);
  for(let i=0;i<x.length;i++)a[i]=x.charCodeAt(i);
  return a;
}
function toB64Url(bytes){return toB64(bytes).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"")}
function fromB64Url(s){
  let x=s.replace(/-/g,"+").replace(/_/g,"/");
  while(x.length%4)x+="=";
  return fromB64(x);
}
function formatBytes(n){
  if(n<1024)return n+" B";
  if(n<1024*1024)return (n/1024).toFixed(1)+" KB";
  if(n<1024*1024*1024)return (n/1024/1024).toFixed(2)+" MB";
  return (n/1024/1024/1024).toFixed(2)+" GB";
}
function fmt(ts){
  if(!ts)return "永久";
  return new Intl.DateTimeFormat("zh-CN",{dateStyle:"medium",timeStyle:"short"}).format(new Date(ts));
}
function setBar(selector,value){$(selector).style.width=Math.max(0,Math.min(100,value))+"%"}
function showFileError(t){$("#fileError").textContent=t;$("#fileError").classList.remove("hidden")}
function clearFileError(){$("#fileError").textContent="";$("#fileError").classList.add("hidden")}
async function copyText(text){
  try{await navigator.clipboard.writeText(text);toast("已复制")}
  catch{
    const a=document.createElement("textarea");a.value=text;a.style.position="fixed";a.style.opacity="0";
    document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();toast("已复制");
  }
}
async function deriveKey(password,salt){
  const material=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveKey"]);
  return crypto.subtle.deriveKey(
    {name:"PBKDF2",salt,iterations:ITERATIONS,hash:"SHA-256"},
    material,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]
  );
}
async function importRawKey(raw){return crypto.subtle.importKey("raw",raw,{name:"AES-GCM"},false,["encrypt","decrypt"])}
async function prepareCrypto(password){
  if(password!==""){
    const salt=crypto.getRandomValues(new Uint8Array(16));
    return {
      key:await deriveKey(password,salt),
      linkKey:null,
      meta:{auth:"password",kdf:"PBKDF2-SHA256",salt:toB64Url(salt),iterations:ITERATIONS}
    };
  }
  const raw=crypto.getRandomValues(new Uint8Array(32));
  return {key:await importRawKey(raw),linkKey:toB64Url(raw),meta:{auth:"link",kdf:"RAW-256"}};
}
async function encryptPart(key,bytes,iv){return crypto.subtle.encrypt({name:"AES-GCM",iv},key,bytes)}
async function decryptPart(key,bytes,iv){return crypto.subtle.decrypt({name:"AES-GCM",iv},key,bytes)}

function setMode(mode){
  currentMode=mode;
  const fm=mode==="file";
  $("#textModeBtn").classList.toggle("active",!fm);
  $("#fileModeBtn").classList.toggle("active",fm);
  $("#fileArea").classList.toggle("hidden",!fm);
  $("#contentLabel").textContent=fm?"文字说明（可选）":"分享内容";
  $("#content").placeholder=fm?"可选：添加文件说明、备注、链接等……":"粘贴需要分享的文本……";
}
$("#textModeBtn").onclick=()=>setMode("text");
$("#fileModeBtn").onclick=()=>setMode("file");

function updateStorageHelp(){
  const mode=$("#storageMode").value;
  const map={
    auto:"自动：小分享优先 KV；较大文件/视频自动使用 R2。",
    kv:"仅 KV：V6 也会分片保存，但大文件会消耗很多 KV Key、写入次数和空间。",
    r2:"仅 R2：推荐用于视频、ZIP 和大文件。",
    both:"KV + R2：每个加密分片同时保存两份，可靠性更高，但空间与写入消耗也更大。"
  };
  $("#storageHelp").textContent=map[mode];
}
$("#storageMode").onchange=updateStorageHelp;

function fileKey(f){return [f.name,f.size,f.lastModified].join("::")}
function totalSelected(){return selectedFiles.reduce((s,f)=>s+f.size,0)}
function renderSelected(){
  $("#fileList").innerHTML="";
  selectedFiles.forEach((f,index)=>{
    const row=document.createElement("div");row.className="file-item";
    const left=document.createElement("div");left.style.minWidth="0";
    const name=document.createElement("div");name.className="file-name";name.textContent=f.name;
    const info=document.createElement("div");info.className="file-info";
    info.textContent=formatBytes(f.size)+" · "+(f.bytes?"已缓存":"大文件分片模式");
    left.append(name,info);
    const remove=document.createElement("button");remove.type="button";remove.className="file-remove";remove.textContent="移除";
    remove.onclick=()=>{if(!readingFiles){selectedFiles.splice(index,1);renderSelected()}};
    row.append(left,remove);$("#fileList").appendChild(row);
  });
  $("#fileSummary").textContent="已选择 "+selectedFiles.length+" 个文件，共 "+formatBytes(totalSelected());
}
async function prepareFile(file){
  if(file.size>MAX_SINGLE_FILE)throw new Error(file.name+" 超过本版本单文件 2 GB 上限");

  if(file.size<=SMALL_CACHE_LIMIT){
    const buffer=await file.arrayBuffer();
    return {key:fileKey(file),name:file.name,type:file.type||"application/octet-stream",size:file.size,lastModified:file.lastModified,source:file,bytes:new Uint8Array(buffer)};
  }

  // 大文件只探测读取，不整份缓存。
  try{
    const probeSize=Math.min(file.size,64*1024);
    await file.slice(0,probeSize).arrayBuffer();
  }catch(err){
    throw new Error("读取大文件失败："+file.name+"（"+((err&&err.message)||"浏览器无法读取")+"）");
  }

  return {key:fileKey(file),name:file.name,type:file.type||"application/octet-stream",size:file.size,lastModified:file.lastModified,source:file,bytes:null};
}
async function addFiles(list){
  if(readingFiles)return;
  const incoming=Array.from(list||[]);
  if(!incoming.length)return;
  clearFileError();

  const existing=new Set(selectedFiles.map(f=>f.key));
  const unique=[];
  let skipped=0;
  for(const f of incoming){
    const k=fileKey(f);
    if(existing.has(k)||unique.some(x=>fileKey(x)===k)){skipped++;continue}
    unique.push(f);
  }
  if(selectedFiles.length+unique.length>MAX_FILES)return showFileError("最多添加 "+MAX_FILES+" 个文件。");
  const newTotal=totalSelected()+unique.reduce((s,f)=>s+f.size,0);
  if(newTotal>MAX_TOTAL_BYTES)return showFileError("单次分享文件总大小不能超过 4 GB。");

  readingFiles=true;$("#createBtn").disabled=true;
  $("#dropzone").classList.add("busy");$("#readProgress").classList.remove("hidden");

  let success=0;
  try{
    for(let i=0;i<unique.length;i++){
      const f=unique[i];
      $("#readStatus").textContent="正在准备："+f.name+"（"+(i+1)+"/"+unique.length+"）";
      setBar("#readProgressBar",(i/unique.length)*100);
      try{
        selectedFiles.push(await prepareFile(f));
        success++;renderSelected();
      }catch(err){
        showFileError(err.message+"。可尝试把文件复制到本地磁盘/桌面后重新选择。");
      }
      setBar("#readProgressBar",((i+1)/unique.length)*100);
    }
    $("#readStatus").textContent=success?"准备完成："+success+" 个文件"+(skipped?"，跳过 "+skipped+" 个重复文件":"")+"。大文件上传完成前请不要移动或删除原文件。":"没有文件成功准备。";
    if(success)toast("文件已准备");
  }finally{
    readingFiles=false;$("#createBtn").disabled=false;$("#dropzone").classList.remove("busy");
    setTimeout(()=>{$("#readProgress").classList.add("hidden");setBar("#readProgressBar",0)},500);
  }
}
$("#dropzone").onclick=()=>{if(!readingFiles)$("#fileInput").click()};
$("#fileInput").onchange=async e=>{await addFiles(e.target.files);e.target.value=""};
["dragenter","dragover"].forEach(n=>$("#dropzone").addEventListener(n,e=>{e.preventDefault();if(!readingFiles)$("#dropzone").classList.add("drag")}));
["dragleave","drop"].forEach(n=>$("#dropzone").addEventListener(n,e=>{e.preventDefault();$("#dropzone").classList.remove("drag")}));
$("#dropzone").addEventListener("drop",e=>{if(!readingFiles)addFiles(e.dataTransfer.files)});

function chunkCountFor(file){return Math.max(1,Math.ceil(file.size/CHUNK_SIZE))}
function makeChunkDefs(file){
  const count=chunkCountFor(file),chunks=[];
  for(let i=0;i<count;i++){
    const start=i*CHUNK_SIZE,end=Math.min(file.size,start+CHUNK_SIZE);
    chunks.push({iv:toB64Url(crypto.getRandomValues(new Uint8Array(12))),plainSize:end-start});
  }
  return chunks;
}
async function readChunk(file,index){
  const start=index*CHUNK_SIZE,end=Math.min(file.size,start+CHUNK_SIZE);
  if(file.bytes)return file.bytes.subarray(start,end);

  try{
    return new Uint8Array(await file.source.slice(start,end).arrayBuffer());
  }catch(err){
    throw new Error("读取文件失败："+file.name+"，分片 "+(index+1)+"/"+chunkCountFor(file)+"。请确认原文件没有被移动、删除或断开。");
  }
}
async function uploadBinary(url,buffer){
  const r=await fetch(url,{method:"POST",headers:{"content-type":"application/octet-stream"},body:buffer});
  let d={};try{d=await r.json()}catch{}
  if(!r.ok)throw new Error(d.error||("上传失败 HTTP "+r.status));
  return d;
}
function storageLabel(s){return {kv:"KV",r2:"R2",both:"KV + R2"}[s]||String(s||"")}

async function createShare(){
  const text=$("#content").value,password=$("#password").value,password2=$("#password2").value;
  const requestedStorage=$("#storageMode").value,expiresIn=Number($("#expires").value)||null;

  if(readingFiles)throw new Error("文件仍在准备，请稍候");
  if(currentMode==="text"&&!text.trim())throw new Error("请输入分享内容");
  if(currentMode==="file"&&!text.trim()&&!selectedFiles.length)throw new Error("请添加文件或填写文字说明");
  if(password!==password2)throw new Error("两次输入的密码不一致");

  const cryptoInfo=await prepareCrypto(password);
  const fileDefs=selectedFiles.map((f,index)=>({
    index,name:f.name,type:f.type,size:f.size,lastModified:f.lastModified,chunks:makeChunkDefs(f)
  }));
  const chunkCounts=fileDefs.map(f=>f.chunks.length);
  const totalChunks=chunkCounts.reduce((s,n)=>s+n,0);

  $("#uploadProgressWrap").classList.remove("hidden");
  $("#uploadStatus").textContent="正在初始化分享…";setBar("#uploadProgressBar",2);

  const initBody={
    requestedStorage,expiresIn,fileCount:selectedFiles.length,totalBytes:totalSelected(),
    maxFileBytes:selectedFiles.reduce((m,f)=>Math.max(m,f.size),0),chunkCounts,...cryptoInfo.meta
  };
  const initRes=await fetch("/api/init6",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(initBody)});
  const init=await initRes.json();
  if(!initRes.ok)throw new Error(init.error||"初始化失败");

  const manifest={format:"PRIVATE_SHARE_V6",chunkSize:CHUNK_SIZE,text,files:fileDefs};
  const manifestIv=crypto.getRandomValues(new Uint8Array(12));
  const encryptedManifest=await encryptPart(cryptoInfo.key,new TextEncoder().encode(JSON.stringify(manifest)),manifestIv);

  $("#uploadStatus").textContent="正在上传加密清单…";setBar("#uploadProgressBar",5);
  await uploadBinary("/api/upload6/"+encodeURIComponent(init.id)+"/manifest",encryptedManifest);

  let done=0;
  for(let fi=0;fi<selectedFiles.length;fi++){
    const f=selectedFiles[fi],defs=fileDefs[fi].chunks;
    for(let ci=0;ci<defs.length;ci++){
      $("#uploadStatus").textContent="正在上传："+f.name+" · 分片 "+(ci+1)+"/"+defs.length;
      const plain=await readChunk(f,ci);
      const encrypted=await encryptPart(cryptoInfo.key,plain,fromB64Url(defs[ci].iv));
      await uploadBinary("/api/upload6/"+encodeURIComponent(init.id)+"/file/"+fi+"/chunk/"+ci,encrypted);
      done++;
      setBar("#uploadProgressBar",5+(done/Math.max(1,totalChunks))*90);
    }
  }

  $("#uploadStatus").textContent="正在完成分享…";
  const finRes=await fetch("/api/finalize6/"+encodeURIComponent(init.id),{
    method:"POST",headers:{"content-type":"application/json"},
    body:JSON.stringify({manifestIv:toB64Url(manifestIv)})
  });
  const fin=await finRes.json();
  if(!finRes.ok)throw new Error(fin.error||"完成分享失败");

  setBar("#uploadProgressBar",100);$("#uploadStatus").textContent="上传完成";

  let url=location.origin+"/s/"+init.id;
  if(cryptoInfo.linkKey)url+="#k="+encodeURIComponent(cryptoInfo.linkKey);
  $("#shareUrl").value=url;
  $("#actualStorage").textContent=storageLabel(fin.storage||init.storage);
  $("#expireText").textContent="有效期："+fmt(fin.expiresAt||init.expiresAt)+(password===""?" · 无密码":" · 密码保护");
  $("#noPasswordNote").classList.toggle("hidden",password!=="");
  $("#result").classList.remove("hidden");$("#result").scrollIntoView({behavior:"smooth",block:"nearest"});
  toast("密链已生成");
}
$("#createForm").addEventListener("submit",async e=>{
  e.preventDefault();const btn=$("#createBtn");btn.disabled=true;btn.textContent="处理中…";
  try{await createShare()}catch(err){console.error(err);toast(err.message||"创建失败")}
  finally{btn.disabled=false;btn.textContent="生成密链"}
});
$("#copyLink").onclick=()=>copyText($("#shareUrl").value);

function fileExt(name){
  const s=String(name||""),i=s.lastIndexOf(".");
  return i>=0?s.slice(i+1).toLowerCase():"";
}
function isImage(file){
  return String(file.type||"").toLowerCase().startsWith("image/")||["jpg","jpeg","png","webp","gif","bmp","svg","ico","avif"].includes(fileExt(file.name));
}
function isPdf(file){return String(file.type||"").toLowerCase()==="application/pdf"||fileExt(file.name)==="pdf"}
function isPlayableVideo(file){
  const type=String(file.type||"").toLowerCase(),ext=fileExt(file.name);
  return type.startsWith("video/")||["mp4","webm","ogv","ogg","mov","m4v"].includes(ext);
}
function closeLightbox(){
  $("#lightbox").classList.add("hidden");$("#lightbox").setAttribute("aria-hidden","true");$("#lightboxImage").src="";
}
$("#lightboxClose").onclick=closeLightbox;
$("#lightbox").addEventListener("click",e=>{if(e.target===$("#lightbox"))closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});
function openLightbox(url,alt){
  $("#lightboxImage").src=url;$("#lightboxImage").alt=alt||"图片预览";
  $("#lightbox").classList.remove("hidden");$("#lightbox").setAttribute("aria-hidden","false");
}
function clearObjectUrls(){
  for(const v of objectUrls.values())URL.revokeObjectURL(v.url);
  objectUrls.clear();
}
async function fetchChunk(file,chunkIndex){
  const r=await fetch("/api/blob6/"+encodeURIComponent(shareState.id)+"/file/"+file.index+"/chunk/"+chunkIndex);
  if(!r.ok){
    let msg="文件读取失败";try{msg=(await r.json()).error||msg}catch{}
    throw new Error(msg);
  }
  const enc=await r.arrayBuffer();
  return new Uint8Array(await decryptPart(activeKey,enc,fromB64Url(file.chunks[chunkIndex].iv)));
}
async function buildBlob(file,onProgress){
  if(objectUrls.has(file.index))return objectUrls.get(file.index);

  // V5 legacy whole-file.
  if(!file.chunks){
    const r=await fetch("/api/blob/"+encodeURIComponent(shareState.id)+"/file/"+file.index);
    if(!r.ok)throw new Error("文件读取失败");
    const enc=await r.arrayBuffer();
    const plain=await decryptPart(activeKey,enc,fromB64Url(file.iv));
    const blob=new Blob([plain],{type:file.type||"application/octet-stream"});
    const obj={blob,url:URL.createObjectURL(blob)};objectUrls.set(file.index,obj);return obj;
  }

  const parts=[];
  for(let i=0;i<file.chunks.length;i++){
    parts.push(await fetchChunk(file,i));
    if(onProgress)onProgress((i+1)/file.chunks.length);
  }
  const blob=new Blob(parts,{type:file.type||"application/octet-stream"});
  const obj={blob,url:URL.createObjectURL(blob)};objectUrls.set(file.index,obj);return obj;
}
function triggerDownload(url,name){
  const a=document.createElement("a");a.href=url;a.download=name||"download";a.style.display="none";
  document.body.appendChild(a);a.click();a.remove();
}
async function saveLargeFile(file,progress){
  if(file.chunks && "showSaveFilePicker" in window){
    try{
      const handle=await window.showSaveFilePicker({suggestedName:file.name||"download"});
      const writable=await handle.createWritable();
      try{
        for(let i=0;i<file.chunks.length;i++){
          const plain=await fetchChunk(file,i);
          await writable.write(plain);
          progress((i+1)/file.chunks.length);
        }
        await writable.close();
        return true;
      }catch(err){
        try{await writable.abort()}catch{}
        throw err;
      }
    }catch(err){
      if(err&&err.name==="AbortError")return false;
      throw err;
    }
  }

  const obj=await buildBlob(file,progress);
  triggerDownload(obj.url,file.name);
  return true;
}
function addProgress(card){
  const wrap=document.createElement("div");wrap.className="file-progress hidden";
  const txt=document.createElement("div");txt.className="file-progress-text";
  const bar=document.createElement("div");bar.className="progress";
  const inner=document.createElement("div");bar.appendChild(inner);wrap.append(txt,bar);card.appendChild(wrap);
  return {
    show(label){txt.textContent=label;wrap.classList.remove("hidden")},
    set(v,label){if(label)txt.textContent=label;inner.style.width=Math.round(v*100)+"%"},
    hide(){wrap.classList.add("hidden");inner.style.width="0"}
  };
}
function renderManifest(manifest){
  currentManifest=manifest;
  const text=typeof manifest.text==="string"?manifest.text:"";
  const files=Array.isArray(manifest.files)?manifest.files:[];

  $("#plainText").textContent=text;
  $("#textResultWrap").classList.toggle("hidden",!text);
  $("#copyContent").classList.toggle("hidden",!text);
  $("#downloadList").innerHTML="";
  $("#filesResultWrap").classList.toggle("hidden",!files.length);

  files.forEach((file,index)=>{
    if(file.index===undefined)file.index=index;

    const card=document.createElement("div");card.className="file-card";
    const head=document.createElement("div");head.className="file-head";
    const left=document.createElement("div");left.className="left";
    const name=document.createElement("div");name.className="name";name.textContent=file.name||"未命名文件";
    const desc=document.createElement("div");desc.className="desc";
    desc.textContent=formatBytes(Number(file.size)||0)+(file.type?" · "+file.type:"")+(file.chunks?" · "+file.chunks.length+" 分片":"");
    left.append(name,desc);

    const actions=document.createElement("div");actions.className="file-actions";
    const download=document.createElement("button");download.type="button";download.textContent="下载";
    actions.append(download);
    head.append(left,actions);card.appendChild(head);

    const slot=document.createElement("div");slot.className="preview-slot hidden";card.appendChild(slot);
    const prog=addProgress(card);

    download.onclick=async()=>{
      const old=download.textContent;download.disabled=true;download.textContent="处理中…";prog.show("正在解密下载…");
      try{
        const ok=await saveLargeFile(file,v=>prog.set(v,"正在解密下载 "+Math.round(v*100)+"%"));
        if(ok){prog.set(1,"下载完成");toast("文件已处理")}
      }catch(err){console.error(err);toast(err.message||"下载失败")}
      finally{download.disabled=false;download.textContent=old;setTimeout(()=>prog.hide(),1200)}
    };

    if(isImage(file)){
      const btn=document.createElement("button");btn.type="button";btn.textContent="预览图片";actions.prepend(btn);
      btn.onclick=async()=>{
        btn.disabled=true;prog.show("正在解密图片…");
        try{
          const obj=await buildBlob(file,v=>prog.set(v,"正在解密图片 "+Math.round(v*100)+"%"));
          slot.innerHTML="";
          const img=document.createElement("img");img.className="image-preview";img.src=obj.url;img.alt=file.name||"图片";
          img.onclick=()=>openLightbox(obj.url,file.name);slot.appendChild(img);slot.classList.remove("hidden");
          btn.textContent="查看大图";btn.onclick=()=>openLightbox(obj.url,file.name);
        }catch(err){toast(err.message||"图片预览失败");btn.textContent="预览图片"}
        finally{btn.disabled=false;prog.hide()}
      };
    }else if(isPdf(file)){
      const btn=document.createElement("button");btn.type="button";btn.textContent="预览 PDF";actions.prepend(btn);
      btn.onclick=async()=>{
        if(!slot.classList.contains("hidden")){slot.classList.add("hidden");btn.textContent="预览 PDF";return}
        btn.disabled=true;prog.show("正在解密 PDF…");
        try{
          const obj=await buildBlob(file,v=>prog.set(v,"正在解密 PDF "+Math.round(v*100)+"%"));
          slot.innerHTML="";
          const wrap=document.createElement("div");wrap.className="pdf-wrap";
          const frame=document.createElement("iframe");frame.className="pdf-frame";frame.src=obj.url;frame.title=(file.name||"PDF")+" 预览";
          wrap.appendChild(frame);slot.appendChild(wrap);slot.classList.remove("hidden");btn.textContent="收起预览";
        }catch(err){toast(err.message||"PDF 预览失败");btn.textContent="预览 PDF"}
        finally{btn.disabled=false;prog.hide()}
      };
    }else if(isPlayableVideo(file)){
      const btn=document.createElement("button");btn.type="button";btn.textContent="播放视频";actions.prepend(btn);
      btn.onclick=async()=>{
        if(!slot.classList.contains("hidden")){slot.classList.add("hidden");btn.textContent="播放视频";return}
        btn.disabled=true;prog.show("正在下载并解密视频…");
        try{
          const obj=await buildBlob(file,v=>prog.set(v,"正在准备视频 "+Math.round(v*100)+"%"));
          slot.innerHTML="";
          const wrap=document.createElement("div");wrap.className="video-wrap";
          const video=document.createElement("video");video.className="video-player";video.src=obj.url;video.controls=true;video.playsInline=true;video.preload="metadata";
          wrap.appendChild(video);slot.appendChild(wrap);slot.classList.remove("hidden");btn.textContent="收起视频";
          try{await video.play()}catch{}
        }catch(err){console.error(err);toast(err.message||"视频加载失败");btn.textContent="播放视频"}
        finally{btn.disabled=false;prog.hide()}
      };
    }

    $("#downloadList").appendChild(card);
  });
}

async function loadModernMeta(id){
  const r=await fetch("/api/meta6/"+encodeURIComponent(id));
  if(r.status===404)return null;
  const d=await r.json();if(!r.ok)throw new Error(d.error||"分享读取失败");return d;
}
async function loadV5Meta(id){
  const r=await fetch("/api/meta/"+encodeURIComponent(id));
  if(r.status===404)return null;
  const d=await r.json();if(!r.ok)throw new Error(d.error||"分享读取失败");return d;
}
async function loadLegacy(id){
  const r=await fetch("/api/get/"+encodeURIComponent(id));
  const d=await r.json();if(!r.ok)throw new Error(d.error||"分享不存在或已过期");return d;
}
async function keyForMeta(meta,password,linkKey){
  if(meta.auth==="password")return deriveKey(password,meta.schema===5?fromB64Url(meta.salt):fromB64Url(meta.salt));
  if(!linkKey)throw new Error("完整分享链接缺少解密密钥");
  return importRawKey(fromB64Url(linkKey));
}
async function decryptModernManifest(meta,password,linkKey){
  const key=await keyForMeta(meta,password,linkKey);
  const endpoint=meta.schema===6?"/api/blob6/":"/api/blob/";
  const r=await fetch(endpoint+encodeURIComponent(shareState.id)+"/manifest");
  if(!r.ok){let msg="加密清单读取失败";try{msg=(await r.json()).error||msg}catch{}throw new Error(msg)}
  const enc=await r.arrayBuffer();
  const plain=await decryptPart(key,enc,fromB64Url(meta.manifestIv));
  const manifest=JSON.parse(new TextDecoder().decode(plain));
  activeKey=key;return manifest;
}
async function decryptLegacy(data,password,linkKey){
  let key;
  if(data.auth==="password"){
    const salt=data.v>=2?fromB64(data.salt):fromB64(data.salt);
    const material=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveKey"]);
    key=await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:data.iterations,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["decrypt"]);
  }else{
    if(!linkKey)throw new Error("完整分享链接缺少解密密钥");
    key=await importRawKey(fromB64Url(linkKey));
  }
  const plain=await decryptPart(key,fromB64(data.ciphertext),fromB64(data.iv));
  const decoded=new TextDecoder().decode(plain);
  let bundle;try{bundle=JSON.parse(decoded)}catch{bundle={text:decoded,files:[]}}
  activeKey=key;return bundle;
}
function showPlain(manifest,metaText){
  renderManifest(manifest);$("#meta").textContent=metaText;
  $("#lockPanel").classList.add("hidden");$("#autoPanel").classList.add("hidden");$("#plainPanel").classList.remove("hidden");
}
async function openSharePassword(password){
  clearObjectUrls();
  if(shareState.kind==="modern"){
    const m=await decryptModernManifest(shareState.meta,password,null);
    showPlain(m,"创建："+fmt(shareState.meta.createdAt)+" · 有效期："+fmt(shareState.meta.expiresAt)+" · "+storageLabel(shareState.meta.storage)+" · 密码保护");
  }else{
    const b=await decryptLegacy(shareState.meta,password,null);
    showPlain(b,"创建："+fmt(shareState.meta.createdAt)+" · 有效期："+fmt(shareState.meta.expiresAt)+" · 密码保护");
  }
}
async function openShareLink(linkKey){
  clearObjectUrls();
  if(shareState.kind==="modern"){
    const m=await decryptModernManifest(shareState.meta,"",linkKey);
    showPlain(m,"创建："+fmt(shareState.meta.createdAt)+" · 有效期："+fmt(shareState.meta.expiresAt)+" · "+storageLabel(shareState.meta.storage)+" · 无密码链接");
  }else{
    const b=await decryptLegacy(shareState.meta,"",linkKey);
    showPlain(b,"创建："+fmt(shareState.meta.createdAt)+" · 有效期："+fmt(shareState.meta.expiresAt)+" · 无密码链接");
  }
}

const pathParts=location.pathname.split("/").filter(Boolean);
const shareId=(pathParts.length===2&&pathParts[0]==="s")?pathParts[1]:null;
const hashParams=new URLSearchParams(location.hash.startsWith("#")?location.hash.slice(1):"");
const linkKey=hashParams.get("k");

if(shareId){
  $("#createView").classList.add("hidden");$("#unlockView").classList.remove("hidden");
  (async()=>{
    try{
      const v6=await loadModernMeta(shareId);
      if(v6)shareState={kind:"modern",id:shareId,meta:v6};
      else{
        const v5=await loadV5Meta(shareId);
        if(v5)shareState={kind:"modern",id:shareId,meta:v5};
        else shareState={kind:"legacy",id:shareId,meta:await loadLegacy(shareId)};
      }

      if(shareState.meta.auth==="link"){
        $("#lockPanel").classList.add("hidden");$("#autoPanel").classList.remove("hidden");
        await openShareLink(linkKey);toast("已打开分享");
      }else{$("#unlockPassword").focus()}
    }catch(err){$("#autoPanel").classList.add("hidden");toast(err.message||"分享不存在或已过期")}
  })();

  $("#unlockBtn").onclick=async()=>{
    try{await openSharePassword($("#unlockPassword").value);$("#unlockPassword").value="";toast("解锁成功")}
    catch(err){console.error(err);toast(err.name==="OperationError"?"密码错误或密文损坏":(err.message||"解锁失败"))}
  };
  $("#unlockPassword").addEventListener("keydown",e=>{if(e.key==="Enter")$("#unlockBtn").click()});
  $("#copyContent").onclick=()=>copyText($("#plainText").textContent);
  $("#lockAgain").onclick=()=>{
    clearObjectUrls();activeKey=null;currentManifest=null;$("#plainText").textContent="";$("#downloadList").innerHTML="";$("#plainPanel").classList.add("hidden");
    if(shareState&&shareState.meta.auth==="link"){
      $("#autoPanel").classList.remove("hidden");openShareLink(linkKey).catch(err=>toast(err.message||"重新打开失败"));
    }else{$("#lockPanel").classList.remove("hidden");$("#unlockPassword").focus();toast("已重新锁定")}
  };
}
</script>
</body>
</html>`;

const ID_RE=/^[A-Za-z0-9_-]{10,24}$/;
const MAX_CHUNK_BODY=10*1024*1024;
const AUTO_KV_TOTAL=18*1024*1024;
const MAX_SINGLE_FILE=2*1024*1024*1024;
const MAX_TOTAL_BYTES=4*1024*1024*1024;

function json(data,status=200){
  return new Response(JSON.stringify(data),{status,headers:{
    "content-type":"application/json;charset=utf-8","cache-control":"no-store",
    "x-content-type-options":"nosniff","referrer-policy":"no-referrer"
  }});
}
function makeId(){
  const a=new Uint8Array(9);crypto.getRandomValues(a);let s="";
  for(const b of a)s+=String.fromCharCode(b);
  return btoa(s).split("+").join("-").split("/").join("_").replace(/=+$/,"");
}
function validId(id){return typeof id==="string"&&ID_RE.test(id)}
function m6(id){return "m6:"+id}
function k6Manifest(id){return "b6:"+id+":manifest"}
function k6Chunk(id,fi,ci){return "b6:"+id+":file:"+fi+":chunk:"+ci}
function r6Meta(id){return "shares/"+id+"/meta6.json"}
function r6Manifest(id){return "shares/"+id+"/manifest6.bin"}
function r6Chunk(id,fi,ci){return "shares/"+id+"/file/"+fi+"/chunk/"+ci+".bin"}

function remainingTtl(meta){
  if(!meta.expiresAt)return null;
  return Math.max(60,Math.floor((meta.expiresAt-Date.now())/1000));
}
function expired(meta){return !!(meta&&meta.expiresAt&&Date.now()>=meta.expiresAt)}
function needsKv(s){return s==="kv"||s==="both"}
function needsR2(s){return s==="r2"||s==="both"}

async function readMeta6(env,id){
  if(env.SHARES){
    try{const x=await env.SHARES.get(m6(id),"json");if(x)return x}catch{}
  }
  if(env.FILES){
    try{const o=await env.FILES.get(r6Meta(id));if(o)return await o.json()}catch{}
  }
  return null;
}
async function writeMeta6(env,id,meta){
  const tasks=[],ttl=remainingTtl(meta);
  if(needsKv(meta.storage)){
    if(!env.SHARES)throw new Error("缺少 KV Binding：SHARES");
    const opts={metadata:{schema:6,kind:"meta",storage:meta.storage}};
    if(ttl)opts.expirationTtl=ttl;
    tasks.push(env.SHARES.put(m6(id),JSON.stringify(meta),opts));
  }
  if(needsR2(meta.storage)){
    if(!env.FILES)throw new Error("缺少 R2 Binding：FILES");
    tasks.push(env.FILES.put(r6Meta(id),JSON.stringify(meta),{httpMetadata:{contentType:"application/json"}}));
  }
  await Promise.all(tasks);
}
function chooseStorage(env,body){
  const req=body.requestedStorage,hasKv=!!env.SHARES,hasR2=!!env.FILES,total=Number(body.totalBytes||0);
  if(req==="kv"){
    if(!hasKv)throw new Error("尚未绑定 KV：SHARES");
    return "kv";
  }
  if(req==="r2"){
    if(!hasR2)throw new Error("尚未绑定 R2：FILES");
    return "r2";
  }
  if(req==="both"){
    if(!hasKv||!hasR2)throw new Error("双存模式需要同时绑定 SHARES 和 FILES");
    return "both";
  }
  if(req!=="auto")throw new Error("无效的存储模式");
  if(hasKv&&hasR2)return total<=AUTO_KV_TOTAL?"kv":"r2";
  if(hasR2)return "r2";
  if(hasKv)return "kv";
  throw new Error("至少需要绑定 SHARES(KV) 或 FILES(R2)");
}
function validateInit6(body){
  if(!body||typeof body!=="object")return "请求格式错误";
  if(!["auto","kv","r2","both"].includes(body.requestedStorage))return "存储模式错误";
  if(!["password","link"].includes(body.auth))return "加密模式错误";
  if(!Number.isInteger(body.fileCount)||body.fileCount<0||body.fileCount>30)return "文件数量错误";
  if(!Number.isFinite(body.totalBytes)||body.totalBytes<0||body.totalBytes>MAX_TOTAL_BYTES)return "总文件大小超出限制";
  if(!Number.isFinite(body.maxFileBytes)||body.maxFileBytes<0||body.maxFileBytes>MAX_SINGLE_FILE)return "单文件大小超出限制";
  if(!Array.isArray(body.chunkCounts)||body.chunkCounts.length!==body.fileCount)return "分片信息错误";
  for(const n of body.chunkCounts){
    if(!Number.isInteger(n)||n<1||n>1024)return "分片数量错误";
  }
  if(body.auth==="password"){
    if(body.kdf!=="PBKDF2-SHA256")return "KDF 错误";
    if(typeof body.salt!=="string"||body.salt.length<10||body.salt.length>128)return "Salt 错误";
    if(body.iterations!==250000)return "PBKDF2 参数错误";
  }else if(body.kdf!=="RAW-256")return "无密码密钥模式错误";
  if(body.expiresIn!==null&&body.expiresIn!==undefined){
    const ttl=Number(body.expiresIn);
    if(!Number.isInteger(ttl)||ttl<60||ttl>31536000)return "有效期错误";
  }
  return null;
}
async function store6(env,id,meta,kind,fi,ci,request){
  const len=Number(request.headers.get("content-length")||"0");
  if(len>MAX_CHUNK_BODY)return json({error:"单个上传分片过大"},413);
  if(expired(meta))return json({error:"分享已过期"},410);

  const kvKey=kind==="manifest"?k6Manifest(id):k6Chunk(id,fi,ci);
  const r2Key=kind==="manifest"?r6Manifest(id):r6Chunk(id,fi,ci);
  const ttl=remainingTtl(meta);
  const opts={metadata:{schema:6,kind,fi:fi??-1,ci:ci??-1}};
  if(ttl)opts.expirationTtl=ttl;

  if(meta.storage==="kv"){
    await env.SHARES.put(kvKey,request.body,opts);
  }else if(meta.storage==="r2"){
    await env.FILES.put(r2Key,request.body,{httpMetadata:{contentType:"application/octet-stream"}});
  }else{
    if(!request.body)return json({error:"缺少上传内容"},400);
    const streams=request.body.tee();
    await Promise.all([
      env.SHARES.put(kvKey,streams[0],opts),
      env.FILES.put(r2Key,streams[1],{httpMetadata:{contentType:"application/octet-stream"}})
    ]);
  }
  return json({ok:true});
}
async function read6(env,id,meta,kind,fi,ci){
  const kvKey=kind==="manifest"?k6Manifest(id):k6Chunk(id,fi,ci);
  const r2Key=kind==="manifest"?r6Manifest(id):r6Chunk(id,fi,ci);

  if((meta.storage==="kv"||meta.storage==="both")&&env.SHARES){
    try{const s=await env.SHARES.get(kvKey,"stream");if(s)return s}catch{}
    if(meta.storage==="kv")return null;
  }
  if((meta.storage==="r2"||meta.storage==="both")&&env.FILES){
    try{const o=await env.FILES.get(r2Key);if(o)return o.body}catch{}
  }
  return null;
}
async function cleanup6(env,id,meta){
  const tasks=[];
  if(env.SHARES){
    tasks.push(env.SHARES.delete(m6(id)),env.SHARES.delete(k6Manifest(id)));
    for(let fi=0;fi<(meta.fileCount||0);fi++){
      const count=(meta.chunkCounts&&meta.chunkCounts[fi])||0;
      for(let ci=0;ci<count;ci++)tasks.push(env.SHARES.delete(k6Chunk(id,fi,ci)));
    }
  }
  if(env.FILES){
    const keys=[r6Meta(id),r6Manifest(id)];
    for(let fi=0;fi<(meta.fileCount||0);fi++){
      const count=(meta.chunkCounts&&meta.chunkCounts[fi])||0;
      for(let ci=0;ci<count;ci++)keys.push(r6Chunk(id,fi,ci));
    }
    // 批量删除，分批避免一次过多。
    for(let i=0;i<keys.length;i+=500)tasks.push(env.FILES.delete(keys.slice(i,i+500)));
  }
  await Promise.allSettled(tasks);
}
function publicMeta6(meta){
  return {
    schema:6,status:meta.status,storage:meta.storage,auth:meta.auth,kdf:meta.kdf,
    salt:meta.salt,iterations:meta.iterations,manifestIv:meta.manifestIv,
    createdAt:meta.createdAt,expiresAt:meta.expiresAt,fileCount:meta.fileCount,chunkCounts:meta.chunkCounts
  };
}

/* V5 compatibility helpers */
function v5MetaKey(id){return "m5:"+id}
function v5BlobKey(id,kind,index){return kind==="manifest"?"b5:"+id+":manifest":"b5:"+id+":file:"+index}
function v5R2Meta(id){return "shares/"+id+"/meta.json"}
function v5R2Blob(id,kind,index){return kind==="manifest"?"shares/"+id+"/manifest.bin":"shares/"+id+"/file/"+index+".bin"}
async function readMeta5(env,id){
  if(env.SHARES){try{const v=await env.SHARES.get(v5MetaKey(id),"json");if(v)return v}catch{}}
  if(env.FILES){try{const o=await env.FILES.get(v5R2Meta(id));if(o)return await o.json()}catch{}}
  return null;
}
async function readBlob5(env,id,meta,kind,index){
  if((meta.storage==="kv"||meta.storage==="both")&&env.SHARES){
    try{const s=await env.SHARES.get(v5BlobKey(id,kind,index),"stream");if(s)return s}catch{}
    if(meta.storage==="kv")return null;
  }
  if((meta.storage==="r2"||meta.storage==="both")&&env.FILES){
    try{const o=await env.FILES.get(v5R2Blob(id,kind,index));if(o)return o.body}catch{}
  }
  return null;
}
function publicMeta5(meta){
  return {
    schema:5,status:meta.status,storage:meta.storage,auth:meta.auth,kdf:meta.kdf,
    salt:meta.salt,iterations:meta.iterations,manifestIv:meta.manifestIv,
    createdAt:meta.createdAt,expiresAt:meta.expiresAt,fileCount:meta.fileCount
  };
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    try{
      if(url.pathname==="/api/init6"&&request.method==="POST"){
        let body;try{body=await request.json()}catch{return json({error:"JSON 格式错误"},400)}
        const e=validateInit6(body);if(e)return json({error:e},400);

        let storage;try{storage=chooseStorage(env,body)}catch(err){return json({error:err.message},400)}

        let id=null;
        for(let i=0;i<5;i++){
          const c=makeId();
          const exists6=await readMeta6(env,c);
          const exists5=await readMeta5(env,c);
          const legacy=env.SHARES?await env.SHARES.get(c):null;
          if(!exists6&&!exists5&&!legacy){id=c;break}
        }
        if(!id)return json({error:"生成分享 ID 失败"},500);

        const now=Date.now(),ttl=body.expiresIn?Number(body.expiresIn):null;
        const meta={
          schema:6,status:"uploading",storage,auth:body.auth,kdf:body.kdf,
          salt:body.auth==="password"?body.salt:undefined,
          iterations:body.auth==="password"?body.iterations:undefined,
          createdAt:now,expiresAt:ttl?now+ttl*1000:null,
          fileCount:body.fileCount,chunkCounts:body.chunkCounts
        };
        await writeMeta6(env,id,meta);
        return json({id,storage,expiresAt:meta.expiresAt},201);
      }

      if(url.pathname.startsWith("/api/upload6/")&&request.method==="POST"){
        const p=url.pathname.split("/").filter(Boolean);
        if(p.length<4)return json({error:"上传路径错误"},400);
        const id=decodeURIComponent(p[2]);if(!validId(id))return json({error:"分享 ID 无效"},400);
        const meta=await readMeta6(env,id);if(!meta)return json({error:"分享初始化信息尚未可用，请稍后重试"},404);
        if(meta.status!=="uploading")return json({error:"该分享不可继续上传"},409);
        if(expired(meta)){ctx.waitUntil(cleanup6(env,id,meta));return json({error:"分享已过期"},410)}

        if(p[3]==="manifest"&&p.length===4)return store6(env,id,meta,"manifest",null,null,request);
        if(p[3]==="file"&&p.length===7&&p[5]==="chunk"){
          const fi=Number(p[4]),ci=Number(p[6]);
          if(!Number.isInteger(fi)||fi<0||fi>=meta.fileCount)return json({error:"文件索引错误"},400);
          const count=meta.chunkCounts[fi]||0;
          if(!Number.isInteger(ci)||ci<0||ci>=count)return json({error:"分片索引错误"},400);
          return store6(env,id,meta,"chunk",fi,ci,request);
        }
        return json({error:"上传路径错误"},400);
      }

      if(url.pathname.startsWith("/api/finalize6/")&&request.method==="POST"){
        const id=decodeURIComponent(url.pathname.slice("/api/finalize6/".length));
        if(!validId(id))return json({error:"分享 ID 无效"},400);
        const meta=await readMeta6(env,id);if(!meta)return json({error:"分享不存在"},404);
        if(expired(meta)){ctx.waitUntil(cleanup6(env,id,meta));return json({error:"分享已过期"},410)}
        let body;try{body=await request.json()}catch{return json({error:"请求格式错误"},400)}
        if(typeof body.manifestIv!=="string"||body.manifestIv.length<10||body.manifestIv.length>128)return json({error:"Manifest IV 错误"},400);
        meta.manifestIv=body.manifestIv;meta.status="complete";await writeMeta6(env,id,meta);
        return json({ok:true,storage:meta.storage,expiresAt:meta.expiresAt});
      }

      if(url.pathname.startsWith("/api/meta6/")&&request.method==="GET"){
        const id=decodeURIComponent(url.pathname.slice("/api/meta6/".length));
        if(!validId(id))return json({error:"分享链接无效"},400);
        const meta=await readMeta6(env,id);if(!meta)return json({error:"分享不存在"},404);
        if(expired(meta)){ctx.waitUntil(cleanup6(env,id,meta));return json({error:"分享不存在或已过期"},404)}
        if(meta.status!=="complete")return json({error:"分享尚未上传完成"},409);
        return json(publicMeta6(meta));
      }

      if(url.pathname.startsWith("/api/blob6/")&&request.method==="GET"){
        const p=url.pathname.split("/").filter(Boolean);
        if(p.length<4)return json({error:"文件路径错误"},400);
        const id=decodeURIComponent(p[2]);if(!validId(id))return json({error:"分享 ID 无效"},400);
        const meta=await readMeta6(env,id);if(!meta)return json({error:"分享不存在"},404);
        if(expired(meta)){ctx.waitUntil(cleanup6(env,id,meta));return json({error:"分享不存在或已过期"},404)}
        if(meta.status!=="complete")return json({error:"分享尚未完成"},409);

        let kind,fi=null,ci=null;
        if(p[3]==="manifest"&&p.length===4)kind="manifest";
        else if(p[3]==="file"&&p.length===7&&p[5]==="chunk"){
          kind="chunk";fi=Number(p[4]);ci=Number(p[6]);
          if(!Number.isInteger(fi)||fi<0||fi>=meta.fileCount)return json({error:"文件索引错误"},400);
          const count=meta.chunkCounts[fi]||0;
          if(!Number.isInteger(ci)||ci<0||ci>=count)return json({error:"分片索引错误"},400);
        }else return json({error:"文件路径错误"},400);

        const stream=await read6(env,id,meta,kind,fi,ci);
        if(!stream)return json({error:"加密数据不存在"},404);
        return new Response(stream,{headers:{
          "content-type":"application/octet-stream","cache-control":"no-store",
          "x-content-type-options":"nosniff","referrer-policy":"no-referrer"
        }});
      }

      /* V5 */
      if(url.pathname.startsWith("/api/meta/")&&request.method==="GET"){
        const id=decodeURIComponent(url.pathname.slice("/api/meta/".length));
        if(!validId(id))return json({error:"分享链接无效"},400);
        const meta=await readMeta5(env,id);if(!meta)return json({error:"分享不存在"},404);
        if(expired(meta))return json({error:"分享不存在或已过期"},404);
        if(meta.status!=="complete")return json({error:"分享尚未上传完成"},409);
        return json(publicMeta5(meta));
      }
      if(url.pathname.startsWith("/api/blob/")&&request.method==="GET"){
        const p=url.pathname.split("/").filter(Boolean);
        if(p.length<4)return json({error:"文件路径错误"},400);
        const id=decodeURIComponent(p[2]);if(!validId(id))return json({error:"分享 ID 无效"},400);
        const meta=await readMeta5(env,id);if(!meta)return json({error:"分享不存在"},404);
        if(expired(meta))return json({error:"分享不存在或已过期"},404);
        let kind,index=null;
        if(p[3]==="manifest"&&p.length===4)kind="manifest";
        else if(p[3]==="file"&&p.length===5){kind="file";index=Number(p[4])}
        else return json({error:"文件路径错误"},400);
        const stream=await readBlob5(env,id,meta,kind,index);
        if(!stream)return json({error:"加密文件不存在"},404);
        return new Response(stream,{headers:{"content-type":"application/octet-stream","cache-control":"no-store"}});
      }

      /* V2-V4 */
      if(url.pathname.startsWith("/api/get/")&&request.method==="GET"){
        if(!env.SHARES)return json({error:"旧分享需要 KV Binding：SHARES"},404);
        const id=decodeURIComponent(url.pathname.slice("/api/get/".length));
        if(!validId(id))return json({error:"分享链接无效"},400);
        const record=await env.SHARES.get(id,"json");
        return record?json(record):json({error:"分享不存在或已过期"},404);
      }

      if(request.method==="GET"){
        return new Response(HTML,{headers:{
          "content-type":"text/html;charset=utf-8","cache-control":"no-store",
          "x-content-type-options":"nosniff","x-frame-options":"DENY","referrer-policy":"no-referrer",
          "permissions-policy":"camera=(), microphone=(), geolocation=()",
          "content-security-policy":"default-src 'self' 'unsafe-inline' blob:; connect-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; frame-src 'self' blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'none'"
        }});
      }
      return new Response("Method Not Allowed",{status:405});
    }catch(err){
      console.error(err);return json({error:err&&err.message?err.message:"服务器错误"},500);
    }
  }
};
