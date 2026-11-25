(() => {
  if (window.__glyphrPreviewInstalled) return;
  window.__glyphrPreviewInstalled = true;

  const locale = (
    window.__glyphrLocale ||
    navigator.language ||
    "en"
  ).toLowerCase();
  const isZh = locale.startsWith("zh");
  const T = isZh
    ? {
        button: "👁 预览字体",
        title: "字体预览",
        currentFont: "当前字体：",
        noFont: "未载入字体",
        unnamedFont: "未命名字体",
        close: "关闭",
        randomQuote: "随机名言",
        alphabet: "字母表",
        refresh: "刷新预览",
        loadFirst:
          "请先载入字体：点「载入」，把 TTF 或 OTF 拖进窗口。",
      }
    : {
        button: "👁 Preview Font",
        title: "Font Preview",
        currentFont: "Current font: ",
        noFont: "No font loaded",
        unnamedFont: "Untitled font",
        close: "Close",
        randomQuote: "Random Quote",
        alphabet: "Alphabet",
        refresh: "Refresh",
        loadFirst:
          "Load a font first: click Load and drag a TTF or OTF into the window.",
      };

  const QUOTES = [
    "The quick brown fox jumps over the lazy dog.",
    "Simplicity is the ultimate sophistication.",
    "Good design is as little design as possible.",
    "Stay hungry, stay foolish.",
    "The best way to predict the future is to invent it.",
    "Less is more.",
  ];
  const SIZES = [12, 16, 20, 24, 32, 40, 56, 72];

  let quoteIndex = 0;
  let overlay = null;
  let textInput = null;
  let canvases = [];

  function getEditor() {
    const app = window._GlyphrStudioApp;
    return app && app.selectedProjectEditor;
  }

  function getFontLabel() {
    const editor = getEditor();
    const font =
      editor && editor.project && editor.project.settings
        ? editor.project.settings.font
        : null;
    if (!font) return T.noFont;
    return `${font.family || T.unnamedFont} · ${font.style || "Regular"}`;
  }

  function makeButton(label, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.style.cssText =
      "border:0;border-radius:999px;padding:11px 18px;background:#000;color:#fff;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;";
    button.addEventListener("click", handler);
    return button;
  }

  function ensureButton() {
    if (document.getElementById("glyphr-preview-button")) return;
    if (!document.body) return;
    const button = document.createElement("button");
    button.id = "glyphr-preview-button";
    button.type = "button";
    button.textContent = T.button;
    button.style.cssText =
      "display:none;position:fixed;right:24px;bottom:24px;z-index:999997;border:0;border-radius:999px;padding:12px 18px;background:linear-gradient(135deg,#7c4dff,#b24dff);color:#fff;font-size:15px;font-weight:600;font-family:system-ui,'Microsoft YaHei UI',sans-serif;box-shadow:0 8px 24px rgba(90,40,180,.35);cursor:pointer;";
    button.addEventListener("click", openPreview);
    document.body.appendChild(button);
  }

  function createOverlay() {
    overlay = document.createElement("div");
    overlay.id = "glyphr-preview-overlay";
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:999998;background:rgba(0,0,0,.8);display:none;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;";
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closePreview();
    });

    const panel = document.createElement("div");
    panel.style.cssText =
      "width:min(1100px,100%);max-height:calc(100vh - 48px);overflow:auto;background:#fff;border-radius:32px;box-shadow:0 30px 100px rgba(0,0,0,.7);padding:28px 30px 32px;font-family:system-ui,'Microsoft YaHei UI',sans-serif;color:#111;box-sizing:border-box;";

    const header = document.createElement("div");
    header.style.cssText =
      "display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:8px;";

    const titleWrap = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = T.title;
    title.style.cssText = "margin:0;font-size:24px;line-height:1.2;";
    const subtitle = document.createElement("div");
    subtitle.id = "glyphr-preview-subtitle";
    subtitle.style.cssText = "margin-top:4px;color:#55708f;font-size:13px;";
    titleWrap.append(title, subtitle);

    const close = document.createElement("button");
    close.type = "button";
    close.textContent = T.close;
    close.style.cssText =
      "border:0;border-radius:999px;padding:10px 18px;background:#9e9e9e;color:#000;font-size:13px;font-weight:700;cursor:pointer;";
    close.addEventListener("click", closePreview);
    header.append(titleWrap, close);

    const controls = document.createElement("div");
    controls.style.cssText =
      "display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start;margin:12px 0 18px;";

    textInput = document.createElement("textarea");
    textInput.id = "glyphr-preview-text";
    textInput.value = QUOTES[0];
    textInput.rows = 2;
    textInput.style.cssText =
      "flex:1 1 420px;min-height:52px;resize:vertical;border:1px solid #e4e4e4;border-radius:14px;padding:10px 14px;font-size:14px;font-family:inherit;background:#f3f3f3;color:#000;box-sizing:border-box;";
    textInput.addEventListener("input", updateText);

    const randomButton = makeButton(T.randomQuote, () => {
      quoteIndex = (quoteIndex + 1) % QUOTES.length;
      textInput.value = QUOTES[quoteIndex];
      updateText();
    });

    const alphabetButton = makeButton(T.alphabet, () => {
      textInput.value =
        "abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789 !?&@#%()[]{}";
      updateText();
    });

    const refreshButton = makeButton(T.refresh, () => rebuildCanvases());

    controls.append(textInput, randomButton, alphabetButton, refreshButton);

    const sizeWrap = document.createElement("div");
    sizeWrap.id = "glyphr-preview-sizes";
    sizeWrap.style.cssText = "display:flex;flex-direction:column;gap:14px;";

    panel.append(header, controls, sizeWrap);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  }

  function updateHeader() {
    const subtitle = document.getElementById("glyphr-preview-subtitle");
    if (subtitle) subtitle.textContent = `${T.currentFont}${getFontLabel()}`;
  }

  function updateText() {
    if (!textInput) return;
    const text = textInput.value;
    for (const canvas of canvases) {
      canvas.setAttribute("text", text);
    }
  }

  function rebuildCanvases() {
    const sizeWrap = document.getElementById("glyphr-preview-sizes");
    if (!sizeWrap) return;

    sizeWrap.innerHTML = "";
    canvases = [];
    updateHeader();
    const text = textInput ? textInput.value : QUOTES[0];

    for (const size of SIZES) {
      const row = document.createElement("div");
      row.style.cssText =
        "background:#f6f6f6;border:1px solid #e8e8e8;border-radius:16px;padding:10px 14px;overflow:hidden;";

      const label = document.createElement("div");
      label.textContent = `${size} px`;
      label.style.cssText =
        "font-size:12px;color:#6b7c93;margin-bottom:4px;font-family:system-ui,'Microsoft YaHei UI',sans-serif;";
      row.appendChild(label);
      sizeWrap.appendChild(row);

      const canvas = document.createElement("display-canvas");
      canvas.setAttribute("font-size", String(size));
      canvas.setAttribute(
        "line-gap",
        String(Math.max(4, Math.round(size * 0.35))),
      );
      canvas.setAttribute("page-padding", "6");
      canvas.setAttribute("show-page-extras", "false");
      canvas.setAttribute("show-line-extras", "false");
      canvas.setAttribute("show-character-extras", "false");
      canvas.setAttribute("show-placeholder-message", "false");
      canvas.setAttribute("text", text);
      row.appendChild(canvas);
      canvases.push(canvas);
    }
  }

  function openPreview() {
    const editor = getEditor();
    if (!editor || !editor.project) {
      alert(T.loadFirst);
      return;
    }

    if (!overlay) createOverlay();
    overlay.style.display = "flex";
    updateHeader();
    rebuildCanvases();
  }

  window.__glyphrOpenPreview = openPreview;

  function closePreview() {
    if (overlay) overlay.style.display = "none";
  }

  ensureButton();
  const timer = setInterval(ensureButton, 800);
  setTimeout(() => clearInterval(timer), 30000);
})();
