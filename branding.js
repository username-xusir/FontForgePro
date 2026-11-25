(() => {
  if (window.__clairBrandInstalled) return;
  window.__clairBrandInstalled = true;

  const locale = (
    window.__glyphrLocale ||
    navigator.language ||
    "en"
  ).toLowerCase();
  const isZh = locale.startsWith("zh");

  const B = isZh
    ? {
        brand: "FontForgePro",
        windowTitle: "FontForgePro · 字体设计",
        version: "v1.0.0",
        about: "关于",
        home: "开始页",
        homeTitle: "返回开始页（会先自动保存当前项目）",
        exit: "退出",
        exitTitle: "退出 FontForgePro（会先自动保存当前项目）",
        logoSub: "字体编辑器",
        blurb:
          '本地字体编辑工作台<br>遵循 GPL-3.0 开源许可。',
        welcome: `
          <h2>欢迎使用 FontForgePro</h2>
          <p>FontForgePro（简称 FFpro）是一个本地字体编辑工作台。先在「载入」里拖入一个 TTF/OTF，或新建一个字体项目。</p>
          <p>左侧是工具轨，右侧是属性栏；改完字形后用「预览字体」检查效果。</p>
        `,
        credits: `
          <p>FontForgePro · 本地字体编辑工具<br>遵循 GPL-3.0 许可，开源许可与致谢见「关于」。</p>
          <button class="clair-about-button" type="button">关于 FFpro</button>
        `,
        aboutTitle: "关于 FontForgePro",
        aboutBody:
          "FontForgePro（简称 FFpro）是一个本地离线字体编辑工作台，界面与交互参考常见设计工具的操作习惯。<br><br>" +
          "本程序遵循 GNU GPL v3 许可；完整许可文本、版权与作者声明保留在程序附带的 LICENSE 文件和「关于 → 许可」中。",
        defaultFontTitle: "或者，从一套可编辑的默认字体开始",
        defaultFontButton: "载入 FFpro Starter",
        defaultFontLoading: "正在载入默认字体…",
        defaultFontNote:
          "FFpro Starter · 拉丁练习字体 · 基于 Noto Sans SC（SIL OFL）",
        defaultFontError: "默认字体载入失败，请重试。",
      }
    : {
        brand: "FontForgePro",
        windowTitle: "FontForgePro",
        version: "v1.0.0",
        about: "About",
        home: "Start",
        homeTitle: "Back to the start page (current project will be auto-saved)",
        exit: "Exit",
        exitTitle: "Quit FontForgePro (current project will be auto-saved)",
        logoSub: "FONT EDITOR",
        blurb:
          'Local font editing workspace<br>Released under the GPL-3.0 license.',
        welcome: `
          <h2>Welcome to FontForgePro</h2>
          <p>FontForgePro (FFpro) is a local font editing workspace. Load a TTF/OTF file or create a new font project to get started.</p>
          <p>Use the tool rail on the left and the properties panel on the right; check your work with Preview Font.</p>
        `,
        credits: `
          <p>FontForgePro · local font editor<br>GPL-3.0; licenses and credits are available under About.</p>
          <button class="clair-about-button" type="button">About FFpro</button>
        `,
        aboutTitle: "About FontForgePro",
        aboutBody:
          "FontForgePro (FFpro) is a local, offline font editing workspace, with interaction patterns inspired by common design tools.<br><br>" +
          "This program is distributed under GNU GPL v3; the complete license, copyright, and author notices are retained in the bundled LICENSE file and under About → License.",
        defaultFontTitle: "Or start from an editable default font",
        defaultFontButton: "Load FFpro Starter",
        defaultFontLoading: "Loading default font…",
        defaultFontNote:
          "FFpro Starter · Latin practice font · based on Noto Sans SC (SIL OFL)",
        defaultFontError: "Could not load the default font. Please try again.",
      };

  const STYLE_ID = "clair-brand-style";

  // User-supplied FFpro mark: a black italic "f" on a pale rounded card.
  // The original SVG painted the card after the strokes; the card is emitted
  // first here so the mark is actually visible.
  const FF_F_PATHS = `
    <path d="M0 0C4.97321 0.000244141 308.5 0 308.5 0" stroke-width="70" stroke="#000000" stroke-linecap="round" transform="translate(195 376)"/>
    <path d="M451.5 22.7106C310.305 -155.889 135.704 787.779 0 457.712" stroke-width="100" stroke="#000000" stroke-linecap="round" transform="translate(85 164.789)"/>`;

  function logoSvg(prefix, className, shape = "square") {
    const portrait = shape === "portrait";
    const gradient = portrait
      ? 'gradientTransform="matrix(0 428 -310 0 310 428)"'
      : 'gradientTransform="matrix(0 500 -500 0 428 428)"';
    const background = portrait
      ? '<path d="M228 0L392 0C517.938 0 620 102.062 620 228L620 628C620 753.938 517.938 856 392 856L228 856C102.062 856 0 753.938 0 628L0 228C0 102.062 102.062 0 228 0Z" fill="url(#' +
        prefix +
        '-userbg)"/>'
      : `<rect width="856" height="856" rx="228" fill="url(#${prefix}-userbg)"/>`;
    const mark = portrait
      ? FF_F_PATHS
      : `<g transform="translate(118 0)">${FF_F_PATHS}</g>`;
    return `<svg class="${className}" viewBox="${portrait ? "0 0 620 856" : "0 0 856 856"}" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="${prefix}-userbg" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" ${gradient}>
          <stop offset="1" stop-color="#EBF4F5"/>
        </radialGradient>
      </defs>
      ${background}
      ${mark}
    </svg>`;
  }

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #open-project__logo {
        display: none !important;
      }
      #clair-brand-logo {
        width: 360px;
        margin: 0 0 22px 0;
        user-select: none;
        pointer-events: none;
      }
      #clair-brand-logo .clair-brand-lockup {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      #clair-brand-logo .clair-brand-icon {
        width: 84px;
        height: 116px;
        display: block;
        flex: 0 0 auto;
        border-radius: 21px;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, .10), 0 18px 40px rgba(0, 0, 0, .45);
      }
      #clair-brand-logo .clair-brand-word {
        font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif;
        font-size: 44px;
        font-weight: 800;
        line-height: .95;
        letter-spacing: -1.8px;
        color: #f2f7ff;
      }
      #clair-brand-logo .clair-brand-sub {
        margin: 14px 0 0 3px;
        font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 8px;
        color: #9a9a9a;
        text-transform: uppercase;
      }
      #clair-brand-logo .clair-brand-rule {
        width: 110px;
        height: 3px;
        margin-top: 14px;
        border-radius: 2px;
        background: linear-gradient(90deg, #EBF4F5 0%, rgba(235, 244, 245, 0) 100%);
      }
      #clair-default-font {
        margin-top: 24px;
        padding-top: 18px;
        border-top: 1px solid rgba(125, 211, 252, .18);
        max-width: 430px;
      }
      #clair-default-font .clair-default-title {
        font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif;
        font-size: 13px;
        color: #555555;
        margin-bottom: 10px;
      }
      #clair-default-font button {
        border: 0;
        border-radius: 999px;
        padding: 11px 18px;
        background: #9e9e9e;
        color: #000000;
        font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }
      #clair-default-font button:hover {
        background: #8b8b8b;
      }
      #clair-default-font button:disabled {
        opacity: .6;
        cursor: default;
      }
      #clair-default-font .clair-default-note {
        margin-top: 8px;
        font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif;
        font-size: 11px;
        line-height: 1.5;
        color: #777777;
      }
      .top-bar__logo {
        display: flex !important;
        align-items: center;
        gap: 8px;
        height: 30px;
        margin-left: 4px !important;
      }
      .top-bar__logo .clair-top-icon {
        width: 26px;
        height: 26px;
        display: block;
        flex: 0 0 auto;
        border-radius: 7px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, .22);
      }
      .top-bar__logo .clair-top-name {
        color: #1b314a;
        font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 1px;
      }
      .top-bar__bug-contact {
        display: flex !important;
        align-items: center;
        gap: 2px;
        opacity: 1 !important;
      }
      .top-bar__bug-contact button {
        white-space: nowrap;
      }
      .top-bar__bug-contact button:hover {
        background: #eef4fb !important;
      }
    `;
    document.head.appendChild(style);
  }

  function showAbout() {
    let overlay = document.getElementById("clair-about-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "clair-about-overlay";
      overlay.style.cssText =
        "position:fixed;inset:0;z-index:1000000;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;";
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) overlay.style.display = "none";
      });

      const panel = document.createElement("div");
      panel.style.cssText =
        "width:min(520px,100%);background:#fff;color:#111;border-radius:32px;box-shadow:0 30px 100px rgba(0,0,0,.7);padding:30px;font-family:system-ui,'Microsoft YaHei UI',sans-serif;box-sizing:border-box;";

      const title = document.createElement("h2");
      title.textContent = B.aboutTitle;
      title.style.cssText = "margin:0 0 8px;font-size:22px;";

      const version = document.createElement("div");
      version.textContent = `${B.brand} ${B.version}`;
      version.style.cssText = "color:#777;font-size:13px;margin-bottom:14px;";

      const body = document.createElement("div");
      body.innerHTML = B.aboutBody;
      body.style.cssText = "font-size:14px;line-height:1.7;color:#444;";

      const close = document.createElement("button");
      close.type = "button";
      close.textContent = isZh ? "关闭" : "Close";
      close.style.cssText =
        "margin-top:20px;border:0;border-radius:999px;padding:12px 22px;background:#000;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;";
      close.addEventListener("click", () => {
        overlay.style.display = "none";
      });

      panel.append(title, version, body, close);
      overlay.appendChild(panel);
      document.body.appendChild(overlay);
    }
    overlay.style.display = "flex";
  }

  function replaceWelcomeCards() {
    const nodes = Array.from(document.querySelectorAll("h2, h3"));
    for (const node of nodes) {
      const text = (node.textContent || "").trim();
      if (
        /Welcome to (Glyphr Studio|FFpro)/i.test(text) ||
        /欢迎使用 (Glyphr Studio|FFpro)/.test(text)
      ) {
        const card = node.closest(".panel__card");
        if (card && card.dataset.clairBrand !== "1") {
          card.dataset.clairBrand = "1";
          card.innerHTML = B.welcome;
        }
      }
    }

    const cards = Array.from(document.querySelectorAll(".panel__card"));
    for (const card of cards) {
      if (card.dataset.clairBrand === "1") continue;
      const text = card.textContent || "";
      if (
        /Glyphr Studio is open source/i.test(text) ||
        /Glyphr Studio 是开源项目/.test(text) ||
        /FFpro is open source/i.test(text) ||
        /FFpro 是开源项目/.test(text) ||
        /FFpro 基于.*Glyphr Studio/.test(text) ||
        /FFpro 基于.*FFpro.*开源项目/.test(text)
      ) {
        card.dataset.clairBrand = "1";
        card.innerHTML = B.credits;
        const button = card.querySelector(".clair-about-button");
        if (button) {
          button.style.cssText =
            "border:1px solid #d5e0ee;border-radius:8px;padding:7px 12px;background:#fff;color:#243b55;font-size:12px;cursor:pointer;font-family:inherit;";
          button.addEventListener("click", showAbout);
        }
      }
    }
  }

  function brandTextValue(value) {
    let next = value;
    next = next
      .replace(/新建\s*Glyphr Studio\s*项目/g, "新建 FFpro 项目")
      .replace(/Start a new Glyphr Studio project/gi, "Start a new FontForgePro project")
      .replace(/Glyphr Studio\s*项目/g, "FFpro 项目")
      .replace(/Glyphr Studio Project/g, "FFpro Project")
      .replace(/Glyphr Studio/g, "FFpro")
      .replace(/Glyphr/g, "FFpro")
      .replace(
        /glyphrstudio\.com/gi,
        isZh ? "本地离线版" : "local offline build",
      );
    if (isZh) {
      next = next
        .replace(/^This (FFpro.*)$/, "此 $1")
        .replace(/^this (FFpro.*)$/, "此 $1");
    }
    return next;
  }

  function isLicenseCard(card) {
    if (!card) return false;
    if (card.dataset.clairLicense === "1") return true;
    const text = card.textContent || "";
    const isLicense =
      /GNU (General Public License|通用公共许可证)|Licensed under a GNU|Copyright ©|版权 ©|Matthew LaGrandeur/i.test(
        text,
      );
    if (isLicense) card.dataset.clairLicense = "1";
    return isLicense;
  }

  function replaceBrandText(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("#clair-about-overlay")) {
          return NodeFilter.FILTER_REJECT;
        }
        if (
          parent.closest(
            "#clair-brand-logo, .open-project__blurb, [data-clair-brand='1']",
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        if (isLicenseCard(parent.closest(".page__card, .panel__card"))) {
          return NodeFilter.FILTER_REJECT;
        }
        const aboutArea = parent.closest(".content-page__right-area");
        if (
          aboutArea &&
          /Contribute!|Version Information|版本信息/.test(
            aboutArea.textContent || "",
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        const tag = parent.tagName;
        if (
          tag === "SCRIPT" ||
          tag === "STYLE" ||
          tag === "NOSCRIPT" ||
          tag === "TEXTAREA" ||
          tag === "CODE" ||
          tag === "PRE"
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const value = node.nodeValue;
      if (!value || !/Glyphr|glyphrstudio/i.test(value)) continue;
      const next = brandTextValue(value);
      if (next !== value) node.nodeValue = next;
    }
  }

  function ensureStartLogo() {
    const startLogo = document.getElementById("open-project__logo");
    if (startLogo) startLogo.style.display = "none";

    let own = document.getElementById("clair-brand-logo");
    if (own) return;

    const host = startLogo ? startLogo.parentElement : null;
    if (!host) return;

    own = document.createElement("div");
    own.id = "clair-brand-logo";
    own.innerHTML = `
      <div class="clair-brand-lockup">
        ${logoSvg("start", "clair-brand-icon", "portrait")}
        <div class="clair-brand-word">FontForgePro</div>
      </div>
      <div class="clair-brand-sub">${B.logoSub}</div>
      <div class="clair-brand-rule"></div>
    `;
    const sub = own.querySelector(".clair-brand-sub");
    if (sub) sub.style.letterSpacing = isZh ? "5px" : "8px";
    host.insertBefore(own, startLogo);
  }

  async function loadDefaultFont(button) {
    button.disabled = true;
    button.textContent = B.defaultFontLoading;
    try {
      const response = await fetch("fonts/FFpro-Starter.ttf");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const file = new File([blob], "FFpro-Starter.ttf", {
        type: "font/ttf",
      });
      const handle = {
        kind: "file",
        name: file.name,
        getFile: async () => file,
      };
      const savedPicker = window.showOpenFilePicker;
      window.showOpenFilePicker = async () => [handle];
      const loadButton = document.querySelector(
        "#tab-content__load fancy-button",
      );
      if (!loadButton) throw new Error("Load tab button not found");
      try {
        loadButton.click();
      } finally {
        setTimeout(() => {
          window.showOpenFilePicker = savedPicker;
        }, 2000);
      }
    } catch (error) {
      console.error("[FFpro] default font failed", error);
      button.disabled = false;
      button.textContent = B.defaultFontButton;
      const note = button.parentElement?.querySelector(".clair-default-note");
      if (note) note.textContent = B.defaultFontError;
    }
  }

  function addDefaultFontOption() {
    const host = document.getElementById("tab-content__new");
    if (!host || document.getElementById("clair-default-font")) return;

    const wrap = document.createElement("div");
    wrap.id = "clair-default-font";
    wrap.innerHTML = `
      <div class="clair-default-title">${B.defaultFontTitle}</div>
      <button type="button">${B.defaultFontButton}</button>
      <div class="clair-default-note">${B.defaultFontNote}</div>
    `;
    host.appendChild(wrap);
    const button = wrap.querySelector("button");
    button.addEventListener("click", () => loadDefaultFont(button));
  }

  function saveProjectSilently() {
    try {
      const app = window._GlyphrStudioApp;
      if (app && typeof app.addAutoSaveState === "function") {
        app.addAutoSaveState();
      }
    } catch (error) {
      console.warn("[FFpro] auto-save before exit failed", error);
    }
  }

  function returnToStart() {
    saveProjectSilently();
    if (window.ffpro && typeof window.ffpro.reload === "function") {
      window.ffpro.reload();
    } else {
      window.location.reload();
    }
  }

  function exitApp() {
    saveProjectSilently();
    if (window.ffpro && typeof window.ffpro.quit === "function") {
      window.ffpro.quit();
    } else {
      window.close();
    }
  }

  function topBarButton(label, title, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.title = title;
    button.style.cssText =
      "border:0;border-radius:6px;background:transparent;color:#425b76;font-size:12px;cursor:pointer;padding:6px 8px;font-family:inherit;";
    button.addEventListener("click", handler);
    return button;
  }

  function hidePartnerBlocks() {
    document.querySelectorAll(".panel__card, .page__card").forEach((card) => {
      const text = card.textContent || "";
      if (
        /Contribute!|Send Feedback|Make a Monetary Contribution/i.test(text)
      ) {
        card.style.display = "none";
      }
    });
    document.querySelectorAll(".tab-control__tab").forEach((tab) => {
      if (/^(Contact and socials|联系与社交)$/i.test(tab.textContent.trim())) {
        tab.style.display = "none";
      }
    });
  }

  function fixAboutDetails() {
    const rightArea = [...document.querySelectorAll(".content-page__right-area")]
      .find((element) =>
        /Contribute!|Version Information|版本信息/.test(
          element.textContent || "",
        ),
      );
    if (!rightArea) return;
    const paragraph = [...rightArea.querySelectorAll("p")].find((element) =>
      /更多信息|More information about this and past versions/i.test(
        element.textContent || "",
      ),
    );
    if (paragraph && paragraph.dataset.clairBrand !== "1") {
      paragraph.dataset.clairBrand = "1";
      paragraph.innerHTML = isZh
        ? `FontForgePro（FFpro）基于 <strong>Glyphr Studio 2.10.0</strong> 构建，遵循 GPL-3.0 许可。`
        : `FontForgePro (FFpro) is built on <strong>Glyphr Studio 2.10.0</strong> under the GPL-3.0 license.`;
    }
    rightArea
      .querySelectorAll(".about-page__logo")
      .forEach((logo) => (logo.style.display = "none"));
    rightArea.querySelectorAll("h3").forEach((heading) => {
      const headingText = heading.textContent.trim();
      if (/^Glyphr Studio App$/i.test(headingText)) {
        heading.textContent = isZh ? "FontForgePro 应用" : "FontForgePro App";
      } else if (/^(FFpro|FontForgePro) Project$/i.test(headingText)) {
        heading.textContent = isZh ? "FontForgePro 项目" : "FontForgePro Project";
      } else if (/^(此 )?(FFpro|FontForgePro) 项目$/.test(headingText)) {
        heading.textContent = "此 FontForgePro 项目";
      }
    });
  }

  function fixHelpPage() {
    const rightArea = [...document.querySelectorAll(".content-page__right-area")]
      .find((element) =>
        /Help articles|help site|帮助文章|帮助站点|帮助与文档/i.test(
          element.textContent || "",
        ),
      );
    if (!rightArea || rightArea.dataset.ffproHelpLocal === "1") return;
    rightArea.dataset.ffproHelpLocal = "1";
    rightArea.dataset.clairBrand = "1";
    rightArea.innerHTML = isZh
      ? `
        <h1>FontForgePro 帮助与教程</h1>
        <p style="font-size:14px;line-height:1.8;color:#555;">教程已经全部内置在 FFpro 中，不需要联网，也不会打开外部网站。点击下面的按钮打开本地教程中心。</p>
        <ul style="font-size:13.5px;line-height:1.9;color:#555;">
          <li>快速开始、界面与工具轨</li>
          <li>顶点、控制柄、右键加点</li>
          <li>变换、对齐、分布、极值点、简化</li>
          <li>布尔运算、组件、连字、字距</li>
          <li>预览、保存、导出、安装字体</li>
          <li>完整快捷键表和常见问题</li>
        </ul>
        <button type="button" id="ffpro-help-local-open" style="margin-top:18px;height:44px;padding:0 24px;border:0;border-radius:999px;background:#000;color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;">打开本地教程</button>
      `
      : `
        <h1>FontForgePro help & tutorials</h1>
        <p style="font-size:14px;line-height:1.8;color:#555;">All tutorials are bundled inside FFpro. No network access or external website is required.</p>
        <ul style="font-size:13.5px;line-height:1.9;color:#555;">
          <li>Quick start, interface and tools</li>
          <li>Points, handles and right-click adding</li>
          <li>Transforms, alignment, distribution, extrema and simplify</li>
          <li>Booleans, components, ligatures and kerning</li>
          <li>Preview, save, export and install fonts</li>
          <li>Full shortcut reference and FAQ</li>
        </ul>
        <button type="button" id="ffpro-help-local-open" style="margin-top:18px;height:44px;padding:0 24px;border:0;border-radius:999px;background:#000;color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;">Open local tutorials</button>
      `;
    const button = rightArea.querySelector("#ffpro-help-local-open");
    if (button) {
      button.addEventListener("click", () => {
        if (typeof window.__ffproShowHelp === "function") {
          window.__ffproShowHelp("quick");
        }
      });
    }
  }

  function applyBranding() {
    installStyle();

    if (document.title !== B.windowTitle) {
      document.title = B.windowTitle;
    }

    const topLogo = document.querySelector(".top-bar__logo");
    if (topLogo && topLogo.dataset.clairBrand !== "1") {
      topLogo.dataset.clairBrand = "1";
      topLogo.innerHTML = `${logoSvg(
        "top",
        "clair-top-icon",
      )}<span class="clair-top-name">FFpro</span>`;
    }

    const bugContact = document.querySelector(".top-bar__bug-contact");
    if (bugContact && bugContact.dataset.clairBrand !== "1") {
      bugContact.dataset.clairBrand = "1";
      bugContact.innerHTML = "";
      bugContact.appendChild(
        topBarButton(B.home, B.homeTitle, returnToStart),
      );
      bugContact.appendChild(topBarButton(B.exit, B.exitTitle, exitApp));
      bugContact.appendChild(topBarButton(B.about, B.aboutTitle, showAbout));
    }

    ensureStartLogo();
    addDefaultFontOption();

    const versionName = document.querySelector(".open-project__version-name");
    if (versionName && versionName.textContent !== B.brand) {
      versionName.textContent = B.brand;
    }
    const versionNumber = document.querySelector(".open-project__version-number");
    if (versionNumber && versionNumber.textContent !== B.version) {
      versionNumber.textContent = B.version;
    }
    const blurb = document.querySelector(".open-project__blurb");
    if (blurb && blurb.innerHTML !== B.blurb) {
      blurb.innerHTML = B.blurb;
    }

    document
      .querySelectorAll(
        'a[href*="mailto:mail@glyphrstudio.com"], a[href*="glyphrstudio.com"]',
      )
      .forEach((link) => {
        const aboutArea = link.closest(".content-page__right-area");
        if (
          aboutArea &&
          /Contribute!|Version Information|版本信息/.test(
            aboutArea.textContent || "",
          )
        ) {
          return;
        }
        link.removeAttribute("href");
        link.style.display = "none";
      });

    hidePartnerBlocks();
    fixAboutDetails();
    fixHelpPage();
    replaceWelcomeCards();
    replaceBrandText(document.body);
  }

  function needsBranding() {
    const topLogo = document.querySelector(".top-bar__logo");
    if (topLogo && !topLogo.querySelector("svg.clair-top-icon")) return true;
    const bugContact = document.querySelector(".top-bar__bug-contact");
    if (bugContact && bugContact.dataset.clairBrand !== "1") return true;
    const startPage = document.getElementById("open-project__page");
    if (startPage && startPage.getClientRects().length > 0) {
      if (!document.getElementById("clair-brand-logo")) return true;
      const blurb = document.querySelector(".open-project__blurb");
      if (blurb && blurb.innerHTML !== B.blurb) {
        return true;
      }
    }
    return false;
  }

  applyBranding();
  setInterval(applyBranding, 600);

  const brandObserver = new MutationObserver((mutations) => {
    let hasElementAddition = false;
    const elementRoots = [];
    const textParents = [];
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        const parent = mutation.target.parentElement;
        if (
          parent &&
          /Glyphr|glyphrstudio/i.test(mutation.target.nodeValue || "")
        ) {
          textParents.push(parent);
        }
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 3) {
          const parent = node.parentElement;
          if (
            parent &&
            /Glyphr|glyphrstudio/i.test(node.nodeValue || "")
          ) {
            textParents.push(parent);
          }
        } else if (node.nodeType === 1) {
          hasElementAddition = true;
          elementRoots.push(node);
        }
      }
    }
    if (hasElementAddition) {
      // Replace whole welcome/credits cards before generic text replacement
      // rewrites their original markers.
      replaceWelcomeCards();
      fixAboutDetails();
      fixHelpPage();
    }
    for (const root of elementRoots) replaceBrandText(root);
    for (const parent of textParents) replaceBrandText(parent);
    if (needsBranding()) {
      try {
        applyBranding();
      } catch {
        // keep the interval fallback alive
      }
    }
  });
  brandObserver.observe(document.documentElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });

  window.__clairBrandEnsure = () => {
    if (!needsBranding()) return;
    applyBranding();
  };
  window.__clairShowAbout = showAbout;
  window.__clairLogoSvg = logoSvg;
})();
