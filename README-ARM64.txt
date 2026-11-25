FontForgePro Windows ARM64 说明
===============================

这个包面向 Windows 11 ARM64 设备（骁龙 X 系列、Surface Pro X 等）。

重要：
- 上游 FontForge 20251009 目前只提供 Windows x64 构建，没有官方 ARM64 构建。
- 因此本包内置的 FontForge/GTK/Python 仍是 x64 版本，在 Windows 11 ARM64 上
  通过系统的 x64 仿真（Prism）运行。
- 功能与 x64 版一致，但性能会有一定损耗；这不是原生 ARM64 版本。

原生 ARM64 版本需要：
1. 用 MSYS2 CLANGARM64 环境编译 ARM64 的 FontForge、GTK3、Python 3.12 等依赖；
2. 把编译出的 FontForgeBuilds 目录替换本包的 app 目录；
3. 启动器 FontForgePro.exe 本身是 AnyCPU，可直接使用。

详见应用目录或仓库中的 ARM64.md。

安装与启动：
- 解压后运行 FontForgePro.exe；
- 或运行 install.ps1 创建桌面/开始菜单快捷方式。

设置目录：%APPDATA%\FontForgePro
