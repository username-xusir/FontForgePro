"""FFpro tools for FontForge.

These are the small workflow helpers layered on top of the native FontForge
application: font audit, starter character sets, glyph cleanup, centering,
corner rounding, a local manual, and an about page.

Everything runs locally. No network access is used.
"""

from __future__ import annotations

import math
import os
import pathlib
import shutil
import tempfile
import time
import webbrowser

import fontforge
import psMat

PLUGIN_VERSION = "2.0.1"
SUBMENU = ("FFpro 工具", "FFpro Tools", "FFpro_Tools")

BASIC_CODEPOINTS = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x100))
    + [
        0x0131,  # dotless i
        0x0152,  # OE
        0x0153,  # oe
        0x0160,  # S caron
        0x0161,  # s caron
        0x0178,  # Y diaeresis
        0x017D,  # Z caron
        0x017E,  # z caron
        0x0192,  # florin
        0x02C6,  # circumflex
        0x02DC,  # small tilde
        0x2013,  # en dash
        0x2014,  # em dash
        0x2018,  # left single quote
        0x2019,  # right single quote
        0x201A,  # single low quote
        0x201C,  # left double quote
        0x201D,  # right double quote
        0x201E,  # double low quote
        0x2020,  # dagger
        0x2021,  # double dagger
        0x2022,  # bullet
        0x2026,  # ellipsis
        0x2030,  # per mille
        0x2039,  # single left angle quote
        0x203A,  # single right angle quote
        0x20AC,  # euro
        0x2122,  # trademark
        0x2212,  # minus
    ]
)


# ---------------------------------------------------------------------------
# Small helpers


def _home() -> pathlib.Path:
    env = os.environ.get("FFPRO_HOME")
    if env:
        return pathlib.Path(env)
    # app/lib/python3.12/site-packages/ffpro_tools.py -> app
    return pathlib.Path(__file__).resolve().parents[3]


def _log(message: str) -> None:
    try:
        appdata = os.environ.get("APPDATA")
        if appdata:
            log_path = pathlib.Path(appdata).parent / "FontForgePro" / "plugin.log"
        else:
            log_path = pathlib.Path(tempfile.gettempdir()) / "FontForgePro-plugin.log"
        log_path.parent.mkdir(parents=True, exist_ok=True)
        if log_path.exists() and log_path.stat().st_size > 64 * 1024:
            log_path.write_text("", encoding="utf-8")
        with log_path.open("a", encoding="utf-8") as handle:
            handle.write("%s %s\n" % (time.strftime("%Y-%m-%d %H:%M:%S"), message))
    except Exception:
        pass


def _help_page(name: str = "index.html") -> pathlib.Path:
    return _home() / "help" / name


def _open_local(path: pathlib.Path) -> None:
    try:
        os.startfile(str(path))  # type: ignore[attr-defined]
        return
    except Exception:
        pass
    try:
        webbrowser.open(path.as_uri())
    except Exception:
        fontforge.postNotice(
            "FFpro",
            "无法打开本地文件：\n%s" % path,
        )


def _as_font(obj):
    if isinstance(obj, fontforge.glyph):
        return obj.font
    return obj


def _selected_glyphs(obj):
    """Return (glyphs, font, is_single_glyph_context)."""
    if isinstance(obj, fontforge.glyph):
        return [obj], obj.font, True
    f = obj
    selected = list(f.selection.byGlyphs)
    return selected, f, False


def _glyph_targets(obj, title: str, question: str):
    glyphs, f, single = _selected_glyphs(obj)
    if single or glyphs:
        return glyphs, f, single
    answer = fontforge.ask(
        title,
        question,
        ("处理全部字形", "取消"),
        "处理全部字形",
        "取消",
    )
    if answer != "处理全部字形":
        return [], f, single
    return list(f.glyphs()), f, single


def _all_targets(obj, title: str):
    glyphs, f, single = _glyph_targets(
        obj,
        title,
        "当前没有选中字形。要对全部字形执行此操作吗？",
    )
    return glyphs, f, single


def _refresh(f) -> None:
    try:
        f.selection.changed()
    except Exception:
        pass


def _notify(title: str, message: str) -> None:
    fontforge.postNotice(title, message)


# ---------------------------------------------------------------------------
# Font audit


def font_audit(_data, obj):
    f = _as_font(obj)
    glyphs = list(f.glyphs())
    encoded = [g for g in glyphs if g.unicode >= 0]
    empty = [g for g in encoded if not g.foreground and g.width > 0]
    zero_width = [g for g in encoded if g.width == 0]
    negative_width = [g for g in encoded if g.width < 0]

    try:
        valid = f.validate()
        validation = "通过" if valid else "发现问题（详见警告窗口）"
    except Exception:
        validation = "无法检查"

    lines = [
        "字体：%s %s" % (f.familyname or f.fontname or "未命名", f.weight or ""),
        "字形：%d 个，其中已编码 %d 个" % (len(glyphs), len(encoded)),
        "Em：%d  上伸：%d  下伸：%d" % (f.em, f.ascent, f.descent),
        "空字形：%d  零宽：%d  负宽：%d" % (len(empty), len(zero_width), len(negative_width)),
        "轮廓校验：%s" % validation,
    ]

    if empty:
        names = "、".join(g.glyphname for g in empty[:8])
        if len(empty) > 8:
            names += "…"
        lines.append("空字形示例：%s" % names)
    if negative_width:
        names = "、".join(g.glyphname for g in negative_width[:8])
        lines.append("负宽字形：%s" % names)
    if f.fontname:
        lines.append("字体名：%s" % f.fontname)

    _notify("FFpro 字体体检", "\n".join(lines))


# ---------------------------------------------------------------------------
# Starter character set


def _default_width(cp: int) -> int:
    if cp == 0x20:
        return 250
    if 0x30 <= cp <= 0x39:
        return 600
    if 0x41 <= cp <= 0x5A:
        return 680
    if 0x61 <= cp <= 0x7A:
        return 600
    if cp in (0x69, 0x6C, 0x6A):
        return 300
    if cp in (0x2E, 0x2C, 0x3A, 0x3B, 0x21, 0x27, 0x22):
        return 300
    return 500


def fill_basic_charset(_data, obj):
    f = _as_font(obj)
    added = 0
    skipped = 0
    for cp in BASIC_CODEPOINTS:
        try:
            if cp in f:
                skipped += 1
                continue
            glyph = f.createChar(cp)
            if glyph is not None:
                glyph.width = _default_width(cp)
                added += 1
            else:
                skipped += 1
        except Exception:
            skipped += 1

    _refresh(f)
    _notify(
        "FFpro 补齐字符集",
        "已添加 %d 个空白字符槽位。\n已存在 %d 个，未重复添加。\n\n"
        "这些只是槽位，还需要绘制字形。" % (added, skipped),
    )


# ---------------------------------------------------------------------------
# Glyph cleanup


def clean_glyphs(_data, obj):
    glyphs, f, _ = _all_targets(obj, "FFpro 字形清理")
    if not glyphs:
        return

    changed = 0
    for g in glyphs:
        try:
            g.preserveLayerAsUndo(g.activeLayer)
            g.round()
            g.addExtrema()
            g.correctDirection()
            changed += 1
        except Exception:
            continue

    _refresh(f)
    _notify(
        "FFpro 字形清理",
        "已清理 %d 个字形：\n坐标取整、补极值点、统一轮廓方向。" % changed,
    )


# ---------------------------------------------------------------------------
# Center glyphs horizontally


def center_glyphs(_data, obj):
    glyphs, f, _ = _all_targets(obj, "FFpro 水平居中")
    if not glyphs:
        return

    changed = 0
    for g in glyphs:
        try:
            if g.width <= 0:
                continue
            bbox = g.boundingBox()
            if not bbox:
                continue
            xmin, _ymin, xmax, _ymax = bbox
            if xmax <= xmin:
                continue
            dx = (g.width - (xmax - xmin)) / 2.0 - xmin
            if abs(dx) < 0.01:
                continue
            g.preserveLayerAsUndo(g.activeLayer)
            g.transform(psMat.translate(dx, 0))
            changed += 1
        except Exception:
            continue

    _refresh(f)
    _notify("FFpro 水平居中", "已居中 %d 个字形。" % changed)


# ---------------------------------------------------------------------------
# Corner rounding


def _anchor_indices(contour):
    return [i for i, p in enumerate(contour) if p.on_curve]


def _segment(contour, start, end):
    n = len(contour)
    between = []
    k = (start + 1) % n
    while k != end:
        between.append(contour[k])
        k = (k + 1) % n
    if not between:
        return ("line", [])
    if len(between) == 1:
        return ("quad", between)
    if len(between) == 2:
        return ("cubic", between)
    return ("unknown", between)


def _rounded_contour(contour, radius):
    if not contour.closed:
        return None

    n = len(contour)
    anchors = _anchor_indices(contour)
    if len(anchors) < 3:
        return None

    next_anchor = {}
    for idx, anchor in enumerate(anchors):
        next_anchor[anchor] = anchors[(idx + 1) % len(anchors)]
    prev_anchor = {value: key for key, value in next_anchor.items()}
    segments = {a: _segment(contour, a, next_anchor[a]) for a in anchors}

    entry = {a: (contour[a].x, contour[a].y) for a in anchors}
    exit_point = {a: (contour[a].x, contour[a].y) for a in anchors}
    arcs = {}
    changed = False

    for anchor in anchors:
        point = contour[anchor]
        before = contour[prev_anchor[anchor]]
        after = contour[next_anchor[anchor]]
        incoming_kind = segments[prev_anchor[anchor]][0]
        outgoing_kind = segments[anchor][0]
        if incoming_kind != "line" or outgoing_kind != "line":
            continue

        ux, uy = before.x - point.x, before.y - point.y
        vx, vy = after.x - point.x, after.y - point.y
        len_u = math.hypot(ux, uy)
        len_v = math.hypot(vx, vy)
        if len_u < 1.0 or len_v < 1.0:
            continue
        ux, uy = ux / len_u, uy / len_u
        vx, vy = vx / len_v, vy / len_v

        dot = max(-1.0, min(1.0, ux * vx + uy * vy))
        phi = math.acos(dot)
        if phi < math.radians(15) or phi > math.radians(165):
            continue

        tangent = radius / math.tan(phi / 2.0)
        tangent = min(tangent, len_u * 0.45, len_v * 0.45)
        if tangent < 1.0:
            continue

        effective_radius = tangent * math.tan(phi / 2.0)
        turn = math.pi - phi
        handle = (4.0 / 3.0) * math.tan(turn / 4.0) * effective_radius

        p1 = (point.x + ux * tangent, point.y + uy * tangent)
        p2 = (point.x + vx * tangent, point.y + vy * tangent)
        cp1 = (p1[0] - ux * handle, p1[1] - uy * handle)
        cp2 = (p2[0] - vx * handle, p2[1] - vy * handle)

        entry[anchor] = p1
        exit_point[anchor] = p2
        arcs[anchor] = (cp1, cp2, p2)
        changed = True

    if not changed:
        return None

    result = fontforge.contour()
    start = exit_point[anchors[0]]
    result.moveTo(start[0], start[1])

    for anchor in anchors:
        following = next_anchor[anchor]
        kind, between = segments[anchor]
        target = entry[following]

        if kind == "line":
            result.lineTo(target[0], target[1])
        elif kind == "cubic":
            result.cubicTo(
                between[0].x, between[0].y,
                between[1].x, between[1].y,
                target[0], target[1],
            )
        elif kind == "quad":
            # FontForge converts a cubic layer back to quadratic when it is
            # assigned to a TrueType glyph, so build every curve as cubic.
            control = between[0]
            start = exit_point[anchor]
            c1x = start[0] + (2.0 / 3.0) * (control.x - start[0])
            c1y = start[1] + (2.0 / 3.0) * (control.y - start[1])
            c2x = target[0] + (2.0 / 3.0) * (control.x - target[0])
            c2y = target[1] + (2.0 / 3.0) * (control.y - target[1])
            result.cubicTo(c1x, c1y, c2x, c2y, target[0], target[1])
        else:
            return None

        if following in arcs:
            cp1, cp2, p2 = arcs[following]
            result.cubicTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1])

    result.closed = True
    return result


def round_corners(_data, obj):
    glyphs, f, _ = _glyph_targets(
        obj,
        "FFpro 圆角拐点",
        "当前没有选中字形。要对全部字形执行圆角吗？",
    )
    if not glyphs:
        return

    answer = fontforge.ask(
        "FFpro 圆角拐点",
        "选择圆角半径（字体单位，Em 通常为 1000）：",
        ("20", "40", "80", "120", "取消"),
        "40",
        "取消",
    )
    if not answer or answer == "取消":
        return
    try:
        radius = float(answer)
    except Exception:
        return

    changed = 0
    for g in glyphs:
        try:
            layer = g.layers[g.activeLayer]
            new_layer = fontforge.layer()
            glyph_changed = False
            for contour in layer:
                if not isinstance(contour, fontforge.contour):
                    new_layer += contour
                    continue
                rounded = _rounded_contour(contour, radius)
                if rounded is not None:
                    new_layer += rounded
                    glyph_changed = True
                else:
                    new_layer += contour
            if glyph_changed:
                g.preserveLayerAsUndo(g.activeLayer)
                g.setLayer(new_layer, g.activeLayer)
                changed += 1
        except Exception:
            continue

    _refresh(f)
    _notify(
        "FFpro 圆角拐点",
        "已处理 %d 个字形，圆角半径 %g 单位。\n"
        "只对相邻两边都是直线的尖角生效，曲线拐点保持原样。" % (changed, radius),
    )


# ---------------------------------------------------------------------------
# Local manual / about / starter


def open_manual(_data, _obj):
    page = _help_page("index.html")
    if page.exists():
        _open_local(page)
    else:
        _notify("FFpro 教程", "找不到本地教程：\n%s" % page)


def open_about(_data, _obj):
    page = _help_page("about.html")
    if page.exists():
        _open_local(page)
    else:
        _notify("关于 FontForgePro", about_text())


def about_text() -> str:
    return (
        "FontForgePro %s\n"
        "基于 FontForge 20251009 构建\n"
        "GPL-3.0 许可\n\n"
        "FontForge 是自由软件，版权归 FontForge 贡献者所有。\n"
        "FFpro 工具与界面定制由 FontForgePro 项目维护。"
    ) % PLUGIN_VERSION


def open_starter(_data, _obj):
    template = _home() / "templates" / "FFpro-Starter.sfd"
    if not template.exists():
        _notify("FFpro 模板字体", "找不到模板文件：\n%s" % template)
        return

    stamp = time.strftime("%Y%m%d-%H%M%S")
    target = pathlib.Path(tempfile.gettempdir()) / ("FFpro-Starter-%s.sfd" % stamp)
    try:
        shutil.copyfile(str(template), str(target))
    except Exception as exc:
        _notify("FFpro 模板字体", "无法创建模板副本：\n%s" % exc)
        return

    try:
        fontforge.open(str(target))
        _notify(
            "FFpro 模板字体",
            "已打开模板字体。\n保存时请使用“另存为”，保留你自己的版本。",
        )
    except Exception as exc:
        _notify("FFpro 模板字体", "打开模板失败：\n%s" % exc)


# ---------------------------------------------------------------------------
# Plugin registration


def _add(callback, context, name, submenu=SUBMENU):
    fontforge.registerMenuItem(
        callback=callback,
        context=context,
        name=name,
        submenu=submenu,
    )


def fontforge_plugin_init(**_kwargs):
    if not fontforge.hasUserInterface():
        _log("plugin loaded without a UI; menu skipped")
        return
    try:
        _add(font_audit, "Font", ("字体体检", "Font Audit", "FFpro_FontAudit"))
        _add(fill_basic_charset, "Font", ("补齐基本字符集", "Add Basic Character Set", "FFpro_AddBasicCharset"))
        _add(clean_glyphs, ("Font", "Glyph"), ("字形清理", "Clean Glyphs", "FFpro_CleanGlyphs"))
        _add(center_glyphs, ("Font", "Glyph"), ("水平居中", "Center Glyphs", "FFpro_CenterGlyphs"))
        _add(round_corners, ("Font", "Glyph"), ("圆角拐点…", "Round Corners...", "FFpro_RoundCorners"))
        _add(open_starter, "Font", ("打开模板字体", "Open Starter Font", "FFpro_OpenStarter"))
        _add(open_manual, ("Font", "Glyph"), ("打开本地教程", "Open Local Manual", "FFpro_OpenManual"))
        _add(open_about, ("Font", "Glyph"), ("关于 FontForgePro", "About FontForgePro", "FFpro_About"))
        _log("plugin init ok")
    except Exception as exc:
        _log("plugin init failed: %r" % (exc,))
