(() => {
  if (window.__glyphrZhInstalled) return;
  window.__glyphrZhInstalled = true;

  const EXACT = {
    // Start page
    "New": "新建",
    "Load": "载入",
    "Restore": "恢复",
    "Examples": "示例",
    "Start a new Glyphr Studio project": "新建 Glyphr Studio 项目",
    "Project name:": "项目名称：",
    "Create a new font from scratch": "从零创建新字体",
    "Load a file": "载入文件",
    "Drag and drop one of the following:": "拖入以下任意一种文件：",
    "Glyphr Studio Project (.gs2, .txt)": "Glyphr Studio 项目（.gs2、.txt）",
    "Open Type, True Type, or WOFF (.otf, .ttf, .woff)": "OpenType、TrueType 或 WOFF（.otf、.ttf、.woff）",
    "SVG Font (.svg)": "SVG 字体（.svg）",
    "or, open file chooser...": "或点击选择文件……",
    "No auto-saves exist yet": "还没有自动保存",
    "Simple v2 project": "简单 v2 项目",
    "About Glyphr Studio": "关于 Glyphr Studio",
    "About": "关于",
    "Help": "帮助",
    "In-app help": "应用内帮助",
    "External Help & Documentation site": "外部帮助与文档站点",
    "Found a bug? Have some feedback?": "发现 bug？有反馈？",
    "Contact and socials": "联系与社交",
    "Learn more about working with two projects": "了解如何同时使用两个项目",
    "Choose an action to get started...": "选择一个操作开始……",
    "Projects": "项目",
    "PAGE": "页面",
    "Project info": "项目信息",
    "Font family:": "字体家族：",
    "Style:": "样式：",
    "Regular": "常规",
    "Bold": "粗体",
    "Italic": "斜体",
    "Light": "细体",
    "Medium": "中等",
    "Semibold": "半粗体",
    "Glyph count:": "字形数量：",
    "Character count:": "字符数量：",
    "UPM:": "UPM：",
    "Ascent:": "上伸部：",
    "Descent:": "下伸部：",
    "Welcome to Glyphr Studio!": "欢迎使用 Glyphr Studio！",
    "Glyphr Studio is open source and community supported.": "Glyphr Studio 是开源项目，由社区支持。",
    "Learn how you can help Glyphr Studio!": "了解如何帮助 Glyphr Studio！",
    "Load an example project": "载入示例项目",
    "Oblegg is the GSv2 project we use to test all the various Glyphr Studio features:": "Oblegg 是我们用来测试 Glyphr Studio 各项功能的 GSv2 项目：",
    "The Simple v2 Project has a few characters and things to show off basic functionality:": "简单 v2 项目包含少量字符和内容，用来展示基本功能：",
    "For more information visit www.glyphrstudio.com": "更多信息请访问 www.glyphrstudio.com",
    "Loading example project...": "正在加载示例项目……",
    "Space": "空格",
    "white space": "空白",
    "tutorial": "教程",

    // Navigation / panels
    "Overview": "概览",
    "Characters": "字符",
    "Glyphs": "字形",
    "Glyph": "字形",
    "Components": "组件",
    "Component": "组件",
    "Ligatures": "连字",
    "Ligature": "连字",
    "Kerning": "字距",
    "Kern": "字距",
    "Settings": "设置",
    "History": "历史",
    "Layers": "图层",
    "Guides": "参考线",
    "Attributes": "属性",
    "Character info": "字符信息",
    "Live preview": "实时预览",
    "Global actions": "全局操作",
    "Cross-project actions": "跨项目操作",
    "Project cleanup": "项目清理",
    "File": "文件",
    "Edit": "编辑",
    "View": "视图",
    "Window": "窗口",
    "Font": "字体",
    "Project": "项目",
    "App": "应用",
    "Dev Mode": "开发模式",
    "Advanced": "高级",
    "Basic": "基础",
    "Controls": "控件",
    "Clipboard": "剪贴板",
    "Font types": "字体类型",

    // Common buttons / states
    "Add": "添加",
    "Delete": "删除",
    "Remove": "移除",
    "Copy": "复制",
    "Cut": "剪切",
    "Paste": "粘贴",
    "Undo": "撤销",
    "Redo": "重做",
    "Close": "关闭",
    "Cancel": "取消",
    "OK": "确定",
    "Yes": "是",
    "No": "否",
    "Apply": "应用",
    "Reset": "重置",
    "Done": "完成",
    "Done!": "完成！",
    "Save": "保存",
    "Export": "导出",
    "Import": "导入",
    "Open": "打开",
    "Select all": "全选",
    "Select": "选择",
    "Search": "搜索",
    "Find": "查找",
    "Replace": "替换",
    "Show": "显示",
    "Hide": "隐藏",
    "Move": "移动",
    "Resize": "调整大小",
    "Create": "创建",
    "Update": "更新",
    "Change": "更改",
    "Confirm": "确认",
    "Discard": "放弃",
    "Keep": "保留",
    "Default": "默认",
    "Custom": "自定义",
    "None": "无",
    "All": "全部",
    "General": "常规",
    "Appearance": "外观",
    "Behavior": "行为",
    "Keyboard shortcuts": "键盘快捷键",
    "Shortcuts": "快捷键",
    "Drag to select...": "拖动以选择……",
    "Click to revert to the initial project state": "点击恢复到项目初始状态",
    "Are you sure?": "确定吗？",
    "Are you sure you want to exit? Any unsaved data may be lost.": "确定退出吗？未保存的数据可能会丢失。",
    "Danger": "危险",
    "Warning": "警告",
    "Error": "错误",
    "ERROR": "错误",
    "Success": "成功",
    "Loading...": "加载中……",
    "No items exist in this range": "这个范围内没有项目",
    "No components exist in the source project": "源项目中没有组件",
    "No kern groups exist in the source project": "源项目中没有字距组",

    // Basic geometry / metrics
    "Advance width": "前进宽度",
    "Side bearings": "侧边距",
    "Left side bearing": "左侧边距",
    "Right side bearing": "右侧边距",
    "Baseline": "基线",
    "Ascent": "上伸部",
    "Descent": "下伸部",
    "Cap height": "大写高度",
    "x-height": "x 高度",
    "Units per Em": "Em 单位数",
    "Width": "宽度",
    "Height": "高度",
    "Size": "大小",
    "Position": "位置",
    "Rotation": "旋转",
    "Scale": "缩放",
    "Opacity": "不透明度",
    "Color": "颜色",
    "Name": "名称",
    "Value": "值",
    "Point": "点",
    "Points": "点",
    "Path": "路径",
    "Paths": "路径",
    "Shape": "形状",
    "Shapes": "形状",
    "Selection": "选择",
    "Horizontal": "水平",
    "Vertical": "垂直",
    "Left": "左",
    "Right": "右",
    "Top": "上",
    "Bottom": "下",
    "Center": "居中",
    "Middle": "垂直居中",
    "Grid": "网格",
    "Snap": "吸附",
    "Zoom": "缩放",
    "Fit": "适应",
    "Preview": "预览",
    "Lock": "锁定",
    "Visible": "可见",
    "Download": "下载",
    "Upload": "上传",
    "Browse": "浏览",
    "Choose": "选择",

    // Editor / glyphs
    "Kern group": "字距组",
    "Kern groups": "字距组",
    "Component root": "组件根",
    "Component Instances": "组件实例",
    "Convert Component Instances to Paths": "将组件实例转换为路径",
    "Convert all Component Instances into Paths": "将所有组件实例转换为路径",
    "Delete Glyph": "删除字形",
    "Add path point": "添加路径点",
    "Path edit": "路径编辑",
    "New path": "新建路径",
    "New rectangle": "新建矩形",
    "New oval": "新建椭圆",
    "Move and resize": "移动与缩放",
    "Zoom level": "缩放级别",
    "Pan": "平移",
    "Pointer": "指针",
    "Pen": "钢笔",
    "Knife": "刻刀",
    "Ruler": "标尺",
    "Custom guides": "自定义参考线",
    "Add a custom guide": "添加自定义参考线",
    "Delete guide": "删除参考线",
    "Change guide color": "更改参考线颜色",
    "Key metrics guides": "关键度量参考线",
    "Draw guides over shapes": "在形状上绘制参考线",

    // Align / transform
    "Align Points Left": "左对齐点",
    "Align Points Center": "水平居中点",
    "Align Points Right": "右对齐点",
    "Align Points Top": "顶部对齐点",
    "Align Points Middle": "垂直居中点",
    "Align Points Bottom": "底部对齐点",
    "Align Shapes Left": "左对齐形状",
    "Align Shapes Center": "水平居中形状",
    "Align Shapes Right": "右对齐形状",
    "Align Shapes Top": "顶部对齐形状",
    "Align Shapes Middle": "垂直居中形状",
    "Align Shapes Bottom": "底部对齐形状",
    "Flip Horizontal": "水平翻转",
    "Flip Vertical": "垂直翻转",
    "Boolean": "布尔运算",
    "Divide": "分割",
    "Exclude": "排除",
    "Intersect": "相交",
    "Union": "合并",
    "Subtract": "减去",
    "Clockwise": "顺时针",
    "Counter-clockwise": "逆时针",

    // Export / project
    "Export TTF file": "导出 TTF 文件",
    "Export OTF file": "导出 OTF 文件",
    "Export WOFF file": "导出 WOFF 文件",
    "Export WOFF2 file": "导出 WOFF2 文件",
    "Export SVG font file": "导出 SVG 字体文件",
    "Export an OTF Font (.otf)": "导出 OTF 字体（.otf）",
    "Export an SVG Font (.svg)": "导出 SVG 字体（.svg）",
    "Save project file (to downloads folder)": "保存项目文件（到下载文件夹）",
    "Save this project file": "保存此项目文件",
    "Save a copy of this project file": "保存项目副本",
    "Open a separate project in a new window": "在新窗口打开另一个项目",
    "Font name": "字体名称",
    "Family name": "家族名称",
    "Style": "样式",
    "Version": "版本",
    "Designer": "设计者",
    "Company": "公司",
    "Copyright": "版权",
    "License": "许可",
    "Description": "描述",
    "Website": "网站",

    // Source strings
    "Add components": "添加组件",
    "Add kern groups": "添加字距组",
    "Add range to project": "向项目添加范围",
    "Add a custom character range": "添加自定义字符范围",
    "Add standard character ranges from Unicode": "从 Unicode 添加标准字符范围",
    "Adjust kern value": "调整字距值",
    "All-caps font": "全大写字体",
    "Basic Latin": "基本拉丁字母",
    "Create a new component": "新建组件",
    "Create a new kern group": "新建字距组",
    "Create a new ligature": "新建连字",
    "Create kern group": "创建字距组",
    "Create ligature": "创建连字",
    "Create ligatures": "创建连字",
    "Delete this kern group": "删除此字距组",
    "Diacritical glyph generator (advanced)": "变音字形生成器（高级）",
    "Diacritical glyph generator (basic)": "变音字形生成器（基础）",
    "Diacritics": "变音符号",
    "Directly click and drag curves to edit them": "直接点击并拖动曲线进行编辑",
    "Done creating path": "路径创建完成",
    "Edit project and font info": "编辑项目与字体信息",
    "Edit this kern group": "编辑此字距组",
    "Find and delete a single letter pair from all kern groups": "在所有字距组中查找并删除单个字母对",
    "Find instances of a single letter pair across all kern groups": "在所有字距组中查找单个字母对的实例",
    "Flip from/to projects": "在项目之间翻转",
    "Generate Diacritical Glyphs": "生成变音字形",
    "Horizontally scale all glyphs": "水平缩放所有字形",
    "Horizontally scaling glyph": "正在水平缩放字形",
    "Launch the interactive PANOSE builder": "启动交互式 PANOSE 构建器",
    "Monospace font": "等宽字体",
    "Move all glyphs": "移动所有字形",
    "Moving glyph": "正在移动字形",
    "Overwrite selected items": "覆盖选中项",
    "Overwrite settings for selected items": "覆盖选中项的设置",
    "Pop out a Live Preview window": "弹出实时预览窗口",
    "Re-size all glyphs": "调整所有字形大小",
    "Re-sizing glyph": "正在调整字形大小",
    "Remove items from your project": "从项目中移除项目",
    "Remove items": "移除项目",
    "Removing items": "正在移除项目",
    "Round all point values": "四舍五入所有点坐标",
    "Round values": "四舍五入数值",
    "Rounding point values": "正在四舍五入点坐标",
    "Scale all glyphs": "缩放所有字形",
    "Skew all glyphs": "倾斜所有字形",
    "Skew all paths": "倾斜所有路径",
    "Skewing glyphs": "正在倾斜字形",
    "Toggle selection for all rows": "切换所有行的选择",
    "Toggle vertical / horizontal": "切换垂直/水平",
    "Update Side Bearings": "更新侧边距",
    "Updating Side Bearings": "正在更新侧边距",
    "Vertically scale all glyphs": "垂直缩放所有字形",
    "Vertically scaling glyph": "正在垂直缩放字形",
    "align paths": "对齐路径",
    "path layers": "路径图层",
    "path point": "路径点",
    "paths": "路径",
    "Convert project to All Caps": "将项目转换为全大写",
    "Convert project to Monospace": "将项目转换为等宽",
    "Converting Component Instances to Paths": "正在将组件实例转换为路径",
    "Converting to Monospace": "正在转换为等宽",
    "Copy shapes from selected items": "从选中项复制形状",
    "Copy character or ligature shapes": "复制字符或连字形状",
    "Copy shapes from": "复制形状自",
    "Create a new": "新建",
    "Create new ligatures": "新建连字",
    "Delete selected items": "删除选中项",
    "Delete selected items": "删除选中项",
    "Edit this": "编辑此",
    "Expected value type": "期望的值类型",
    "Exclude": "排除",
    "External Help & Documentation site": "外部帮助与文档站点",
    "Filled": "填充",
    "Find instances of a single letter pair across all kern groups": "在所有字距组中查找单个字母对的实例",
    "From": "从",
    "Glyphr Studio failed to load!": "Glyphr Studio 加载失败！",
    "Glyphr Studio ran into a problem": "Glyphr Studio 遇到问题",
    "Guide line position": "参考线位置",
    "Horizontal guideline": "水平参考线",
    "Initial state": "初始状态",
    "Keyboard shortcuts": "键盘快捷键",
    "Layers": "图层",
    "Learn more": "了解更多",
    "Load a file": "载入文件",
    "No auto-saves exist yet": "还没有自动保存",
    "OK": "确定",
    "Open file chooser...": "打开文件选择器……",
    "Path layers": "路径图层",
    "Project name": "项目名称",
    "Save project": "保存项目",
    "Select all": "全选",
    "Side bearings": "侧边距",
    "Simple v2 project": "简单 v2 项目",
    "Start a new Glyphr Studio project": "新建 Glyphr Studio 项目",
    "This project": "此项目",
    "Toggle selection for all rows": "切换所有行的选择",
    "Update Side Bearings": "更新侧边距",
    "Vertical guideline": "垂直参考线",
    "View": "视图",
  };

  const PATTERNS = [
    [/^Version\s+(.+)$/i, "版本 $1"],
    [/^(\d+)\s+glyphs?$/i, "$1 个字形"],
    [/^(\d+)\s+components?$/i, "$1 个组件"],
    [/^(\d+)\s+ligatures?$/i, "$1 个连字"],
    [/^(\d+)\s+kern groups?$/i, "$1 个字距组"],
    [/^Glyph\s+(.+)$/i, "字形 $1"],
    [/^Path\s+(.+)$/i, "路径 $1"],
    [/^Character\s+(.+)$/i, "字符 $1"],
    [/^Export (TTF|OTF|WOFF2?|SVG) file$/i, "导出 $1 文件"],
    [/^Export an? (TTF|OTF|WOFF2?|SVG) Font \((.+)\)$/i, "导出 $1 字体（$2）"],
    [/^(.+)\s+saved$/i, "$1 已保存"],
    [/^Delete\s+(.+)\?$/i, "删除 $1？"],
    [/^(\d+)\s+selected$/i, "已选择 $1 项"],
    [/^Converting\s+(.+)$/i, "正在转换 $1"],
    [/^Moving\s+(.+)$/i, "正在移动 $1"],
    [/^Resizing\s+(.+)$/i, "正在调整 $1"],
    [/^Scaling\s+(.+)$/i, "正在缩放 $1"],
    [/^Rounding\s+(.+)$/i, "正在四舍五入 $1"],
    [/^Updating\s+(.+)$/i, "正在更新 $1"],
    [/^Removing\s+(.+)$/i, "正在移除 $1"],
    [/^Skewing\s+(.+)$/i, "正在倾斜 $1"],
    [/^Horizontally scaling (.+)$/i, "正在水平缩放 $1"],
    [/^Vertically scaling (.+)$/i, "正在垂直缩放 $1"],
    [/^Loading\s+(.+)$/i, "正在加载 $1"],
    [/^(.+)\s+Page$/i, "$1 页面"],
  ];

  const PHRASES = [
    ["Glyphr Studio is licensed under a", "Glyphr Studio 采用"],
    ["GNU General Public License", "GNU 通用公共许可证"],
    [", which is a free / open source \"copyleft\" license.", "，这是一份自由/开源的“copyleft”许可证。"],
    ["You are free to use, distribute, and modify Glyphr Studio as long as this license and its freeness stays intact.", "只要保留本许可证及其自由性质，你可以自由使用、分发和修改 Glyphr Studio。"],
    ["You can stay up to date on the latest news over at the", "你可以在"],
    ["We also have a", "我们还有一份"],
    ["over on the Help and Docs site that will help you walk through some of the key steps to designing your first font.", "，位于帮助与文档站点，带你走完设计第一款字体的关键步骤。"],
    ["As always, if you find any bugs, or have an suggestions about functionality, please email us!", "和往常一样，如果你发现 bug 或对功能有建议，欢迎发邮件给我们！"],
    ["Copyright", "版权"],
    ["All rights reserved.", "保留所有权利。"],
  ];

  const SKIP_TAGS = new Set([
    "SCRIPT",
    "STYLE",
    "TEXTAREA",
    "INPUT",
    "CODE",
    "PRE",
  ]);
  const ATTRS = ["title", "placeholder", "aria-label", "alt"];

  const LOWER = new Map();
  for (const [key, value] of Object.entries(EXACT)) {
    const lower = key.toLowerCase();
    if (!LOWER.has(lower)) LOWER.set(lower, value);
  }

  function translateText(value) {
    if (!value) return null;
    const trimmed = value.trim();
    if (trimmed.length < 2) return null;
    const normalized = trimmed
      .replace(/ /g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (Object.prototype.hasOwnProperty.call(EXACT, normalized)) {
      return EXACT[normalized];
    }
    const lower = normalized.toLowerCase();
    if (LOWER.has(lower)) return LOWER.get(lower);

    for (const [regex, replacement] of PATTERNS) {
      if (regex.test(normalized)) return normalized.replace(regex, replacement);
    }

    let output = normalized;
    let changed = false;
    for (const [english, chinese] of PHRASES) {
      if (output.includes(english)) {
        output = output.split(english).join(chinese);
        changed = true;
      }
    }
    return changed ? output : null;
  }

  function applyToTextNode(node) {
    const original = node.nodeValue;
    if (!original || !original.trim()) return;
    const translated = translateText(original);
    if (!translated) return;
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    const next = leading + translated + trailing;
    if (next !== original) node.nodeValue = next;
  }

  function applyToAttributes(element) {
    for (const attr of ATTRS) {
      if (!element.hasAttribute(attr)) continue;
      const original = element.getAttribute(attr);
      if (!original) continue;
      const translated = translateText(original);
      if (translated) element.setAttribute(attr, translated);
    }
  }

  function processNode(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      applyToTextNode(node);
      return;
    }
    if (
      node.nodeType !== Node.ELEMENT_NODE &&
      node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
    ) {
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (SKIP_TAGS.has(node.tagName)) return;
      if (node.isContentEditable) return;
      applyToAttributes(node);
      if (node.shadowRoot) {
        observeRoot(node.shadowRoot);
        processRoot(node.shadowRoot);
      }
    }
    for (const child of Array.from(node.childNodes || [])) {
      processNode(child);
    }
  }

  function processRoot(root) {
    if (!root) return;
    if (root.nodeType === Node.DOCUMENT_NODE) {
      if (root.documentElement) processNode(root.documentElement);
    } else {
      for (const child of Array.from(root.childNodes || [])) processNode(child);
    }
  }

  const OBSERVED = new WeakSet();
  function observeRoot(root) {
    if (!root || OBSERVED.has(root)) return;
    OBSERVED.add(root);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) queue(node);
      }
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  let pending = [];
  let scheduled = false;
  function queue(node) {
    if (!node) return;
    pending.push(node);
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      const nodes = pending;
      pending = [];
      for (const item of nodes) processNode(item);
    });
  }

  const originalAttachShadow = Element.prototype.attachShadow;
  if (originalAttachShadow) {
    Element.prototype.attachShadow = function (init) {
      const root = originalAttachShadow.call(this, init);
      observeRoot(root);
      queue(root);
      return root;
    };
  }

  processRoot(document);
  observeRoot(document);

  let sweeps = 0;
  const sweepInterval = setInterval(() => {
    processRoot(document);
    sweeps += 1;
    if (sweeps > 60) clearInterval(sweepInterval);
  }, 2000);

  setTimeout(() => processRoot(document), 300);
  setTimeout(() => processRoot(document), 1200);

  document.documentElement.lang = "zh-CN";
  if (document.title === "Glyphr Studio v2") {
    document.title = "Glyphr Studio v2 · 字体设计";
  }
})();
