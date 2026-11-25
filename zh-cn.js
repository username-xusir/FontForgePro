(() => {
  if (window.__glyphrZhInstalled) return;
  const locale = (
    window.__glyphrLocale ||
    navigator.language ||
    ""
  ).toLowerCase();
  if (!locale.startsWith("zh")) return;
  window.__glyphrZhInstalled = true;

  const EXACT = {
    // Start page
    "New": "新建",
    "Load": "载入",
    "Restore": "恢复",
    "Examples": "示例",
    "Start a new Glyphr Studio project": "新建 FontForgePro 项目",
    "Project name:": "项目名称：",
    "Create a new font from scratch": "从零创建新字体",
    "Load a file": "载入文件",
    "Drag and drop one of the following:": "拖入以下任意一种文件：",
    "Glyphr Studio Project (.gs2, .txt)": "FontForgePro 项目（.gs2、.txt）",
    "Open Type, True Type, or WOFF (.otf, .ttf, .woff)": "OpenType、TrueType 或 WOFF（.otf、.ttf、.woff）",
    "SVG Font (.svg)": "SVG 字体（.svg）",
    "or, open file chooser...": "或点击选择文件……",
    "Restore from auto-saved backup": "从自动保存的备份恢复",
    "No auto-saves exist yet": "还没有自动保存",
    "Simple v2 project": "简单 v2 项目",
    "About Glyphr Studio": "关于 FFpro",
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
    "Design glyphs": "设计字形",
    "Refine": "精修",
    "Settings & more": "设置与更多",
    "Bulk-edit paths": "批量编辑路径",
    "Bulk edit paths": "批量编辑路径",
    "bearings: left": "边距：左",
    "bearings: right": "边距：右",
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
    "Welcome to Glyphr Studio!": "欢迎使用 FFpro！",
    "Glyphr Studio is open source and community supported.": "FFpro 基于 Glyphr Studio 开源项目构建。",
    "Learn how you can help Glyphr Studio!": "了解如何参与这个项目！",
    "Load an example project": "载入示例项目",
    "Oblegg is the GSv2 project we use to test all the various Glyphr Studio features:": "Oblegg 是我们用来测试 FFpro 各项功能的 GSv2 项目：",
    "The Simple v2 Project has a few characters and things to show off basic functionality:": "简单 v2 项目包含少量字符和内容，用来展示基本功能：",
    "For more information visit www.glyphrstudio.com": "更多信息请使用应用内帮助",
    "Loading example project...": "正在加载示例项目……",
    "Space": "空格",
    "white space": "空白",
    "tutorial": "教程",
    "Path name": "路径名称",
    "winding": "轮廓方向",
    "transform origin": "变换原点",
    "lock aspect ratio": "锁定宽高比",
    "bearings: left / right": "边距：左 / 右",
    "Overall paths": "整体路径",
    "Previous item": "上一项",
    "Next item": "下一项",
    "EDITING": "编辑中",
    "PANEL": "面板",
    "Unknown": "未知",
    "Glyph bounding box:": "字形边界框：",
    "Baselines:": "基线：",
    "Page outline:": "页面轮廓：",
    "Text:": "文本：",
    "Font size:": "字号：",
    "Line gap:": "行距：",
    "Options": "选项",
    "Sample text": "示例文本",
    "Pangrams": "全字母句",
    "Glyph sets": "字形集",
    "All upper case letter permutations": "所有大写字母组合",
    "All lower case letter permutations": "所有小写字母组合",
    "Pop out a Live Preview window": "弹出实时预览窗口",
    "Exporting OTF font file...": "正在导出 OTF 字体文件……",
    "Exporting TTF font file...": "正在导出 TTF 字体文件……",
    "Exporting SVG font file...": "正在导出 SVG 字体文件……",
    "Exporting WOFF font file...": "正在导出 WOFF 字体文件……",
    "Exporting WOFF2 font file...": "正在导出 WOFF2 字体文件……",
    "Saving project file...": "正在保存项目文件……",
    "baseline left": "基线 左",
    "baseline right": "基线 右",
    "baseline center": "基线 居中",

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
    "Version name:": "版本名称：",
    "Version number:": "版本号：",
    "Last updated on:": "最后更新：",
    "Initially created with:": "创建版本：",
    "Unique project ID:": "项目唯一 ID：",
    "Version information": "版本信息",
    "More details": "更多详情",
    "This Glyphr Studio Project": "此 FFpro 项目",
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
    "Glyphr Studio failed to load!": "FFpro 加载失败！",
    "Glyphr Studio ran into a problem": "FFpro 遇到问题",
    "Guide line position": "参考线位置",
    "Horizontal guideline": "水平参考线",
    "Initial state": "初始状态",
    "Keyboard shortcuts": "键盘快捷键",
    "Layers": "图层",
    "Learn more": "了解更多",
    "Load a file": "载入文件",
    "Restore from auto-saved backup": "从自动保存的备份恢复",
    "No auto-saves exist yet": "还没有自动保存",
    "OK": "确定",
    "Open file chooser...": "打开文件选择器……",
    "Path layers": "路径图层",
    "Project name": "项目名称",
    "Save project": "保存项目",
    "Select all": "全选",
    "Side bearings": "侧边距",
    "Simple v2 project": "简单 v2 项目",
    "Start a new Glyphr Studio project": "新建 FontForgePro 项目",
    "This project": "此项目",
    "Toggle selection for all rows": "切换所有行的选择",
    "Update Side Bearings": "更新侧边距",
    "Vertical guideline": "垂直参考线",
    "View": "视图",
  };

  // Extra UI descriptions (added for FFpro)
  const EXTRA_ZH = {
    "These are calculated values based on shape positions and the Advance Width. They are not properties that are saved with the glyph, but it's helpful to think about them as if they were.": "这些数值根据轮廓位置和前进宽度计算得出。它们不是随字形保存的属性，但可以把它们当作属性来理解。",
    "Side bearings are the blank space to the left and right of shapes in a glyph. The open space between characters is very important for legibility.": "侧边距是字形轮廓左右两侧的空白。字符之间的留白对可读性非常重要。",
    "Distance from x=0 to the leftmost side of shapes in the glyph. Editing this will move all the shapes in the glyph, and update the Advance Width.": "从 x=0 到字形轮廓最左侧的距离。修改它会移动字形中的所有轮廓，并更新前进宽度。",
    "With increases or decreases to width or height, the transform origin is the point that stays fixed.": "增加或减少宽度/高度时，变换原点是在变换过程中保持固定的点。",
    "When either the width or height is adjusted, the overall size will be kept proportional.": "调整宽度或高度时，保持整体尺寸等比例变化。",
    "This only takes effect when directly entering values into the width or height inputs.": "仅在直接向宽度或高度输入框输入数值时生效。",
    "Distance from the rightmost side of shapes in the glyph to the Advance Width.": "从字形轮廓最右侧到前进宽度线之间的距离。",
    "Maintaining aspect ratio will override value locks if need be.": "保持宽高比时，如有需要会覆盖数值锁定。",
    "A positive value will rotate the path clockwise, and a negative value will rotate the path counterclockwise. Rotation is applied around the shape's center.": "正值会让路径顺时针旋转，负值会让路径逆时针旋转。旋转围绕轮廓中心进行。",
    "A positive value will skew the path to the right, and a negative value will skew the path to the left.": "正值会让路径向右倾斜，负值会让路径向左倾斜。",
    "A positive value will expand the path, and a negative value will contract the path.": "正值会向外扩展路径，负值会向内收缩路径。",
    "Select shapes, then provide an offset distance to apply.": "先选择轮廓，再输入偏移距离并应用。",
    "Select shapes, then provide a rotation angle to apply.": "先选择轮廓，再输入旋转角度并应用。",
    "Select shapes, then provide a skew distance to apply.": "先选择轮廓，再输入倾斜距离并应用。",
    "Select shapes, then provide a skew angle to apply.": "先选择轮廓，再输入倾斜角度并应用。",
    "View options": "视图选项",
    "Transparency": "透明度",
    "Show labels": "显示标签",
    "Right side": "右侧",
    "Left side": "左侧",
    "X height": "x 高度",
    "These quality checks help identify small data errors that may be a result of importing from SVG.": "这些质量检查有助于发现从 SVG 导入后可能出现的小数据错误。",
    "Highlight points that are near other points": "高亮彼此距离过近的点",
    "Highlight points with short handles": "高亮控制柄过短的点",
    "Highlight points that are near x=0": "高亮靠近 x=0 的点",
    "Highlight points that are near y=0": "高亮靠近 y=0 的点",
    "Points and handles": "点和控制柄",
    "Range info": "范围信息",
    "Range name": "范围名称",
    "Character name": "字符名称",
    "Character": "字符",
    "Range": "范围",
    "to": "至",
    "HTML entity (hexadecimal)": "HTML 实体（十六进制）",
    "HTML entity (decimal)": "HTML 实体（十进制）",
    "A full-screen live preview can be launched in a new window, useful for sentence or paragraph scale previews of your typeface.": "可以在新窗口中打开全屏实时预览，适合查看句子或段落级别的字体效果。",
    "Context characters are a small set of letters that are shown around the character you are currently editing.": "上下文字符是一小组字母，会显示在当前编辑字符的周围，方便观察字距和整体效果。",
    "Launch live preview in a new window": "在新窗口打开实时预览",
    "Show context characters": "显示上下文字符",
    "Show guides and labels": "显示参考线和标签",
    "Pop out live preview": "弹出实时预览",
    "Guides and labels": "参考线和标签",
    "Name for this project. Can be different than the Font or Font Family name. Also, this will be used as the name of the saved FFpro Project (.gs2) file.": "此项目的名称，可以与字体或字体家族名称不同。保存 FFpro 项目（.gs2）时也会使用此名称。",
    "These are ranges with characters that are saved in your project, but are not part of enabled character ranges.": "这些范围中的字符会保存在项目里，但不属于已启用的字符范围。",
    "is a good place to get familiar with all the different characters it's possible to have in a font.": "是了解字体中可能包含哪些字符的好地方。",
    "These character ranges will be visible on the Characters page, and they will be exported to fonts.": "这些字符范围会显示在「字符」页，并会导出到字体文件。",
    "These will be saved to your FFpro Project File, but will not be exported to fonts.": "这些内容会保存到 FFpro 项目文件，但不会导出到字体文件。",
    "The app version this project file was first created with.": "此项目文件最初创建时使用的应用版本。",
    "These settings affect how this FFpro Project behaves.": "这些设置会影响此 FFpro 项目的行为。",
    "The latest app version that edited this project file.": "最近编辑此项目文件时使用的应用版本。",
    "A unique ID used to identify this project.": "用于标识此项目的唯一 ID。",
    "delete individual glyphs from the project.": "从项目中删除单个字形。",
    "to all possible characters in a font.": "应用到字体中所有可能的字符。",
    "Enabled character ranges": "已启用的字符范围",
    "Hiding a character range": "隐藏字符范围",
    "Hidden character ranges": "隐藏的字符范围",
    "Project settings": "项目设置",
    "ranges": "范围",
    "Character ranges": "字符范围",
    "not": "不",
    "will not": "不会",
    ", which assigns a": "，它会分配一个",
    "Actions": "操作",
    "Action": "操作",
    "Start": "开始",
    "Text": "文本",
    "End": "结束",
    "Initial version:": "初始版本：",
    "Project ID:": "项目 ID：",
    "Read only": "只读",
    "Version:": "版本：",
    "Basic Latin Controls": "基本拉丁控制字符",
    "Basic Latin": "基本拉丁",
    "General Punctuation": "常用标点",
    "Latin-1 Supplement": "拉丁-1 补充",
    "Latin Supplement": "拉丁补充",
    "Latin Extended A": "拉丁扩展 A",
    "Latin Extended B": "拉丁扩展 B",
    "hexadecimal number": "十六进制数",
    "Unicode Standard": "Unicode 标准",
    "Wikipedia's Unicode Block page": "维基百科的 Unicode 区块页面",
    "Character ranges are based on the": "字符范围基于",
    "Character ranges are based on the Unicode Standard": "字符范围基于 Unicode 标准",
    "If you have some character outlines already created in another app like Adobe Illustrator or Inkscape, or if you are just more comfortable using tools like those, be sure to read through our tutorial which gives you lots of tips about how to get the most out of FFpro.": "如果你已经在 Adobe Illustrator、Inkscape 等软件里画好了字符轮廓，或者更习惯这类工具，建议阅读教程，里面有很多充分利用 FFpro 的技巧。",
    "At any time, you can reach out for any help you need:": "任何时候需要帮助，都可以联系我们：",
    ", please email us if you find anything missing.": "，如果发现缺少内容，请发邮件告诉我们。",
    "Help articles for FFpro v2 can be found at": "FFpro v2 的帮助文章位于",
    "Learn more at the help site": "在帮助站点了解更多",
    "FAQs": "常见问题",
    "Getting started": "入门",
    "Pages & data types": "页面与数据类型",
    "More information about this and past versions of the FFpro app can be found on the": "有关此版本及旧版 FFpro 的更多信息，请访问",
    "More information about this and past versions of the Glyphr Studio app can be found on the": "有关此版本及旧版 Glyphr Studio 的更多信息，请访问",
    "FFpro 2 GitHub > Releases": "Glyphr Studio 2 GitHub 发布页",
    "Glyphr Studio 2 GitHub > Releases": "Glyphr Studio 2 GitHub 发布页",
    "Contribute!": "参与贡献",
    "Version Information": "版本信息",
    "FFpro App": "FFpro 应用",
    "FFpro Project": "FFpro 项目",
    "此 FFpro Project": "此 FFpro 项目",
    "page, or the": "页面，或",
    ", the": "，或",
    "page.": "页面。",
    "Side Bearing is the empty space around a glyph's shapes. The Left Side Bearing is the space between x=0 to the leftmost side of the glyph shapes. The Right Side Bearing is the distance between the rightmost side of the glyph shapes and the advance width. Side Bearings will probably have to be adjusted for each glyph in order for it to work well... but this action could be useful if you want to re-set all Side Bearings to some common value.": "侧边距是字形轮廓周围的空白。左侧边距是从 x=0 到字形轮廓最左侧的距离；右侧边距是从字形轮廓最右侧到前进宽度的距离。为了让字体效果更好，通常需要逐个字形调整侧边距；但如果你想把所有侧边距统一重置为某个常用值，这个操作会很有用。",
    "- The diacritical glyphs that are in the Basic Latin range are usually designed to be stand-alone. Simply combining them with base glyphs is a good start, but work will be needed to make the resulting character look nice. The \"Advanced\" Diacritical Glyph Generator below takes a little more work up front, but will probably yield better results.": "- 基本拉丁范围内的变音符号字形通常是独立设计的。把它们与基础字形简单组合是一个不错的起点，但还需要调整才能让最终字符好看。下面的“高级”变音字形生成器前期设置稍多，但通常效果更好。",
    "The Latin Supplement character range is mostly made up of Latin-based diacritical (or accented) glyphs. These are basically normal Latin glyphs, with accents. Since most of the accents exist as stand-alone glyphs themselves in the Basic Latin range, diacritics in the Latin Supplement range are easy to create from merging two existing glyphs.": "拉丁补充字符范围主要由带变音符号（重音）的拉丁字形组成。它们基本上就是普通拉丁字形加上重音。由于大多数重音在基本拉丁范围内都有独立字形，拉丁补充范围内的变音字形可以通过合并两个已有字形轻松创建。",
    ". This range is designed to be used in combination with base glyphs from other ranges. This action will combine glyphs from the Basic Latin range with their appropriate counterparts in the Combining Diacritical Marks range to yield the Latin Supplement and Latin Extended A ranges.": "。这个范围用于与其他范围的基础字形组合。此操作会把基本拉丁范围内的字形与组合变音符号范围内的对应字形组合，生成拉丁补充和拉丁扩展 A 范围。",
    "Individual Glyphs, Ligatures, and Components will have a new height calculated based on the overall height of the shapes in that glyph (not the ascender or descender values from the font). The new height will be applied, and the shapes will be moved to maintain a common baseline.": "每个字形、连字和组件都会根据其轮廓的整体高度（不是字体的上伸部/下伸部数值）计算新高度。应用新高度后，轮廓会移动以保持共同基线。",
    "All-caps fonts have no lowercase letters. To make things easy, the lowercase letters in these fonts contain duplicates of their uppercase form. Select the ranges where you would like to add uppercase Component Instances to lowercase letters.": "全大写字体没有小写字母。为了方便使用，这类字体的小写字母通常复制大写字母的形状。请选择要为大写字母添加小写组件实例的范围。",
    "Skew all paths by a given angle, measured in degrees. The degrees system starts with the twelve o'clock / up position as zero, and positive degrees will slant paths to the right, and negative degrees will slant paths to the left.": "按指定角度（度）倾斜所有路径。角度以十二点/向上方向为零度，正角度向右倾斜，负角度向左倾斜。",
    "When selected, this option will unlink component instances and turn them into normal paths if their component root is deleted (the glyph will look the same, but some component instances will end up as stand-alone path objects).": "选中后，如果组件根被删除，组件实例会解除链接并转为普通路径（字形外观不变，但部分组件实例会变成独立路径对象）。",
    "Component Instances that are linked to Items that are also re-sized will be skipped. If a Component Root and an Item that contains a Component Instance are both re-sized, the Component Instance would have been re-sized twice.": "如果组件实例链接到的项目也同时被缩放，则会跳过该组件实例。否则组件根和包含组件实例的项目都缩放时，组件实例会被缩放两次。",
    "The Latin Supplement and Latin Extended A character ranges will be enabled, and diacritical glyphs will be assembled as Component Instances from their respective glyphs from Basic Latin and Combining Diacritical Marks ranges.": "将启用拉丁补充和拉丁扩展 A 字符范围，并使用基本拉丁与组合变音符号范围中的对应字形，把变音字形组装为组件实例。",
    "Components or Characters that are used as Component Roots in selected ranges may be linked to Component Instances outside of selected ranges. Moving or scaling Component Roots may have effects outside of selected ranges.": "所选范围内作为组件根的组件或字符，可能被范围外的组件实例引用。移动或缩放这些组件根可能影响所选范围之外的内容。",
    "Component Instances that are linked to Items that are also moved will be skipped. If a Component Root and an Item that contains a Component Instance are both moved, the Component Instance would have been moved twice.": "如果组件实例链接到的项目也同时被移动，则会跳过该组件实例。否则组件根和包含组件实例的项目都移动时，组件实例会被移动两次。",
    "Capital letters will be added as Component Instances to their lowercase counterparts in the selected ranges. The lowercase letters will also have their Advance Width updated to match their uppercase counterparts.": "在所选范围内，大写字母会作为组件实例添加到对应的小写字母中，小写字母的前进宽度也会更新为与大写字母一致。",
    "Individual Glyphs, Ligatures, and Components will have a new width calculated based on the overall width of the shapes in that glyph (not the advance width of the glyph). The new width will be applied.": "每个字形、连字和组件都会根据其轮廓的整体宽度（不是字形的前进宽度）计算新宽度，并应用该宽度。",
    "Every Character, Component, and Ligature will have the \"Round all path point values\" command run on it. Also, the Advance Width property will be rounded for Characters and Ligatures.": "每个字符、组件和连字都会执行“圆整所有路径点数值”命令；字符和连字的前进宽度也会被圆整。",
    "The Latin Supplement and Latin Extended A character ranges are mostly made up of Latin-based diacritical glyphs. There is also a character range called Combining Diacritical Marks": "拉丁补充和拉丁扩展 A 字符范围主要由带变音符号的拉丁字形组成。此外还有一个名为“组合变音符号”的字符范围。",
    "Monospace fonts are fonts where each glyph has the same width. This is useful for coding fonts, and fonts used for textual output. The width value must be greater than zero.": "等宽字体中每个字形都有相同宽度，适合编程字体和文本输出字体。宽度值必须大于 0。",
    "The Latin Supplement character range will be enabled, and diacritical glyphs will be assembled as Component Instances from their respective glyphs in the Basic Latin range.": "将启用拉丁补充字符范围，并使用基本拉丁范围中的对应字形，把变音字形组装为组件实例。",
    "Need to downsize? This global action will remove Glyphs, Components, and Ligatures in selected ranges. This is the same as the 'Delete Glyph' action on individual items.": "需要精简项目？此全局操作会删除所选范围内的字形、组件和连字，效果等同于逐个执行“删除字形”。",
    "If this option is unselected, component instances will be deleted when their component root is deleted (the glyph will look different because it will have less shapes).": "如果未选中此选项，删除组件根时也会删除组件实例（字形外观会改变，因为轮廓变少了）。",
    "will result in no change, between zero and one will reduce the width, and above one will increase the width. Optionally scale the advance width of the glyph as well.": "输入 1 不会改变宽度；0 到 1 之间会减小宽度；大于 1 会增大宽度。也可以选择同时缩放字形的前进宽度。",
    "This will remove all links from Component Instances to their Components, and leave behind a stand-alone path that looks exactly like the Component Instance did.": "这会移除组件实例与组件之间的所有链接，留下一个外观与组件实例完全相同的独立路径。",
    "Given a positive or negative Width and/or Height value, all the glyphs in this font will have their size updated by the specified number of Em units.": "输入正的或负的宽度和/或高度值后，字体内所有字形的大小会按指定的 Em 单位数更新。",
    "Given a positive or negative X and/or Y value, all the glyphs in this font will have their position updated by the specified number of Em units.": "输入正的或负的 X 和/或 Y 值后，字体内所有字形的位置会按指定的 Em 单位数更新。",
    "By default, global actions affect all characters, ligatures, and components. The filters below can be used to target more specific ranges.": "默认情况下，全局操作会影响所有字符、连字和组件。可以用下面的筛选器只处理特定范围。",
    "This will run the \"round all\" action on each glyph. This will ensure all path point values are rounded to their nearest whole number.": "这会对每个字形执行“全部圆整”操作，确保所有路径点数值都圆整到最接近的整数。",
    "Each ligature and glyph will have their shapes moved and/or their advance width updated to create the specified side bearing widths.": "每个连字和字形都会移动轮廓和/或更新前进宽度，以生成指定的侧边距。",
    "Every shape in every Glyph, Component, and Ligature will have the \"Turn Component Instance into a Path\" command run on it.": "每个字形、组件和连字中的所有形状都会执行“把组件实例转为路径”命令。",
    "Changes will be grouped together in one History entry. Hitting 'Undo' will undo all changes made by the global action.": "所有更改会合并为一条历史记录。点击“撤销”会撤销该全局操作的全部更改。",
    "will result in no change, between zero and one will scale down the height, and above one will increase the height.": "输入 1 不会改变高度；0 到 1 之间会缩小高度；大于 1 会增大高度。",
    "Individual Glyphs, Ligatures, and Components will have have all of their paths skewed by the given angle.": "每个字形、连字和组件中的所有路径都会按指定角度倾斜。",
    "This could be a good first step if you are trying to make an italic version of an existing font.": "如果你想基于现有字体制作斜体版本，这会是一个不错的起点。",
    "Have an idea for a new global action? They are easy for us to add - email us your idea!": "有新的全局操作想法？添加起来很容易——欢迎发邮件告诉我们！",
    "Given a multiplier, scale all the glyph shapes in the horizontal direction. Entering": "按倍数水平缩放所有字形轮廓。输入",
    "Each ligature and glyph's advance width property will be set to the value provided.": "每个连字和字形的前进宽度都会设为所填数值。",
    "Given a multiplier, scale all the glyph shapes in the vertical direction. Entering": "按倍数垂直缩放所有字形轮廓。输入",
    "Actions taken here will not carry forward to items that haven't been created yet.": "这里的操作不会影响之后才创建的项目。",
    "- Add the Combining Diacritical Marks range to your project, and design them.": "- 把“组合变音符号”范围添加到项目，并设计这些字形。",
    "Individual Glyphs, Ligatures, and Components will be re-sized.": "每个字形、连字和组件都会调整大小。",
    "Individual Glyphs, Ligatures, and Components will be moved.": "每个字形、连字和组件都会移动。",
    "Global Actions are actions that affect many items at once.": "全局操作会一次影响多个项目。",
    "Global actions to not affect hidden character ranges.": "全局操作不会影响隐藏的字符范围。",
    "Project data will be deleted for the selected items.": "所选项目的数据将被删除。",
    "Unlink component instances when deleting their root": "删除组件根时解除组件实例链接",
    "Also update the item's advance width property": "同时更新项目的前进宽度",
    "Update the item's advance width property": "更新项目的前进宽度",
    "leave either Δ Width or Δ Height as zero": "将 Δ 宽度或 Δ 高度之一留为 0",
    "Scale the item's advance width property": "缩放项目的前进宽度",
    "Component Instances will": "组件实例将",
    "Select character ranges": "选择字符范围",
    "Maintain aspect ratio (": "保持宽高比（",
    "Right Side Bearing:": "右侧边距：",
    "Left Side Bearing:": "左侧边距：",
    "Angle in degrees": "角度（度）",
    "Before you begin": "开始之前",
    "Scale value:": "缩放值：",
    "Scale factor": "缩放系数",
    "Please note": "请注意",
    "Some notes": "一些说明",
    "be skewed.": "被倾斜。",
    "Δ Height:": "Δ 高度：",
    "Δ Width:": "Δ 宽度：",
    "Glyph Width:": "字形宽度：",
    "Glyph Height:": "字形高度：",
    "Width:": "宽度：",
    "Height:": "高度：",
    "Filters": "筛选",
    "X move:": "X 移动：",
    "Y move:": "Y 移动：",
    "Note:": "注意：",
  };
  Object.assign(EXACT, EXTRA_ZH);

  // Extra page and settings descriptions
  const EXTRA_ZH2 = {
    "Components are a FFpro feature that lets you re-use a collection of paths across many different glyphs. The root is called a 'Component' and these are added by reference to other glyphs, where they are called 'Component Instances'. Updating the root component will also update all component instances.": "组件是 FFpro 的一项功能，可让你在许多不同字形中重复使用同一组路径。被引用的原始对象称为“组件”，添加到其他字形中的引用称为“组件实例”。更新原始组件时，所有组件实例也会同步更新。",
    "Diacritic glyphs (glyphs with accents) are just one example of where having a shared component root can be used across many individual characters.": "带重音符号的变音字形，只是共享组件根可以跨多个字符使用的一个例子。",
    "There are no components in your project": "你的项目中还没有组件",
    "Ligatures are a feature of fonts where a specified sequence of characters is recognized and replaced with a single new character that you design. In Latin, there are some common ligatures:": "连字是字体的一项功能：当文字中出现指定的字符组合时，会替换为你设计的单个新字符。拉丁字体中有一些常见连字：",
    "In a text editing program that has ligatures enabled, this sequence of characters is recognized, then replaced with the custom ligature character that you design.": "在启用连字的文本编辑软件中，这组字符会被识别，并替换为你设计的自定义连字字符。",
    "Ligatures can have any sequence of two or more characters.": "连字可以对应任意两个或更多字符的组合。",
    "Add the common Latin ligatures to your project": "将常见拉丁连字添加到项目",
    "There are no ligatures in your project": "你的项目中还没有连字",
    "These are just some examples.": "这些只是一些示例。",
    "Font files encode kerning values as three pieces of information: a left character, a right character, and a horizontal adjustment value. Fonts with many characters can end up having a huge amount of kern pairs. FFpro uses a system called Class-based Kerning, where groups of characters with similar edges (like": "字体文件用三项信息记录字距值：左侧字符、右侧字符和水平调整量。字符很多的字体可能产生大量字距对。FFpro 使用“基于类别的字距”系统，把边缘形状相似的字符组（例如",
    "Kerning is an advanced feature of fonts that recognizes a pair of characters, then adjusts the spacing between them to some custom value. The default spacing between characters is zero - which is to say, the white space (side bearings) within each character are the only space shown.": "字距是字体的一项高级功能：识别一对字符，并把它们之间的间距调整为自定义值。默认的字距调整量为零，也就是说字符之间只显示各自侧边距形成的空白。",
    "as an example, if the default side bearing spacing is used, the letters visually look very far apart. Kerning can help the visual flow of character pairs look more well considered. Many character pairs may need either negative or positive kern values to make them \"look right\".": "举个例子，如果使用默认侧边距，这两个字母看起来会离得很远。字距可以让字符对的视觉节奏更协调。许多字符对可能需要负值或正值的字距调整，才能“看起来正确”。",
    ") can be treated as single group - which can be given a single value. When a font is exported, the permutations are saved as individual kern pairs. But, while editing, grouping common characters often simplifies the overall kerning process.": "）当作一个组，并为整个组设置同一个值。导出字体时，这些组合会保存为单独的字距对；而在编辑时，把常用字符分组通常能简化整体字距调整流程。",
    ") can be treated as a single left-hand group, and a group of right-hand characters (for example,": "）可以作为左侧组，右侧字符组（例如",
    "There are no kern pairs in your project": "你的项目中还没有字距对",
    "Some letter combinations, like": "有些字母组合，例如",
    "Class-based kerning": "基于类别的字距",
    "Rounded characters are usually slightly larger than square characters to compensate for visual weight. For example, a lowercase 'o' will extend slightly above and below a lowercase 'x'. Overshoot is the measure of this distance.": "圆形字符通常会比方形字符略大，以补偿视觉重量。例如小写“o”会略微超出小写“x”的上下边界。这个超出量就是 Overshoot（超出量）。",
    "Operating systems are picky about what UPM values they allow. In general, anything 1000 or below will work. Above 1000, many times only powers of 2 will work (like 1024, 2048, 4096, etc.).": "操作系统对可用的 UPM 值比较挑剔。通常 1000 及以下都可以；超过 1000 时，很多时候只支持 2 的幂（如 1024、2048、4096 等）。",
    "UPM is the measure of the overall design space for a character in this font. Think of UPM like how many pixels of height you have to work with for each character.": "UPM 是这款字体中每个字符整体设计空间的度量。可以把 UPM 理解为每个字符可用的高度像素数。",
    "Distance from the baseline to the top of square capital letters (Like: A B D E F H I K L M N P R T U V W X Y Z). Usually this is slightly smaller than the ascent.": "从基线到方形大写字母顶部的距离（如 A B D E F H I K L M N P R T U V W X Y Z）。通常略小于上伸部。",
    "If this font gets updates regularly, keep track of what version this iteration is. This is recommended to be in Semantic Versioning format, you can learn more at": "如果这款字体会经常更新，请记录当前迭代的版本号。建议使用语义化版本格式，详情见",
    "The angle, in degrees counterclockwise from the vertical, of the dominant vertical strokes of the font. The value is negative for fonts that slope to the right.": "字体主要竖笔画相对于垂直方向、逆时针测量的角度（度）。向右倾斜的字体应使用负值。",
    "Distance from the baseline to the bottom of letters that have square descenders (Like: p q y depending on style). This is expressed as a negative number.": "从基线到方形下伸字母底部的距离（如 p、q、y，视风格而定）。用负数表示。",
    "When text wraps onto multiple lines, this is the distance between the bottom of one Em Square to the top of the next line's Em Square.": "文本换行时，上一行 Em 方块底部到下一行 Em 方块顶部的距离。",
    "PANOSE is a system that uses ten digits to describe the font's visual style. A good overview can be found on Monotype's GitHub page:": "PANOSE 是用十个数字描述字体视觉风格的系统。Monotype 的 GitHub 页面提供了很好的概览：",
    "Base font family name, that will be shared across font styles. This will also be used as the base name for exported font files.": "基础字体家族名称，会由同一家族的不同样式共用，也会作为导出字体文件的基础名称。",
    "normal, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded": "normal（常规）、ultra-condensed（超压缩）、extra-condensed（特压缩）、condensed（压缩）、semi-condensed（半压缩）、semi-expanded（半扩展）、expanded（扩展）、extra-expanded（特扩展）、ultra-expanded（超扩展）",
    "Describes this font within the overall font family. Usually a combination of how bold this font is and if it is italic.": "描述这款字体在整个家族中的位置，通常是字重与是否斜体的组合。",
    "These settings will be exported with any font you save, and will be used around FFpro while you are making edits.": "保存字体时，这些设置会一起导出，并在 FFpro 编辑过程中使用。",
    "Each digit of the ten digits is separated by a space, and has a special meaning based on its position.": "十个数字之间用空格分隔，每个数字根据所在位置有不同含义。",
    "All zeros describe this font as 'any', which basically leaves it undefined. Use this as your default.": "全部为零表示“任意”，相当于不指定风格。建议作为默认值。",
    "The first digit determines the kind of font family this is, where digit 2 represents Latin typefaces.": "第一位数字表示字体家族类型，其中 2 代表拉丁字体。",
    "Most common degree of slant for glyphs in an italic font. Should be negative if leaning to the right.": "斜体字形最常见的倾斜角度。向右倾斜时应为负值。",
    "The ideal position of an underline with relation to the baseline (probably should be negative).": "下划线相对于基线的理想位置（通常应为负值）。",
    "Distance from the baseline to the top of square and tall lowercase letters (Like: b d h k l).": "从基线到方形高小写字母顶部的距离（如 b、d、h、k、l）。",
    "Check out the interactive PANOSE builder to get more details on what each digit means.": "打开交互式 PANOSE 构建器，可查看每位数字的详细含义。",
    "Distance from the baseline to the top of square lowercase letters (Like: v w x z).": "从基线到方形小写字母顶部的距离（如 v、w、x、z）。",
    ", Medium Italic, SemiBold Italic, Bold Italic, ExtraBold Italic, Black Italic": "、中等斜体、半粗斜体、粗斜体、特粗斜体、黑体斜体",
    "Note: This is used internally by FFpro, it is not exported to fonts.": "注意：此值仅供 FFpro 内部使用，不会导出到字体。",
    "The ideal position of a strikethrough with relation to the baseline.": "删除线相对于基线的理想位置。",
    "Most common height measurement of horizontal stems in this font.": "这款字体中横笔画最常见的厚度。",
    "The ideal position of an overline with relation to the baseline.": "上划线相对于基线的理想位置。",
    "Most common width measurement of vertical stems in this font.": "这款字体中竖笔画最常见的宽度。",
    "How bold this font is - a number between 100 and 900:": "这款字体的粗细程度，数值在 100 到 900 之间：",
    "Thin Italic, ExtraLight Italic, Light Italic,": "细体斜体、特细斜体、轻斜体、",
    "Traditionally, UPM is either 1000 or 2048.": "传统上，UPM 通常为 1000 或 2048。",
    "License under which this font is released.": "这款字体发布时使用的许可证。",
    "How condensed or expanded this font is.": "这款字体的压缩或扩展程度。",
    "Open-ended text to describe your font.": "用于描述字体的自由文本。",
    "Person or team who created this font.": "创建这款字体的个人或团队。",
    "The ideal height of a strikethrough.": "删除线的理想高度。",
    "The ideal height of an underline.": "下划线的理想高度。",
    "Either 'normal' or 'small-caps'.": "可为 normal（常规）或 small-caps（小型大写字母）。",
    "The ideal height of an overline.": "上划线的理想高度。",
    "Company who created this font.": "创建这款字体的公司。",
    "Thin, ExtraLight, Light,": "细体、特细、轻体、",
    "Properties for SVG Fonts": "SVG 字体属性",
    "Strikethrough thickness:": "删除线粗细：",
    "Strikethrough position:": "删除线位置：",
    "Capital letter height:": "大写字母高度：",
    "Underline thickness:": "下划线粗细：",
    ", Medium, SemiBold,": "、中等、半粗、",
    "Units per Em (UPM):": "每 Em 单位数（UPM）：",
    "Manufacturer's URL:": "制造商网址：",
    "Underline position:": "下划线位置：",
    "Overline thickness:": "上划线粗细：",
    ", ExtraBold, Black": "、特粗、黑体",
    "Overline position:": "上划线位置：",
    "Font description:": "字体描述：",
    "200 : Extra-Light": "200：特细",
    "800 : Extra-Bold": "800：特粗",
    "Horizontal stem:": "横笔画宽度：",
    "600 : Semi-Bold": "600：半粗",
    "Designer's URL:": "设计师网址：",
    "Vertical stem:": "竖笔画宽度：",
    "Font metadata": "字体元数据",
    "Font version:": "字体版本：",
    "Other metrics": "其他度量",
    "400 : Regular": "400：常规",
    "Italic angle:": "倾斜角度：",
    "Manufacturer:": "制造商：",
    "Font variant:": "字体变体：",
    "Font stretch:": "字体拉伸：",
    "Font metrics": "字体度量",
    "Font weight:": "字重：",
    "500 : Medium": "500：中等",
    "License URL:": "许可证网址：",
    "Font style:": "字体样式：",
    "Key metrics": "关键度量",
    "300 : Light": "300：细体",
    "900 : Black": "900：黑体",
    "Overshoot:": "超出量：",
    "100 : Thin": "100：极细",
    "700 : Bold": "700：粗体",
    "Trademark:": "商标：",
    "Panose‑1:": "PANOSE-1：",
    "X height:": "x 高度：",
    "Designer:": "设计师：",
    "License:": "许可证：",
    "Slope:": "倾斜：",
    "Links": "链接",
    "Number": "数值",
    "Degree": "度",
    "When enabled, this option will use your browser's local storage to keep backups. These backups can be restored from the Open Projects page. Your browser's local storage is confined to this browser on this computer. If you use FFpro from another browser or on another computer, those backups will be available from there.": "启用后，此选项会使用浏览器的本地存储保存备份，可在开始页恢复。浏览器本地存储仅限于这台电脑上的这个程序；如果在其他浏览器或其他电脑上使用 FFpro，那里的备份也会各自独立。",
    "For shapes on the edit canvas, when the display mode is \"Filled\" the shapes will be shown as filled with black, similar to how they will appear in a text editor. When the display mode is \"Outline\" (or unselected), the shapes will be shown as outlines, which may help when editing complex shapes.": "在编辑画布上，“填充”模式会把轮廓显示为黑色填充，接近文字编辑器中的效果；“轮廓”模式（或未选中）则只显示轮廓线，便于编辑复杂形状。",
    "When you add the first shape to a new Character or Ligature, automatically update the Advance Width such that the Right Side Bearing is the value specified here. This automatic Advance Width update will only happen one time per item, and won't apply to shapes imported from an SVG file.": "向新字符或连字添加第一个轮廓时，自动调整前进宽度，使右侧边距等于这里指定的值。此自动更新每个项目只发生一次，且不适用于从 SVG 文件导入的轮廓。",
    "FFpro Project files (.gs2) are text files in JSON format. By default, this file is saved to optimize for smaller file size. Setting this option to true formats the file to be more easily read by a human, but could increase the file size by 2x or more.": "FFpro 项目文件（.gs2）是 JSON 格式的文本文件。默认以更小的文件体积保存；开启此选项后会对文件进行格式化，方便人阅读，但文件体积可能增大 2 倍以上。",
    "When importing SVG to a single item, move the imported shapes such that the left hand side x is at the Side Bearing value, and the set the Advance With of the item so that there is a Side Bearing's worth of space on the right hand side.": "向单个项目导入 SVG 时，移动导入的轮廓，使最左侧 x 等于侧边距值，并调整该项目的前进宽度，让右侧也留出相同宽度的侧边距。",
    "Show the Unicode code points represent things that aren't letters. In Unicode, the C0 and C1 control code or control character sets define control codes for use in text by computer systems that use ASCII and derivatives of ASCII.": "显示用于表示非字母内容的 Unicode 码位。Unicode 中的 C0/C1 控制码定义供使用 ASCII 及其衍生编码的计算机系统在文本中使用的控制字符。",
    "For Characters, Ligatures, Components, and Kern Groups, this is how many items to show in the item chooser menu. For projects with large numbers of items, splitting the items apart into pages can help the UI perform better.": "对于字符、连字、组件和字距组，此值决定项目选择菜单中显示多少个项目。项目数量很多时，分页显示可以提升界面性能。",
    "This option will highlight points that have very short handles. Sometimes this happens when exporting SVG code from another app. It is best practice to reduce the number of unnecessary handles in a path as much as possible.": "此选项会高亮控制柄非常短的点。这种情况有时出现在从其他软件导出 SVG 时。最佳做法是尽量减少路径中不必要的控制柄。",
    "This option will highlight points that are very close to other points. Sometimes this happens when exporting SVG code from another app. It is best practice to reduce the number of points in a path as much as possible.": "此选项会高亮彼此距离非常近的点。这种情况有时出现在从其他软件导出 SVG 时。最佳做法是尽量减少路径中的点数。",
    "FFpro uses your browser's local storage to keep auto-saved backups. If you use FFpro from a different browser, or on a different computer, you'll have to go there to restore or delete backups.": "FFpro 使用浏览器本地存储保存自动备份。如果在其他浏览器或其他电脑上使用 FFpro，需要到对应环境恢复或删除备份。",
    "On the edit canvas, when in Path Edit mode (Pen tool) hover over a path's curve, then click and drag to move the curve directly. This will edit the handles of the two adjacent path points.": "在编辑画布上使用“编辑路径”（钢笔）工具时，把鼠标移到路径曲线上，按住拖动即可直接移动曲线；这会同时调整相邻两个路径点的控制柄。",
    "When you create a Ligature or Component, or navigate to a Character, an empty glyph item is created for you. It's possible to leave these items in an unedited state, essentially empty.": "创建连字或组件，或导航到某个字符时，会自动创建一个空字形项目。这些项目可以保持未编辑、完全空白的状态。",
    "Save the text blocks that you have defined for your Live Previews (both the page, and the 2nd window). These could be long, so you may want to turn them off for file size reasons.": "保存为实时预览（页面和第二个窗口）定义的文本块。这些文本可能很长，若在意文件体积可以关闭此选项。",
    "If this option is checked, these empty items will be exported to fonts. If this option is unchecked, these empty items will be filtered out, and not exported to fonts.": "选中时，这些空白项目会导出到字体；未选中时，空白项目会被过滤掉，不会导出。",
    "Clockwise paths will be shown as a slightly lighter blue outline than their counter-clockwise counterparts. Component Instances will be outlined in dark green.": "顺时针路径会以比逆时针路径更浅的蓝色轮廓显示；组件实例会以深绿色轮廓显示。",
    "What text to show when previewing a project or switching between projects. If left blank, the string 'Aa Bb Cc Xx Yy Zz' will be used.": "预览项目或切换项目时显示的文本。留空则使用“Aa Bb Cc Xx Yy Zz”。",
    "This option will highlight points that are near x=0. Sometimes this happens when exporting SVG code from another app.": "此选项会高亮靠近 x=0 的点。这种情况有时出现在从其他软件导出 SVG 时。",
    "This option will highlight points that are near y=0. Sometimes this happens when exporting SVG code from another app.": "此选项会高亮靠近 y=0 的点。这种情况有时出现在从其他软件导出 SVG 时。",
    "When importing SVG to a single item, move the imported shapes to the origin (x = 0, y = shapes height).": "向单个项目导入 SVG 时，把导入的轮廓移动到原点（x=0，y=轮廓高度）。",
    "This will stop closing the window or tab with an \"Are you sure?\" message if you have unsaved changes.": "开启后，有未保存更改时关闭窗口或标签页将不再弹出“确定要离开吗？”提示。",
    "This setting should probably stay turned off, control characters can probably be safely ignored.": "建议保持关闭；控制字符通常可以安全忽略。",
    "You can toggle this setting directly on the edit canvas, next to the lower-right view controls.": "也可以在编辑画布右下角的视图控件旁直接切换此设置。",
    "This setting overrides the 'Move shapes when importing an SVG file' setting.": "此设置会覆盖“导入 SVG 文件时移动轮廓”的设置。",
    "In the item chooser, these empty items' names are shown in a green color.": "在项目选择菜单中，这些空白项目的名称会显示为绿色。",
    "Uncheck this option if don't want ligature data exported to fonts.": "如果不想把连字数据导出到字体，请取消选中。",
    "Uncheck this option if don't want kern data exported to fonts.": "如果不想把字距数据导出到字体，请取消选中。",
    "Add default Right Side Bearing when the first shape is added:": "添加第一个轮廓时使用默认右侧边距：",
    "This option can be toggled from the Quality control panel.": "此选项可在“质量检查”面板中切换。",
    "Add default Side Bearings when importing an SVG file:": "导入 SVG 文件时添加默认侧边距：",
    "Unlink component instances when deleting their root:": "删除组件根时解除组件实例链接：",
    "Auto‑save a copy of the project with each change:": "每次更改时自动保存项目副本：",
    "These settings adjust how the FFpro App behaves.": "这些设置控制 FFpro 应用的行为。",
    "Export items that were created, but not edited:": "导出已创建但未编辑的项目：",
    "Directly click and drag curves to edit them:": "直接点击拖动曲线进行编辑：",
    "Number of items to show in the item chooser:": "项目选择菜单中显示的项目数：",
    "Highlight points that are near other points:": "高亮彼此距离过近的点：",
    "Warn about unsaved changes on window close:": "关闭窗口时提醒未保存更改：",
    "Move shapes when importing an SVG file:": "导入 SVG 文件时移动轮廓：",
    "Show non‑graphic control characters:": "显示非图形控制字符：",
    "Highlight points with short handles:": "高亮控制柄过短的点：",
    "Set this value to -1 to disable it.": "设为 -1 可禁用此功能。",
    "Highlight points that are near x=0:": "高亮靠近 x=0 的点：",
    "Highlight points that are near y=0:": "高亮靠近 y=0 的点：",
    "Export Kern information to fonts:": "将字距信息导出到字体：",
    "Format project file for reading:": "格式化项目文件以便阅读：",
    "Delete all auto-saved backups:": "删除所有自动备份：",
    "Canvas display mode \"Filled\":": "画布显示模式为“填充”：",
    "Export Ligatures to fonts:": "将连字导出到字体：",
    "Project preview text:": "项目预览文本：",
    "Importing & exporting": "导入与导出",
    "Save live previews:": "保存实时预览文本：",
    "App preferences": "应用偏好",
    "Quality checks": "质量检查",
    "Visibility": "可见性",
    "Saving": "保存",
  };
  Object.assign(EXACT, EXTRA_ZH2);

  const PATTERNS = [
    [/^undo (\d+)$/i, "撤销 $1"],
    [/^redo (\d+)$/i, "重做 $1"],
    [/^(\d+) ranges selected$/i, "已选择 $1 个范围"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Jan (\d{1,2}) (\d{4})$/i, "1月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Feb (\d{1,2}) (\d{4})$/i, "2月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Mar (\d{1,2}) (\d{4})$/i, "3月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Apr (\d{1,2}) (\d{4})$/i, "4月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) May (\d{1,2}) (\d{4})$/i, "5月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Jun (\d{1,2}) (\d{4})$/i, "6月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Jul (\d{1,2}) (\d{4})$/i, "7月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Aug (\d{1,2}) (\d{4})$/i, "8月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Sep (\d{1,2}) (\d{4})$/i, "9月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Oct (\d{1,2}) (\d{4})$/i, "10月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Nov (\d{1,2}) (\d{4})$/i, "11月$1日 $2"],
    [/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) Dec (\d{1,2}) (\d{4})$/i, "12月$1日 $2"],
    [/^Version name:\s*(.+)$/i, "版本名称：$1"],
    [/^Version number:\s*(.+)$/i, "版本号：$1"],
    [/^Last updated on:\s*(.+)$/i, "最后更新：$1"],
    [/^Initially created with:\s*(.+)$/i, "创建版本：$1"],
    [/^Unique project ID:\s*(.+)$/i, "项目唯一 ID：$1"],
    [/^Version\s+(.+)$/i, "$1 版"],
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
      if (SKIP_TAGS.has(node.tagName)) {
        let allow = node.classList?.contains("value-type");
        if (!allow && node.tagName === "CODE") {
          const label = (node.textContent || "").replace(/\s+/g, " ").trim();
          allow =
            label.length > 0 &&
            label.length <= 48 &&
            (Object.prototype.hasOwnProperty.call(EXACT, label) ||
              LOWER.has(label.toLowerCase()));
        }
        if (!allow) return;
      }
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
        if (mutation.type === "characterData") {
          queue(mutation.target.parentElement || mutation.target);
        } else if (mutation.type === "attributes") {
          queue(mutation.target);
        } else {
          for (const node of mutation.addedNodes) queue(node);
        }
      }
    });
    observer.observe(root, {
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
      subtree: true,
    });
  }

  function queue(node) {
    // Process synchronously inside the MutationObserver microtask so newly
    // inserted page content is already Chinese before the browser paints it.
    if (node) processNode(node);
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

  setInterval(() => processRoot(document), 2500);

  setTimeout(() => processRoot(document), 300);
  setTimeout(() => processRoot(document), 1200);

  document.documentElement.lang = "zh-CN";
  if (document.title === "Glyphr Studio v2") {
    document.title = "FFpro · 字体设计";
  }

  window.__glyphrZhRescan = () => processRoot(document);
})();
