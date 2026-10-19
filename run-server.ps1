# Optional local HTTP server, for practising on a phone/tablet.
# Usage: powershell -ExecutionPolicy Bypass -File .\run-server.ps1
# (ASCII only on purpose: Windows PowerShell 5.1 misreads UTF-8 comments in some locales.)
$port = 7788
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.PrefixOrigin -ne 'WellKnown' -and $_.IPAddress -ne '127.0.0.1' } | Select-Object -First 1).IPAddress

if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
  Write-Host "Port $port is already listening."
} else {
  # Log redirection lives inside the child command line: PowerShell's -RedirectStandard* makes the
  # calling shell wait for the child to exit, which hangs the agent.
  Start-Process cmd -ArgumentList '/c', ('cd /d "' + $dir + '" && python -m http.server ' + $port + ' > server.log 2>&1') -WindowStyle Hidden
  Write-Host "Started python -m http.server $port in the background."
}

foreach ($i in 1..20) {
  if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) { break }
  Start-Sleep -Milliseconds 500
}

if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
  Write-Host "Local:  http://127.0.0.1:$port"
  if ($ip) { Write-Host "Phone:  http://${ip}:$port" }
  Write-Host "Stop:   Stop-Process -Id (Get-NetTCPConnection -LocalPort $port -State Listen).OwningProcess -Force"
} else {
  Write-Host "Failed to start. Make sure Python is installed and on PATH."
}
