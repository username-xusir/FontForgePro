FontForgePro 2.0.1
==================

一个以原生 FontForge 20251009 为内核的 Windows 字体设计应用。
保留 FontForge 的全部专业功能，并加入中文界面、深色外观和 FFpro 工作流工具。

启动
----
双击 FontForgePro.exe。

第一次启动会在 %APPDATA%\FontForgePro 建立独立的设置目录，
不会影响你系统里原有的 FontForge 设置。

FFpro 工具
----------
在字体窗口或字形窗口打开：工具 → FFpro 工具

  · 字体体检
  · 补齐基本字符集
  · 字形清理（坐标取整 / 补极值点 / 统一方向）
  · 水平居中
  · 圆角拐点
  · 打开模板字体
  · 打开本地教程
  · 关于 FontForgePro

本地教程
--------
工具 → FFpro 工具 → 打开本地教程
或直接打开 help\index.html。

设置与数据
----------
%APPDATA%\FontForgePro\
  FontForge\prefs          界面、插件、自动保存等设置
  FontForge\autosave\      自动保存
  gtk-3.0\                 GTK 配置

卸载
----
设置 → 应用 → 已安装的应用 → FontForgePro → 卸载
或运行安装目录里的 uninstall.ps1。
默认保留 %APPDATA%\FontForgePro 里的设置；如需一并删除：
powershell -File uninstall.ps1 -RemoveSettings

许可
----
FontForgePro 以 GPL-3.0 发布。
内核 FontForge 20251009 版权归 FontForge 贡献者所有，GPL-3.0 / BSD。
完整许可见 LICENSE，第三方声明见 THIRD_PARTY_NOTICES.md。
FontForgePro 与 FontForge 原项目没有官方隶属关系。
