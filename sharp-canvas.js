(() => {
  if (window.__ffproSharpCanvasInstalled) return;
  window.__ffproSharpCanvasInstalled = true;

  const dpr = () => window.devicePixelRatio || 1;

  function monoColor(value) {
    if (typeof value !== "string") return value;
    const text = value.trim();
    if (!text || text === "transparent" || text === "none") return value;
    let r;
    let g;
    let b;
    let a = 1;

    let match = text.match(/^#([0-9a-f]{3,8})$/i);
    if (match) {
      let hex = match[1];
      if (hex.length === 3 || hex.length === 4) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join("");
      }
      if (hex.length !== 6 && hex.length !== 8) return value;
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255;
    } else {
      match = text.match(/^rgba?\(([^)]+)\)$/i);
      if (match) {
        const parts = match[1].split(",").map((part) => part.trim());
        if (parts.length < 3) return value;
        r = parseFloat(parts[0]);
        g = parseFloat(parts[1]);
        b = parseFloat(parts[2]);
        if (parts.length > 3) a = parseFloat(parts[3]);
      } else {
        match = text.match(/^hsla?\(([^)]+)\)$/i);
        if (!match) return value;
        const parts = match[1].split(",").map((part) => part.trim());
        if (parts.length < 3) return value;
        const hue = ((parseFloat(parts[0]) % 360) + 360) % 360;
        const saturation = Math.max(0, Math.min(1, parseFloat(parts[1]) / 100));
        const lightness = Math.max(0, Math.min(1, parseFloat(parts[2]) / 100));
        if (parts.length > 3) a = parseFloat(parts[3]);
        const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = lightness - chroma / 2;
        let rr = 0;
        let gg = 0;
        let bb = 0;
        if (hue < 60) [rr, gg, bb] = [chroma, x, 0];
        else if (hue < 120) [rr, gg, bb] = [x, chroma, 0];
        else if (hue < 180) [rr, gg, bb] = [0, chroma, x];
        else if (hue < 240) [rr, gg, bb] = [0, x, chroma];
        else if (hue < 300) [rr, gg, bb] = [x, 0, chroma];
        else [rr, gg, bb] = [chroma, 0, x];
        r = (rr + m) * 255;
        g = (gg + m) * 255;
        b = (bb + m) * 255;
      }
    }

    if (![r, g, b, a].every(Number.isFinite)) return value;
    const light = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    return a < 1
      ? `rgba(${light},${light},${light},${a})`
      : `rgb(${light},${light},${light})`;
  }

  function monoizeContext(ctx) {
    if (!ctx || ctx.__ffproMonoContext) return;
    const proto = Object.getPrototypeOf(ctx);
    const fillDesc = Object.getOwnPropertyDescriptor(proto, "fillStyle");
    const strokeDesc = Object.getOwnPropertyDescriptor(proto, "strokeStyle");
    if (!fillDesc || !strokeDesc) return;
    let fill = fillDesc.get.call(ctx);
    let stroke = strokeDesc.get.call(ctx);
    try {
      Object.defineProperty(ctx, "fillStyle", {
        configurable: true,
        enumerable: true,
        get() {
          return fill;
        },
        set(value) {
          fill = value;
          try {
            fillDesc.set.call(ctx, monoColor(value));
          } catch {
            fillDesc.set.call(ctx, value);
          }
        },
      });
      Object.defineProperty(ctx, "strokeStyle", {
        configurable: true,
        enumerable: true,
        get() {
          return stroke;
        },
        set(value) {
          stroke = value;
          try {
            strokeDesc.set.call(ctx, monoColor(value));
          } catch {
            strokeDesc.set.call(ctx, value);
          }
        },
      });
      ctx.__ffproMonoContext = true;
    } catch {
      // ignore unsupported context implementations
    }
  }

  function ensureSharp(canvas, logicalWidth, logicalHeight, ctx) {
    if (!canvas || !canvas.getContext) return;
    const ratio = dpr();
    const width = Math.max(1, Math.round(Number(logicalWidth) || 1));
    const height = Math.max(1, Math.round(Number(logicalHeight) || 1));
    const targetWidth = Math.max(1, Math.round(width * ratio));
    const targetHeight = Math.max(1, Math.round(height * ratio));

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = ctx || canvas.getContext("2d");
    if (!context) return;
    monoizeContext(context);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function patchEditCanvas() {
    const constructor = customElements.get("edit-canvas");
    if (!constructor || constructor.__ffproSharpPatched) return;
    constructor.__ffproSharpPatched = true;
    const original = constructor.prototype.redraw;
    constructor.prototype.redraw = function (...args) {
      try {
        ensureSharp(
          this.canvas,
          Number(this.width) || 2000,
          Number(this.height) || 2000,
          this.ctx,
        );
      } catch {
        // ignore
      }
      return original.apply(this, args);
    };
    document.querySelectorAll("edit-canvas").forEach((element) => {
      if (!element.canvas) return;
      ensureSharp(
        element.canvas,
        Number(element.width) || 2000,
        Number(element.height) || 2000,
        element.ctx,
      );
    });
  }

  function patchDisplayCanvas() {
    const constructor = customElements.get("display-canvas");
    if (!constructor || constructor.__ffproSharpPatched) return;
    constructor.__ffproSharpPatched = true;

    const originalUpdate = constructor.prototype.updateCanvasSize;
    if (originalUpdate) {
      constructor.prototype.updateCanvasSize = function (...args) {
        const result = originalUpdate.apply(this, args);
        try {
          ensureSharp(
            this.canvas,
            Number(this.width) || 1000,
            Number(this.height) || 1000,
            this.ctx,
          );
        } catch {
          // ignore
        }
        return result;
      };
    }

    const originalRedraw = constructor.prototype.redraw;
    constructor.prototype.redraw = function (...args) {
      try {
        const ratio = dpr();
        ensureSharp(
          this.canvas,
          Number(this.width) || this.canvas.width / ratio,
          Number(this.height) || this.canvas.height / ratio,
          this.ctx,
        );
      } catch {
        // ignore
      }
      return originalRedraw.apply(this, args);
    };
  }

  function scan() {
    patchEditCanvas();
    patchDisplayCanvas();
    document.querySelectorAll("edit-canvas").forEach((element) => {
      if (!element.canvas || !element.width) return;
      ensureSharp(
        element.canvas,
        Number(element.width) || 2000,
        Number(element.height) || 2000,
        element.ctx,
      );
    });
    document.querySelectorAll("display-canvas").forEach((element) => {
      if (!element.canvas || !element.width) return;
      ensureSharp(
        element.canvas,
        Number(element.width) || 1000,
        Number(element.height) || 1000,
        element.ctx,
      );
    });
  }

  scan();
  setInterval(scan, 1500);
  window.addEventListener("resize", scan);
})();
