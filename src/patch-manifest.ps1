param(
    [Parameter(Mandatory=$true)][string]$Path,
    [string]$ManifestPath = ""
)

$ErrorActionPreference = "Stop"

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public static class NativeResources {
    public delegate bool EnumResLangProc(IntPtr hModule, IntPtr lpType, IntPtr lpName, ushort wIDLanguage, IntPtr lParam);

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern IntPtr LoadLibraryEx(string lpFileName, IntPtr hFile, uint dwFlags);

    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool FreeLibrary(IntPtr hModule);

    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern IntPtr FindResource(IntPtr hModule, IntPtr lpName, IntPtr lpType);

    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool EnumResourceLanguages(IntPtr hModule, IntPtr lpType, IntPtr lpName, EnumResLangProc lpEnumFunc, IntPtr lParam);

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern IntPtr BeginUpdateResource(string pFileName, bool bDeleteExistingResources);

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool UpdateResource(IntPtr hUpdate, IntPtr lpType, IntPtr lpName, ushort wLanguage, byte[] lpData, uint cbData);

    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool EndUpdateResource(IntPtr hUpdate, bool fDiscard);
}
"@

$RT_MANIFEST = [IntPtr]24
$IDR_MANIFEST = [IntPtr]1
$LOAD_LIBRARY_AS_DATAFILE = 0x00000002

$full = (Resolve-Path $Path).Path
$langs = New-Object System.Collections.Generic.List[int]
$module = [NativeResources]::LoadLibraryEx($full, [IntPtr]::Zero, $LOAD_LIBRARY_AS_DATAFILE)
if ($module -eq [IntPtr]::Zero) {
    throw "LoadLibraryEx failed for $full"
}
try {
    $res = [NativeResources]::FindResource($module, $IDR_MANIFEST, $RT_MANIFEST)
    if ($res -eq [IntPtr]::Zero) {
        throw "No RT_MANIFEST resource found in $full"
    }
    $callback = [NativeResources+EnumResLangProc]{
        param($h, $t, $n, $lang, $l)
        $script:langs.Add([int]$lang)
        return $true
    }
    [NativeResources]::EnumResourceLanguages($module, $RT_MANIFEST, $IDR_MANIFEST, $callback, [IntPtr]::Zero) | Out-Null
} finally {
    [NativeResources]::FreeLibrary($module) | Out-Null
}

if ($langs.Count -eq 0) {
    $langs.Add(0x0409)
}

if (-not $ManifestPath) {
    Write-Host "Manifest languages: $($langs -join ', ')"
    exit 0
}

$manifestBytes = [System.IO.File]::ReadAllBytes((Resolve-Path $ManifestPath).Path)
$hUpdate = [NativeResources]::BeginUpdateResource($full, $false)
if ($hUpdate -eq [IntPtr]::Zero) {
    throw "BeginUpdateResource failed for $full"
}
$ok = $true
try {
    foreach ($lang in $langs) {
        $ok = $ok -and [NativeResources]::UpdateResource(
            $hUpdate, $RT_MANIFEST, $IDR_MANIFEST, [uint16]$lang, $manifestBytes, [uint32]$manifestBytes.Length)
    }
} finally {
    $ok = [NativeResources]::EndUpdateResource($hUpdate, (-not $ok)) -and $ok
}
if (-not $ok) {
    throw "Updating RT_MANIFEST failed for $full"
}
Write-Host "Manifest updated: $full"
