param(
    [string]$FontForgeSource = "C:\Program Files\FontForgeBuilds",
    [switch]$SkipAppCopy
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Dist = Join-Path $Root "dist\FontForgePro"
$App = Join-Path $Dist "app"
$Release = Join-Path $Root "release"
$Version = "2.3.0"
$Csc = "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"

Write-Host "FontForgePro build $Version"
Write-Host "Root: $Root"

if (-not (Test-Path $FontForgeSource)) {
    throw "FontForge install not found: $FontForgeSource"
}
if (-not (Test-Path $Csc)) {
    throw "C# compiler not found: $Csc"
}

if (-not $SkipAppCopy) {
    Write-Host "Copying FontForge runtime ..."
    if (Test-Path $App) {
        Remove-Item -Recurse -Force $App
    }
    New-Item -ItemType Directory -Force -Path $App | Out-Null
    & robocopy $FontForgeSource $App /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
    if ($LASTEXITCODE -ge 8) {
        throw "robocopy failed with exit code $LASTEXITCODE"
    }

    # The bundled uninstaller belongs to the upstream FontForge install.
    foreach ($name in @("unins000.exe", "unins000.dat")) {
        $path = Join-Path $App $name
        if (Test-Path $path) {
            Remove-Item -Force $path
        }
    }
}

Write-Host "Enabling high-DPI support in FontForge ..."
$PatchManifest = Join-Path $Root "src\patch-manifest.ps1"
$Manifest = Join-Path $Root "src\fontforge.manifest"
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $PatchManifest -Path (Join-Path $App "bin\fontforge.exe") -ManifestPath $Manifest
if ($LASTEXITCODE -ne 0) {
    throw "Manifest patch failed with exit code $LASTEXITCODE"
}

Write-Host "Installing bundled UI font ..."
$FontDir = Join-Path $App "share\fonts"
New-Item -ItemType Directory -Force -Path $FontDir | Out-Null
Copy-Item -Force (Join-Path $Root "resources\fonts\NotoSansSC-Regular.ttf") (Join-Path $FontDir "NotoSansSC-Regular.ttf")

New-Item -ItemType Directory -Force -Path $Dist | Out-Null
New-Item -ItemType Directory -Force -Path $Release | Out-Null
$LicenseDir = Join-Path $Dist "licenses"
New-Item -ItemType Directory -Force -Path $LicenseDir | Out-Null
Copy-Item -Force (Join-Path $Root "resources\fonts\OFL.txt") (Join-Path $LicenseDir "NotoSansSC-OFL.txt")
New-Item -ItemType Directory -Force -Path (Join-Path $Dist "resources") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $Dist "templates") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $Dist "help") | Out-Null

Write-Host "Copying FFpro resources ..."
Copy-Item -Force (Join-Path $Root "resources\ffpro.resources") (Join-Path $Dist "resources\ffpro.resources")
Copy-Item -Force (Join-Path $Root "resources\ffpro-ar.resources") (Join-Path $Dist "resources\ffpro-ar.resources")
Copy-Item -Force (Join-Path $Root "resources\app.ico") (Join-Path $Dist "resources\app.ico")
Copy-Item -Force (Join-Path $Root "resources\ffpro-splash.png") (Join-Path $App "share\fontforge\pixmaps\ffpro-splash.png")
$HelpDist = Join-Path $Dist "help"
if (Test-Path $HelpDist) {
    Remove-Item -Recurse -Force $HelpDist
}
Copy-Item -Recurse -Force (Join-Path $Root "help") $Dist
Copy-Item -Force (Join-Path $Root "templates\FFpro-Starter.sfd") (Join-Path $Dist "templates\FFpro-Starter.sfd")

Write-Host "Installing FFpro Python plugin ..."
$PySite = Join-Path $App "lib\python3.12\site-packages"
if (-not (Test-Path $PySite)) {
    throw "Python site-packages not found: $PySite"
}
Copy-Item -Force (Join-Path $Root "plugins\ffpro_tools.py") (Join-Path $PySite "ffpro_tools.py")
$DistInfo = Join-Path $PySite "ffpro_tools-2.3.0.dist-info"
if (Test-Path $DistInfo) {
    Remove-Item -Recurse -Force $DistInfo
}
Copy-Item -Recurse -Force (Join-Path $Root "plugins\ffpro_tools-2.3.0.dist-info") $DistInfo

Write-Host "Installing Arabic UI catalog ..."
$ArLocale = Join-Path $App "share\locale\ar"
if (Test-Path $ArLocale) {
    Remove-Item -Recurse -Force $ArLocale
}
New-Item -ItemType Directory -Force -Path $ArLocale | Out-Null
Copy-Item -Recurse -Force (Join-Path $Root "resources\locale\ar\*") $ArLocale

Write-Host "Compiling launcher ..."
$Icon = Join-Path $Root "resources\app.ico"
$Launcher = Join-Path $Root "src\Launcher.cs"
$Welcome = Join-Path $Root "src\WelcomeForm.cs"
$OutExe = Join-Path $Dist "FontForgePro.exe"
& $Csc /nologo /target:winexe /platform:anycpu /optimize+ /codepage:65001 /win32icon:$Icon /out:$OutExe $Launcher $Welcome
if ($LASTEXITCODE -ne 0) {
    throw "csc failed with exit code $LASTEXITCODE"
}

Copy-Item -Force (Join-Path $Root "LICENSE") (Join-Path $Dist "LICENSE")
Copy-Item -Force (Join-Path $Root "THIRD_PARTY_NOTICES.md") (Join-Path $Dist "THIRD_PARTY_NOTICES.md")
Copy-Item -Force (Join-Path $Root "README.txt") (Join-Path $Dist "README.txt")
Copy-Item -Force (Join-Path $Root "SOURCE.txt") (Join-Path $Dist "SOURCE.txt")
Copy-Item -Force (Join-Path $Root "uninstall.ps1") (Join-Path $Dist "uninstall.ps1")

Write-Host "Including corresponding source ..."
$SourceDir = Join-Path $Dist "source"
if (Test-Path $SourceDir) {
    Remove-Item -Recurse -Force $SourceDir
}
New-Item -ItemType Directory -Force -Path $SourceDir | Out-Null
Copy-Item -Recurse -Force (Join-Path $Root "src") (Join-Path $SourceDir "src")
Copy-Item -Force (Join-Path $Root "plugins\ffpro_tools.py") (Join-Path $SourceDir "ffpro_tools.py")
Copy-Item -Force (Join-Path $Root "resources\fonts\OFL.txt") (Join-Path $SourceDir "NotoSansSC-OFL.txt")
Copy-Item -Force (Join-Path $Root "resources\ffpro.resources") (Join-Path $SourceDir "ffpro.resources")
Copy-Item -Force (Join-Path $Root "resources\ffpro-ar.resources") (Join-Path $SourceDir "ffpro-ar.resources")
Copy-Item -Force (Join-Path $Root "resources\ffpro-splash.png") (Join-Path $SourceDir "ffpro-splash.png")
Copy-Item -Recurse -Force (Join-Path $Root "resources\locale") (Join-Path $SourceDir "locale")
Copy-Item -Force (Join-Path $Root "templates\FFpro-Starter.sfd") (Join-Path $SourceDir "FFpro-Starter.sfd")
Copy-Item -Force (Join-Path $Root "build.ps1") (Join-Path $SourceDir "build.ps1")
Copy-Item -Force (Join-Path $Root "build-arm64.ps1") (Join-Path $SourceDir "build-arm64.ps1")
Copy-Item -Force (Join-Path $Root "install.ps1") (Join-Path $SourceDir "install.ps1")
Copy-Item -Force (Join-Path $Root "uninstall.ps1") (Join-Path $SourceDir "uninstall.ps1")
Copy-Item -Force (Join-Path $Root "ARM64.md") (Join-Path $SourceDir "ARM64.md")
Copy-Item -Force (Join-Path $Root "README-ARM64.txt") (Join-Path $SourceDir "README-ARM64.txt")
if (Test-Path (Join-Path $Root "README.md")) {
    Copy-Item -Force (Join-Path $Root "README.md") (Join-Path $SourceDir "README.md")
}

$Vendor = Join-Path $Root "vendor"
if (Test-Path $Vendor) {
    New-Item -ItemType Directory -Force -Path (Join-Path $Dist "vendor") | Out-Null
    Copy-Item -Force (Join-Path $Vendor "*") (Join-Path $Dist "vendor")
}

Write-Host "Creating release archive ..."
$Zip = Join-Path $Release ("FontForgePro-v{0}-win64.zip" -f $Version)
if (Test-Path $Zip) {
    Remove-Item -Force $Zip
}
& "C:\Windows\System32\tar.exe" -a -c -f $Zip -C (Join-Path $Root "dist") "FontForgePro"
if ($LASTEXITCODE -ne 0) {
    throw "tar failed with exit code $LASTEXITCODE"
}

$Hash = (Get-FileHash -Algorithm SHA256 $Zip).Hash.ToLower()
$HashLine = "$Hash  $(Split-Path -Leaf $Zip)"
Set-Content -Encoding ASCII -Path ($Zip + ".sha256") -Value $HashLine

Write-Host ""
Write-Host "Build complete."
Write-Host "App:   $Dist"
Write-Host "Zip:   $Zip"
Write-Host "SHA256: $Hash"
