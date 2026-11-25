# Windows ARM64

## Current package

The `FontForgePro-v*-win-arm64.zip` package runs on **Windows 11 ARM64**
devices through the built-in x64 emulation layer (Prism).

Why it is not native yet:

- FontForge 20251009 ships a Windows **x64** build only.
- The bundled GTK 3 / Python 3.12 / FontForge runtime are all x64.
- The FontForgePro launcher is AnyCPU and runs on ARM64, but it still starts the
  x64 `fontforge.exe`.

This package is functional and has the same features as the x64 build, but it
is not a native ARM64 build and will be slower on some operations.

## Native ARM64 path

A native ARM64 package needs an ARM64 FontForge runtime and its dependency
stack. The practical route is:

1. Install MSYS2 and use the `CLANGARM64` environment.
2. Build or obtain ARM64 builds of:
   - GTK 3 and its dependencies (GLib, Pango, Cairo, gdk-pixbuf, fontconfig)
   - Python 3.12
   - FontForge 20251009
3. Assemble a `FontForgeBuilds`-style directory with:
   - `bin/fontforge.exe` and the ARM64 DLLs
   - `lib/python3.12/site-packages`
   - `share/fontforge`, `share/locale`
4. Replace the `app` directory of the ARM64 package with that runtime.
5. Keep the launcher, `resources/`, `help/`, `templates/`, and the FFpro plugin
   from this package.

The launcher does not contain native code and does not need to be rebuilt for
ARM64. The plugin is pure Python.

A native ARM64 build is not included in the current release because upstream
FontForge does not publish one and building the full GTK/Python stack requires
a separate ARM64 build environment.

## Testing

The x64 package can be tested on any Windows x64 machine. An ARM64 device is
needed to verify the emulation package and, later, a native ARM64 runtime.

## Packaging script

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File build-arm64.ps1
```

This creates `release\FontForgePro-v2.4.0-win-arm64.zip` from the x64 build and
adds `README-ARM64.txt` explaining the emulation status.
