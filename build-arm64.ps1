param(
    [string]$Version = "2.4.0"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Dist = Join-Path $Root "dist\FontForgePro"
$Out = Join-Path $Root "dist\FontForgePro-arm64"
$Release = Join-Path $Root "release"

if (-not (Test-Path (Join-Path $Dist "FontForgePro.exe"))) {
    Write-Host "Windows x64 build not found; running build.ps1 first ..."
    & (Join-Path $Root "build.ps1")
}

if (Test-Path $Out) {
    Remove-Item -Recurse -Force $Out
}
New-Item -ItemType Directory -Force -Path $Out | Out-Null
& robocopy $Dist $Out /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) {
    throw "robocopy failed with exit code $LASTEXITCODE"
}

Copy-Item -Force (Join-Path $Root "README-ARM64.txt") (Join-Path $Out "README-ARM64.txt")

New-Item -ItemType Directory -Force -Path $Release | Out-Null
$Zip = Join-Path $Release ("FontForgePro-v{0}-win-arm64.zip" -f $Version)
if (Test-Path $Zip) {
    Remove-Item -Force $Zip
}

# Use the same top-level folder name as the x64 package so install.ps1 works
# after extraction.
$StageRoot = Join-Path $Root "dist\.arm64-stage"
$Stage = Join-Path $StageRoot "FontForgePro"
if (Test-Path $StageRoot) {
    Remove-Item -Recurse -Force $StageRoot
}
New-Item -ItemType Directory -Force -Path $Stage | Out-Null
& robocopy $Out $Stage /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) {
    throw "robocopy failed with exit code $LASTEXITCODE"
}

& "C:\Windows\System32\tar.exe" -a -c -f $Zip -C $StageRoot "FontForgePro"
if ($LASTEXITCODE -ne 0) {
    throw "tar failed with exit code $LASTEXITCODE"
}
Remove-Item -Recurse -Force $StageRoot

$Hash = (Get-FileHash -Algorithm SHA256 $Zip).Hash.ToLower()
Set-Content -Encoding ASCII -Path ($Zip + ".sha256") -Value "$Hash  $(Split-Path -Leaf $Zip)"

Write-Host ""
Write-Host "ARM64 package complete."
Write-Host "Directory: $Out"
Write-Host "Zip:       $Zip"
Write-Host "SHA256:    $Hash"
Write-Host ""
Write-Host "This package uses Windows 11 ARM64 x64 emulation."
Write-Host "See ARM64.md for native ARM64 build notes."
