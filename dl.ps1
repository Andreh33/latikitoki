param(
  [Parameter(Mandatory=$true)][string]$Id,
  [Parameter(Mandatory=$true)][string]$Url
)
$ErrorActionPreference = "Stop"
$dest = "D:\PROYECTO\tikitoki\public\productos"
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
$tmp = Join-Path $dest ("_tmp_" + $Id)
try {
  Invoke-WebRequest -UseBasicParsing -UserAgent $ua -Headers @{ "Referer"="https://www.google.com/" } -Uri $Url -OutFile $tmp -TimeoutSec 40
} catch {
  Write-Output ("FAIL_DOWNLOAD " + $Id + " :: " + $_.Exception.Message)
  if (Test-Path $tmp) { Remove-Item $tmp -Force }
  return
}
if (-not (Test-Path $tmp)) { Write-Output ("FAIL_NOFILE " + $Id); return }
$bytes = [System.IO.File]::ReadAllBytes($tmp)
$size = $bytes.Length
if ($size -lt 8192) {
  Write-Output ("FAIL_SMALL " + $Id + " size=" + $size)
  Remove-Item $tmp -Force
  return
}
# Detect type by magic bytes
$ext = $null
if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) { $ext = "jpg" }
elseif ($bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50 -and $bytes[2] -eq 0x4E -and $bytes[3] -eq 0x47) { $ext = "png" }
elseif ($bytes[0] -eq 0x52 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46 -and $bytes[3] -eq 0x46 -and $bytes[8] -eq 0x57 -and $bytes[9] -eq 0x45 -and $bytes[10] -eq 0x42 -and $bytes[11] -eq 0x50) { $ext = "webp" }
elseif ($bytes[0] -eq 0x47 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46) { $ext = "gif" }
else {
  Write-Output ("FAIL_NOTIMAGE " + $Id + " first4=" + ("{0:X2}{1:X2}{2:X2}{3:X2}" -f $bytes[0],$bytes[1],$bytes[2],$bytes[3]) + " size=" + $size)
  Remove-Item $tmp -Force
  return
}
$final = Join-Path $dest ($Id + "." + $ext)
# remove any prior variants
foreach ($e in @("jpg","png","webp","gif")) {
  $p = Join-Path $dest ($Id + "." + $e)
  if (Test-Path $p) { Remove-Item $p -Force }
}
Move-Item $tmp $final -Force
$kb = [math]::Round($size/1024,1)
Write-Output ("OK " + $Id + " -> " + ($Id + "." + $ext) + " size=" + $kb + "KB type=" + $ext)
