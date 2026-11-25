param(
    [string]$Source = "",
    [switch]$NoDesktopShortcut
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $Source) {
    $Source = Join-Path $Root "dist\FontForgePro"
}

if (-not (Test-Path (Join-Path $Source "FontForgePro.exe"))) {
    throw "Build output not found: $Source. Run build.ps1 first."
}

$InstallDir = Join-Path $env:LOCALAPPDATA "Programs\FontForgePro"
$Exe = Join-Path $InstallDir "FontForgePro.exe"

$running = Get-Process -Name "FontForgePro" -ErrorAction SilentlyContinue
if ($running) {
    Write-Host "FontForgePro is running. Close it before installing." -ForegroundColor Yellow
    exit 1
}

Write-Host "Installing to $InstallDir ..."
if (Test-Path $InstallDir) {
    Remove-Item -Recurse -Force $InstallDir
}
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
& robocopy $Source $InstallDir /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) {
    throw "robocopy failed with exit code $LASTEXITCODE"
}

$Shell = New-Object -ComObject WScript.Shell
$IconLocation = Join-Path $InstallDir "resources\app.ico"
$WorkingDirectory = $InstallDir

function New-Shortcut([string]$Path) {
    $shortcut = $Shell.CreateShortcut($Path)
    $shortcut.TargetPath = $Exe
    $shortcut.WorkingDirectory = $WorkingDirectory
    $shortcut.IconLocation = "$IconLocation,0"
    $shortcut.Description = "FontForgePro font editor"
    $shortcut.Save()
}

$StartMenuDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$StartMenuShortcut = Join-Path $StartMenuDir "FontForgePro.lnk"
New-Item -ItemType Directory -Force -Path $StartMenuDir | Out-Null
New-Shortcut $StartMenuShortcut

if (-not $NoDesktopShortcut) {
    $Desktop = [Environment]::GetFolderPath("Desktop")
    New-Shortcut (Join-Path $Desktop "FontForgePro.lnk")
}

$SizeKb = 0
Get-ChildItem -Recurse -File $InstallDir | ForEach-Object { $SizeKb += [math]::Ceiling($_.Length / 1KB) }

$UninstallKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\FontForgePro"
New-Item -Path $UninstallKey -Force | Out-Null
Set-ItemProperty -Path $UninstallKey -Name "DisplayName" -Value "FontForgePro"
Set-ItemProperty -Path $UninstallKey -Name "DisplayVersion" -Value "2.1.2"
Set-ItemProperty -Path $UninstallKey -Name "Publisher" -Value "FontForgePro"
Set-ItemProperty -Path $UninstallKey -Name "DisplayIcon" -Value "$IconLocation,0"
Set-ItemProperty -Path $UninstallKey -Name "InstallLocation" -Value $InstallDir
Set-ItemProperty -Path $UninstallKey -Name "EstimatedSize" -Value $SizeKb -Type DWord
Set-ItemProperty -Path $UninstallKey -Name "NoModify" -Value 1 -Type DWord
Set-ItemProperty -Path $UninstallKey -Name "NoRepair" -Value 1 -Type DWord
Set-ItemProperty -Path $UninstallKey -Name "UninstallString" -Value "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$InstallDir\uninstall.ps1`""

Write-Host ""
Write-Host "FontForgePro installed."
Write-Host "Launch: $Exe"
Write-Host "Settings: $env:APPDATA\FontForgePro"
