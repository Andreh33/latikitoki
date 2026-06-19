param(
  [Parameter(Mandatory=$true)][string]$Id,
  [Parameter(Mandatory=$true)][string]$Query,
  [int]$MaxTry = 14
)
$ErrorActionPreference = "Continue"
$dest = "D:\PROYECTO\tikitoki\public\productos"
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

function Get-DDG([string]$q) {
  $enc = [System.Uri]::EscapeDataString($q)
  for ($attempt = 1; $attempt -le 4; $attempt++) {
    $sess = New-Object Microsoft.PowerShell.Commands.WebRequestSession
    $vqd = $null
    try {
      $tok = Invoke-WebRequest -UseBasicParsing -WebSession $sess -UserAgent $ua -Uri ("https://duckduckgo.com/?q=$enc&iar=images&iax=images&ia=images") -TimeoutSec 30
      $vqd = [regex]::Match($tok.Content, 'vqd=&quot;([\d-]+)&quot;').Groups[1].Value
      if (-not $vqd) { $vqd = [regex]::Match($tok.Content, 'vqd="([\d-]+)"').Groups[1].Value }
    } catch { $vqd = $null }
    if (-not $vqd) { Start-Sleep -Seconds (2 * $attempt); continue }
    $api = "https://duckduckgo.com/i.js?l=us-en&o=json&q=$enc&vqd=$vqd&f=,,,,,&p=1&v7exp=a"
    $hdr = @{ "Referer"="https://duckduckgo.com/"; "Accept"="application/json, text/javascript, */*; q=0.01"; "X-Requested-With"="XMLHttpRequest" }
    try {
      $resp = Invoke-WebRequest -UseBasicParsing -WebSession $sess -UserAgent $ua -Headers $hdr -Uri $api -TimeoutSec 30
      $j = $resp.Content | ConvertFrom-Json
    } catch { Start-Sleep -Seconds (2 * $attempt); continue }
    $out = New-Object System.Collections.ArrayList
    foreach ($it in $j.results) { if ($it.image) { [void]$out.Add(([string]$it.image)) } }
    if ($out.Count -gt 0) { return $out }
    Start-Sleep -Seconds (2 * $attempt)
  }
  return @()
}

function Try-Download([string]$u) {
  $tmp = Join-Path $dest ("_tmp_" + $Id)
  if (Test-Path $tmp) { Remove-Item $tmp -Force }
  $ref = "https://duckduckgo.com/"
  if ($u -match 'media-amazon|ssl-images-amazon') { $ref = "https://www.amazon.com/" }
  elseif ($u -match 'alicdn') { $ref = "https://www.aliexpress.com/" }
  try { Invoke-WebRequest -UseBasicParsing -UserAgent $ua -Headers @{ "Referer"=$ref } -Uri $u -OutFile $tmp -TimeoutSec 35 -ErrorAction Stop }
  catch { return $null }
  if (-not (Test-Path $tmp)) { return $null }
  $bytes = [System.IO.File]::ReadAllBytes($tmp)
  $size = $bytes.Length
  if ($size -lt 8192) { Remove-Item $tmp -Force; return $null }
  $ext = $null
  if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) { $ext = "jpg" }
  elseif ($bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50 -and $bytes[2] -eq 0x4E -and $bytes[3] -eq 0x47) { $ext = "png" }
  elseif ($bytes[0] -eq 0x52 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46 -and $bytes[8] -eq 0x57 -and $bytes[9] -eq 0x45 -and $bytes[10] -eq 0x42 -and $bytes[11] -eq 0x50) { $ext = "webp" }
  elseif ($bytes[0] -eq 0x47 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46) { $ext = "gif" }
  else { Remove-Item $tmp -Force; return $null }
  return @{ tmp=$tmp; ext=$ext; size=$size }
}

$cands = Get-DDG $Query
if ($cands.Count -eq 0) { Write-Output ("FAIL " + $Id + " :: no candidates from DDG"); return }

# Rank: amazon/alicdn/kwcdn first (clean ecommerce, hotlinkable), then others; skip obvious junk hosts
$pri = New-Object System.Collections.ArrayList
$sec = New-Object System.Collections.ArrayList
foreach ($u in $cands) {
  if ($u -match 'media-amazon|ssl-images-amazon|alicdn|kwcdn|img\.kwcdn|cf\.shopee|ae0\d\.alicdn') { [void]$pri.Add($u) }
  else { [void]$sec.Add($u) }
}
$ordered = New-Object System.Collections.ArrayList
foreach ($u in $pri) { [void]$ordered.Add($u) }
foreach ($u in $sec) { [void]$ordered.Add($u) }

$tries = 0
foreach ($u in $ordered) {
  if ($tries -ge $MaxTry) { break }
  $tries++
  $res = Try-Download $u
  if ($res -ne $null) {
    foreach ($e in @("jpg","png","webp","gif")) { $p = Join-Path $dest ($Id + "." + $e); if (Test-Path $p) { Remove-Item $p -Force } }
    $final = Join-Path $dest ($Id + "." + $res.ext)
    Move-Item $res.tmp $final -Force
    $kb = [math]::Round($res.size/1024,1)
    $short = $u; if ($u.Length -gt 75) { $short = $u.Substring(0,75) }
    Write-Output ("OK " + $Id + " -> " + $Id + "." + $res.ext + " " + $kb + "KB  " + $short)
    return
  }
}
Write-Output ("FAIL " + $Id + " :: tried " + $tries + " of " + $cands.Count + " candidates")
