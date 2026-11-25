(() => {
  if (window.__ffproPointsInstalled) return;
  window.__ffproPointsInstalled = true;

  const HOVER_RADIUS = 24;
  let overlay = null;
  let overlayCanvas = null;
  let observedCanvas = null;
  let raf = 0;
  let lastEvent = null;

  function getEditor() {
    const app = window._GlyphrStudioApp;
    return app && app.selectedProjectEditor;
  }

  function getCanvasHost() {
    return document.getElementById("editor-page__edit-canvas");
  }

  function getCanvas() {
    const host = getCanvasHost();
    return host && host.shadowRoot
      ? host.shadowRoot.querySelector("canvas")
      : null;
  }

  function ratio() {
    return window.devicePixelRatio || 1;
  }

  function clearOverlay() {
    if (!overlay) return;
    const ctx = overlay.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    overlay.style.display = "none";
    if (document.body.style.cursor === "grab") {
      document.body.style.cursor = "";
    }
  }

  function ensureOverlay(canvas, rect) {
    if (!overlay || overlayCanvas !== canvas || !overlay.isConnected) {
      if (overlay) overlay.remove();
      overlay = document.createElement("canvas");
      overlay.className = "ffpro-points-overlay";
      overlay.style.cssText =
        "position:fixed;pointer-events:none;z-index:89990;display:none;";
      document.body.appendChild(overlay);
      overlayCanvas = canvas;
    }

    const dpr = ratio();
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (overlay.width !== width || overlay.height !== height) {
      overlay.width = width;
      overlay.height = height;
    }
    overlay.style.left = `${rect.left}px`;
    overlay.style.top = `${rect.top}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;

    const ctx = overlay.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return overlay;
  }

  function draw(event) {
    const canvas = observedCanvas;
    if (!canvas || !event) {
      clearOverlay();
      return;
    }

    const editor = getEditor();
    if (
      !editor ||
      !["characters", "components", "ligatures"].includes(
        String(editor.nav?.page || "").toLowerCase(),
      ) ||
      !["pathEdit", "pathAddPoint", "resize"].includes(editor.selectedTool)
    ) {
      clearOverlay();
      return;
    }

    const rect = canvas.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      clearOverlay();
      return;
    }

    // The edit canvas is now backed by device pixels but its logical
    // coordinate space (and Glyphr's view) is still CSS pixels.
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    const glyph = editor.selectedItem || editor.selectedGlyph;
    const shapes = glyph && Array.isArray(glyph.shapes) ? glyph.shapes : [];
    const paths = shapes.filter(
      (shape) => shape && shape.objType === "Path" && shape.pathPoints,
    );
    const view = editor.view;
    if (!view || !paths.length) {
      clearOverlay();
      return;
    }

    let best = null;
    for (const path of paths) {
      if (!path || !Array.isArray(path.pathPoints)) continue;
      for (const point of path.pathPoints) {
        if (!point || !point.p) continue;
        const sx = view.dx + point.p.x * view.dz;
        const sy = view.dy - point.p.y * view.dz;
        const dist = Math.hypot(sx - mx, sy - my);
        if (!best || dist < best.dist) {
          best = { path, point, sx, sy, dist };
        }
      }
    }

    if (!best || best.dist > HOVER_RADIUS) {
      clearOverlay();
      return;
    }

    document.body.style.cursor = "grab";
    const ov = ensureOverlay(canvas, rect);
    const ctx = ov.getContext("2d");
    const dpr = ratio();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ov.width, ov.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Show every vertex of the path the cursor is near.
    ctx.lineWidth = 1.4;
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
    for (const point of best.path.pathPoints) {
      if (!point || !point.p) continue;
      const sx = view.dx + point.p.x * view.dz;
      const sy = view.dy - point.p.y * view.dz;
      ctx.beginPath();
      ctx.rect(sx - 3, sy - 3, 6, 6);
      ctx.fill();
      ctx.stroke();
    }

    // Control handles for the point under the cursor.
    const point = best.point;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.38)";
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 1;
    for (const handle of [point.h1, point.h2]) {
      if (!handle || !handle.use) continue;
      const hx = view.dx + handle.x * view.dz;
      const hy = view.dy - handle.y * view.dz;
      ctx.beginPath();
      ctx.moveTo(best.sx, best.sy);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(hx, hy, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Highlight the nearest vertex.
    ctx.beginPath();
    ctx.arc(best.sx, best.sy, 12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.95)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(best.sx - 4.5, best.sy - 4.5, 9, 9);
    ctx.fill();
    ctx.stroke();

    ov.style.display = "block";
  }

  function handleMove(event) {
    lastEvent = event;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      draw(lastEvent);
    });
  }

  function bindCanvas() {
    const canvas = getCanvas();
    if (!canvas || canvas === observedCanvas) return;
    if (observedCanvas) {
      observedCanvas.removeEventListener("mousemove", handleMove);
      observedCanvas.removeEventListener("mouseleave", clearOverlay);
    }
    observedCanvas = canvas;
    canvas.addEventListener("mousemove", handleMove, { passive: true });
    canvas.addEventListener("mouseleave", clearOverlay);
  }

  bindCanvas();
  setInterval(bindCanvas, 1000);

  window.addEventListener("scroll", clearOverlay, true);
  window.addEventListener("resize", clearOverlay);
  window.addEventListener("blur", clearOverlay);
  document.addEventListener("mousedown", clearOverlay, true);

  window.__ffproPointsRefresh = () => {
    if (lastEvent) draw(lastEvent);
  };
  window.__ffproPointsClear = clearOverlay;
})();
