<#
.SYNOPSIS
    Exports card.html to a WhatsApp-ready PNG, a print-ready PDF and a small preview JPEG.

.DESCRIPTION
    Uses headless Microsoft Edge to render card.html?export (the bare 540 x 960 card, no motion,
    no petals, no buttons). Writes to the exports folder next to this script:
      - <Name>.png          1080 x 1920 at the default -Scale 2
      - <Name>.pdf          one 5.625 x 10 in page
      - <Name>-preview.jpg  540 x 960, used by the Share section of index.html
    Re-run after every change to card.html.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\export.ps1
#>
[CmdletBinding()]
param(
    [string]$Name = 'srinidhi-weds-shilpa-invitation',
    [ValidateRange(1, 4)][int]$Scale = 2,
    [ValidateRange(10, 600)][int]$TimeoutSec = 30
)

$ErrorActionPreference = 'Stop'

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$html = Join-Path $here 'card.html'
$outDir = Join-Path $here 'exports'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$edge = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge was not found. Install it or edit the path list in export.ps1.' }

$url = ([System.Uri]$html).AbsoluteUri + '?export'
# A separate profile keeps headless Edge from handing the job to an Edge window that is already open.
# It is kept between runs: on some managed PCs the first run in a brand-new profile stalls while Edge
# sets up work-account sign-in, and later runs in the same profile finish in seconds.
$profileDir = Join-Path $env:TEMP 'wedding-invite-edge-profile'
$common = @(
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    "--user-data-dir=$profileDir", '--virtual-time-budget=15000'
)

function Invoke-Edge([string[]]$EdgeArgs, [string]$Output) {
    # A stalled start-up or network request (e.g. a web font) can freeze headless Edge, so each run
    # gets a time limit and one retry. Edge's console noise goes to logs inside the profile folder.
    $argLine = ($EdgeArgs | ForEach-Object { if ($_ -match '\s') { '"{0}"' -f $_ } else { $_ } }) -join ' '
    New-Item -ItemType Directory -Force -Path $profileDir | Out-Null
    $tag = [IO.Path]::GetExtension($Output).TrimStart('.')
    for ($attempt = 1; $attempt -le 2; $attempt++) {
        $process = Start-Process -FilePath $edge -ArgumentList $argLine -NoNewWindow -PassThru `
            -RedirectStandardOutput (Join-Path $profileDir "edge-$tag-$attempt.out.log") `
            -RedirectStandardError (Join-Path $profileDir "edge-$tag-$attempt.err.log")
        if ($process.WaitForExit($TimeoutSec * 1000)) {
            if (Test-Path -LiteralPath $Output) { return }
        } else {
            try { & taskkill.exe /PID $process.Id /T /F 2>&1 | Out-Null } catch { }
            Write-Warning "Edge did not finish within $TimeoutSec s (attempt $attempt of 2)."
        }
        Start-Sleep -Seconds 1
    }
}

$png = Join-Path $outDir "$Name.png"
$pdf = Join-Path $outDir "$Name.pdf"
$jpg = Join-Path $outDir "$Name-preview.jpg"
Remove-Item -LiteralPath $png, $pdf, $jpg -ErrorAction SilentlyContinue

Invoke-Edge ($common + @('--window-size=540,960', "--force-device-scale-factor=$Scale", "--screenshot=$png", $url)) $png
Invoke-Edge ($common + @('--no-pdf-header-footer', "--print-to-pdf=$pdf", $url)) $pdf

if (Test-Path -LiteralPath $png) {
    # A light 540 x 960 copy for the website's Share section, so phones don't download the full PNG.
    Add-Type -AssemblyName System.Drawing
    $source = [System.Drawing.Image]::FromFile($png)
    try {
        $preview = New-Object System.Drawing.Bitmap 540, 960
        $graphics = [System.Drawing.Graphics]::FromImage($preview)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($source, 0, 0, 540, 960)
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $quality = New-Object System.Drawing.Imaging.EncoderParameters 1
        $quality.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]84)
        $preview.Save($jpg, $codec, $quality)
    } finally {
        if ($graphics) { $graphics.Dispose() }
        if ($preview) { $preview.Dispose() }
        $source.Dispose()
    }
}

foreach ($file in $png, $pdf, $jpg) {
    if (-not (Test-Path -LiteralPath $file)) { throw "Export failed: $file was not created." }
    '{0}  ({1:N0} KB)' -f $file, ((Get-Item -LiteralPath $file).Length / 1KB)
}
