(() => {
  if (window.__ffproUiInstalled) return;
  window.__ffproUiInstalled = true;

  const locale = (
    window.__glyphrLocale ||
    navigator.language ||
    "en"
  ).toLowerCase();
  const isZh = locale.startsWith("zh");

  const T = isZh
    ? {
        workspace: "工作区",
        tools: "工具",
        more: "其他",
        overview: "概览",
        characters: "字符",
        ligatures: "连字",
        components: "组件",
        kerning: "字距",
        livePreview: "实时预览",
        globalActions: "全局操作",
        settings: "设置",
        help: "帮助",
        about: "关于",
        project: "当前项目",
        glyphs: "字形",
        properties: "属性",
        glyph: "字形",
        advance: "前进宽度",
        lsb: "左侧边距",
        rsb: "右侧边距",
        tool: "当前工具",
        align: "对齐",
        left: "左",
        hcenter: "中",
        right: "右",
        top: "上",
        vcenter: "中",
        bottom: "下",
        view: "视图",
        fit: "适应视图",
        actual: "100%",
        displayMode: "轮廓 / 填充",
        distributeH: "水平分布",
        distributeV: "垂直分布",
        transform: "变换",
        flipH: "水平翻转",
        flipV: "垂直翻转",
        rotateL: "左转 90°",
        rotateR: "右转 90°",
        reverse: "反转方向",
        round: "圆整坐标",
        move: "移动",
        scale: "缩放",
        apply: "应用",
        scalePercent: "百分比",
        pathOps: "路径处理",
        extrema: "添加极值点",
        simplify: "简化路径",
        boolOps: "布尔运算",
        union: "联合",
        subtract: "减去",
        intersect: "相交",
        exclude: "排除",
        divide: "分割",
        uniteAll: "全部联合",
        actions: "操作",
        preview: "预览字体",
        export: "导出",
        save: "保存项目",
        undo: "撤销",
        redo: "重做",
        start: "开始页",
        exit: "退出",
        aboutTitle: "关于 FontForgePro",
        noGlyph: "未选择",
        unnamed: "未命名",
        startTitle: "返回开始页（自动保存）",
        exitTitle: "退出 FontForgePro（自动保存）",
        exitDialogTitle: "退出 FontForgePro",
        exitDialogText: "是否保存当前项目后再退出？",
        exitDialogHint:
          "「保存并退出」会打开项目文件保存对话框；「不保存退出」会直接关闭 FontForgePro。",
        saveExit: "保存并退出",
        noSaveExit: "不保存退出",
        cancel: "取消",
        saving: "正在保存…",
        saveFailed: "保存失败，请重试或选择不保存退出。",
        pointHint: "左键拖动移动 · 右键路径加点",
        toolNames: {
          resize: "选择",
          pathEdit: "编辑路径",
          pathAddPoint: "添加路径点",
          newPath: "新建路径",
          newRectangle: "矩形",
          newOval: "椭圆",
          pan: "抓手",
          kern: "字距",
        },
      }
    : {
        workspace: "Workspace",
        tools: "Tools",
        more: "More",
        overview: "Overview",
        characters: "Characters",
        ligatures: "Ligatures",
        components: "Components",
        kerning: "Kerning",
        livePreview: "Live preview",
        globalActions: "Global actions",
        settings: "Settings",
        help: "Help",
        about: "About",
        project: "Current project",
        glyphs: "glyphs",
        properties: "Properties",
        glyph: "Glyph",
        advance: "Advance",
        lsb: "Left bearing",
        rsb: "Right bearing",
        tool: "Current tool",
        align: "Align",
        left: "L",
        hcenter: "C",
        right: "R",
        top: "T",
        vcenter: "M",
        bottom: "B",
        view: "View",
        fit: "Fit view",
        actual: "100%",
        displayMode: "Outline / Fill",
        distributeH: "Distribute H",
        distributeV: "Distribute V",
        transform: "Transform",
        flipH: "Flip H",
        flipV: "Flip V",
        rotateL: "Rotate −90°",
        rotateR: "Rotate +90°",
        reverse: "Reverse direction",
        round: "Round coordinates",
        move: "Move",
        scale: "Scale",
        apply: "Apply",
        scalePercent: "Percent",
        pathOps: "Path operations",
        extrema: "Add extrema",
        simplify: "Simplify",
        boolOps: "Boolean",
        union: "Union",
        subtract: "Subtract",
        intersect: "Intersect",
        exclude: "Exclude",
        divide: "Divide",
        uniteAll: "Unite all",
        actions: "Actions",
        preview: "Preview font",
        export: "Export",
        save: "Save project",
        undo: "Undo",
        redo: "Redo",
        start: "Start",
        exit: "Exit",
        aboutTitle: "About FontForgePro",
        noGlyph: "None",
        unnamed: "Untitled",
        startTitle: "Back to start (auto-save)",
        exitTitle: "Quit FontForgePro (auto-save)",
        exitDialogTitle: "Quit FontForgePro",
        exitDialogText: "Save the current project before quitting?",
        exitDialogHint:
          "Save and quit opens the project file save dialog. Quit without saving closes FontForgePro immediately.",
        saveExit: "Save and quit",
        noSaveExit: "Quit without saving",
        cancel: "Cancel",
        saving: "Saving…",
        saveFailed: "Save failed. Try again, or quit without saving.",
        pointHint: "Drag to move · Right-click a path to add a point",
        toolNames: {
          resize: "Select",
          pathEdit: "Edit path",
          pathAddPoint: "Add path point",
          newPath: "New path",
          newRectangle: "Rectangle",
          newOval: "Oval",
          pan: "Hand",
          kern: "Kerning",
        },
      };

  const EDITOR_PAGES = new Set([
    "Characters",
    "Ligatures",
    "Components",
    "Kerning",
  ]);

  const NAV_ICONS = {
    overview:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/></svg>',
    characters:
      '<svg viewBox="0 0 24 24"><text x="12" y="18" text-anchor="middle" font-family="Segoe UI,sans-serif" font-size="16" font-weight="700" fill="currentColor">A</text></svg>',
    ligatures:
      '<svg viewBox="0 0 24 24"><text x="12" y="18" text-anchor="middle" font-family="Segoe UI,sans-serif" font-size="14" font-weight="700" fill="currentColor">fi</text></svg>',
    components:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3.5 20.5 12 12 20.5 3.5 12Z"/><path d="M8 12h8M12 8v8"/></svg>',
    kerning:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3.5 12h17M6.5 8.5 3 12l3.5 3.5M17.5 8.5 21 12l-3.5 3.5"/></svg>',
    preview:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 4.5 19 12 7 19.5Z"/></svg>',
    actions:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 2.5 4.5 13H11l-1 8.5L19 10h-6.5Z"/></svg>',
    settings:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3.1"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"/></svg>',
    help:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.3a2.7 2.7 0 1 1 4.4 2.1c-1.1.8-1.9 1.3-1.9 2.7"/><circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none"/></svg>',
    about:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M12 10.5v5"/><circle cx="12" cy="7.7" r=".9" fill="currentColor" stroke="none"/></svg>',
  };

  const TOP_ICONS = {
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 7 4.5 11.5 9 16"/><path d="M4.5 11.5H14a5 5 0 0 1 0 10h-2"/></svg>',
    redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 7 4.5 4.5L15 16"/><path d="M19.5 11.5H10a5 5 0 0 0 0 10h2"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3.5h11l3 3v14H5Z"/><path d="M8 3.5v5h7v-5M8 20.5v-6h8v6"/></svg>',
    preview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4.5 19 12 7 19.5Z"/></svg>',
    export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3.5v11M8 10.5l4 4 4-4M4.5 19.5h15"/></svg>',
  };

  const TOOLS = [
    { id: "resize", title: "Resize", hint: "V", fallback: "↖" },
    { id: "pathEdit", title: "Path edit", hint: "P", fallback: "✎" },
    { id: "pathAddPoint", title: "Add path point", hint: "U", fallback: "＋" },
    { id: "newPath", title: "New path", hint: "H", fallback: "✒" },
    { id: "newRectangle", title: "New rectangle", hint: "R", fallback: "▭" },
    { id: "newOval", title: "New oval", hint: "O", fallback: "◯" },
    { id: "pan", title: "Pan the edit canvas", hint: "SPC", fallback: "✋" },
  ];

  const NATIVE_TOOL_TITLES = {
    resize: ["Resize", "调整大小"],
    pathEdit: ["Path edit", "路径编辑"],
    pathAddPoint: ["Add path point", "添加路径点"],
    newPath: ["New path", "新建路径"],
    newRectangle: ["New rectangle", "新建矩形"],
    newOval: ["New oval", "新建椭圆"],
    pan: ["Pan the edit canvas"],
  };

  function selectToolById(id) {
    const titles = NATIVE_TOOL_TITLES[id] || [];
    const buttons = [...document.querySelectorAll("button.editor-page__tool")];
    for (const title of titles) {
      const source = buttons.find((button) => button.title === title);
      if (source) {
        source.click();
        return true;
      }
    }
    const editor = getEditor();
    if (editor) {
      editor.selectedTool = id;
      editor.publish("whichToolIsSelected", id);
    }
    return false;
  }

  const TOOL_ICONS = {
    resize:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 8-6.2 1.4L9.5 19z"/></svg>',
    pathEdit:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 7-7 11-7-11z"/><circle cx="12" cy="10" r="2"/></svg>',
    pathAddPoint:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 16 8l3 3L8 22H5z"/><path d="M14 10l3 3"/><path d="M19 3.5v6M16 6.5h6"/></svg>',
    newPath:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 9 5l7 9 4-3-2 9z"/><circle cx="9" cy="5" r="1.6" fill="currentColor" stroke="none"/><circle cx="16" cy="14" r="1.6" fill="currentColor" stroke="none"/><circle cx="20" cy="11" r="1.6" fill="currentColor" stroke="none"/></svg>',
    newRectangle:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="14" rx="2"/></svg>',
    newOval:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="12" rx="7.5" ry="8.5"/></svg>',
    pan:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M8 7l4-4 4 4M8 17l4 4 4-4M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>',
  };

  const ALIGN_BUTTONS = [
    ["left", "Align Shapes Left", "left"],
    ["hcenter", "Align Shapes Center", "hcenter"],
    ["right", "Align Shapes Right", "right"],
    ["top", "Align Shapes Top", "top"],
    ["vcenter", "Align Shapes Middle", "vcenter"],
    ["bottom", "Align Shapes Bottom", "bottom"],
  ];

  function make(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function getEditor() {
    const app = window._GlyphrStudioApp;
    return app && app.selectedProjectEditor;
  }

  function isStartPage() {
    const page = document.getElementById("open-project__page");
    return !!page && page.getClientRects().length > 0;
  }

  function isTypingTarget(target) {
    if (!target || !target.tagName) return false;
    return (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable
    );
  }

  function dispatchShortcut(key) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Control",
        bubbles: true,
        cancelable: true,
      }),
    );
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    document.dispatchEvent(
      new KeyboardEvent("keyup", {
        key,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    document.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: "Control",
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  function saveProjectSilently() {
    try {
      const app = window._GlyphrStudioApp;
      if (app && typeof app.addAutoSaveState === "function") {
        app.addAutoSaveState();
      }
    } catch {
      // ignore auto-save errors
    }
  }

  function goToStart() {
    saveProjectSilently();
    try {
      window.onbeforeunload = null;
    } catch {
      // ignore
    }
    if (window.ffpro?.reload) window.ffpro.reload();
    else window.location.reload();
  }

  function quitApp() {
    saveProjectSilently();
    if (window.ffpro?.quit) window.ffpro.quit();
    else window.close();
  }

  let exitDialog = null;
  let exitSaving = false;

  function confirmCloseApp() {
    if (window.ffpro && typeof window.ffpro.confirmClose === "function") {
      window.ffpro.confirmClose();
    } else {
      window.close();
    }
  }

  function discardAndExit() {
    try {
      const app = window._GlyphrStudioApp;
      const editor = getEditor();
      const projectID = editor?.project?.settings?.project?.id;
      if (app && projectID && typeof app.getLocalStorage === "function") {
        const data = app.getLocalStorage() || {};
        if (data.autoSaves && data.autoSaves[projectID]) {
          delete data.autoSaves[projectID];
          app.setLocalStorage("autoSaves", data.autoSaves);
        }
      }
    } catch (error) {
      console.warn("[FFpro] discard auto-save failed", error);
    }
    confirmCloseApp();
  }

  function buildExitDialog() {
    exitDialog = make("div", "", "");
    exitDialog.id = "ffpro-exit-dialog";
    exitDialog.innerHTML = `
      <div class="ffpro-exit-panel">
        <h2>${T.exitDialogTitle}</h2>
        <p class="ffpro-exit-text">${T.exitDialogText}</p>
        <p class="ffpro-exit-hint">${T.exitDialogHint}</p>
        <div class="ffpro-exit-actions">
          <button type="button" class="primary" data-exit="save">${T.saveExit}</button>
          <button type="button" class="danger" data-exit="discard">${T.noSaveExit}</button>
        </div>
        <button type="button" class="ffpro-exit-cancel" data-exit="cancel">${T.cancel}</button>
        <div class="ffpro-exit-status"></div>
      </div>
    `;
    exitDialog.addEventListener("click", (event) => {
      if (event.target === exitDialog) hideExitDialog();
    });
    document.body.appendChild(exitDialog);
    exitDialog
      .querySelector('[data-exit="save"]')
      .addEventListener("click", () => saveAndExit());
    exitDialog
      .querySelector('[data-exit="discard"]')
      .addEventListener("click", discardAndExit);
    exitDialog
      .querySelector('[data-exit="cancel"]')
      .addEventListener("click", hideExitDialog);
    return exitDialog;
  }

  function showExitDialog() {
    if (exitSaving) return;
    const editor = getEditor();
    if (isStartPage() || !editor) {
      confirmCloseApp();
      return;
    }
    try {
      window.onbeforeunload = null;
    } catch {
      // ignore
    }
    const dialog = exitDialog || buildExitDialog();
    dialog.setAttribute("open", "");
    const status = dialog.querySelector(".ffpro-exit-status");
    if (status) status.textContent = "";
    for (const button of dialog.querySelectorAll("button")) {
      button.disabled = false;
    }
    const saveButton = dialog.querySelector('[data-exit="save"]');
    if (saveButton) saveButton.textContent = T.saveExit;
  }

  function hideExitDialog() {
    if (exitDialog) exitDialog.removeAttribute("open");
  }

  async function saveAndExit() {
    const dialog = exitDialog || buildExitDialog();
    const editor = getEditor();
    if (!editor || typeof editor.saveProjectFile !== "function") {
      saveProjectSilently();
      confirmCloseApp();
      return;
    }

    const buttons = [...dialog.querySelectorAll("button")];
    const saveButton = dialog.querySelector('[data-exit="save"]');
    const status = dialog.querySelector(".ffpro-exit-status");
    exitSaving = true;
    buttons.forEach((button) => {
      button.disabled = true;
    });
    if (saveButton) saveButton.textContent = T.saving;
    if (status) status.textContent = "";

    try {
      await editor.saveProjectFile();
      saveProjectSilently();
      confirmCloseApp();
    } catch (error) {
      console.error("[FFpro] save before exit failed", error);
      exitSaving = false;
      buttons.forEach((button) => {
        button.disabled = false;
      });
      if (saveButton) saveButton.textContent = T.saveExit;
      if (status) {
        status.textContent =
          error && error.name === "AbortError" ? "" : T.saveFailed;
      }
    }
  }

  function showAbout() {
    if (typeof window.__clairShowAbout === "function") {
      window.__clairShowAbout();
    }
  }

  const HELP_TOPICS = isZh
    ? [
        {
          id: "quick",
          label: "快速开始",
          title: "快速开始",
          html: `
            <p>FontForgePro（简称 FFpro）是本地离线字体编辑器。下面这套教程已经内置在应用里，不需要联网。</p>
            <h2>第一次使用</h2>
            <ol>
              <li>在开始页点「载入 FFpro Starter」，得到一套可编辑的拉丁练习字体；也可以新建空项目。</li>
              <li>进入左侧「字符」，点一个字形的卡片开始编辑。</li>
              <li>工具轨选择「编辑路径」(P)，鼠标靠近顶点会出现白色方块；按住拖动即可移动，右键路径可以加点。</li>
              <li>右侧属性栏可改前进宽度、边距、对齐、变换和布尔运算；点「专业」打开图层、历史、参考线等面板。</li>
              <li>完成后用「预览字体」检查，再点「导出」选择 TTF / OTF / WOFF / SVG。</li>
            </ol>
            <p class="ffpro-help-note">建议先保存项目。开始页、退出和自动备份都会保留当前项目。</p>
          `,
        },
        {
          id: "interface",
          label: "界面与工具",
          title: "界面与工具",
          html: `
            <h2>左侧导航</h2>
            <p>概览看项目信息；字符、连字、组件、字距是编辑页；实时预览、全局操作、设置、帮助、关于在下方。</p>
            <h2>工具轨</h2>
            <table class="ffpro-help-table">
              <tr><td><kbd>V</kbd></td><td>选择 / 调整大小</td></tr>
              <tr><td><kbd>P</kbd></td><td>编辑路径（拖动顶点/控制柄，右键加点）</td></tr>
              <tr><td><kbd>U</kbd></td><td>添加路径点</td></tr>
              <tr><td><kbd>H</kbd></td><td>新建路径</td></tr>
              <tr><td><kbd>R</kbd></td><td>矩形</td></tr>
              <tr><td><kbd>O</kbd></td><td>椭圆</td></tr>
              <tr><td><kbd>Space</kbd></td><td>临时抓手，拖动平移画布</td></tr>
            </table>
            <h2>属性栏</h2>
            <p>修改前进宽度和左右边距；按多个路径或顶点对齐、分布；做翻转、旋转、移动、缩放；执行极值点、简化、布尔运算；切换轮廓/填充和缩放。</p>
            <h2>专业面板</h2>
            <p>属性、图层、变换、历史、参考线、质量检查、字符信息、上下文字符。图层箭头可以调路径前后顺序。</p>
          `,
        },
        {
          id: "points",
          label: "编辑顶点",
          title: "编辑顶点与曲线",
          html: `
            <p>鼠标靠近路径时，会显示整条路径的顶点、控制柄和最近点高亮。顶点是白色方块，控制柄是黑色圆点。</p>
            <h2>拖动</h2>
            <ul>
              <li>在顶点周围 24px 内按下就能抓住它；开始移动时顶点会吸附到指针下方，随后 1:1 跟随，松开鼠标立即停止。</li>
              <li>拖动白色方块：移动锚点，两个控制柄会一起移动。</li>
              <li>拖动黑色圆点：调整曲线控制柄。</li>
            </ul>
            <h2>加点与删点</h2>
            <ul>
              <li><b>右键路径</b>：在离鼠标最近的位置插入新顶点。</li>
              <li><b>右键顶点</b>：只选中该顶点，不会叠加新点。</li>
              <li><kbd>Delete</kbd> / <kbd>Backspace</kbd>：删除选中的顶点。</li>
              <li><kbd>U</kbd>：切换到「添加路径点」工具，点路径也能加点。</li>
            </ul>
            <p class="ffpro-help-note">按住 Shift 拖动时，Glyphr 会尝试锁定水平或垂直方向。</p>
          `,
        },
        {
          id: "transform",
          label: "变换与路径",
          title: "变换与路径处理",
          html: `
            <h2>变换</h2>
            <ul>
              <li><b>水平翻转 / 垂直翻转</b>：以当前选区中心翻转。</li>
              <li><b>左转 / 右转 90°</b>：整体旋转，保持形状比例。</li>
              <li><b>反转方向</b>：交换路径绕向，可用于修正镂空区域的填充。</li>
              <li><b>圆整坐标</b>：把路径点坐标四舍五入到整数。</li>
              <li><b>移动</b>：输入 X / Y 偏移后应用。</li>
              <li><b>缩放</b>：输入百分比后应用；100% 保持原大小。</li>
            </ul>
            <p>对齐按钮支持左、中、右、上、中、下；水平/垂直分布需要选中 3 个以上路径。</p>
            <h2>路径处理</h2>
            <ul>
              <li><b>添加极值点</b>：在曲线的水平/垂直极值处插入顶点，方便后续调整和保证轮廓质量。</li>
              <li><b>简化路径</b>：合并多余的共线直线点，减少节点数量。</li>
            </ul>
          `,
        },
        {
          id: "boolean",
          label: "布尔运算",
          title: "布尔运算",
          html: `
            <p>在图层或画布中用 Ctrl 点选两个以上路径，然后在右侧「布尔运算」区选择操作：</p>
            <ul>
              <li><b>联合</b>：把多个轮廓合并成一个。</li>
              <li><b>减去</b>：用最上层路径切掉下层部分。</li>
              <li><b>相交</b>：只保留重叠区域。</li>
              <li><b>排除</b>：只保留不重叠的区域。</li>
              <li><b>分割</b>：按重叠边缘切开路径。</li>
              <li><b>全部联合</b>：合并当前字形的所有轮廓，常用于“去除重叠”。</li>
            </ul>
            <p class="ffpro-help-note">布尔结果是新路径；如果不满意，可以用 Ctrl+Z 撤销。</p>
          `,
        },
        {
          id: "components",
          label: "组件 / 连字 / 字距",
          title: "组件、连字与字距",
          html: `
            <h2>组件</h2>
            <p>组件是可重复使用的路径集合。设计一次组件根，再把它作为组件实例放进许多字形；修改根组件会同步更新所有实例。适合重音符号、公共部件。</p>
            <h2>连字</h2>
            <p>连字把两个或多个字符的组合替换成一个新字形，例如 fi、ffi、st。连字页可以创建连字并指定字符序列。</p>
            <h2>字距</h2>
            <p>字距调整字符对之间的距离，例如 AV、To。可以逐对调整，也可以按左右边缘相似的字符组批量设置。</p>
            <p class="ffpro-help-note">组件、连字和字距都会随字体一起导出；可在设置 → 应用里关闭对应导出选项。</p>
          `,
        },
        {
          id: "export",
          label: "预览与导出",
          title: "预览、保存与导出",
          html: `
            <h2>预览字体</h2>
            <p>右侧「预览字体」会用当前项目直接渲染，不需要先导出。默认显示一句全字母句，可以修改文本、随机名言或切换字母表，并同时查看 12 到 72px 八种字号。</p>
            <h2>保存与导出</h2>
            <ul>
              <li><b>保存项目</b>：保存为 .gs2 项目文件，之后还能继续编辑。</li>
              <li><b>导出</b>：生成 TTF / OTF / WOFF / SVG 字体文件，会弹出 Windows 保存对话框。</li>
              <li><b>开始页 / 退出</b>：会先自动保存备份，再回到开始页或关闭程序。</li>
            </ul>
            <h2>安装到系统</h2>
            <p>导出后建议先用脚本或字体工具修改字体家族名，避免和系统字体冲突；然后右键字体文件选择“安装”，或拖进 Windows 设置 → 字体。安装后重启常用软件。</p>
            <h2>备份位置</h2>
            <p>自动备份保存在 <code>%APPDATA%\\FFpro</code>；开始页的「恢复」标签可以找回。项目本身建议另存到自己的工作目录。</p>
          `,
        },
        {
          id: "shortcuts",
          label: "快捷键",
          title: "快捷键与鼠标操作",
          html: `
            <table class="ffpro-help-table">
              <tr><td><kbd>V</kbd> / <kbd>A</kbd></td><td>选择工具</td></tr>
              <tr><td><kbd>P</kbd> / <kbd>B</kbd></td><td>编辑路径</td></tr>
              <tr><td><kbd>U</kbd> / <kbd>E</kbd></td><td>添加路径点</td></tr>
              <tr><td><kbd>H</kbd> / <kbd>W</kbd></td><td>新建路径</td></tr>
              <tr><td><kbd>R</kbd> / <kbd>M</kbd></td><td>矩形</td></tr>
              <tr><td><kbd>O</kbd> / <kbd>Q</kbd></td><td>椭圆</td></tr>
              <tr><td><kbd>Space</kbd></td><td>临时抓手 / 平移</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>Z</kbd></td><td>撤销</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>Y</kbd></td><td>重做</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>S</kbd></td><td>保存项目</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>E</kbd></td><td>导出</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>0</kbd></td><td>适应视图</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>1</kbd></td><td>100% 缩放</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>+</kbd> / <kbd>-</kbd></td><td>放大 / 缩小</td></tr>
              <tr><td><kbd>Delete</kbd> / <kbd>Backspace</kbd></td><td>删除选中点或路径</td></tr>
              <tr><td><kbd>方向键</kbd></td><td>微调选中对象</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>V</kbd></td><td>复制 / 粘贴路径</td></tr>
              <tr><td><kbd>[</kbd> / <kbd>]</kbd></td><td>路径图层下移 / 上移</td></tr>
            </table>
            <p class="ffpro-help-note">鼠标：顶点附近按住拖动；右键路径加点；右键顶点只选中；滚轮缩放；空格+拖动平移。</p>
          `,
        },
        {
          id: "faq",
          label: "常见问题",
          title: "常见问题",
          html: `
            <h3>顶点拖不动或跟不上鼠标？</h3>
            <p>确认当前在「字符」「组件」或「连字」页，工具为编辑路径。当前版本会在顶点 24px 内按下时吸附顶点到指针并 1:1 跟随；如果仍异常，请完全退出 FFpro 再打开。</p>
            <h3>字体看起来模糊？</h3>
            <p>画布会按 Windows 显示缩放自动提高分辨率；如果使用远程桌面或缩放比例特殊，可以尝试把窗口最大化或重启应用。</p>
            <h3>导出的字体在哪里？</h3>
            <p>导出时会弹出 Windows 保存对话框，选择的位置就是输出位置。项目文件用「保存项目」另存。</p>
            <h3>安装字体后软件里找不到？</h3>
            <p>先修改字体家族名和样式名，避免与已有字体同名；安装后重启使用该字体的软件。Windows 设置 → 字体可以查看是否安装成功。</p>
            <h3>界面语言怎么切换？</h3>
            <p>跟随 Windows 系统语言：中文系统显示中文，其他语言显示英文。调试时可用环境变量 <code>GLYPHR_LOCALE=en-US</code> 强制英文。</p>
            <h3>数据保存在哪里？</h3>
            <p>项目文件由你自己选择位置；自动备份在 <code>%APPDATA%\\FFpro</code>。开始页「恢复」可以读取自动备份。</p>
            <h3>为什么关于页有一句 Glyphr Studio？</h3>
            <p>FFpro 基于 Glyphr Studio 2.10.0 构建，GPL-3.0 许可要求保留来源说明；普通界面不再显示原项目品牌。</p>
          `,
        },
      ]
    : [
        {
          id: "quick",
          label: "Quick start",
          title: "Quick start",
          html: `
            <p>FontForgePro (FFpro) is a local, offline font editor. All tutorials are bundled locally.</p>
            <ol>
              <li>On the start page choose <b>Load FFpro Starter</b> for an editable Latin practice font, or create an empty project.</li>
              <li>Open <b>Characters</b> and pick a glyph tile.</li>
              <li>Choose <b>Path edit</b> (P), hover a vertex, then drag it. Right-click a path to add a point.</li>
              <li>Use the inspector for metrics, alignment, transforms and boolean operations; open <b>Expert</b> for layers, history and guides.</li>
              <li>Check with <b>Preview font</b>, then <b>Export</b> to TTF / OTF / WOFF / SVG.</li>
            </ol>
            <p class="ffpro-help-note">Save the project regularly. Auto-save backups are kept for the start page and exit flow.</p>
          `,
        },
        {
          id: "interface",
          label: "Interface & tools",
          title: "Interface and tools",
          html: `
            <h2>Navigation</h2>
            <p>Overview shows project info. Characters, Ligatures, Components and Kerning are editing pages. Live preview, Global actions, Settings, Help and About are below.</p>
            <h2>Tools</h2>
            <table class="ffpro-help-table">
              <tr><td><kbd>V</kbd></td><td>Select / resize</td></tr>
              <tr><td><kbd>P</kbd></td><td>Path edit: drag points and handles, right-click to add</td></tr>
              <tr><td><kbd>U</kbd></td><td>Add path point</td></tr>
              <tr><td><kbd>H</kbd></td><td>New path</td></tr>
              <tr><td><kbd>R</kbd></td><td>Rectangle</td></tr>
              <tr><td><kbd>O</kbd></td><td>Oval</td></tr>
              <tr><td><kbd>Space</kbd></td><td>Temporary hand tool / pan</td></tr>
            </table>
            <h2>Inspector and Expert panel</h2>
            <p>The inspector edits advance width, side bearings, alignment, transforms, point operations, booleans and view mode. The Expert panel exposes attributes, layers, transforms, history, guides, quality checks, character info and context characters.</p>
          `,
        },
        {
          id: "points",
          label: "Edit points",
          title: "Edit points and curves",
          html: `
            <p>Hover a path to reveal its vertices and handles. Vertices are white squares; handles are black dots.</p>
            <ul>
              <li>Press within 24px of a vertex. On the first movement the vertex snaps under the pointer and then follows 1:1 until you release the mouse.</li>
              <li>Drag a white square to move the anchor and its handles.</li>
              <li>Drag a black dot to adjust a curve handle.</li>
              <li>Right-click a path to insert a point; right-click a vertex to select it.</li>
              <li>Delete / Backspace removes selected points. U switches to the add-point tool.</li>
            </ul>
          `,
        },
        {
          id: "transform",
          label: "Transforms & paths",
          title: "Transforms and path operations",
          html: `
            <p>Flip horizontally or vertically, rotate ±90°, reverse direction, round coordinates, move by X/Y, or scale by a percentage. Align and distribute work on multiple selected paths or points.</p>
            <p><b>Add extrema</b> inserts vertices at horizontal/vertical curve extremes. <b>Simplify</b> merges redundant collinear points.</p>
          `,
        },
        {
          id: "boolean",
          label: "Boolean",
          title: "Boolean operations",
          html: `
            <p>Select two or more paths (Ctrl-click in Layers or on the canvas), then use Union, Subtract, Intersect, Exclude, Divide, or Unite all.</p>
            <p>Subtract cuts lower shapes with the topmost shape. Unite all merges every contour of the glyph, useful as “remove overlap”.</p>
          `,
        },
        {
          id: "components",
          label: "Components / ligatures / kerning",
          title: "Components, ligatures and kerning",
          html: `
            <p><b>Components</b> reuse a collection of paths across glyphs. Editing the root updates every instance.</p>
            <p><b>Ligatures</b> replace a character sequence such as fi or ffi with a custom glyph.</p>
            <p><b>Kerning</b> adjusts spacing for character pairs, either individually or through class-based groups.</p>
          `,
        },
        {
          id: "export",
          label: "Preview & export",
          title: "Preview, save and export",
          html: `
            <p>Preview font renders the current project at eight sizes without exporting first.</p>
            <p>Save project writes a .gs2 editable file. Export writes TTF / OTF / WOFF / SVG through a Windows save dialog.</p>
            <p>Before installing a font, rename its family and style to avoid conflicts, then install through Windows Settings → Fonts and restart apps that use it.</p>
            <p>Auto-save backups live in <code>%APPDATA%\\FFpro</code> and can be restored from the start page.</p>
          `,
        },
        {
          id: "shortcuts",
          label: "Shortcuts",
          title: "Keyboard and mouse",
          html: `
            <table class="ffpro-help-table">
              <tr><td><kbd>V</kbd> / <kbd>A</kbd></td><td>Select</td></tr>
              <tr><td><kbd>P</kbd> / <kbd>B</kbd></td><td>Path edit</td></tr>
              <tr><td><kbd>U</kbd> / <kbd>E</kbd></td><td>Add path point</td></tr>
              <tr><td><kbd>H</kbd> / <kbd>W</kbd></td><td>New path</td></tr>
              <tr><td><kbd>R</kbd> / <kbd>M</kbd></td><td>Rectangle</td></tr>
              <tr><td><kbd>O</kbd> / <kbd>Q</kbd></td><td>Oval</td></tr>
              <tr><td><kbd>Space</kbd></td><td>Temporary pan</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Y</kbd></td><td>Undo / redo</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>S</kbd> / <kbd>E</kbd></td><td>Save / export</td></tr>
              <tr><td><kbd>Ctrl</kbd>+<kbd>0</kbd> / <kbd>1</kbd></td><td>Fit view / 100%</td></tr>
              <tr><td><kbd>Delete</kbd></td><td>Delete selected</td></tr>
              <tr><td><kbd>[</kbd> / <kbd>]</kbd></td><td>Move layer down / up</td></tr>
            </table>
          `,
        },
        {
          id: "faq",
          label: "FAQ",
          title: "Frequently asked questions",
          html: `
            <h3>Vertices do not follow the pointer?</h3>
            <p>Make sure you are on Characters, Components or Ligatures with Path edit active. This build snaps the vertex under the pointer within a 24px hit area and follows 1:1 until release. Restart FFpro after updating.</p>
            <h3>Where are exported fonts?</h3>
            <p>Export opens a Windows save dialog; the chosen path is the output. Project files are saved separately with Save project.</p>
            <h3>Where are backups?</h3>
            <p>Auto-save data is stored in <code>%APPDATA%\\FFpro</code> and can be restored from the start page.</p>
            <h3>Why does About mention Glyphr Studio?</h3>
            <p>FFpro is based on Glyphr Studio 2.10.0 and GPL-3.0 requires the source notice. The rest of the interface does not show the original brand.</p>
          `,
        },
      ];

  let helpOverlay = null;
  let helpActiveTopic = "quick";

  function renderHelpTopic(topicId) {
    if (!helpOverlay) return;
    const topics = HELP_TOPICS;
    const topic = topics.find((item) => item.id === topicId) || topics[0];
    helpActiveTopic = topic.id;
    helpOverlay.querySelectorAll(".ffpro-help-topic").forEach((button) => {
      button.dataset.active =
        button.dataset.topic === topic.id ? "true" : "false";
    });
    const title = helpOverlay.querySelector("#ffpro-help-title");
    const body = helpOverlay.querySelector("#ffpro-help-body");
    if (title) title.textContent = topic.title;
    if (body) body.innerHTML = topic.html;
    const main = helpOverlay.querySelector(".ffpro-help-main");
    if (main) main.scrollTop = 0;
  }

  function buildHelpOverlay() {
    helpOverlay = make("div", "", "");
    helpOverlay.id = "ffpro-help-overlay";
    helpOverlay.innerHTML = `
      <div class="ffpro-help-card">
        <aside class="ffpro-help-side">
          <h2>${isZh ? "帮助与教程" : "Help & tutorials"}</h2>
          <div class="ffpro-help-sub">${isZh ? "全部内容本地内置 · 无需联网" : "Bundled locally · no network required"}</div>
          ${HELP_TOPICS.map(
            (topic) =>
              `<button type="button" class="ffpro-help-topic" data-topic="${topic.id}">${topic.label}</button>`,
          ).join("")}
        </aside>
        <section class="ffpro-help-main">
          <div class="ffpro-help-head">
            <h1 id="ffpro-help-title"></h1>
            <button type="button" class="ffpro-help-close" id="ffpro-help-close">${isZh ? "关闭" : "Close"}</button>
          </div>
          <div id="ffpro-help-body"></div>
        </section>
      </div>
    `;
    helpOverlay.addEventListener("click", (event) => {
      if (event.target === helpOverlay) closeHelp();
    });
    helpOverlay.querySelector("#ffpro-help-close").addEventListener("click", closeHelp);
    helpOverlay.querySelectorAll(".ffpro-help-topic").forEach((button) => {
      button.addEventListener("click", () => renderHelpTopic(button.dataset.topic));
    });
    document.body.appendChild(helpOverlay);
    renderHelpTopic(helpActiveTopic);
    return helpOverlay;
  }

  function openHelp(topicId) {
    const overlay = helpOverlay || buildHelpOverlay();
    overlay.setAttribute("open", "");
    if (topicId) renderHelpTopic(topicId);
  }

  function closeHelp() {
    if (helpOverlay) helpOverlay.removeAttribute("open");
  }

  function logoMarkup(
    prefix = "ffpro-ui",
    className = "ffpro-top-logo",
    shape = "square",
  ) {
    if (typeof window.__clairLogoSvg === "function") {
      return window.__clairLogoSvg(prefix, className, shape);
    }
    return '<span class="ffpro-top-logo-fallback">FF</span>';
  }

  function topButton(label, title, icon, handler, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `ffpro-tb-btn${className ? " " + className : ""}`;
    button.title = title;
    button.innerHTML = `${icon || ""}${label ? `<span>${label}</span>` : ""}`;
    button.addEventListener("click", handler);
    return button;
  }

  function buildTopBar() {
    const top = make("div", "", "");
    top.id = "ffpro-topbar";
    top.innerHTML = `
      <div class="ffpro-brand">${logoMarkup()}<span class="ffpro-brand-name">FontForgePro</span></div>
      <div class="ffpro-project">
        <div class="ffpro-project-name" id="ffpro-project-name">—</div>
        <div class="ffpro-project-meta" id="ffpro-project-meta"></div>
      </div>
      <div class="ffpro-tb-actions">
        <button type="button" class="ffpro-tb-icon" id="ffpro-undo" title="${T.undo}">${TOP_ICONS.undo}</button>
        <button type="button" class="ffpro-tb-icon" id="ffpro-redo" title="${T.redo}">${TOP_ICONS.redo}</button>
        <button type="button" class="ffpro-tb-icon" id="ffpro-save" title="${T.save}">${TOP_ICONS.save}</button>
        <span class="ffpro-tb-sep"></span>
        <button type="button" class="ffpro-tb-btn" id="ffpro-preview">${TOP_ICONS.preview}<span>${T.preview}</span></button>
        <button type="button" class="ffpro-tb-btn" id="ffpro-export">${TOP_ICONS.export}<span>${T.export}</span></button>
        <span class="ffpro-tb-sep"></span>
        <button type="button" class="ffpro-tb-btn" id="ffpro-start" title="${T.startTitle}">${T.start}</button>
        <button type="button" class="ffpro-tb-btn" id="ffpro-exit" title="${T.exitTitle}">${T.exit}</button>
        <button type="button" class="ffpro-tb-icon" id="ffpro-about" title="${T.aboutTitle}">${NAV_ICONS.about}</button>
      </div>
    `;
    top.querySelector("#ffpro-undo").addEventListener("click", () =>
      dispatchShortcut("z"),
    );
    top.querySelector("#ffpro-redo").addEventListener("click", () =>
      dispatchShortcut("y"),
    );
    top.querySelector("#ffpro-save").addEventListener("click", () =>
      dispatchShortcut("s"),
    );
    top.querySelector("#ffpro-preview").addEventListener("click", () => {
      if (typeof window.__glyphrOpenPreview === "function") {
        window.__glyphrOpenPreview();
      }
    });
    top.querySelector("#ffpro-export").addEventListener("click", () =>
      dispatchShortcut("e"),
    );
    top.querySelector("#ffpro-start").addEventListener("click", goToStart);
    top.querySelector("#ffpro-exit").addEventListener("click", showExitDialog);
    top.querySelector("#ffpro-about").addEventListener("click", showAbout);
    return top;
  }

  function buildSidebar() {
    const side = make("div", "", "");
    side.id = "ffpro-sidebar";
    side.innerHTML = `
      <div class="ffpro-side-brand">
        ${logoMarkup("ffpro-side", "ffpro-side-logo", "portrait")}
        <div class="ffpro-side-brand-text">
          <div class="ffpro-side-name">FontForgePro</div>
          <div class="ffpro-side-sub">${isZh ? "字体编辑器" : "FONT EDITOR"}</div>
        </div>
        <svg class="ffpro-cursor-mark" viewBox="0 0 91 133" aria-hidden="true">
          <path d="M0 0L0 132.5L32.5704 81.5316L90.5 96L0 0Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="ffpro-project-card">
        <div class="ffpro-project-label">${T.project}</div>
        <div class="ffpro-project-title" id="ffpro-side-project">—</div>
        <div class="ffpro-project-sub" id="ffpro-side-meta"></div>
      </div>
      <div class="ffpro-nav" id="ffpro-nav"></div>
      <div class="ffpro-side-footer">
        <div class="ffpro-side-primary">
          <button type="button" class="ffpro-pill ffpro-pill-primary" id="ffpro-side-save">${T.save}</button>
          <button type="button" class="ffpro-pill ffpro-pill-secondary" id="ffpro-side-export">${T.export}</button>
        </div>
        <div class="ffpro-side-utils">
          <button type="button" title="${T.undo}" id="ffpro-side-undo">${TOP_ICONS.undo}</button>
          <button type="button" title="${T.redo}" id="ffpro-side-redo">${TOP_ICONS.redo}</button>
          <button type="button" title="${T.preview}" id="ffpro-side-preview">${TOP_ICONS.preview}</button>
          <button type="button" title="${T.aboutTitle}" id="ffpro-side-about">${NAV_ICONS.about}</button>
        </div>
        <div class="ffpro-side-links">
          <button type="button" id="ffpro-side-start">${T.start}</button>
          <button type="button" id="ffpro-side-exit">${T.exit}</button>
        </div>
        <div class="ffpro-side-version">FontForgePro v1.0.0</div>
      </div>
    `;
    side.querySelector("#ffpro-side-save").addEventListener("click", () =>
      dispatchShortcut("s"),
    );
    side.querySelector("#ffpro-side-export").addEventListener("click", () =>
      dispatchShortcut("e"),
    );
    side.querySelector("#ffpro-side-undo").addEventListener("click", () =>
      dispatchShortcut("z"),
    );
    side.querySelector("#ffpro-side-redo").addEventListener("click", () =>
      dispatchShortcut("y"),
    );
    side
      .querySelector("#ffpro-side-preview")
      .addEventListener("click", () => {
        if (typeof window.__glyphrOpenPreview === "function") {
          window.__glyphrOpenPreview();
        }
      });
    side.querySelector("#ffpro-side-about").addEventListener("click", showAbout);
    side.querySelector("#ffpro-side-start").addEventListener("click", goToStart);
    side.querySelector("#ffpro-side-exit").addEventListener("click", showExitDialog);
    return side;
  }

  function buildNav() {
    const nav = document.querySelector("#ffpro-nav");
    if (!nav || nav.dataset.built === "1") return;
    nav.dataset.built = "1";

    const groups = [
      [T.workspace, [
        ["Overview", T.overview, "overview"],
        ["Characters", T.characters, "characters"],
        ["Ligatures", T.ligatures, "ligatures"],
        ["Components", T.components, "components"],
        ["Kerning", T.kerning, "kerning"],
      ]],
      [T.tools, [
        ["Live preview", T.livePreview, "preview"],
        ["Global actions", T.globalActions, "actions"],
      ]],
      [T.more, [
        ["Settings", T.settings, "settings"],
        ["Help", T.help, "help"],
        ["About", T.about, "about"],
      ]],
    ];

    for (const [groupLabel, items] of groups) {
      const group = make("div", "ffpro-nav-group", "");
      group.appendChild(make("div", "ffpro-nav-label", groupLabel));
      for (const [page, label, icon] of items) {
        const button = make("button", "ffpro-nav-item", "");
        button.type = "button";
        button.dataset.page = page;
        button.innerHTML = `<span class="ffpro-nav-icon">${NAV_ICONS[icon] || ""}</span><span>${label}</span>`;
        button.addEventListener("click", () => {
          const editor = getEditor();
          if (!editor) return;
          if (page === "Help") {
            openHelp();
            return;
          }
          editor.nav.page = page;
          const nextView = EDITOR_PAGES.has(page) ? "editor" : "content";
          document.body.dataset.ffproView = nextView;
          currentView = nextView;
          editor.navigate();
          setTimeout(() => window.dispatchEvent(new Event("resize")), 40);
        });
        group.appendChild(button);
      }
      nav.appendChild(group);
    }
  }

  function buildTools() {
    const rail = document.querySelector("#ffpro-tools");
    if (!rail || rail.dataset.built === "1") return;
    rail.dataset.built = "1";

    for (const tool of TOOLS) {
      const icon = TOOL_ICONS[tool.id] || "";
      const button = make("button", "ffpro-tool", "");
      button.type = "button";
      button.dataset.tool = tool.id;
      button.title =
        tool.id === "pathEdit"
          ? `${T.toolNames[tool.id] || tool.id} (${tool.hint}) · ${T.pointHint}`
          : `${T.toolNames[tool.id] || tool.id} (${tool.hint})`;
      button.innerHTML =
        (icon || `<span class="ffpro-tool-fallback">${tool.fallback}</span>`) +
        `<span class="ffpro-tool-badge">${tool.hint}</span>`;
      button.addEventListener("click", () => {
        selectToolById(tool.id);
      });
      rail.appendChild(button);
    }
  }

  let proPanelName = "Layers";

  const PRO_PANELS = [
    ["Attributes", "属性"],
    ["Layers", "图层"],
    ["Transforms", "变换"],
    ["History", "历史"],
    ["Guides", "参考线"],
    ["Quality checks", "质量"],
    ["Character info", "字符"],
    ["Context characters", "上下文"],
  ];

  const PRO_TEXT = {
    "Actions": "操作",
    "Horizontal skew": "水平倾斜",
    "Offset path": "路径偏移",
    "Skew angle:": "倾斜角度：",
    "Skew distance:": "倾斜距离：",
    "Offset distance:": "偏移距离：",
    "Rotation angle:": "旋转角度：",
    "Round": "圆整",
    "Glyph": "字形",
    "Path": "路径",
    "Layer order": "图层顺序",
    "History": "历史",
    "Guides": "参考线",
    "Quality Checks": "质量检查",
    "Character Info": "字符信息",
    "Context Characters": "上下文字符",
  };

  function translateProPanel(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const text = node.nodeValue.trim();
      if (PRO_TEXT[text]) node.nodeValue = PRO_TEXT[text];
    }
  }

  function buildProDrawer() {
    const drawer = make("div", "", "");
    drawer.id = "ffpro-pro-drawer";
    drawer.innerHTML = `
      <div class="ffpro-pro-head">
        <div>
          <div class="ffpro-pro-title">专业面板</div>
          <div class="ffpro-pro-sub">图层 · 变换 · 历史 · 参考线 · 质量 · 上下文</div>
        </div>
        <button type="button" class="ffpro-pro-close" id="ffpro-pro-close">关闭</button>
      </div>
      <div class="ffpro-pro-tabs">
        ${PRO_PANELS.map(
          ([name, label]) =>
            `<button type="button" data-pro-panel="${name}">${label}</button>`,
        ).join("")}
      </div>
      <div id="ffpro-pro-host"></div>
    `;
    drawer.querySelector("#ffpro-pro-close").addEventListener("click", () => {
      drawer.dataset.open = "0";
    });
    drawer.querySelectorAll("[data-pro-panel]").forEach((button) => {
      button.addEventListener("click", () =>
        setProPanel(button.dataset.proPanel),
      );
    });
    return drawer;
  }

  function setProPanel(name) {
    const editor = getEditor();
    if (!editor) return;
    proPanelName = name || "Attributes";
    const drawer = document.getElementById("ffpro-pro-drawer");
    if (drawer) {
      drawer.querySelectorAll("[data-pro-panel]").forEach((button) => {
        button.dataset.active =
          button.dataset.proPanel === proPanelName ? "true" : "false";
      });
      drawer.dataset.open = "1";
    }
    editor.nav.panel = proPanelName;
    editor.showPageTransitions = false;
    editor.navigate();
    setTimeout(syncProPanel, 40);
  }

  function toggleProDrawer() {
    const drawer = document.getElementById("ffpro-pro-drawer");
    if (!drawer) return;
    if (drawer.dataset.open === "1") {
      drawer.dataset.open = "0";
      return;
    }
    const host = document.getElementById("ffpro-pro-host");
    if (host && host.querySelector("#editor-page__panel")) {
      drawer.dataset.open = "1";
      drawer.querySelectorAll("[data-pro-panel]").forEach((button) => {
        button.dataset.active =
          button.dataset.proPanel === proPanelName ? "true" : "false";
      });
      return;
    }
    setProPanel(proPanelName);
  }

  function syncProPanel() {
    const drawer = document.getElementById("ffpro-pro-drawer");
    if (!drawer || drawer.dataset.open !== "1") return;
    const host = document.getElementById("ffpro-pro-host");
    if (!host) return;
    const panels = [...document.querySelectorAll("#editor-page__panel")];
    const incoming = panels.find((panel) => !host.contains(panel));
    if (incoming) {
      host.innerHTML = "";
      host.appendChild(incoming);
    }
    translateProPanel(host);
  }

  function transformTargets(editor) {
    const item = editor && editor.selectedItem;
    if (!item) return null;
    const selected = (editor.multiSelect?.shapes?.members || []).filter(
      (shape) => shape && shape.objType === "Path" && shape.pathPoints,
    );
    const paths = selected.length
      ? selected
      : (item.shapes || []).filter(
          (shape) => shape && shape.objType === "Path" && shape.pathPoints,
        );
    if (!paths.length) return null;
    let xMin = Infinity;
    let yMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;
    for (const path of paths) {
      const maxes = path.maxes;
      if (!maxes) continue;
      xMin = Math.min(xMin, maxes.xMin);
      yMin = Math.min(yMin, maxes.yMin);
      xMax = Math.max(xMax, maxes.xMax);
      yMax = Math.max(yMax, maxes.yMax);
    }
    return {
      item,
      paths,
      selected: selected.length > 0,
      center: {
        x: Number.isFinite(xMin) ? (xMin + xMax) / 2 : 0,
        y: Number.isFinite(yMin) ? (yMin + yMax) / 2 : 0,
      },
    };
  }

  function commitTransform(editor, item, message) {
    try {
      if (typeof item.changed === "function") item.changed();
    } catch {
      // ignore
    }
    if (editor.history && typeof editor.history.addState === "function") {
      editor.history.addState(message);
    }
    if (typeof editor.publish === "function") {
      editor.publish("currentItem", item);
    }
    if (editor.editCanvas && typeof editor.editCanvas.redraw === "function") {
      editor.editCanvas.redraw("ffpro:transform");
    }
    if (typeof window.__ffproPointsRefresh === "function") {
      window.__ffproPointsRefresh();
    }
  }

  function applyTransform(kind) {
    const editor = getEditor();
    const target = transformTargets(editor);
    if (!target) return;
    const { item, paths, center } = target;
    const quarter = Math.PI / 2;
    for (const path of paths) {
      if (kind === "flip-h" && path.flipEW) path.flipEW(center.x);
      else if (kind === "flip-v" && path.flipNS) path.flipNS(center.y);
      else if (kind === "rot-l" && path.rotate) path.rotate(quarter, center);
      else if (kind === "rot-r" && path.rotate) path.rotate(-quarter, center);
      else if (kind === "reverse" && path.reverseWinding) path.reverseWinding();
      else if (kind === "round" && path.roundAll) path.roundAll(0);
    }
    const labels = {
      "flip-h": T.flipH,
      "flip-v": T.flipV,
      "rot-l": T.rotateL,
      "rot-r": T.rotateR,
      reverse: T.reverse,
      round: T.round,
    };
    commitTransform(editor, item, labels[kind] || "Transform");
  }

  function applyMove() {
    const editor = getEditor();
    const target = transformTargets(editor);
    if (!target) return;
    const xInput = document.getElementById("ffpro-move-x");
    const yInput = document.getElementById("ffpro-move-y");
    const dx = Number(xInput?.value) || 0;
    const dy = Number(yInput?.value) || 0;
    if (!dx && !dy) return;
    if (target.selected) {
      for (const path of target.paths) {
        if (path.updateShapePosition) path.updateShapePosition(dx, dy);
      }
    } else if (target.item.updateGlyphPosition) {
      target.item.updateGlyphPosition(dx, dy);
    }
    commitTransform(editor, target.item, `Move ${dx}, ${dy}`);
  }

  function applyScale() {
    const editor = getEditor();
    const target = transformTargets(editor);
    if (!target) return;
    const input = document.getElementById("ffpro-scale");
    const ratio = (Number(input?.value) || 0) / 100;
    if (!Number.isFinite(ratio) || ratio <= 0) return;
    if (target.selected) {
      for (const path of target.paths) {
        const maxes = path.maxes;
        if (!maxes || !path.updateShapeSize) continue;
        path.updateShapeSize({
          width: maxes.width * (ratio - 1),
          height: maxes.height * (ratio - 1),
          ratioLock: true,
          transformOrigin: "middle-center",
        });
      }
    } else if (target.item.updateGlyphSize) {
      const maxes = target.item.maxes;
      target.item.updateGlyphSize({
        width: maxes.width * (ratio - 1),
        height: maxes.height * (ratio - 1),
        ratioLock: true,
        transformOrigin: "middle-center",
      });
    }
    commitTransform(editor, target.item, `Scale ${Math.round(ratio * 100)}%`);
  }

  function applyAlign(kind) {
    const editor = getEditor();
    if (!editor) return;
    const modeMap = {
      left: "left",
      hcenter: "center",
      right: "right",
      top: "top",
      vcenter: "middle",
      bottom: "bottom",
    };
    const mode = modeMap[kind];
    if (!mode) return;
    const points = editor.multiSelect && editor.multiSelect.points;
    const shapes = editor.multiSelect && editor.multiSelect.shapes;
    let target = null;
    let label = "";
    if (points && points.length > 1) {
      target = points;
      label = `${T.align} ${T[kind]} · ${points.length}`;
    } else if (shapes && shapes.length > 1) {
      target = shapes;
      label = `${T.align} ${T[kind]} · ${shapes.length}`;
    }
    if (!target || typeof target.align !== "function") return;
    target.align(mode);
    try {
      editor.history.addState(label);
    } catch {
      // ignore
    }
    try {
      editor.publish("currentItem", editor.selectedItem);
    } catch {
      // ignore
    }
    if (editor.editCanvas && typeof editor.editCanvas.redraw === "function") {
      editor.editCanvas.redraw("ffpro:align");
    }
    if (typeof window.__ffproPointsRefresh === "function") {
      window.__ffproPointsRefresh();
    }
  }

  function applyBoolean(operation) {
    const editor = getEditor();
    if (!editor) return;
    const shapes = editor.multiSelect && editor.multiSelect.shapes;
    if (!shapes || typeof shapes.combine !== "function") return;
    if (operation === "unite-all") {
      if (typeof shapes.selectAll === "function") shapes.selectAll();
    }
    if (shapes.length < 2) return;
    let successful = false;
    try {
      successful = shapes.combine(operation === "unite-all" ? "unite" : operation);
    } catch (error) {
      console.warn("[FFpro] boolean operation failed", error);
      return;
    }
    if (!successful) return;
    try {
      editor.history.addState(`Boolean: ${operation}`);
    } catch {
      // ignore
    }
    try {
      editor.publish("currentItem", editor.selectedItem);
    } catch {
      // ignore
    }
    if (editor.editCanvas && typeof editor.editCanvas.redraw === "function") {
      editor.editCanvas.redraw("ffpro:boolean");
    }
    if (typeof window.__ffproPointsRefresh === "function") {
      window.__ffproPointsRefresh();
    }
  }

  function distributeSelection(axis) {
    const editor = getEditor();
    if (!editor) return;
    const selected = (editor.multiSelect?.shapes?.members || []).filter(
      (shape) => shape && shape.objType === "Path" && shape.maxes,
    );
    if (selected.length < 3) return;
    const horizontal = axis === "h";
    const minKey = horizontal ? "xMin" : "yMin";
    const maxKey = horizontal ? "xMax" : "yMax";
    const sorted = [...selected].sort(
      (a, b) => a.maxes[minKey] - b.maxes[minKey],
    );
    const start = Math.min(
      ...sorted.map((shape) => shape.maxes[minKey]),
    );
    const end = Math.max(...sorted.map((shape) => shape.maxes[maxKey]));
    const sizes = sorted.map((shape) =>
      horizontal ? shape.maxes.width : shape.maxes.height,
    );
    const total = end - start;
    const sum = sizes.reduce((value, size) => value + size, 0);
    const gap = (total - sum) / (sorted.length - 1);
    if (gap < 0) {
      // Overlapping shapes cannot be distributed by edge gap without
      // re-ordering them. Keep their visual order and space their centers.
      const byCenter = [...selected].sort((a, b) => {
        const ca = horizontal ? a.maxes.center.x : a.maxes.center.y;
        const cb = horizontal ? b.maxes.center.x : b.maxes.center.y;
        return ca - cb;
      });
      const centers = byCenter.map((shape) =>
        horizontal ? shape.maxes.center.x : shape.maxes.center.y,
      );
      const step = (centers[centers.length - 1] - centers[0]) /
        (byCenter.length - 1);
      byCenter.forEach((shape, index) => {
        const maxes = shape.maxes;
        const target = centers[0] + step * index;
        const current = horizontal ? maxes.center.x : maxes.center.y;
        if (shape.updateShapePosition) {
          shape.updateShapePosition(
            horizontal ? target - current : 0,
            horizontal ? 0 : target - current,
          );
        }
      });
    } else {
      let cursor = start;
      sorted.forEach((shape, index) => {
        const maxes = shape.maxes;
        const target = cursor;
        if (horizontal && shape.updateShapePosition) {
          shape.updateShapePosition(target - maxes.xMin, 0);
        } else if (!horizontal && shape.updateShapePosition) {
          shape.updateShapePosition(0, target - maxes.yMin);
        }
        cursor += sizes[index] + gap;
      });
    }
    commitTransform(
      editor,
      editor.selectedItem,
      horizontal ? "Distribute horizontally" : "Distribute vertically",
    );
  }

  function segmentExtremaTimes(segment) {
    const roots = [];
    const epsilon = 1e-7;
    const addRoots = (p0, p1, p2, p3) => {
      const a = -p0 + 3 * p1 - 3 * p2 + p3;
      const b = 3 * p0 - 6 * p1 + 3 * p2;
      const c = 3 * (p1 - p0);
      const A = 3 * a;
      const B = 2 * b;
      const C = c;
      if (Math.abs(A) < epsilon) {
        if (Math.abs(B) > epsilon) {
          const t = -C / B;
          if (t > 0.0001 && t < 0.9999) roots.push(t);
        }
        return;
      }
      const disc = B * B - 4 * A * C;
      if (disc < 0) return;
      const sqrtDisc = Math.sqrt(disc);
      for (const t of [(-B + sqrtDisc) / (2 * A), (-B - sqrtDisc) / (2 * A)]) {
        if (t > 0.0001 && t < 0.9999) roots.push(t);
      }
    };
    addRoots(segment.p1x, segment.p2x, segment.p3x, segment.p4x);
    addRoots(segment.p1y, segment.p2y, segment.p3y, segment.p4y);
    roots.sort((a, b) => a - b);
    const unique = [];
    for (const t of roots) {
      if (!unique.length || Math.abs(t - unique[unique.length - 1]) > 1e-4) {
        unique.push(t);
      }
    }
    return unique;
  }

  function addExtremaToPath(path) {
    const count = path.pathPoints.length;
    if (count < 2) return 0;
    let added = 0;
    for (let i = count - 1; i >= 0; i--) {
      const segment = path.makeSegment(i);
      if (!segment) continue;
      const times = segmentExtremaTimes(segment);
      let previous = 0;
      for (let index = 0; index < times.length; index++) {
        const local = (times[index] - previous) / (1 - previous);
        if (local > 0.001 && local < 0.999) {
          path.changed();
          const point = path.insertPathPoint(i + index, local, false);
          if (point) added++;
          previous = times[index];
        }
      }
    }
    if (added) path.changed();
    return added;
  }

  function simplifyPath(path) {
    if (!path || !Array.isArray(path.pathPoints)) return 0;
    let removed = 0;
    let guard = 0;
    while (path.pathPoints.length > 3 && guard++ < 400) {
      const count = path.pathPoints.length;
      let found = false;
      for (let index = count - 1; index >= 0; index--) {
        const previous = path.pathPoints[(index - 1 + count) % count];
        const current = path.pathPoints[index];
        const next = path.pathPoints[(index + 1) % count];
        if (
          previous.h2.use ||
          current.h1.use ||
          current.h2.use ||
          next.h1.use
        ) {
          continue;
        }
        const ax = current.p.x - previous.p.x;
        const ay = current.p.y - previous.p.y;
        const bx = next.p.x - current.p.x;
        const by = next.p.y - current.p.y;
        const length = Math.hypot(ax, ay) + Math.hypot(bx, by);
        if (length < 1e-9) {
          path.pathPoints.splice(index, 1);
          removed++;
          found = true;
          break;
        }
        const deviation = Math.abs(ax * by - ay * bx) / length;
        if (deviation <= 0.75) {
          path.pathPoints.splice(index, 1);
          removed++;
          found = true;
          break;
        }
      }
      if (!found) break;
    }
    if (removed) path.changed();
    return removed;
  }

  function applyPathOperation(kind) {
    const editor = getEditor();
    const target = transformTargets(editor);
    if (!target) return;
    let changed = 0;
    for (const path of target.paths) {
      if (kind === "extrema") changed += addExtremaToPath(path);
      else if (kind === "simplify") changed += simplifyPath(path);
    }
    if (!changed) return;
    commitTransform(
      editor,
      target.item,
      kind === "extrema"
        ? `Add extrema (${changed})`
        : `Simplify (${changed} points removed)`,
    );
  }

  function buildInspector() {
    const panel = make("div", "", "");
    panel.id = "ffpro-inspector";
    panel.innerHTML = `
      <div class="ffpro-insp-header">
        <span class="ffpro-insp-title">${T.properties}</span>
        <span class="ffpro-insp-glyph" id="ffpro-glyph-name">—</span>
        <button type="button" id="ffpro-pro-toggle" title="图层 / 变换 / 历史 / 参考线 / 质量检查">专业</button>
      </div>
      <div class="ffpro-insp-body">
        <div class="ffpro-section">
          <div class="ffpro-section-title">${T.glyph}</div>
          <div class="ffpro-row"><span>${T.advance}</span><input id="ffpro-advance" type="number" step="1"></div>
          <div class="ffpro-row"><span>${T.lsb}</span><input id="ffpro-lsb" type="number" step="1"></div>
          <div class="ffpro-row"><span>${T.rsb}</span><input id="ffpro-rsb" type="number" step="1"></div>
          <div class="ffpro-row"><span>${T.tool}</span><strong id="ffpro-current-tool">—</strong></div>
          <div class="ffpro-insp-note">${T.pointHint}</div>
        </div>
        <div class="ffpro-section">
          <div class="ffpro-section-title">${T.align}</div>
          <div class="ffpro-align">
            ${ALIGN_BUTTONS.map(
              ([key, title, labelKey]) =>
                `<button type="button" data-align="${key}" title="${title}">${T[labelKey]}</button>`,
            ).join("")}
          </div>
          <div class="ffpro-actions" style="margin-top:6px">
            <button type="button" class="ffpro-action" data-distribute="h">${T.distributeH}</button>
            <button type="button" class="ffpro-action" data-distribute="v">${T.distributeV}</button>
          </div>
        </div>
        <div class="ffpro-section">
          <div class="ffpro-section-title">${T.transform}</div>
          <div class="ffpro-actions">
            <button type="button" class="ffpro-action" data-transform="flip-h">${T.flipH}</button>
            <button type="button" class="ffpro-action" data-transform="flip-v">${T.flipV}</button>
            <button type="button" class="ffpro-action" data-transform="rot-l">${T.rotateL}</button>
            <button type="button" class="ffpro-action" data-transform="rot-r">${T.rotateR}</button>
            <button type="button" class="ffpro-action" data-transform="reverse">${T.reverse}</button>
            <button type="button" class="ffpro-action" data-transform="round">${T.round}</button>
          </div>
          <div class="ffpro-xy-row">
            <span>${T.move}</span>
            <input id="ffpro-move-x" type="number" step="1" placeholder="X">
            <input id="ffpro-move-y" type="number" step="1" placeholder="Y">
            <button type="button" id="ffpro-move-apply">${T.apply}</button>
          </div>
          <div class="ffpro-xy-row">
            <span>${T.scale}</span>
            <input id="ffpro-scale" type="number" step="1" value="100" title="${T.scalePercent}">
            <button type="button" id="ffpro-scale-apply">${T.apply}</button>
          </div>
        </div>
        <div class="ffpro-section">
          <div class="ffpro-section-title">${T.pathOps}</div>
          <div class="ffpro-actions">
            <button type="button" class="ffpro-action" data-path-op="extrema">${T.extrema}</button>
            <button type="button" class="ffpro-action" data-path-op="simplify">${T.simplify}</button>
          </div>
        </div>
        <div class="ffpro-section">
          <div class="ffpro-section-title">${T.boolOps}</div>
          <div class="ffpro-actions">
            <button type="button" class="ffpro-action" data-boolean="unite">${T.union}</button>
            <button type="button" class="ffpro-action" data-boolean="subtract">${T.subtract}</button>
            <button type="button" class="ffpro-action" data-boolean="intersect">${T.intersect}</button>
            <button type="button" class="ffpro-action" data-boolean="exclude">${T.exclude}</button>
            <button type="button" class="ffpro-action" data-boolean="divide">${T.divide}</button>
            <button type="button" class="ffpro-action" data-boolean="unite-all">${T.uniteAll}</button>
          </div>
        </div>
        <div class="ffpro-section">
          <div class="ffpro-section-title">${T.view}</div>
          <div class="ffpro-zoom">
            <button type="button" id="ffpro-zoom-out">−</button>
            <button type="button" id="ffpro-zoom-readout">100%</button>
            <button type="button" id="ffpro-zoom-in">+</button>
          </div>
          <div class="ffpro-actions">
            <button type="button" class="ffpro-action" id="ffpro-fit">${T.fit}</button>
            <button type="button" class="ffpro-action" id="ffpro-actual">${T.actual}</button>
            <button type="button" class="ffpro-action" id="ffpro-display-mode">${T.displayMode}</button>
          </div>
        </div>
        <div class="ffpro-section">
          <div class="ffpro-section-title">${T.actions}</div>
          <div class="ffpro-actions">
            <button type="button" class="ffpro-action primary" id="ffpro-insp-preview">${T.preview}</button>
            <button type="button" class="ffpro-action" id="ffpro-insp-export">${T.export}</button>
          </div>
        </div>
      </div>
    `;

    for (const [key] of [
      ["advance", "advance"],
      ["lsb", "lsb"],
      ["rsb", "rsb"],
    ]) {
      const input = panel.querySelector(`#ffpro-${key}`);
      input.addEventListener("change", () => applyMetric(key, input));
      input.addEventListener("blur", updateInspector);
    }

    panel.querySelectorAll("[data-align]").forEach((button) => {
      button.addEventListener("click", () =>
        applyAlign(button.dataset.align),
      );
    });

    panel.querySelectorAll("[data-transform]").forEach((button) => {
      button.addEventListener("click", () =>
        applyTransform(button.dataset.transform),
      );
    });
    panel.querySelectorAll("[data-path-op]").forEach((button) => {
      button.addEventListener("click", () =>
        applyPathOperation(button.dataset.pathOp),
      );
    });
    panel.querySelectorAll("[data-distribute]").forEach((button) => {
      button.addEventListener("click", () =>
        distributeSelection(button.dataset.distribute),
      );
    });
    panel.querySelectorAll("[data-boolean]").forEach((button) => {
      button.addEventListener("click", () =>
        applyBoolean(button.dataset.boolean),
      );
    });
    panel
      .querySelector("#ffpro-move-apply")
      .addEventListener("click", applyMove);
    panel
      .querySelector("#ffpro-scale-apply")
      .addEventListener("click", applyScale);
    for (const [id, handler] of [
      ["ffpro-move-x", applyMove],
      ["ffpro-move-y", applyMove],
      ["ffpro-scale", applyScale],
    ]) {
      panel.querySelector(`#${id}`).addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handler();
        }
      });
    }

    panel.querySelector("#ffpro-zoom-out").addEventListener("click", () => {
      const editor = getEditor();
      if (editor) editor.updateViewZoom(0.9);
    });
    panel.querySelector("#ffpro-zoom-in").addEventListener("click", () => {
      const editor = getEditor();
      if (editor) editor.updateViewZoom(1.1);
    });
    panel.querySelector("#ffpro-zoom-readout").addEventListener("click", () => {
      const editor = getEditor();
      if (editor) editor.setViewZoom(100);
    });
    panel.querySelector("#ffpro-fit").addEventListener("click", () => {
      const editor = getEditor();
      if (editor) editor.autoFitView();
    });
    panel.querySelector("#ffpro-actual").addEventListener("click", () => {
      const editor = getEditor();
      if (editor) editor.setViewZoom(100);
    });
    panel
      .querySelector("#ffpro-display-mode")
      .addEventListener("click", () => {
        const editor = getEditor();
        const project = editor && editor.project;
        if (!editor || !project) return;
        const appSettings = project.settings && project.settings.app;
        if (!appSettings) return;
        appSettings.canvasDisplayModeFilled =
          !appSettings.canvasDisplayModeFilled;
        if (typeof editor.publish === "function") {
          editor.publish("editCanvasView", editor.view);
        }
        if (editor.editCanvas && typeof editor.editCanvas.redraw === "function") {
          editor.editCanvas.redraw("ffpro:displayMode");
        }
        updateInspector();
      });
    panel
      .querySelector("#ffpro-insp-preview")
      .addEventListener("click", () => {
        if (typeof window.__glyphrOpenPreview === "function") {
          window.__glyphrOpenPreview();
        }
      });
    panel
      .querySelector("#ffpro-insp-export")
      .addEventListener("click", () => dispatchShortcut("e"));

    return panel;
  }

  function applyMetric(key, input) {
    const editor = getEditor();
    const item = editor && (editor.selectedItem || editor.selectedGlyph);
    if (!item) return;
    const value = parseFloat(input.value);
    if (Number.isNaN(value)) {
      updateInspector();
      return;
    }
    if (key === "advance") item.advanceWidth = value;
    if (key === "lsb") item.leftSideBearing = value;
    if (key === "rsb") item.rightSideBearing = value;
    try {
      editor.history.addState(`Set ${key}`);
    } catch {
      // ignore
    }
    try {
      if (String(item.id || "").startsWith("glyph-")) {
        editor.publish("whichGlyphIsSelected", item.id);
      } else {
        editor.publish("currentItem", item);
      }
    } catch {
      // ignore
    }
    try {
      if (editor.editCanvas && editor.editCanvas.redraw) {
        editor.editCanvas.redraw("inspector");
      }
    } catch {
      // ignore
    }
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node && node.textContent !== String(value)) {
      node.textContent = String(value);
    }
  }

  function setInput(id, value) {
    const input = document.getElementById(id);
    if (!input || document.activeElement === input) return;
    const next = String(value);
    if (input.value !== next) input.value = next;
  }

  function ensureTopLogo() {
    const brand = document.querySelector("#ffpro-topbar .ffpro-brand");
    if (!brand || brand.querySelector(".ffpro-top-logo")) return;
    if (typeof window.__clairLogoSvg !== "function") return;
    const holder = document.createElement("span");
    holder.innerHTML = logoMarkup();
    const logo = holder.firstElementChild;
    if (!logo) return;
    const fallback = brand.querySelector(".ffpro-top-logo-fallback");
    if (fallback) fallback.replaceWith(logo);
    else brand.prepend(logo);
  }

  function updateTopBar(editor) {
    ensureTopLogo();
    const project = editor && editor.project;
    const settings = project && project.settings;
    const name =
      settings?.project?.name ||
      settings?.font?.family ||
      (isZh ? "未命名项目" : "Untitled project");
    const family = settings?.font?.family || "";
    const style = settings?.font?.style || "";
    const glyphCount = project?.glyphs ? Object.keys(project.glyphs).length : 0;
    setText("ffpro-project-name", name);
    setText(
      "ffpro-project-meta",
      `${family}${style ? " · " + style : ""} · ${glyphCount} ${T.glyphs}`,
    );
    setText("ffpro-side-project", name);
    setText(
      "ffpro-side-meta",
      `${family}${style ? " · " + style : ""} · ${glyphCount} ${T.glyphs}`,
    );
  }

  function updateSidebar(editor) {
    const page = editor?.nav?.page || "";
    const helpOpen = !!helpOverlay?.hasAttribute("open");
    document.querySelectorAll(".ffpro-nav-item").forEach((item) => {
      item.dataset.active = helpOpen
        ? item.dataset.page === "Help"
          ? "true"
          : "false"
        : item.dataset.page === page
          ? "true"
          : "false";
    });
  }

  function updateTools(editor) {
    if (!editor) return;
    const isKerning = editor.nav && editor.nav.page === "Kerning";
    document.querySelectorAll(".ffpro-tool").forEach((button) => {
      button.dataset.active =
        button.dataset.tool === editor.selectedTool ? "true" : "false";
      if (isKerning) {
        button.style.display = button.dataset.tool === "pan" ? "" : "none";
      } else {
        button.style.display = "";
      }
    });
  }

  function updateInspector() {
    const editor = getEditor();
    if (!editor || !document.getElementById("ffpro-inspector")) return;
    const item = editor.selectedItem || editor.selectedGlyph;
    let glyphLabel = T.noGlyph;
    let glyphTitle = "";
    if (item) {
      glyphTitle = item.name || "";
      try {
        glyphLabel =
          editor.project.getItemName(item.id) || item.name || T.unnamed;
      } catch {
        glyphLabel = item.name || T.unnamed;
      }
    }
    setText("ffpro-glyph-name", glyphLabel);
    const glyphName = document.getElementById("ffpro-glyph-name");
    if (glyphName) glyphName.title = glyphTitle;

    setInput(
      "ffpro-advance",
      item && Number.isFinite(Number(item.advanceWidth))
        ? Math.round(item.advanceWidth * 100) / 100
        : "",
    );
    setInput(
      "ffpro-lsb",
      item && Number.isFinite(Number(item.leftSideBearing))
        ? Math.round(item.leftSideBearing * 100) / 100
        : "",
    );
    setInput(
      "ffpro-rsb",
      item && Number.isFinite(Number(item.rightSideBearing))
        ? Math.round(item.rightSideBearing * 100) / 100
        : "",
    );
    setText(
      "ffpro-current-tool",
      T.toolNames[editor.selectedTool] || editor.selectedTool || "—",
    );

    let zoom = 100;
    try {
      if (editor.view && editor.view.dz) zoom = Math.round(editor.view.dz * 100);
    } catch {
      zoom = 100;
    }
    setText("ffpro-zoom-readout", `${zoom}%`);
  }

  let currentView = "";
  let lastEditorPage = "";

  function switchToPathEdit(editor) {
    if (!editor) return;
    if (editor.selectedTool === "pathEdit") return;
    selectToolById("pathEdit");
  }

  function styleDisplayCanvases() {
    document.querySelectorAll("display-canvas").forEach((element) => {
      element.style.setProperty("background-color", "#f4f7fb", "important");
      element.style.setProperty("border-radius", "8px", "important");
    });
  }

  function updateView() {
    styleDisplayCanvases();
    const start = isStartPage();
    const editor = getEditor();
    let view = "content";
    if (start) view = "start";
    else if (editor && EDITOR_PAGES.has(editor.nav.page)) view = "editor";

    if (view !== currentView) {
      currentView = view;
      document.body.dataset.ffproView = view;
      setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    }

    if (view === "editor" && editor) {
      const page = editor.nav.page;
      if (
        page === "Characters" &&
        lastEditorPage !== "Characters" &&
        editor.selectedTool === "resize"
      ) {
        lastEditorPage = page;
        switchToPathEdit(editor);
      } else {
        lastEditorPage = page;
      }
    } else {
      lastEditorPage = "";
    }

    if (view === "start") return;
    buildNav();
    updateTopBar(editor);
    updateSidebar(editor);
    if (view === "editor") {
      buildTools();
      updateTools(editor);
      updateInspector();
      syncProPanel();
    } else {
      const proDrawer = document.getElementById("ffpro-pro-drawer");
      if (proDrawer) proDrawer.dataset.open = "0";
    }
  }

  function installShadowStyles() {
    const fancyCss = `
      .wrapper {
        background:#000 !important; border:0 !important; border-radius:999px !important;
        box-shadow:none !important; animation:none !important; padding:0 !important;
      }
      .wrapper .buttonContent { background:transparent !important; border-radius:999px !important; }
      .wrapper .buttonText {
        color:#fff !important; -webkit-text-fill-color:#fff !important;
        background:none !important; font-weight:700 !important;
      }
      .wrapper[secondary] { background:#9e9e9e !important; }
      .wrapper[secondary] .buttonContent { background:transparent !important; }
      .wrapper[secondary] .buttonText {
        color:#000 !important; -webkit-text-fill-color:#000 !important; background:none !important;
      }
      .wrapper[minimal] { background:#f3f3f3 !important; }
      .wrapper[minimal] .buttonContent { background:transparent !important; }
      .wrapper[minimal] .buttonText {
        color:#111 !important; -webkit-text-fill-color:#111 !important; background:none !important;
      }
      .wrapper[danger] { background:#9e9e9e !important; }
      .wrapper[danger] .buttonText {
        color:#000 !important; -webkit-text-fill-color:#000 !important;
      }
      .wrapper:hover .buttonContent { background:transparent !important; }
      .wrapper[disabled] { opacity:.42 !important; }
    `;

    const inputCss = `
      .numberInput, .numberInput:hover, .numberInput:focus {
        background-color:#f3f3f3 !important; color:#000 !important;
        border-color:#e4e4e4 !important; border-radius:8px 0 0 8px !important;
      }
      .arrowWrapper, .arrowWrapper:hover, .arrowWrapper:focus {
        background-color:#f3f3f3 !important; border-color:#e4e4e4 !important;
      }
      .arrow { background-color:#f3f3f3 !important; border-color:#e4e4e4 !important; }
      .arrow svg { fill:#555 !important; }
      .arrowSeparator { background-color:#e4e4e4 !important; }
      .lock svg { fill:#555 !important; }
    `;

    const glyphCss = `
      :host {
        background:#fff !important; border:1px solid #e8e8e8 !important;
        border-radius:12px !important; box-shadow:none !important;
        overflow:hidden !important;
      }
      .wrapper {
        background:transparent !important; border-radius:12px !important;
        box-shadow:none !important;
      }
      .wrapper:hover, .wrapper:focus { background:#f3f3f3 !important; }
      .wrapper[selected] { background:#f3f3f3 !important; }
      .thumbnail {
        background:#fff !important; color:#111 !important;
        box-shadow:none !important; opacity:1 !important; border-radius:8px !important;
      }
      .wrapper[selected] .thumbnail { background:#fff !important; color:#111 !important; }
      .name {
        background:#fff !important; color:#666 !important;
        border-radius:0 0 8px 8px !important;
      }
      .wrapper[selected] .name,
      .wrapper:hover .name {
        background:#000 !important; color:#fff !important;
      }
    `;

    const seen = new WeakSet();

    function inject(root) {
      if (!root || seen.has(root)) return;
      seen.add(root);
      const tag = root.host && root.host.tagName ? root.host.tagName : '';
      let css = '';
      if (tag === 'FANCY-BUTTON') css = fancyCss;
      else if (tag === 'INPUT-NUMBER') css = inputCss;
      else if (tag === 'GLYPH-TILE') css = glyphCss;
      if (!css) return;
      const style = document.createElement('style');
      style.textContent = css;
      root.appendChild(style);
    }

    function scan(node) {
      if (!node || node.nodeType !== 1) return;
      if (node.shadowRoot) {
        inject(node.shadowRoot);
        for (const child of node.shadowRoot.querySelectorAll('*')) scan(child);
      }
      for (const child of node.querySelectorAll('*')) scan(child);
    }

    const originalAttach = Element.prototype.attachShadow;
    if (originalAttach) {
      Element.prototype.attachShadow = function (init) {
        const root = originalAttach.call(this, init);
        inject(root);
        return root;
      };
    }
    scan(document.documentElement);
    setInterval(() => scan(document.documentElement), 1200);
  }


  const STYLE = `
    :root {
      --ffpro-bg:#000;
      --ffpro-panel:#ffffff;
      --ffpro-panel-2:#f4f4f4;
      --ffpro-panel-3:#ededed;
      --ffpro-border:#e4e4e4;
      --ffpro-border-soft:#eeeeee;
      --ffpro-text:#111111;
      --ffpro-muted:#767676;
      --ffpro-dim:#9a9a9a;
      --ffpro-accent:#000000;
      --ffpro-accent-2:#9e9e9e;
      --offWhite:#f7f7f7;
      --gray-l99:#fafafa;
      --gray-l97:#f5f5f5;
      --gray-l95:#efefef;
      --gray-l90:#e6e6e6;
      --gray-l85:#dedede;
      --gray-l80:#d5d5d5;
      --gray-l75:#c9c9c9;
      --gray-l70:#bdbdbd;
      --gray-l65:#b0b0b0;
      --gray-l60:#a3a3a3;
      --gray-l55:#969696;
      --gray-l50:#8a8a8a;
      --gray-l45:#7e7e7e;
      --gray-l40:#727272;
      --gray-l35:#666666;
      --gray-l30:#595959;
      --gray-l25:#4d4d4d;
      --gray-l20:#404040;
      --gray-l15:#333333;
      --gray-l10:#262626;
      --gray-l05:#111111;
      --blue-l99:#f7f7f7;
      --blue-l97:#f4f4f4;
      --blue-l95:#f0f0f0;
      --blue-l90:#e8e8e8;
      --blue-l85:#dedede;
      --blue-l80:#d4d4d4;
      --blue-l75:#c9c9c9;
      --blue-l70:#bfbfbf;
      --blue-l65:#b3b3b3;
      --blue-l60:#a6a6a6;
      --blue-l55:#999999;
      --blue-l50:#8c8c8c;
      --blue-l45:#7f7f7f;
      --blue-l40:#727272;
      --blue-l35:#666666;
      --blue-l30:#595959;
      --blue-l25:#4d4d4d;
      --blue-l20:#404040;
      --blue-l15:#333333;
      --blue-l10:#262626;
      --blue-l05:#1a1a1a;
      --accent-color:#000000;
      --accent-color-dark:#333333;
      --enabled-resting-text:#0d0d0d;
      --enabled-resting-lightText:#1a1a1a;
      --enabled-resting-border:#bfbfbf;
      --enabled-resting-fill:#666666;
      --enabled-resting-background:#fafafa;
      --enabled-restingLight-text:#333333;
      --enabled-restingLight-lightText:#4d4d4d;
      --enabled-restingLight-border:#cccccc;
      --enabled-restingLight-fill:#999999;
      --enabled-restingLight-background:#fafafa;
      --enabled-focus-text:#000000;
      --enabled-focus-lightText:#1a1a1a;
      --enabled-focus-border:#000000;
      --enabled-focus-fill:#304550;
      --enabled-focus-background:#ffffff;
      --enabled-active-text:#000000;
      --enabled-active-lightText:#1a1a1a;
      --enabled-active-border:#a1a1a1;
      --enabled-active-fill:#000000;
      --enabled-active-background:#ffffff;
      --disabled-text:#666666;
      --disabled-text-light:#999999;
      --disabled-text-dark:#333333;
      --disabled-border:#d1d1d1;
      --disabled-fill:#d1d1d1;
      --disabled-background:#f0f0f0;
      --l1-shadow:0px 0px 2px #0000001a;
      --l1-shadow-down:0px 2px 2px #0000001a;
      --l2-shadow:0px 0px 4px #0003;
      --l2-shadow-upper-left:-1px -1px 4px #0003;
      --l2-shadow-down:0px 4px 4px #0000004d;
      --l3-shadow:0px 0px 6px #0000004d;
      --l3-shadow-down:0px 6px 6px #0000004d;
    }

    html, body { background:var(--ffpro-bg) !important; color:var(--ffpro-text) !important; }
    body { overflow:hidden !important; }
    #app__wrapper {
      background:var(--ffpro-bg) !important;
      position:fixed !important;
      display:block !important;
      width:auto !important;
      height:auto !important;
      min-width:0 !important;
      min-height:0 !important;
      transition:none !important;
    }
    body[data-ffpro-view="start"] #app__wrapper { top:0 !important; left:0 !important; right:0 !important; bottom:0 !important; }
    body[data-ffpro-view="editor"] #app__wrapper { top:56px !important; left:288px !important; right:300px !important; bottom:0 !important; }
    body[data-ffpro-view="content"] #app__wrapper { top:56px !important; left:236px !important; right:0 !important; bottom:0 !important; }
    #app__main-content { height:100% !important; min-width:0 !important; }
    #app__page { height:100% !important; min-width:0 !important; }
    #app__top-bar { display:none !important; }

    #ffpro-topbar {
      position:fixed; top:0; left:0; right:0; height:56px; z-index:100000;
      display:flex; align-items:center; gap:14px; padding:0 14px;
      background:linear-gradient(180deg,#0c1421 0%,#0a111d 100%);
      border-bottom:1px solid #1d2b42; color:#e7effa;
      font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;
      box-shadow:0 8px 24px rgba(0,0,0,.25);
    }
    #ffpro-topbar .ffpro-brand { display:flex; align-items:center; gap:9px; min-width:142px; }
    #ffpro-topbar .ffpro-top-logo { width:30px; height:30px; display:block; border-radius:7px; }
    #ffpro-topbar .ffpro-top-logo-fallback { width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#8b5cf6,#22d3ee);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#fff; }
    #ffpro-topbar .ffpro-brand-name { font-size:15px; font-weight:800; letter-spacing:.2px; color:#f2f7ff; }
    #ffpro-topbar .ffpro-project { display:flex; flex-direction:column; gap:1px; min-width:120px; max-width:280px; padding-left:16px; border-left:1px solid #1e2c42; }
    #ffpro-topbar .ffpro-project-name { font-size:13px; font-weight:650; color:#e7effa; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    #ffpro-topbar .ffpro-project-meta { font-size:10.5px; color:#7188a3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    #ffpro-topbar .ffpro-tb-actions { margin-left:auto; display:flex; align-items:center; gap:3px; }
    #ffpro-topbar .ffpro-tb-btn, #ffpro-topbar .ffpro-tb-icon {
      display:inline-flex; align-items:center; justify-content:center; gap:6px;
      height:30px; padding:0 9px; border:0; border-radius:7px; background:transparent;
      color:#a9bdd4; font-family:inherit; font-size:12px; cursor:pointer; white-space:nowrap;
    }
    #ffpro-topbar .ffpro-tb-icon { width:30px; padding:0; }
    #ffpro-topbar .ffpro-tb-btn:hover, #ffpro-topbar .ffpro-tb-icon:hover { background:#17243a; color:#fff; }
    #ffpro-topbar .ffpro-tb-btn svg, #ffpro-topbar .ffpro-tb-icon svg { width:15px; height:15px; flex:0 0 auto; }
    #ffpro-topbar .ffpro-tb-sep { width:1px; height:20px; background:#1e2c42; margin:0 5px; }

    #ffpro-sidebar {
      position:fixed; left:0; top:56px; bottom:0; width:236px; z-index:90000;
      display:flex; flex-direction:column; gap:14px; padding:14px 10px;
      background:#0b1220; border-right:1px solid #1d2b42; color:#dbe6f5;
      font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;
    }
    .ffpro-project-card { padding:12px; border:1px solid #22314a; border-radius:11px; background:linear-gradient(180deg,#111c2d,#0d1624); box-shadow:0 8px 24px rgba(0,0,0,.22); }
    .ffpro-project-label { font-size:9.5px; letter-spacing:1.4px; text-transform:uppercase; color:#5d738d; margin-bottom:7px; }
    .ffpro-project-title { font-size:14px; font-weight:700; color:#f1f6ff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .ffpro-project-sub { margin-top:5px; font-size:10.5px; color:#7188a3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .ffpro-nav { display:flex; flex-direction:column; gap:11px; overflow-y:auto; }
    .ffpro-nav-group { display:flex; flex-direction:column; gap:2px; }
    .ffpro-nav-label { font-size:9.5px; letter-spacing:1.3px; text-transform:uppercase; color:#536a83; padding:4px 8px 3px; }
    .ffpro-nav-item { display:flex; align-items:center; gap:10px; width:100%; padding:8px 9px; border:1px solid transparent; border-radius:8px; background:transparent; color:#9fb4cc; font-family:inherit; font-size:12.5px; text-align:left; cursor:pointer; }
    .ffpro-nav-item:hover { background:#132035; color:#fff; }
    .ffpro-nav-item[data-active="true"] { background:linear-gradient(90deg,rgba(139,92,246,.24),rgba(34,211,238,.07)); border-color:rgba(139,92,246,.34); color:#fff; box-shadow:inset 3px 0 0 #8b5cf6; }
    .ffpro-nav-icon { width:16px; height:16px; display:flex; align-items:center; justify-content:center; color:#7f96b2; flex:0 0 auto; }
    .ffpro-nav-item[data-active="true"] .ffpro-nav-icon { color:#c4b5fd; }
    .ffpro-nav-icon svg { width:16px; height:16px; }
    .ffpro-sidebar-footer { margin-top:auto; padding:8px 8px 2px; font-size:10px; color:#4f6680; letter-spacing:.4px; }

    #ffpro-tools {
      position:fixed; left:236px; top:56px; bottom:0; width:52px; z-index:90000;
      display:flex; flex-direction:column; align-items:center; gap:3px; padding-top:10px;
      background:#090f1a; border-right:1px solid #1d2b42;
    }
    .ffpro-tool { position:relative; width:36px; height:36px; border:0; border-radius:9px; background:transparent; color:#9fb4cc; display:flex; align-items:center; justify-content:center; cursor:pointer; padding:0; }
    .ffpro-tool:hover { background:#162338; color:#fff; }
    .ffpro-tool[data-active="true"] { background:linear-gradient(135deg,#7c3aed,#8b5cf6); color:#fff; box-shadow:0 5px 14px rgba(124,58,237,.35); }
    .ffpro-tool svg { width:18px; height:18px; }
    .ffpro-tool-fallback { font-size:17px; line-height:1; }
    .ffpro-tool-badge { position:absolute; right:2px; bottom:0; font-size:8.5px; line-height:1; color:#657b94; }
    .ffpro-tool[data-active="true"] .ffpro-tool-badge { color:#eadcff; }

    #ffpro-inspector {
      position:fixed; right:0; top:56px; bottom:0; width:300px; z-index:90000;
      background:#0b1220; border-left:1px solid #1d2b42; overflow-y:auto; color:#dbe6f5;
      font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;
    }
    .ffpro-insp-header { position:sticky; top:0; z-index:2; display:flex; align-items:center; justify-content:space-between; gap:8px; padding:13px 16px; background:#0d1624; border-bottom:1px solid #1d2b42; }
    .ffpro-insp-title { font-size:13px; font-weight:700; letter-spacing:.4px; color:#f1f6ff; }
    .ffpro-insp-glyph { font-size:11.5px; color:#8fa6c2; max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .ffpro-insp-body { padding:4px 16px 22px; }
    .ffpro-section { padding:12px 0; border-bottom:1px solid #172337; }
    .ffpro-section:last-child { border-bottom:0; }
    .ffpro-section-title { font-size:9.5px; letter-spacing:1.3px; text-transform:uppercase; color:#5d738d; margin-bottom:8px; }
    .ffpro-row { display:flex; align-items:center; justify-content:space-between; gap:8px; margin:7px 0; font-size:12px; color:#9fb4cc; }
    .ffpro-row strong { font-size:12px; font-weight:600; color:#e7effa; max-width:130px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .ffpro-row input { width:98px; height:28px; border:1px solid #22314a; border-radius:6px; background:#0e1726; color:#e7effa; padding:0 8px; text-align:right; font-family:'Consolas',monospace; font-size:12px; outline:none; }
    .ffpro-row input:focus { border-color:#8b5cf6; box-shadow:0 0 0 2px rgba(139,92,246,.16); }
    .ffpro-insp-note { margin:8px 0 0; padding:7px 9px; border:1px solid #1d2b42; border-radius:7px; background:#0b1524; color:#7f95ae; font-size:10.5px; line-height:1.55; }
    .ffpro-align { display:grid; grid-template-columns:repeat(3,1fr); gap:4px; }
    .ffpro-align button { height:28px; border:1px solid #22314a; border-radius:6px; background:#0e1726; color:#b7c9dd; font-family:inherit; font-size:11px; cursor:pointer; }
    .ffpro-align button:hover { background:#17243a; color:#fff; border-color:#35506f; }
    .ffpro-zoom { display:flex; align-items:center; gap:4px; margin-bottom:7px; }
    .ffpro-zoom button { height:28px; border:1px solid #22314a; border-radius:6px; background:#0e1726; color:#b7c9dd; font-family:inherit; cursor:pointer; }
    #ffpro-zoom-out, #ffpro-zoom-in { width:30px; font-size:14px; }
    #ffpro-zoom-readout { flex:1; text-align:center; font-size:11.5px; }
    .ffpro-zoom button:hover { background:#17243a; color:#fff; }
    .ffpro-actions { display:grid; grid-template-columns:1fr 1fr; gap:5px; }
    .ffpro-xy-row { display:flex; align-items:center; gap:4px; margin:7px 0; }
    .ffpro-xy-row span { width:30px; flex:0 0 auto; font-size:11px; color:#9fb4cc; }
    .ffpro-xy-row input { width:0; flex:1; min-width:0; height:28px; border:1px solid #22314a; border-radius:6px; background:#0e1726; color:#e7effa; padding:0 6px; text-align:center; font-family:'Consolas',monospace; font-size:11.5px; outline:none; }
    .ffpro-xy-row button { flex:0 0 auto; height:28px; padding:0 9px; border:0; border-radius:6px; background:#8b5cf6; color:#111; font-family:inherit; font-size:10.5px; font-weight:700; cursor:pointer; }
    .ffpro-action { height:30px; border:1px solid #22314a; border-radius:7px; background:#0e1726; color:#c6d6e8; font-family:inherit; font-size:11.5px; cursor:pointer; }
    .ffpro-action:hover { background:#17243a; color:#fff; }
    .ffpro-action.primary { border:0; background:linear-gradient(135deg,#7c3aed,#8b5cf6); color:#fff; font-weight:600; box-shadow:0 6px 16px rgba(124,58,237,.25); }


    #ffpro-pro-toggle {
      height:24px !important; padding:0 9px !important;
      border:1px solid #e4e4e4 !important; border-radius:999px !important;
      background:#f3f3f3 !important; color:#333 !important;
      font-family:inherit !important; font-size:10px !important; font-weight:700 !important;
      cursor:pointer !important; flex:0 0 auto;
    }
    #ffpro-pro-toggle:hover { background:#000 !important; color:#fff !important; border-color:#000 !important; }
    #ffpro-insp-header .ffpro-insp-glyph { max-width:90px !important; }

    #ffpro-pro-drawer {
      position:fixed; right:12px; top:12px; bottom:12px; width:380px;
      z-index:96000; display:none; flex-direction:column;
      background:#fff; color:#111; border-radius:30px; padding:18px 16px 14px;
      box-shadow:0 22px 70px rgba(0,0,0,.62);
      font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;
    }
    #ffpro-pro-drawer[data-open="1"] { display:flex; }
    .ffpro-pro-head { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; padding:0 4px 10px; }
    .ffpro-pro-title { font-size:16px; font-weight:800; color:#000; letter-spacing:-.2px; }
    .ffpro-pro-sub { margin-top:3px; font-size:9px; letter-spacing:.8px; color:#999; }
    .ffpro-pro-close {
      height:28px; padding:0 13px; border:0; border-radius:999px;
      background:#9e9e9e; color:#000; font-family:inherit; font-size:11px;
      font-weight:700; cursor:pointer;
    }
    .ffpro-pro-close:hover { background:#8b8b8b; }
    .ffpro-pro-tabs { display:flex; flex-wrap:wrap; gap:5px; padding:0 2px 12px; border-bottom:1px solid #eee; }
    .ffpro-pro-tabs button {
      height:28px; padding:0 11px; border:0; border-radius:999px;
      background:#f3f3f3; color:#666; font-family:inherit; font-size:10.5px;
      font-weight:650; cursor:pointer;
    }
    .ffpro-pro-tabs button:hover { color:#000; }
    .ffpro-pro-tabs button[data-active="true"] { background:#000; color:#fff; }
    #ffpro-pro-host { flex:1; min-height:0; overflow-y:auto; padding:10px 2px 18px; }
    #ffpro-pro-host #editor-page__panel { display:block !important; height:auto !important; width:100% !important; background:transparent !important; padding:0 !important; }
    #ffpro-pro-host .panel__card {
      display:grid !important; width:100% !important; max-width:100% !important;
      grid-template-columns:96px 1fr !important; gap:4px 8px !important;
      padding:12px !important; margin:0 0 9px 0 !important;
      border:1px solid #ededed !important; border-radius:16px !important;
      background:#f7f7f7 !important; color:#111 !important;
      box-shadow:none !important;
    }
    #ffpro-pro-host .panel__card.full-width,
    #ffpro-pro-host .panel__card.no-card { grid-template-columns:1fr !important; }
    #ffpro-pro-host .panel__card h3,
    #ffpro-pro-host .panel__card h4 { color:#000 !important; font-size:12.5px !important; }
    #ffpro-pro-host .panel__card label,
    #ffpro-pro-host .panel__card p,
    #ffpro-pro-host .panel__card span { font-size:10.5px !important; }
    #ffpro-pro-host .panel__actions-area { display:flex !important; flex-wrap:wrap !important; gap:6px !important; padding-top:6px; }
    #ffpro-pro-host .panel__actions-area button {
      width:34px !important; height:34px !important; min-width:34px !important;
      max-width:34px !important; max-height:34px !important; padding:0 !important;
      border:1px solid #e6e6e6 !important; border-radius:10px !important;
      background:#f3f3f3 !important; overflow:hidden !important;
      display:inline-flex !important; align-items:center !important; justify-content:center !important;
    }
    #ffpro-pro-host .panel__actions-area button:hover { background:#000 !important; }
    #ffpro-pro-host .panel__actions-area button svg {
      width:20px !important; height:20px !important; max-width:20px !important; max-height:20px !important;
      filter:grayscale(1) !important;
    }
    #ffpro-pro-host .panel__actions-area button span { display:none !important; }
    #ffpro-pro-host .item-link__row,
    #ffpro-pro-host .layer-panel__new-path,
    #ffpro-pro-host .layer-panel__path-row,
    #ffpro-pro-host .layer-panel__component-row {
      border-radius:10px !important; background:#fff !important; border-color:#e8e8e8 !important;
    }
    #ffpro-pro-host .layer-panel__selected { background:#000 !important; color:#fff !important; }
    #ffpro-pro-host .history-list .list__row-wrapper__static { border-radius:8px !important; }
    #ffpro-pro-host fancy-button { border-radius:999px !important; }

    body[data-ffpro-view="start"] #open-project__page {
      top:0 !important; height:100% !important;
      background:radial-gradient(circle at 15% 25%, #10233f 0%, #0b1424 45%, #140a2a 100%) !important;
    }
    body[data-ffpro-view="start"] #app__page,
    body[data-ffpro-view="start"] .open-project__tab-content {
      animation:none !important; opacity:1 !important;
      color:#cfe0f5 !important;
    }
    body[data-ffpro-view="start"] #input__new-project-name::placeholder {
      color:#6b819b !important;
    }
    body[data-ffpro-view="start"] #open-project__left-area,
    body[data-ffpro-view="start"] #open-project__right-area,
    body[data-ffpro-view="start"] .open-project__version-name,
    body[data-ffpro-view="start"] .open-project__version-number,
    body[data-ffpro-view="start"] .open-project__blurb { color:#cfe0f5 !important; }
    body[data-ffpro-view="start"] #open-project__right-area h2 { color:#f1f6ff !important; }
    body[data-ffpro-view="start"] .open-project__tab { color:#8fa6c2 !important; }
    body[data-ffpro-view="start"] .open-project__tab[selected],
    body[data-ffpro-view="start"] .open-project__tab:hover { color:#ffffff !important; border-color:#8b5cf6 !important; }
    body[data-ffpro-view="start"] #input__new-project-name {
      background:#0e1726 !important; color:#e7effa !important; border-color:#22314a !important;
    }

    body[data-ffpro-view="start"] #ffpro-topbar,
    body[data-ffpro-view="start"] #ffpro-sidebar,
    body[data-ffpro-view="start"] #ffpro-tools,
    body[data-ffpro-view="start"] #ffpro-inspector,
    body[data-ffpro-view="content"] #ffpro-tools,
    body[data-ffpro-view="content"] #ffpro-inspector { display:none !important; }

    #glyphr-lunacy-inspector, #glyphr-lunacy-reopen, #glyphr-toolrail { display:none !important; }

    body[data-ffpro-view="editor"] .editor__page { display:block !important; padding:0 !important; height:100% !important; min-height:0 !important; }
    body[data-ffpro-view="editor"] .editor-page__left-area,
    body[data-ffpro-view="editor"] .editor-page__tools-area,
    body[data-ffpro-view="editor"] .editor-page__zoom-area { display:none !important; }
    body[data-ffpro-view="editor"] .editor-page__edit-canvas-wrapper {
      display:block !important; width:100% !important; height:100% !important;
      border:0 !important; border-radius:0 !important; box-shadow:none !important;
      background:#f4f7fb !important; grid-column:auto !important;
    }

    body[data-ffpro-view="content"] .content__page {
      display:grid !important; grid-template-columns:340px 1fr !important;
      column-gap:16px !important; padding:16px !important; height:100% !important;
    }
    body[data-ffpro-view="content"] .content-page__nav-area { display:none !important; }
    body[data-ffpro-view="content"] .content-page__left-area { width:340px !important; grid-template-rows:0 1fr !important; }
    body[data-ffpro-view="content"] #content-page__panel { grid-row:2 !important; width:100% !important; height:100% !important; }
    body[data-ffpro-view="content"] .content-page__right-area {
      border:0 !important; background:transparent !important; box-shadow:none !important;
      padding:0 !important; color:#c6d6e8 !important;
    }
    body[data-ffpro-view="content"] .live-preview-page__canvas-wrapper {
      border:1px solid #22314a !important; border-radius:10px !important; background:#fff !important;
      box-shadow:0 10px 30px rgba(0,0,0,.25) !important; overflow:auto !important;
    }

    .panel__card, .page__card {
      background:#0f1929 !important; border:1px solid #22314a !important;
      color:#c6d6e8 !important; box-shadow:none !important;
      width:100% !important; max-width:100% !important;
    }
    display-canvas { background:#f4f7fb !important; border-radius:8px !important; }
    .range-table__list-area {
      background:#0f1929 !important;
      border:1px solid #22314a !important;
      border-radius:8px !important;
      color:#c6d6e8 !important;
    }
    .range-table__list-area .list__row-wrapper__static {
      border-top:1px solid #1c2a3f !important;
    }
    .range-table__list-area .list__row-wrapper__static:hover {
      background:#131f31 !important;
    }
    .range-table__list-area a { color:#a78bfa !important; }
    .panel__card h2, .panel__card h3, .page__card h2, .page__card h3 { color:#f1f6ff !important; }
    .panel__card p, .page__card p { color:#b7c9dd !important; }
    .panel__card label, .panel__card span, .page__card label { color:#9fb4cc; }
    .page__card { width:100% !important; max-width:100% !important; }
    #editor-page__panel, #content-page__panel, .content-page__right-area { color:#c6d6e8; }
    .content-page__right-area p, .content-page__right-area li { color:#b7c9dd; }
    .content-page__right-area h1, .content-page__right-area h2, .content-page__right-area h3 { color:#f1f6ff; }

    .tab-control__tab { color:#8fa6c2 !important; }
    .tab-control__tab[selected], .tab-control__tab:hover { color:#fff !important; }
    .tab-control__tab-container { border-color:#22314a !important; background:#0d1624 !important; }

    input:not([type="checkbox"]):not([type="radio"]), textarea, select {
      background:#0e1726 !important; color:#e7effa !important;
      border:1px solid #22314a !important; border-radius:6px !important;
    }
    input:focus, textarea:focus, select:focus { border-color:#8b5cf6 !important; outline:none !important; }

    #context-menu, #modal-dialog .modal-dialog__content {
      background:#0f1a2a !important; color:#e7effa !important;
      border:1px solid #22314a !important; box-shadow:0 22px 60px rgba(0,0,0,.55) !important;
    }
    .context-menu-row:hover { background:#17243a !important; }
    .context-menu-row .row-name, .context-menu-row span { color:#dbe6f5 !important; }
    .modal-dialog__header { border-color:#22314a !important; }
    #toast, #error { background:#111c2e !important; color:#e7effa !important; border-color:#22314a !important; }

    ::-webkit-scrollbar { width:10px; height:10px; }
    ::-webkit-scrollbar-track { background:#0a111c; }
    ::-webkit-scrollbar-thumb { background:#23324a; border-radius:5px; border:2px solid #0a111c; }
    ::-webkit-scrollbar-thumb:hover { background:#334762; }

    #glyphr-preview-overlay > div:first-child {
      background:#0d1624 !important; color:#e7effa !important;
    }
    #glyphr-preview-overlay h2 { color:#f1f6ff !important; }
    #glyphr-preview-subtitle { color:#8fa6c2 !important; }
    #glyphr-preview-text {
      background:#0e1726 !important; color:#e7effa !important; border-color:#22314a !important;
    }
    #glyphr-preview-overlay > div:first-child button {
      background:#17243a !important; color:#dbe6f5 !important;
    }
    #glyphr-preview-overlay #glyphr-preview-sizes > div {
      background:#f4f7fb !important; border-color:#22314a !important;
    }
    #clair-about-overlay > div {
      background:#0d1624 !important; color:#e7effa !important;
    }
    #clair-about-overlay h2 { color:#f1f6ff !important; }
    #clair-about-overlay > div > div { color:#c6d6e8 !important; }
    #clair-about-overlay button { background:#8b5cf6 !important; }

    #ffpro-exit-dialog {
      position:fixed; inset:0; z-index:1000002; background:rgba(4,8,14,.74);
      display:none; align-items:center; justify-content:center; padding:24px;
      backdrop-filter:blur(4px); font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;
    }
    #ffpro-exit-dialog[open] { display:flex; }
    #ffpro-exit-dialog .ffpro-exit-panel {
      width:min(460px,100%); background:#0d1624; border:1px solid #26364f;
      border-radius:16px; box-shadow:0 28px 90px rgba(0,0,0,.65); padding:22px;
      color:#e7effa;
    }
    #ffpro-exit-dialog h2 { margin:0 0 8px; font-size:18px; color:#f4f8ff; }
    #ffpro-exit-dialog .ffpro-exit-text { margin:0 0 8px; font-size:13px; color:#c6d6e8; }
    #ffpro-exit-dialog .ffpro-exit-hint { margin:0 0 18px; font-size:11px; line-height:1.55; color:#7f96b2; }
    #ffpro-exit-dialog .ffpro-exit-actions { display:grid; grid-template-columns:1fr; gap:8px; }
    #ffpro-exit-dialog button {
      height:36px; border:1px solid #22314a; border-radius:9px; background:#111d2d;
      color:#cfe0f5; font-family:inherit; font-size:13px; cursor:pointer;
    }
    #ffpro-exit-dialog button:hover { background:#18283d; color:#fff; }
    #ffpro-exit-dialog button.primary {
      border:0; background:linear-gradient(135deg,#7c3aed,#8b5cf6); color:#fff; font-weight:600;
    }
    #ffpro-exit-dialog button.danger { color:#ffb4c2; }
    #ffpro-exit-dialog button:disabled { opacity:.55; cursor:default; }
    #ffpro-exit-dialog .ffpro-exit-status { min-height:16px; margin-top:10px; font-size:11px; color:#ff9fb2; }

    glyph-tile { background-color:#0f1928 !important; box-shadow:none !important; }
    glyph-tile .thumbnail { background:#f4f7fb !important; }

    .item-chooser__tile-grid, .item-chooser__page-control { color:#c6d6e8; }

    /* ------------------------------------------------------------
       FFpro monochrome redesign — black canvas, white surfaces,
       black/gray pill controls.
       ------------------------------------------------------------ */
    html, body {
      background:#000 !important;
      color:#111 !important;
    }
    #ffpro-topbar { display:none !important; }

    #app__wrapper {
      background:#fff !important;
      color:#111 !important;
      border-radius:30px !important;
      overflow:hidden !important;
      box-shadow:0 22px 70px rgba(0,0,0,.62) !important;
    }
    body[data-ffpro-view="editor"] #app__wrapper {
      top:12px !important; left:308px !important; right:304px !important; bottom:12px !important;
    }
    body[data-ffpro-view="content"] #app__wrapper {
      top:12px !important; left:252px !important; right:12px !important; bottom:12px !important;
    }
    body[data-ffpro-view="start"] #app__wrapper {
      top:0 !important; left:0 !important; right:0 !important; bottom:0 !important;
      background:#000 !important; border-radius:0 !important; box-shadow:none !important;
    }
    #app__main-content, #app__page, .editor__page, .content__page,
    .content-page__right-area, .content-page__left-area {
      background:#fff !important;
      color:#111 !important;
    }

    /* Left white rail */
    #ffpro-sidebar {
      left:12px !important; top:12px !important; bottom:12px !important;
      width:228px !important; padding:22px 14px 16px !important;
      background:#fff !important; border:0 !important; border-radius:30px !important;
      color:#111 !important; gap:14px !important;
      box-shadow:0 22px 70px rgba(0,0,0,.62) !important;
      overflow:hidden !important;
    }
    #ffpro-sidebar .ffpro-side-brand {
      display:flex; align-items:center; gap:10px; padding:0 6px 4px;
      flex:0 0 auto;
    }
    #ffpro-sidebar .ffpro-side-logo {
      width:34px; height:47px; display:block; flex:0 0 auto;
      border-radius:10px; box-shadow:0 0 0 1px #e5e5e5;
    }
    #ffpro-sidebar .ffpro-side-brand-text { min-width:0; }
    #ffpro-sidebar .ffpro-side-name {
      color:#000; font-size:18px; font-weight:800; line-height:1;
      letter-spacing:-.4px;
    }
    #ffpro-sidebar .ffpro-side-sub {
      margin-top:4px; color:#8a8a8a; font-size:8px; font-weight:700;
      letter-spacing:2.2px; text-transform:uppercase; white-space:nowrap;
    }
    #ffpro-sidebar .ffpro-cursor-mark {
      width:15px; height:22px; margin-left:auto; color:#000; flex:0 0 auto;
    }
    #ffpro-sidebar .ffpro-project-card {
      padding:13px 14px !important; border:0 !important; border-radius:18px !important;
      background:#f3f3f3 !important; box-shadow:none !important;
    }
    #ffpro-sidebar .ffpro-project-label { color:#8a8a8a !important; font-size:8.5px; letter-spacing:1.5px; }
    #ffpro-sidebar .ffpro-project-title { color:#000 !important; font-size:13.5px; font-weight:750; }
    #ffpro-sidebar .ffpro-project-sub { color:#6f6f6f !important; font-size:10px; }
    #ffpro-sidebar .ffpro-nav {
      gap:10px !important; overflow-y:auto; padding-right:2px;
    }
    #ffpro-sidebar .ffpro-nav-group { gap:2px; }
    #ffpro-sidebar .ffpro-nav-label {
      color:#9a9a9a !important; font-size:8.5px; letter-spacing:1.4px;
      padding:3px 12px 2px;
    }
    #ffpro-sidebar .ffpro-nav-item {
      min-height:32px; padding:7px 12px !important;
      border:0 !important; border-radius:999px !important;
      background:transparent !important; color:#222 !important;
      font-size:12px !important; font-weight:600; gap:9px !important;
      box-shadow:none !important;
    }
    #ffpro-sidebar .ffpro-nav-item:hover { background:#f1f1f1 !important; color:#000 !important; }
    #ffpro-sidebar .ffpro-nav-item[data-active="true"] {
      background:#000 !important; color:#fff !important;
      border:0 !important; box-shadow:none !important;
    }
    #ffpro-sidebar .ffpro-nav-icon { color:#555 !important; width:15px; height:15px; }
    #ffpro-sidebar .ffpro-nav-item[data-active="true"] .ffpro-nav-icon { color:#fff !important; }
    #ffpro-sidebar .ffpro-nav-icon svg { width:15px; height:15px; }
    #ffpro-sidebar .ffpro-side-footer {
      margin-top:auto; display:flex; flex-direction:column; gap:9px;
      padding-top:10px; flex:0 0 auto;
    }
    #ffpro-sidebar .ffpro-side-primary { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
    #ffpro-sidebar .ffpro-pill {
      height:34px; border:0 !important; border-radius:999px !important;
      font-family:inherit; font-size:12px; font-weight:750; cursor:pointer;
    }
    #ffpro-sidebar .ffpro-pill-primary { background:#000 !important; color:#fff !important; }
    #ffpro-sidebar .ffpro-pill-primary:hover { background:#262626 !important; }
    #ffpro-sidebar .ffpro-pill-secondary { background:#9e9e9e !important; color:#000 !important; }
    #ffpro-sidebar .ffpro-pill-secondary:hover { background:#8b8b8b !important; }
    #ffpro-sidebar .ffpro-side-utils { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; }
    #ffpro-sidebar .ffpro-side-utils button {
      height:32px; border:1px solid #e6e6e6 !important; border-radius:12px !important;
      background:#fff !important; color:#333 !important; cursor:pointer;
      display:flex; align-items:center; justify-content:center; padding:0;
    }
    #ffpro-sidebar .ffpro-side-utils button:hover { background:#000 !important; color:#fff !important; border-color:#000 !important; }
    #ffpro-sidebar .ffpro-side-utils svg { width:15px; height:15px; }
    #ffpro-sidebar .ffpro-side-links { display:flex; gap:6px; }
    #ffpro-sidebar .ffpro-side-links button {
      flex:1; height:28px; border:0 !important; border-radius:999px !important;
      background:transparent !important; color:#777 !important;
      font-family:inherit; font-size:10.5px; font-weight:600; cursor:pointer;
    }
    #ffpro-sidebar .ffpro-side-links button:hover { background:#f1f1f1 !important; color:#000 !important; }
    #ffpro-sidebar .ffpro-side-version {
      text-align:center; color:#b0b0b0 !important; font-size:9px;
      letter-spacing:.6px; padding-top:1px;
    }

    /* Black floating tool rail */
    #ffpro-tools {
      left:250px !important; top:12px !important; bottom:12px !important;
      width:48px !important; padding:10px 0 !important;
      background:#0a0a0a !important; border:1px solid #1b1b1b !important;
      border-radius:24px !important; gap:6px !important; align-items:center !important;
      box-shadow:0 18px 50px rgba(0,0,0,.55) !important;
    }
    .ffpro-tool {
      width:34px !important; height:34px !important; border-radius:50% !important;
      background:transparent !important; color:#a7a7a7 !important;
    }
    .ffpro-tool:hover { background:#1d1d1d !important; color:#fff !important; }
    .ffpro-tool[data-active="true"] {
      background:#fff !important; color:#000 !important; box-shadow:none !important;
    }
    .ffpro-tool[data-active="true"] .ffpro-tool-badge { color:#555 !important; }
    .ffpro-tool svg { width:17px !important; height:17px !important; }
    .ffpro-tool-badge { color:#666 !important; }

    /* White inspector card */
    #ffpro-inspector {
      right:12px !important; top:12px !important; bottom:12px !important;
      width:280px !important; background:#fff !important; border:0 !important;
      border-radius:30px !important; color:#111 !important;
      box-shadow:0 22px 70px rgba(0,0,0,.62) !important;
      overflow-y:auto !important;
    }
    .ffpro-insp-header {
      background:#fff !important; border-bottom:1px solid #eee !important;
      padding:18px 18px 14px !important;
    }
    .ffpro-insp-title { color:#000 !important; font-size:14px !important; font-weight:800; }
    .ffpro-insp-glyph { color:#888 !important; }
    .ffpro-insp-body { padding:4px 18px 20px !important; }
    .ffpro-section { border-bottom:1px solid #eee !important; padding:14px 0 !important; }
    .ffpro-section-title { color:#9a9a9a !important; font-size:8.5px; letter-spacing:1.5px; }
    .ffpro-row { color:#666 !important; font-size:11.5px !important; }
    .ffpro-row strong { color:#000 !important; }
    .ffpro-row input {
      background:#f3f3f3 !important; color:#000 !important;
      border:1px solid #e4e4e4 !important; border-radius:10px !important;
      height:30px !important;
    }
    .ffpro-row input:focus { border-color:#000 !important; box-shadow:none !important; }
    .ffpro-insp-note {
      background:#f3f3f3 !important; border:0 !important; color:#666 !important;
      border-radius:12px !important;
    }
    .ffpro-align button, .ffpro-zoom button {
      background:#f3f3f3 !important; border:1px solid #e4e4e4 !important;
      color:#222 !important; border-radius:999px !important; height:30px !important;
    }
    .ffpro-align button:hover, .ffpro-zoom button:hover {
      background:#000 !important; color:#fff !important; border-color:#000 !important;
    }
    #ffpro-zoom-readout { color:#555 !important; }
    .ffpro-actions { gap:7px !important; }
    .ffpro-action {
      background:#9e9e9e !important; border:0 !important; border-radius:999px !important;
      color:#000 !important; height:34px !important; font-weight:700;
    }
    .ffpro-action:hover { background:#8b8b8b !important; color:#000 !important; }
    .ffpro-action.primary { background:#000 !important; color:#fff !important; box-shadow:none !important; }
    .ffpro-action.primary:hover { background:#262626 !important; }
    .ffpro-xy-row span { color:#666 !important; }
    .ffpro-xy-row input {
      background:#f3f3f3 !important; color:#000 !important;
      border:1px solid #e4e4e4 !important; border-radius:10px !important;
      height:30px !important;
    }
    .ffpro-xy-row input:focus { border-color:#000 !important; }
    .ffpro-xy-row button {
      background:#f3f3f3 !important; border:1px solid #e4e4e4 !important;
      color:#222 !important; border-radius:999px !important; height:30px !important;
    }
    .ffpro-xy-row button:hover { background:#000 !important; color:#fff !important; border-color:#000 !important; }

    /* Editor and content surfaces */
    body[data-ffpro-view="editor"] .editor-page__edit-canvas-wrapper {
      background:#f6f6f6 !important; border-radius:24px !important;
    }
    body[data-ffpro-view="content"] .content__page {
      padding:18px !important; column-gap:18px !important;
    }
    body[data-ffpro-view="content"] .content-page__right-area { border:0 !important; }
    body[data-ffpro-view="content"] .settings-table {
      grid-template-columns: 172px 14px 300px 38px !important;
      column-gap: 10px !important;
      align-items: start !important;
    }
    .settings__label {
      white-space: normal !important;
      line-height: 1.4 !important;
      padding-top: 7px !important;
    }
    .settings-table .value-type { min-width: 0 !important; }
    .panel__card, .page__card {
      background:#f7f7f7 !important; border:1px solid #ededed !important;
      border-radius:18px !important;
      color:#111 !important; box-shadow:none !important; padding:18px !important;
    }
    .panel__card h2, .panel__card h3, .page__card h2, .page__card h3 { color:#000 !important; }
    .panel__card p, .page__card p { color:#555 !important; }
    .panel__card label, .panel__card span, .page__card label { color:#666 !important; }
    .content-page__right-area p, .content-page__right-area li { color:#555 !important; }
    .content-page__right-area h1, .content-page__right-area h2, .content-page__right-area h3 { color:#000 !important; }
    display-canvas { background:#fff !important; border-radius:16px !important; }
    .range-table__list-area {
      background:#fff !important; border:1px solid #e6e6e6 !important;
      border-radius:14px !important; color:#111 !important;
    }
    .range-table__list-area .list__row-wrapper__static { border-top:1px solid #eee !important; }
    .range-table__list-area .list__row-wrapper__static:hover { background:#f6f6f6 !important; }
    .range-table__list-area a { color:#000 !important; }
    .tab-control__tab { color:#777 !important; }
    .tab-control__tab[selected], .tab-control__tab:hover { color:#000 !important; }
    .tab-control__tab-container {
      background:#f3f3f3 !important; border-color:#e4e4e4 !important;
      border-radius:999px !important;
    }
    #content-page__panel .panel__card {
      background:transparent !important; padding:0 !important; box-shadow:none !important;
    }
    #content-page__panel .tab-control__tab-container {
      display:flex !important; flex-direction:column !important; gap:7px !important;
      background:transparent !important; border:0 !important; padding:0 !important;
      border-radius:0 !important;
    }
    #content-page__panel .tab-control__tab {
      display:flex !important; align-items:center !important;
      min-height:42px !important; padding:0 18px !important;
      border-radius:999px !important; background:#f3f3f3 !important;
      color:#555 !important; font-size:13px !important; font-weight:650 !important;
    }
    #content-page__panel .tab-control__tab[selected] {
      background:#000 !important; color:#fff !important;
    }
    input:not([type="checkbox"]):not([type="radio"]), textarea, select {
      background:#f3f3f3 !important; color:#000 !important;
      border:1px solid #e4e4e4 !important; border-radius:10px !important;
    }
    input:focus, textarea:focus, select:focus { border-color:#000 !important; outline:none !important; }
    #context-menu, #modal-dialog .modal-dialog__content {
      background:#fff !important; color:#111 !important;
      border:1px solid #e6e6e6 !important; border-radius:20px !important;
      box-shadow:0 24px 70px rgba(0,0,0,.35) !important;
    }
    .context-menu-row:hover { background:#f3f3f3 !important; }
    .context-menu-row .row-name, .context-menu-row span { color:#111 !important; }
    .modal-dialog__header { border-color:#eee !important; }
    #toast, #error {
      background:#000 !important; color:#fff !important;
      border:0 !important; border-radius:999px !important;
    }
    ::-webkit-scrollbar { width:9px; height:9px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:#d4d4d4; border-radius:999px; border:2px solid #fff; }
    ::-webkit-scrollbar-thumb:hover { background:#b5b5b5; }
    #ffpro-inspector::-webkit-scrollbar-thumb { border-color:#fff; }
    #ffpro-sidebar .ffpro-nav::-webkit-scrollbar-thumb { border-color:#fff; }

    /* Start page: black field with a white paper card */
    body[data-ffpro-view="start"] #open-project__page {
      background:#000 !important;
    }
    body[data-ffpro-view="start"] #app__page,
    body[data-ffpro-view="start"] .open-project__tab-content {
      color:#111 !important;
    }
    body[data-ffpro-view="start"] #open-project__left-area,
    body[data-ffpro-view="start"] .open-project__version-name,
    body[data-ffpro-view="start"] .open-project__version-number,
    body[data-ffpro-view="start"] .open-project__blurb {
      color:#d8d8d8 !important;
    }
    body[data-ffpro-view="start"] #open-project__right-area {
      background:#fff !important; color:#111 !important;
      border-radius:34px !important; padding:38px 42px !important;
      margin:48px 56px 48px 48px !important;
      height:auto !important; min-height:560px !important;
      max-height:calc(100% - 96px) !important;
      width:auto !important; align-self:center !important;
      overflow:auto !important; box-shadow:none !important;
    }
    body[data-ffpro-view="start"] .open-project__tabs {
      display:flex !important; gap:6px !important; border:0 !important;
    }
    body[data-ffpro-view="start"] .open-project__tab {
      height:32px !important; padding:0 16px !important;
      border:0 !important; border-radius:999px !important;
      background:#f3f3f3 !important; color:#777 !important;
      font-family:inherit !important; font-size:12px !important; font-weight:650 !important;
    }
    body[data-ffpro-view="start"] .open-project__tab[selected] {
      background:#000 !important; color:#fff !important;
    }
    body[data-ffpro-view="start"] .open-project__tab:hover { color:#000 !important; }
    body[data-ffpro-view="start"] #input__new-project-name {
      border-radius:999px !important; padding-left:16px !important;
    }
    body[data-ffpro-view="start"] #open-project__right-area h2 { color:#000 !important; }
    body[data-ffpro-view="start"] .open-project__tab { color:#8a8a8a !important; }
    body[data-ffpro-view="start"] .open-project__tab:hover:not([selected]) {
      color:#000 !important;
    }
    body[data-ffpro-view="start"] #input__new-project-name {
      background:#f3f3f3 !important; color:#000 !important;
      border:1px solid #e4e4e4 !important;
    }
    #clair-default-font button {
      background:#9e9e9e !important; color:#000 !important;
      border:0 !important; border-radius:999px !important; font-weight:750;
    }
    #clair-default-font button:hover { background:#8b8b8b !important; }
    #clair-default-font .clair-default-title { color:#555 !important; }
    #clair-default-font .clair-default-note { color:#777 !important; }
    #clair-default-font { border-top-color:#e8e8e8 !important; }

    /* About / preview / exit dialogs */
    #clair-about-overlay > div {
      background:#fff !important; color:#111 !important;
      border-radius:32px !important; padding:30px !important;
    }
    #clair-about-overlay h2 { color:#000 !important; }
    #clair-about-overlay > div > div { color:#555 !important; }
    #clair-about-overlay button {
      background:#000 !important; color:#fff !important;
      border-radius:999px !important; padding:12px 20px !important;
      font-weight:700 !important;
    }
    #glyphr-preview-overlay { background:rgba(0,0,0,.8) !important; }
    #glyphr-preview-overlay > div:first-child {
      background:#fff !important; color:#111 !important;
      border-radius:32px !important; padding:28px !important;
    }
    #glyphr-preview-overlay h2 { color:#000 !important; }
    #glyphr-preview-subtitle { color:#777 !important; }
    #glyphr-preview-text {
      background:#f3f3f3 !important; color:#000 !important;
      border-color:#e4e4e4 !important;
    }
    #glyphr-preview-overlay > div:first-child button {
      background:#000 !important; color:#fff !important;
      border-radius:999px !important; font-weight:700 !important;
    }
    #glyphr-preview-overlay > div:first-child button:hover { background:#262626 !important; }
    #glyphr-preview-overlay #glyphr-preview-sizes > div {
      background:#f6f6f6 !important; border-color:#e8e8e8 !important;
      border-radius:16px !important;
    }

    #ffpro-exit-dialog {
      background:rgba(0,0,0,.8) !important; backdrop-filter:blur(8px) !important;
    }
    #ffpro-exit-dialog .ffpro-exit-panel {
      width:min(520px,100%) !important; background:#fff !important; color:#111 !important;
      border:0 !important; border-radius:32px !important;
      box-shadow:0 30px 100px rgba(0,0,0,.7) !important; padding:30px !important;
    }
    #ffpro-exit-dialog h2 { color:#000 !important; font-size:22px !important; letter-spacing:-.4px; }
    #ffpro-exit-dialog .ffpro-exit-text { color:#333 !important; }
    #ffpro-exit-dialog .ffpro-exit-hint { color:#777 !important; }
    #ffpro-exit-dialog .ffpro-exit-actions {
      display:flex !important; gap:10px !important; grid-template-columns:none !important;
    }
    #ffpro-exit-dialog button {
      height:46px !important; border:0 !important; border-radius:999px !important;
      background:#9e9e9e !important; color:#000 !important;
      font-family:inherit; font-size:13px; font-weight:750; cursor:pointer;
    }
    #ffpro-exit-dialog button:hover { background:#8b8b8b !important; }
    #ffpro-exit-dialog button.primary {
      background:#000 !important; color:#fff !important;
    }
    #ffpro-exit-dialog button.primary:hover { background:#262626 !important; }
    #ffpro-exit-dialog button.danger { color:#000 !important; }
    #ffpro-exit-dialog .ffpro-exit-cancel {
      display:block !important; width:100% !important; height:32px !important;
      margin-top:8px !important; background:transparent !important;
      border:0 !important; outline:none !important; box-shadow:none !important;
      color:#777 !important; font-weight:600 !important; text-decoration:underline;
    }
    #ffpro-exit-dialog .ffpro-exit-cancel:hover { color:#000 !important; background:transparent !important; }
    #ffpro-exit-dialog .ffpro-exit-actions button { flex:1; }

    glyph-tile {
      background-color:#fff !important; border:1px solid #e8e8e8 !important;
      border-radius:12px !important; color:#111 !important; box-shadow:none !important;
    }
    glyph-tile .thumbnail { background:#fff !important; }
    .item-chooser__tile-grid, .item-chooser__page-control { color:#111; }

    /* Local help center */
    #ffpro-help-overlay {
      position:fixed; inset:0; z-index:100000; display:none;
      align-items:center; justify-content:center; padding:36px;
      background:rgba(0,0,0,.62);
      font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;
    }
    #ffpro-help-overlay[open] { display:flex; }
    .ffpro-help-card {
      width:min(1080px, calc(100vw - 72px));
      height:min(780px, calc(100vh - 72px));
      display:grid; grid-template-columns:250px 1fr;
      background:#fff; color:#111; border-radius:32px;
      overflow:hidden; box-shadow:0 30px 100px rgba(0,0,0,.55);
    }
    .ffpro-help-side {
      display:flex; flex-direction:column; gap:5px;
      padding:28px 16px; background:#f4f4f4; overflow-y:auto;
    }
    .ffpro-help-side h2 { margin:0 10px 4px; font-size:20px; font-weight:800; letter-spacing:-.4px; }
    .ffpro-help-sub { margin:0 10px 16px; color:#999; font-size:10.5px; line-height:1.5; }
    .ffpro-help-topic {
      border:0; border-radius:999px; background:transparent; color:#555;
      padding:11px 14px; text-align:left; font-family:inherit; font-size:13px;
      font-weight:600; cursor:pointer;
    }
    .ffpro-help-topic:hover { background:#e8e8e8; color:#000; }
    .ffpro-help-topic[data-active="true"] { background:#000; color:#fff; }
    .ffpro-help-main { position:relative; padding:30px 36px 40px; overflow-y:auto; }
    .ffpro-help-head {
      display:flex; align-items:flex-start; justify-content:space-between; gap:16px;
      margin-bottom:10px;
    }
    .ffpro-help-head h1 { margin:0; font-size:28px; line-height:1.2; letter-spacing:-.7px; }
    .ffpro-help-close {
      flex:0 0 auto; height:34px; padding:0 16px; border:0; border-radius:999px;
      background:#000; color:#fff; font-family:inherit; font-size:12px;
      font-weight:700; cursor:pointer;
    }
    .ffpro-help-close:hover { background:#262626; }
    .ffpro-help-main h2 { margin:24px 0 7px; font-size:16.5px; letter-spacing:-.2px; }
    .ffpro-help-main h3 { margin:18px 0 5px; font-size:14px; }
    .ffpro-help-main p, .ffpro-help-main li { font-size:13.5px; line-height:1.85; color:#444; }
    .ffpro-help-main ul, .ffpro-help-main ol { padding-left:22px; margin:7px 0 12px; }
    .ffpro-help-main b, .ffpro-help-main strong { color:#111; }
    .ffpro-help-main code, .ffpro-help-main kbd {
      background:#f2f2f2; border-radius:6px; padding:1px 6px;
      font-family:Consolas,'Cascadia Mono',monospace; font-size:12px; color:#000;
    }
    .ffpro-help-table { width:100%; border-collapse:collapse; margin:10px 0 16px; }
    .ffpro-help-table td {
      border-bottom:1px solid #eee; padding:8px 6px;
      font-size:12.5px; color:#555; vertical-align:top;
    }
    .ffpro-help-table td:first-child { width:150px; color:#111; white-space:nowrap; }
    .ffpro-help-note {
      margin:16px 0; padding:12px 16px; border-radius:14px;
      background:#f5f5f5; color:#666 !important; font-size:12.5px;
    }
  `;

  const style = document.createElement("style");
  style.id = "ffpro-ui-style";
  style.textContent = STYLE;
  document.head.appendChild(style);

  document.body.dataset.ffproView = "start";
  document.body.appendChild(buildTopBar());
  document.body.appendChild(buildSidebar());
  const tools = make("div", "", "");
  tools.id = "ffpro-tools";
  document.body.appendChild(tools);
  document.body.appendChild(buildInspector());
  document.body.appendChild(buildProDrawer());
  document
    .getElementById("ffpro-pro-toggle")
    .addEventListener("click", toggleProDrawer);
  buildNav();

  document.addEventListener(
    "keydown",
    (event) => {
      if (isTypingTarget(event.target)) return;
      if (event.ctrlKey || event.metaKey || event.altKey) {
        if (event.ctrlKey && event.key === "1") {
          event.preventDefault();
          event.stopPropagation();
          const editor = getEditor();
          if (editor) editor.setViewZoom(100);
        }
        return;
      }
      if (event.key.toLowerCase() === "h") {
        event.preventDefault();
        event.stopPropagation();
        const source = document.querySelector(
          'button.editor-page__tool[title="Pan the edit canvas"]',
        );
        if (source) source.click();
        else {
          const editor = getEditor();
          if (editor) {
            editor.selectedTool = "pan";
            editor.publish("whichToolIsSelected", "pan");
          }
        }
      }
    },
    true,
  );

  if (window.ffpro && typeof window.ffpro.onRequestClose === "function") {
    window.ffpro.onRequestClose(showExitDialog);
  }

  function hideBootCover() {
    const cover = document.getElementById("ffpro-boot-cover");
    if (!cover || cover.dataset.hidden === "1") return;
    cover.dataset.hidden = "1";
    setTimeout(() => {
      if (cover.isConnected) cover.remove();
    }, 260);
  }

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        helpOverlay &&
        helpOverlay.hasAttribute("open")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeHelp();
      }
    },
    true,
  );

  installShadowStyles();
  hideBootCover();
  updateView();
  setInterval(updateView, 300);
  window.__ffproUiEnsure = updateView;
  window.__ffproSelectTool = selectToolById;
  window.__ffproHideBootCover = hideBootCover;
  window.__ffproShowHelp = openHelp;
})();
