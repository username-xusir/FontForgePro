param(
    [switch]$RemoveSettings
)

$ErrorActionPreference = "Stop"
$InstallDir = Join-Path $env:LOCALAPPDATA "Programs\FontForgePro"

$running = Get-Process -Name "FontForgePro" -ErrorAction SilentlyContinue
if ($running) {
    Write-Host "FontForgePro is running. Close it before uninstalling." -ForegroundColor Yellow
    exit 1
}

$Desktop = [Environment]::GetFolderPath("Desktop")
$StartMenuDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"

foreach ($shortcut in @(
    (Join-Path $Desktop "FontForgePro.lnk"),
    (Join-Path $StartMenuDir "FontForgePro.lnk")
)) {
    if (Test-Path $shortcut) {
        Remove-Item -Force $shortcut
    }
}

$UninstallKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\FontForgePro"
if (Test-Path $UninstallKey) {
    Remove-Item -Recurse -Force $UninstallKey
}

Set-Location $env:TEMP
if (Test-Path $InstallDir) {
    Remove-Item -Recurse -Force $InstallDir
}

if ($RemoveSettings) {
    $Settings = Join-Path $env:APPDATA "FontForgePro"
    if (Test-Path $Settings) {
        Remove-Item -Recurse -Force $Settings
    }
}

Write-Host "FontForgePro uninstalled."
if (-not $RemoveSettings) {
    Write-Host "Settings kept at $env:APPDATA\FontForgePro"
}
