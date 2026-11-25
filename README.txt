FontForgePro 2.4.0
==================

一个以原生 FontForge 20251009 为内核的 Windows 字体设计应用。
保留 FontForge 的全部专业功能，并加入中文界面、深色外观和 FFpro 工作流工具。

启动
----
双击 FontForgePro.exe。

第一次启动会显示新手引导（可随时跳过），之后在 %APPDATA%\FontForgePro
建立独立的设置目录，不会影响你系统里原有的 FontForge 设置。
重新打开引导：工具 → FFpro 工具 → 新手引导…

FFpro 工具
----------
在字体窗口或字形窗口打开：工具 → FFpro 工具

  · 字体体检
  · 字体预览（导出临时 WOFF2，在浏览器里看 8 档字号）
  · 当前字形预览（当前字形 8 档字号）
  · 线条粗细（加粗钢笔/曲线画出的开放路径）
  · 工具与网格说明
  · 补齐基本字符集
  · 字形清理（坐标取整 / 补极值点 / 统一方向）
  · 水平居中
  · 圆角拐点
  · 打开模板字体
  · 新手引导
  · FFpro 中文教程
  · FontForge 官方手册（离线）
  · 界面语言（跟随系统 / 手动切换）
  · 关于 FontForgePro

界面语言
--------
界面语言自动跟随 Windows 显示语言，支持：
  中文（简体/繁體）、English、Français、Русский、Español、العربية
以及 FontForge 的德文、意大利文、葡萄牙文、日文、韩文、波兰文等。
Arabic 为部分翻译：菜单栏、常用菜单和按钮为阿拉伯语，其余回退英文。
手动切换：工具 → FFpro 工具 → 界面语言…（重启后生效）。

界面风格
--------
深色单色主题、圆角控件、FFpro 启动画面、现代菜单与对话框。
界面按系统 DPI 自动放大，菜单、按钮、对话框和字体窗口在大屏上保持清晰，
在小屏上使用更少、更大的字符格，不会铺满一屏看不清的小格子。
中文优先使用微软雅黑，其次内置的 Noto Sans SC；阿拉伯语使用 Segoe UI。

ARM64
-----
已提供 Windows ARM64 兼容包，但上游 FontForge 20251009 只有 x64 构建，
所以在 ARM64 Windows 上通过系统 x64 仿真运行。原生 ARM64 需要先编译
ARM64 的 FontForge/GTK/Python，详见 ARM64.md。

预览文字保存
------------
字体预览页里输入的文字会自动保存在本机浏览器，下次打开自动恢复；
右上角“保存文字”一键保存，不需要选择文件或改文件名。
“恢复示例”可以回到默认示例文字。

字形窗口提示
------------
把鼠标停在工具栏图标上约 0.25 秒会显示工具名称和快捷键。
工具栏下方 Mse1/^Mse1/Mse2/^Mse2 是鼠标左键、Ctrl+左键、右键、Ctrl+右键
当前分配的工具；左侧 # 是网格开关（默认开启），CB/CF 控制背景/前景层。
双击自由绘制工具可以先设置笔触粗细，再画线。

本地教程
--------
工具 → FFpro 工具 → FFpro 中文教程
或直接打开 help\index.html。

FontForge 官方完整手册（英文）已离线镜像：
工具 → FFpro 工具 → FontForge 官方手册
或直接打开 help\official.html。

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
