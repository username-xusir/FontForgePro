// Mirror the official FontForge documentation for offline use.
// Usage: node tools/mirror-docs.mjs  (run from the project root)
// Requires Node.js 18+; writes to help/fontforge-docs/.

import fs from "node:fs/promises";
import path from "node:path";
import https from "node:https";

const BASE = "https://fontforge.org";
const DOC_ROOT = "/docs/";
const OUT = path.resolve("help/fontforge-docs");
const START = [
  "/docs/index.html",
  "/docs/tutorial.html",
  "/docs/genindex.html",
  "/docs/search.html",
  "/docs/py-modindex.html",
  "/docs/searchindex.js",
  "/docs/_static/searchtools.js",
  "/docs/_static/language_data.js",
  "/docs/_static/documentation_options.js",
  "/docs/_static/doctools.js",
  "/docs/_static/sphinx_highlight.js",
  "/docs/_static/pygments.css",
  "/docs/_static/alabaster.css",
  "/docs/_static/custom.css",
];

const queued = new Set();
const done = new Set();
const errors = [];
const queue = [];
let active = 0;
let bytes = 0;

function normalize(raw, referer = BASE + DOC_ROOT) {
  let url;
  try {
    url = new URL(raw, referer);
  } catch {
    return null;
  }
  if (url.hostname !== "fontforge.org") return null;
  if (!url.pathname.startsWith(DOC_ROOT)) return null;
  url.search = "";
  url.hash = "";
  if (url.pathname.endsWith("/")) {
    url.pathname += "index.html";
  } else if (!path.posix.extname(url.pathname)) {
    // Sphinx may link to a directory without a trailing slash.
    url.pathname += "/index.html";
  }
  return url;
}

function relPath(url) {
  return decodeURIComponent(url.pathname.slice(DOC_ROOT.length));
}

function localPath(url) {
  return path.join(OUT, relPath(url));
}

function enqueue(raw, referer) {
  const url = normalize(raw, referer);
  if (!url) return;
  const key = url.pathname;
  if (queued.has(key) || done.has(key)) return;
  queued.add(key);
  queue.push(url);
}

function relativeLink(target, from) {
  const targetPath = relPath(target);
  const fromDir = path.posix.dirname(relPath(from));
  let relative = path.posix.relative(fromDir, targetPath);
  if (!relative) relative = path.posix.basename(targetPath);
  return relative;
}

function rewriteRefs(text, pageUrl) {
  return text.replace(/\b(href|src)="([^"]*)"/g, (match, attr, value) => {
    if (!value || value.startsWith("#") || value.startsWith("data:") ||
        value.startsWith("mailto:") || value.startsWith("javascript:")) {
      return match;
    }
    const url = normalize(value, pageUrl.href);
    if (url) {
      // Strip cache-busting query strings; the crawler saves query-less files.
      return `${attr}="${relativeLink(url, pageUrl)}"`;
    }
    if (/^https?:/i.test(value)) {
      return match;
    }
    // Keep local relative links, but strip Sphinx cache busting.
    return `${attr}="${value.replace(/\?v=[^"#]*/g, "")}"`;
  });
}

function rewriteCss(text, pageUrl) {
  return text.replace(/url\(([^)]+)\)/g, (match, raw) => {
    let value = raw.trim().replace(/^['"]|['"]$/g, "");
    if (!value || value.startsWith("data:") || /^https?:/i.test(value)) return match;
    const url = normalize(value, pageUrl.href);
    if (url) return `url("${relativeLink(url, pageUrl)}")`;
    return match;
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      {
        hostname: url.hostname,
        path: url.pathname + url.search,
        rejectUnauthorized: false,
        headers: {
          "User-Agent": "FontForgePro-doc-mirror/1.0",
          "Accept": "*/*",
        },
        timeout: 45000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          const next = normalize(res.headers.location, url.href);
          if (next) fetchUrl(next).then(resolve, reject);
          else reject(new Error(`redirect ${res.statusCode}`));
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      },
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

async function processUrl(url) {
  const rel = relPath(url);
  const isHtml = rel.endsWith(".html") || rel.endsWith(".htm") || !path.extname(rel);
  const isCss = rel.endsWith(".css");
  const isJs = rel.endsWith(".js");

  let data;
  try {
    data = await fetchUrl(url);
  } catch (err) {
    errors.push(`${rel}: ${err.message}`);
    return;
  }

  bytes += data.length;
  const target = localPath(url);
  await fs.mkdir(path.dirname(target), { recursive: true });

  if (isHtml) {
    let text = data.toString("utf8");
    // Collect links before rewriting, so assets referenced by the original URLs are queued.
    for (const match of text.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const value = match[1];
      if (!value || value.startsWith("#") || value.startsWith("data:") ||
          value.startsWith("mailto:") || value.startsWith("javascript:")) continue;
      const next = normalize(value, url.href);
      if (next) enqueue(next.href, url.href);
    }
    text = rewriteRefs(text, url);
    await fs.writeFile(target, text, "utf8");
  } else if (isCss) {
    let text = data.toString("utf8");
    for (const match of text.matchAll(/url\(([^)]+)\)/g)) {
      let value = match[1].trim().replace(/^['"]|['"]$/g, "");
      if (!value || value.startsWith("data:") || /^https?:/i.test(value)) continue;
      const next = normalize(value, url.href);
      if (next) enqueue(next.href, url.href);
    }
    text = rewriteCss(text, url);
    await fs.writeFile(target, text, "utf8");
  } else if (isJs) {
    await fs.writeFile(target, data);
  } else {
    await fs.writeFile(target, data);
  }
  done.add(url.pathname);
  process.stdout.write(`\r${done.size} files, ${(bytes / 1024 / 1024).toFixed(1)} MiB`);
}

async function worker() {
  while (true) {
    const url = queue.shift();
    if (!url) {
      if (active === 0) return;
      await new Promise((r) => setTimeout(r, 30));
      continue;
    }
    active++;
    try {
      await processUrl(url);
    } finally {
      active--;
    }
  }
}

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });
for (const start of START) enqueue(BASE + start, BASE + DOC_ROOT);

const workers = Array.from({ length: 4 }, () => worker());
await Promise.all(workers);

console.log(`\nDone: ${done.size} files, ${(bytes / 1024 / 1024).toFixed(1)} MiB`);
if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  for (const err of errors.slice(0, 30)) console.log("  " + err);
}
