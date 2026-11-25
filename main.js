const {
  app,
  BrowserWindow,
  Menu,
  shell,
  session,
  dialog,
  ipcMain,
} = require("electron");
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const LOG_PATH = path.join(os.tmpdir(), "glyphr-app-events.log");
function logEvent(message) {
  try {
    fs.appendFileSync(LOG_PATH, `${new Date().toISOString()} ${message}\n`);
  } catch {
    // ignore logging failures
  }
}

process.on("exit", (code) => logEvent(`process exit ${code}`));
logEvent("main.js loaded");

process.on("uncaughtException", (error) => {
  logEvent(`uncaughtException ${error && error.stack ? error.stack : error}`);
  console.error(
    "[uncaughtException]",
    error && error.stack ? error.stack : error,
  );
});

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".wasm": "application/wasm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".map": "application/json",
};

function startServer() {
  const root = path.join(__dirname, "app");
  const server = http.createServer((req, res) => {
    let requestPath;
    try {
      requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }

    if (requestPath === "/") {
      res.writeHead(302, { Location: "/app/" });
      res.end();
      return;
    }

    if (!requestPath.startsWith("/app/")) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    let relative = requestPath.slice("/app/".length);
    if (relative === "" || relative.endsWith("/")) relative += "index.html";
    const filePath = path.join(root, relative);

    if (!filePath.startsWith(root + path.sep) && filePath !== root) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type":
          MIME_TYPES[path.extname(filePath).toLowerCase()] ||
          "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(data);
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

let mainWindow = null;
let mainWindowAllowClose = false;

async function createWindow() {
  logEvent("createWindow start");
  const server = await startServer();
  const { port } = server.address();
  logEvent(`server listening on ${port}`);

  mainWindowAllowClose = false;
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    title: "FontForgePro",
    icon: path.join(__dirname, "icon.ico"),
    backgroundColor: "#000000",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.once("ready-to-show", () => mainWindow.show());

  async function injectScript(fileName) {
    try {
      const scriptPath = path.join(__dirname, fileName);
      if (!fs.existsSync(scriptPath)) {
        logEvent(`${fileName} missing`);
        return;
      }
      const script = fs.readFileSync(scriptPath, "utf8");
      await mainWindow.webContents.executeJavaScript(script, true);
      logEvent(`${fileName} injected`);
    } catch (error) {
      logEvent(`${fileName} injection failed ${error}`);
    }
  }

  const forcedLocale = process.env.GLYPHR_LOCALE;
  const systemLocale =
    forcedLocale ||
    (typeof app.getSystemLocale === "function"
      ? app.getSystemLocale()
      : app.getLocale());
  const useChinese = /^zh/i.test(systemLocale);
  logEvent(`locale=${systemLocale} chinese=${useChinese}`);

  mainWindow.webContents.on("did-finish-load", async () => {
    await mainWindow.webContents.executeJavaScript(
      `window.__glyphrLocale = ${JSON.stringify(systemLocale)}; document.documentElement.lang = ${JSON.stringify(systemLocale)};`,
      true,
    );
    if (useChinese) {
      await injectScript("zh-cn.js");
    }
    await injectScript("branding.js");
    await injectScript("preview.js");
    await injectScript("points.js");
    await injectScript("edit-mouse.js");
    await injectScript("sharp-canvas.js");
    await injectScript("ui.js");
  });

  const ensureLunacyTimer = setInterval(async () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    try {
      const state = await mainWindow.webContents.executeJavaScript(
        "({ ui: !!window.__ffproUiInstalled, points: !!window.__ffproPointsInstalled, editMouse: !!window.__ffproEditMouseInstalled, sharp: !!window.__ffproSharpCanvasInstalled })",
        true,
      );
      if (!state || !state.ui) await injectScript("ui.js");
      if (!state || !state.points) await injectScript("points.js");
      if (!state || !state.editMouse) await injectScript("edit-mouse.js");
      if (!state || !state.sharp) await injectScript("sharp-canvas.js");
      await mainWindow.webContents.executeJavaScript(
        "window.__ffproUiEnsure && window.__ffproUiEnsure(); window.__ffproHideBootCover && window.__ffproHideBootCover(); window.__clairBrandEnsure && window.__clairBrandEnsure(); window.__glyphrZhRescan && window.__glyphrZhRescan(); window.__ffproPointsRefresh && window.__ffproPointsRefresh();",
        true,
      );
    } catch {
      // ignore transient execution errors while the app is loading
    }
  }, 1500);
  setTimeout(() => clearInterval(ensureLunacyTimer), 120000);

  await mainWindow.loadURL(`http://127.0.0.1:${port}/app/`);
  logEvent("loadURL resolved");

  mainWindow.once("ready-to-show", () => logEvent("ready-to-show"));
  mainWindow.on("close", (event) => {
    logEvent("window close event");
    if (mainWindowAllowClose) return;
    event.preventDefault();
    mainWindow.webContents.send("ffpro:request-close");
  });

  mainWindow.webContents.on("render-process-gone", (event, details) => {
    logEvent(`render-process-gone ${JSON.stringify(details)}`);
    console.error("[render-process-gone]", JSON.stringify(details));
  });
  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      console.error(
        "[did-fail-load]",
        errorCode,
        errorDescription,
        validatedURL,
      );
    },
  );

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(`http://127.0.0.1:${port}`)) return { action: "allow" };
    shell.openExternal(url).catch(() => {});
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith(`http://127.0.0.1:${port}`)) {
      event.preventDefault();
      shell.openExternal(url).catch(() => {});
    }
  });

  mainWindow.on("closed", () => {
    logEvent("mainWindow closed");
    console.error("[mainWindow closed]");
    mainWindow = null;
    server.close();
  });
}

app.whenReady().then(() => {
  logEvent("app ready");

  ipcMain.on("ffpro:quit", () => {
    logEvent("ipc quit");
    mainWindowAllowClose = true;
    app.quit();
  });
  ipcMain.on("ffpro:confirm-close", () => {
    logEvent("ipc confirm close");
    if (!mainWindow || mainWindow.isDestroyed()) return;
    mainWindowAllowClose = true;
    mainWindow.close();
  });
  ipcMain.on("ffpro:reload", () => {
    logEvent("ipc reload");
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.reload();
    }
  });

  // FFpro is fully offline: block analytics and any other external requests.
  // This also prevents third-party timeouts from delaying the first paint.
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const url = details.url || "";
    if (
      url.startsWith("http://127.0.0.1:") ||
      url.startsWith("file://") ||
      url.startsWith("devtools://") ||
      url.startsWith("chrome-extension://") ||
      url.startsWith("chrome://")
    ) {
      callback({ cancel: false });
      return;
    }
    callback({ cancel: true });
  });

  session.defaultSession.on("will-download", (event, item) => {
    const locale =
      process.env.GLYPHR_LOCALE ||
      (typeof app.getSystemLocale === "function"
        ? app.getSystemLocale()
        : app.getLocale());
    const zh = /^zh/i.test(locale || "");
    const suggested = path.join(app.getPath("downloads"), item.getFilename());
    const savePath = dialog.showSaveDialogSync(mainWindow, {
      title: zh ? "导出字体" : "Export Font",
      defaultPath: suggested,
      filters: zh
        ? [
            { name: "字体文件", extensions: ["ttf", "otf", "woff", "woff2"] },
            { name: "所有文件", extensions: ["*"] },
          ]
        : [
            { name: "Font files", extensions: ["ttf", "otf", "woff", "woff2"] },
            { name: "All files", extensions: ["*"] },
          ],
    });
    if (savePath) item.setSavePath(savePath);
    else item.cancel();
  });

  createWindow().catch((error) => {
    dialog.showErrorBox("FFpro 启动失败", String(error));
    app.quit();
  });
});

app.on("window-all-closed", () => {
  logEvent("window-all-closed");
  console.error("[window-all-closed]");
  app.quit();
});

app.on("before-quit", () => {
  logEvent("before-quit");
  console.error("[before-quit]");
});
app.on("will-quit", () => {
  logEvent("will-quit");
  console.error("[will-quit]");
});
app.on("child-process-gone", (event, details) => {
  logEvent(`child-process-gone ${JSON.stringify(details)}`);
  console.error("[child-process-gone]", JSON.stringify(details));
});
