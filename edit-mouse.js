(() => {
  if (window.__ffproEditMouseInstalled) return;
  window.__ffproEditMouseInstalled = true;

  const ADD_RADIUS_PX = 18;
  const POINT_RADIUS_PX = 24;
  const HANDLE_RADIUS_PX = 10;
  const POINT_EDIT_PAGES = ["characters", "components", "ligatures"];
  const POINT_EDIT_TOOLS = ["pathEdit", "resize", "pathAddPoint"];
  let observedHost = null;
  let observedCanvas = null;
  let dragState = null;

  function isPointEditPage(editor) {
    const page = String(editor?.nav?.page || "").toLowerCase();
    return POINT_EDIT_PAGES.includes(page);
  }

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

  function activatePathEdit(editor) {
    if (!editor || editor.selectedTool === "pathEdit") return;
    if (typeof window.__ffproSelectTool === "function") {
      window.__ffproSelectTool("pathEdit");
      return;
    }
    editor.selectedTool = "pathEdit";
    editor.publish("whichToolIsSelected", "pathEdit");
  }

  function pointScreenPosition(point, view) {
    return {
      x: view.dx + point.p.x * view.dz,
      y: view.dy - point.p.y * view.dz,
    };
  }

  function findPaths(editor) {
    const item = editor && editor.selectedItem;
    const shapes = item && Array.isArray(item.shapes) ? item.shapes : [];
    return shapes.filter(
      (shape) =>
        shape &&
        shape.objType === "Path" &&
        Array.isArray(shape.pathPoints) &&
        shape.pathPoints.length,
    );
  }

  function nearestPoint(paths, canvasX, canvasY, view) {
    let best = null;
    for (const path of paths) {
      for (const point of path.pathPoints) {
        if (!point || !point.p) continue;
        const screen = pointScreenPosition(point, view);
        const distance = Math.hypot(screen.x - canvasX, screen.y - canvasY);
        if (!best || distance < best.distance) {
          best = { path, point, distance };
        }
      }
    }
    return best;
  }

  function nearestHandle(paths, canvasX, canvasY, view) {
    let best = null;
    for (const path of paths) {
      for (const point of path.pathPoints) {
        for (const key of ["h1", "h2"]) {
          const handle = point && point[key];
          if (!handle || !handle.use) continue;
          const x = view.dx + handle.x * view.dz;
          const y = view.dy - handle.y * view.dz;
          const distance = Math.hypot(x - canvasX, y - canvasY);
          if (!best || distance < best.distance) {
            best = { path, point, handle, distance };
          }
        }
      }
    }
    return best;
  }

  function pathUnderCursor(paths, glyphPoint, view) {
    let best = null;
    for (const path of paths) {
      let closest = null;
      try {
        closest = path.findClosestPointOnCurve(glyphPoint);
      } catch {
        closest = null;
      }
      if (!closest) continue;
      const distance = closest.distance * view.dz;
      if (!best || distance < best.distance) {
        best = { path, closest, distance };
      }
    }
    return best;
  }

  function canvasPointFromEvent(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    // Glyphr's view is in CSS/logical pixels; the canvas backing store may be
    // scaled up for HiDPI, so do not multiply by canvas.width / rect.width.
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // Glyphr's Path Edit tool only hit-tests points on an already-selected
  // shape. Pre-select the path under the cursor so the first left-drag on a
  // vertex moves that vertex instead of requiring a warm-up click.
  function preselectPointPath(event, editor) {
    const canvas = getCanvas();
    if (!canvas) return;
    const canvasPoint = canvasPointFromEvent(event, canvas);
    const view = editor.view;
    if (!view || !view.dz) return;
    const paths = findPaths(editor);
    if (!paths.length) return;
    const nearest = nearestPoint(paths, canvasPoint.x, canvasPoint.y, view);
    if (!nearest || nearest.distance > POINT_RADIUS_PX) return;
    if (editor.multiSelect.shapes.isSelected(nearest.path)) return;
    editor.multiSelect.shapes.clear();
    editor.multiSelect.shapes.select(nearest.path);
  }

  function selectPoint(editor, path, point, reason) {
    editor.multiSelect.points.clear();
    editor.multiSelect.points.select(point);
    // MultiSelect.select() clears when the object is already selected, so
    // only select the path when it is not already in the shape selection.
    if (!editor.multiSelect.shapes.isSelected(path)) {
      editor.multiSelect.shapes.select(path);
    }
    editor.publish("currentPathPoint", point);
    editor.publish("currentPath", path);
    editor.publish("currentItem", editor.selectedItem);
    editor.editCanvas.redraw(reason);
  }

  function beginPointDrag(event, editor, hit) {
    event.preventDefault();
    event.stopImmediatePropagation();
    activatePathEdit(editor);
    const multi = editor.multiSelect;
    let points = [];
    if (
      multi.points.length > 1 &&
      typeof multi.points.isSelected === "function" &&
      multi.points.isSelected(hit.point)
    ) {
      points = [...multi.points.members];
    } else {
      multi.points.clear();
      multi.points.select(hit.point);
      points = [hit.point];
    }
    if (!multi.shapes.isSelected(hit.path)) {
      multi.shapes.select(hit.path);
    }
    editor.publish("currentPathPoint", hit.point);
    editor.publish("currentPath", hit.path);
    editor.publish("currentItem", editor.selectedItem);
    if (editor.editCanvas && typeof editor.editCanvas.redraw === "function") {
      editor.editCanvas.redraw("ffpro:dragStart");
    }
    dragState = {
      editor,
      points,
      path: hit.path,
      hitPoint: hit.point,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
    };
    document.body.style.cursor = "grabbing";
    document.addEventListener("mousemove", handlePointDragMove, true);
    document.addEventListener("mouseup", handlePointDragEnd, true);
    window.addEventListener("blur", handlePointDragEnd, true);
  }

  function handlePointDragMove(event) {
    if (!dragState) return;
    const editor = dragState.editor;
    const view = editor.view;
    if (!view || !view.dz) return;
    const dxScreen = event.clientX - dragState.lastX;
    const dyScreen = event.clientY - dragState.lastY;
    if (!dxScreen && !dyScreen) return;
    let dx;
    let dy;
    if (!dragState.moved) {
      // First movement: snap the grabbed vertex under the pointer so it
      // tracks the cursor exactly even if the press started a few px away.
      const canvas = getCanvas();
      if (!canvas) return;
      const canvasPoint = canvasPointFromEvent(event, canvas);
      const mouseX = (canvasPoint.x - view.dx) / view.dz;
      const mouseY = (view.dy - canvasPoint.y) / view.dz;
      dx = mouseX - dragState.hitPoint.p.x;
      dy = mouseY - dragState.hitPoint.p.y;
    } else {
      dx = dxScreen / view.dz;
      dy = -dyScreen / view.dz;
    }
    const changedPaths = new Set();
    for (const point of dragState.points) {
      if (!point || typeof point.updatePathPointPosition !== "function") {
        continue;
      }
      point.updatePathPointPosition("p", dx, dy);
      if (point.parent) changedPaths.add(point.parent);
    }
    for (const path of changedPaths) {
      if (typeof path.changed === "function") path.changed();
    }
    dragState.lastX = event.clientX;
    dragState.lastY = event.clientY;
    dragState.moved = true;
    if (editor.editCanvas && typeof editor.editCanvas.redraw === "function") {
      editor.editCanvas.redraw("ffpro:dragPoint");
    }
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function handlePointDragEnd(event) {
    if (!dragState) return;
    const { editor, points, path, moved } = dragState;
    document.removeEventListener("mousemove", handlePointDragMove, true);
    document.removeEventListener("mouseup", handlePointDragEnd, true);
    window.removeEventListener("blur", handlePointDragEnd, true);
    document.body.style.cursor = "";
    dragState = null;
    if (moved) {
      try {
        editor.history.addState(
          `Moved ${points.length} path point${points.length === 1 ? "" : "s"}`,
        );
      } catch {
        // ignore history errors
      }
      editor.publish("currentPathPoint", points[0]);
      editor.publish("currentPath", path);
      editor.publish("currentItem", editor.selectedItem);
    }
    if (typeof window.__ffproPointsClear === "function") {
      window.__ffproPointsClear();
    }
    if (event && event.type === "mouseup") {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  function addPointAt(event) {
    const editor = getEditor();
    if (!editor || !isPointEditPage(editor)) return false;
    if (!editor.editCanvas || !editor.selectedItem) return false;

    const canvas = getCanvas();
    if (!canvas) return false;

    const rect = canvas.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      return false;
    }

    const canvasPoint = canvasPointFromEvent(event, canvas);
    const view = editor.view;
    if (!view || !view.dz) return false;

    const glyphPoint = {
      x: (canvasPoint.x - view.dx) / view.dz,
      y: (view.dy - canvasPoint.y) / view.dz,
    };
    const paths = findPaths(editor);
    if (!paths.length) return false;

    // Right-clicking directly on an existing vertex should select it rather
    // than stacking a zero-length segment on top of it.
    const existing = nearestPoint(paths, canvasPoint.x, canvasPoint.y, view);
    if (existing && existing.distance <= POINT_RADIUS_PX) {
      activatePathEdit(editor);
      selectPoint(editor, existing.path, existing.point, "ffpro:rightClickSelect");
      return true;
    }

    const hit = pathUnderCursor(paths, glyphPoint, view);
    if (!hit || hit.distance > ADD_RADIUS_PX) return false;

    activatePathEdit(editor);
    // Glyphr's initialProject is a live reference, so a one-entry queue cannot
    // fall back to the pre-edit state. Seed a baseline when starting from an
    // empty history so the first right-click add is undoable.
    if (!editor.history.queue?.length) {
      editor.history.addState("Before adding point");
    }
    const added = hit.path.insertPathPoint(
      hit.closest.point,
      hit.closest.split,
      event.shiftKey,
    );
    if (!added) return false;

    selectPoint(editor, hit.path, added, "ffpro:rightClickAddPoint");
    editor.history.addState("Added point to path");
    if (typeof window.__ffproPointsRefresh === "function") {
      window.__ffproPointsRefresh();
    }
    return true;
  }

  function switchToPointUnderCursor(event, editor) {
    const canvas = getCanvas();
    if (!canvas) return false;
    const canvasPoint = canvasPointFromEvent(event, canvas);
    const view = editor.view;
    if (!view || !view.dz) return false;
    const paths = findPaths(editor);
    if (!paths.length) return false;
    const nearest = nearestPoint(paths, canvasPoint.x, canvasPoint.y, view);
    if (!nearest || nearest.distance > POINT_RADIUS_PX) return false;

    if (typeof window.__ffproSelectTool === "function") {
      window.__ffproSelectTool("pathEdit");
    }
    if (editor.selectedTool !== "pathEdit") {
      editor.selectedTool = "pathEdit";
      editor.publish("whichToolIsSelected", "pathEdit");
    }
    editor.multiSelect.points.clear();
    editor.multiSelect.points.select(nearest.point);
    if (!editor.multiSelect.shapes.isSelected(nearest.path)) {
      editor.multiSelect.shapes.select(nearest.path);
    }
    editor.publish("currentPathPoint", nearest.point);
    editor.publish("currentPath", nearest.path);
    editor.publish("currentItem", editor.selectedItem);
    editor.editCanvas.redraw("ffpro:switchToPointEdit");
    return true;
  }

  function handleMouseDown(event) {
    const editor = getEditor();
    if (!editor || !isPointEditPage(editor)) return;

    if (event.button === 0) {
      const tool = editor.selectedTool;
      if (!POINT_EDIT_TOOLS.includes(tool)) return;
      if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) {
        if (tool === "pathEdit") preselectPointPath(event, editor);
        else switchToPointUnderCursor(event, editor);
        return;
      }
      const canvas = getCanvas();
      if (!canvas) return;
      const canvasPoint = canvasPointFromEvent(event, canvas);
      const view = editor.view;
      if (!view || !view.dz) return;
      const paths = findPaths(editor);
      const pointHit = nearestPoint(paths, canvasPoint.x, canvasPoint.y, view);
      const handleHit = nearestHandle(paths, canvasPoint.x, canvasPoint.y, view);
      const handleWins =
        handleHit &&
        handleHit.distance <= HANDLE_RADIUS_PX &&
        (!pointHit || handleHit.distance < pointHit.distance);
      if (
        pointHit &&
        pointHit.distance <= POINT_RADIUS_PX &&
        !handleWins
      ) {
        beginPointDrag(event, editor, pointHit);
        return;
      }
      if (tool === "pathEdit") {
        preselectPointPath(event, editor);
      } else {
        switchToPointUnderCursor(event, editor);
      }
      return;
    }

    if (event.button !== 2) return;
    event.preventDefault();
    event.stopPropagation();
    addPointAt(event);
  }

  function handleContextMenu(event) {
    const editor = getEditor();
    if (!editor || !isPointEditPage(editor)) return;
    event.preventDefault();
    event.stopPropagation();
  }

  function bindCanvas() {
    const host = getCanvasHost();
    const canvas = getCanvas();
    if (!host || !canvas) return;
    if (host === observedHost && canvas === observedCanvas) return;
    if (observedHost) {
      observedHost.removeEventListener("mousedown", handleMouseDown, true);
      observedHost.removeEventListener("contextmenu", handleContextMenu, true);
    }
    observedHost = host;
    observedCanvas = canvas;
    // Listen on the host element in the capture phase. This runs before
    // Glyphr's own canvas listeners, so our point drag can safely take over.
    host.addEventListener("mousedown", handleMouseDown, true);
    host.addEventListener("contextmenu", handleContextMenu, true);
  }

  bindCanvas();
  setInterval(bindCanvas, 1000);

  window.__ffproRightClickAddPoint = addPointAt;
})();
