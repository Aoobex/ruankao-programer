# 一键上传学习进度到 GitHub
# 用法：
#   1) 双击 sync-progress.bat（自动找 Downloads 里最新的 progress.json）
#   2) 或在终端执行： powershell -ExecutionPolicy Bypass -File .\sync-progress.ps1
#   3) 也可以指定文件： .\sync-progress.ps1 -File "D:\some\progress.json"

param(
  [string]$File,
  [switch]$NoPush
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

# 让 Windows PowerShell 5.1 正确输出中文（配合 .bat 里的 chcp 65001）
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch { }

function Fail($msg) {
  Write-Host ""
  Write-Host "✗ $msg" -ForegroundColor Red
  Write-Host ""
  exit 1
}

Write-Host ""
Write-Host "软考程序员 · 进度同步" -ForegroundColor Cyan
Write-Host "----------------------------------------"

# 1. 定位进度文件
if (-not $File) {
  $downloads = Join-Path $env:USERPROFILE 'Downloads'
  $cand = Get-ChildItem $downloads -Filter 'progress*.json' -File -ErrorAction SilentlyContinue |
          Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if ($cand) {
    $File = $cand.FullName
    Write-Host "找到下载目录里最新的进度文件：" -NoNewline
    Write-Host $cand.Name -ForegroundColor Yellow
  }
}

if (-not $File -or -not (Test-Path $File)) {
  Fail "没找到 progress.json。请先在网页上点「导出进度」，然后再运行一次。`n  也可以手动指定： .\sync-progress.ps1 -File 路径\progress.json"
}

# 2. 校验格式，别把随便一个 json 提交上去
try {
  $raw = Get-Content -LiteralPath $File -Raw -Encoding UTF8
  $obj = $raw | ConvertFrom-Json
} catch {
  Fail "这个文件不是合法 JSON：$File"
}
if ($obj.app -ne 'ruankao-programer' -or -not $obj.data) {
  Fail "这不是本系统导出的进度文件（缺少 app 或 data 字段）。"
}

$picked  = @($obj.data.picked.PSObject.Properties).Count
$cards   = @($obj.data.cards.PSObject.Properties).Count
$days    = @($obj.data.days.PSObject.Properties).Count
$wrong   = @($obj.data.wrong.PSObject.Properties).Count
Write-Host ("内容：已刷 {0} 题 · 知识卡 {1} 张 · 完成 {2} 天 · 错题 {3} 道" -f $picked, $cards, $days, $wrong)

# 3. 覆盖仓库里的进度文件
$dest = Join-Path $root 'data\progress.json'
Copy-Item -LiteralPath $File -Destination $dest -Force
Write-Host "已写入 data\progress.json" -ForegroundColor Green

# 4. 有变化才提交
git add -- 'data/progress.json'
$changed = git status --porcelain -- 'data/progress.json'
if (-not $changed) {
  Write-Host ""
  Write-Host "进度和仓库里的一样，不用提交。" -ForegroundColor Yellow
  Write-Host ""
  exit 0
}

$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm'
git commit -q -m "更新学习进度（$stamp）"
Write-Host "已提交：更新学习进度（$stamp）" -ForegroundColor Green

if ($NoPush) {
  Write-Host "已跳过推送（-NoPush）" -ForegroundColor Yellow
  Write-Host ""
  exit 0
}

# 5. 推送
Write-Host "正在推送到 GitHub ..." -NoNewline
$push = git push -q origin HEAD 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host " 失败" -ForegroundColor Red
  Write-Host ""
  Write-Host "可能原因：另一台机器已经推送过，本地落后了。" -ForegroundColor Yellow
  Write-Host "先执行下面这行，再重新运行本脚本：" -ForegroundColor Yellow
  Write-Host "  git pull --rebase" -ForegroundColor White
  Write-Host ""
  Write-Host $push
  exit 1
}

Write-Host " 成功" -ForegroundColor Green
Write-Host ""
Write-Host "完成。GitHub Pages 大约 1 分钟后更新，其他设备打开网页即可看到这份进度。" -ForegroundColor Cyan
Write-Host ""
