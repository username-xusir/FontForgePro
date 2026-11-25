"""Generate FFpro's FontForge appearance resource file.

The base file ships with FontForge (share/fontforge/pixmaps/resources).
We keep every key so all FontForge windows stay fully themed, and override
the colors/fonts that shape the FFpro monochrome look.
"""

from __future__ import annotations

import pathlib
import sys

REPLACEMENTS = {
    # Typography: a CJK-capable UI font avoids Pango "missing glyph" boxes.
    "fontforge.View.DefaultFont": "11pt sans,Microsoft YaHei UI,Yu Gothic UI,Malgun Gothic,Segoe UI",
    "fontforge.View.Background": "#0b0b0c",
    # Font view
    "fontforge.FontView.GlyphFGColor": "#f4f4f5",
    "fontforge.FontView.GlyphInfoColor": "#f4f4f5",
    "fontforge.FontView.SlotOutlineColor": "#26262a",
    "fontforge.FontView.SlotDivisionColor": "#26262a",
    "fontforge.FontView.LabelColor": "#d4d4d8",
    "fontforge.FontView.UnencodedLabelColor": "#8a8a92",
    "fontforge.FontView.MissingLabelColor": "#ff7b72",
    "fontforge.FontView.EmptySlotFgColor": "#1c1c20",
    "fontforge.FontView.SelectedColor": "#ffffff",
    "fontforge.FontView.SelectedFgColor": "#000000",
    "fontforge.FontView.ChangedColor": "#ffffff",
    "fontforge.FontView.MissingBitmapColor": "#ff7b72",
    "fontforge.FontView.MissingOutlineColor": "#9ad88a",
    "fontforge.FontView.HintingNeededColor": "#f4f4f5",
    "fontforge.FontView.MetricsAdvanceAtColor": "#9ad88a",
    "fontforge.FontView.MetricsAdvanceToColor": "#9ad88a",
    "fontforge.FontView.MetricsBaselineColor": "#79c0ff",
    "fontforge.FontView.MetricsGlyphContourColor": "#c8a27a",
    "fontforge.FontView.MetricsOriginColor": "#ff8a8a",
    # The font grid needs a smaller label than menus, especially at 200%+ DPI.
    "fontforge.FontView.Font": "55% ^View.LabelFont",
    # Glyph view
    "fontforge.CharView.PointColor": "#ff7b72",
    "fontforge.CharView.FirstPointColor": "#e3b341",
    "fontforge.CharView.SelectedPointColor": "#ffffff",
    "fontforge.CharView.ExtremePointColor": "#ff7bd5",
    "fontforge.CharView.PointOfInflectionColor": "#56d4dd",
    "fontforge.CharView.AlmostHVColor": "#7ee787",
    "fontforge.CharView.NextCPColor": "#79c0ff",
    "fontforge.CharView.PrevCPColor": "#d2a8ff",
    "fontforge.CharView.SelectedCPColor": "#ffffff",
    "fontforge.CharView.AnchorColor": "#79c0ff",
    "fontforge.CharView.ForegroundOutlineColor": "#f4f4f5",
    "fontforge.CharView.ForegroundThickOutlineColor": "#40f4f4f5",
    "fontforge.CharView.FillColor": "#30f4f4f5",
    "fontforge.CharView.PreviewFillColor": "#30f4f4f5",
    "fontforge.CharView.OpenPathColor": "#80ff7b72",
    "fontforge.CharView.ClipPathColor": "#79c0ff",
    "fontforge.CharView.BackgroundOutlineColor": "#6e7681",
    "fontforge.CharView.BackgroundThickOutlineColor": "#306e7681",
    "fontforge.CharView.WidthColor": "#f4f4f5",
    "fontforge.CharView.WidthSelColor": "#7ee787",
    "fontforge.CharView.LBearingSelColor": "#7ee787",
    "fontforge.CharView.LigatureCaretColor": "#d2a8ff",
    "fontforge.CharView.AnchoredOutlineColor": "#79c0ff",
    "fontforge.CharView.CoordinateLineColor": "#303036",
    "fontforge.CharView.AscentDescentColor": "#806e7681",
    "fontforge.CharView.ItalicCoordColor": "#6e7681",
    "fontforge.CharView.MetricsLabelColor": "#d4d4d8",
    "fontforge.CharView.TemplateOutlineColor": "#6e7681",
    "fontforge.CharView.RulerBigTickColor": "#8a8a92",
    "fontforge.CharView.RulerCurrentTickColor": "#ffffff",
    "fontforge.CharView.GuideOutlineColor": "#6e7681",
    "fontforge.CharView.GuideDragColor": "#f4f4f5",
    "fontforge.CharView.TraceColor": "#6e7681",
    "fontforge.CharView.OldOutlineColor": "#6e7681",
    "fontforge.CharView.TransformOriginColor": "#ffffff",
    "fontforge.CharView.MeasureToolLineColor": "#8a8a92",
    "fontforge.CharView.MeasureToolPointColor": "#ff7b72",
    "fontforge.CharView.MeasureToolPointSnappedColor": "#7ee787",
    "fontforge.CharView.MeasureToolCanvasNumbersColor": "#ff7b72",
    "fontforge.CharView.MeasureToolCanvasNumbersSnappedColor": "#7ee787",
    "fontforge.CharView.MeasureToolWindowForeground": "#f4f4f5",
    "fontforge.CharView.MeasureToolWindowBackground": "#1c1c20",
    "fontforge.CharView.CVPaletteForegroundColor": "#f4f4f5",
    "fontforge.CharView.CVPaletteBackgroundColor": "#141416",
    "fontforge.CharView.Button3DEdgeLightColor": "#3a3a40",
    "fontforge.CharView.Button3DEdgeDarkColor": "#0b0b0c",
    "fontforge.CharView.GridFitOutlineColor": "#6e7681",
    "fontforge.CharView.GridFitWidthColor": "#6e7681",
    "fontforge.CharView.RasterColor": "#ff6e7681",
    "fontforge.CharView.RasterNewColor": "#ff8a8a92",
    "fontforge.CharView.RasterOldColor": "#ff4a4a52",
    "fontforge.CharView.RasterGridColor": "#ff303036",
    "fontforge.CharView.RasterDarkColor": "#ff1c1c20",
    "fontforge.CharView.BackgroundImageColor": "#fe3a3a40",
    # Gdraw chrome
    "Gdraw.Background": "#0b0b0c",
    "Gdraw.Foreground": "#f4f4f5",
    "Gdraw.WarningForeground": "#ff7b72",
    "Gdraw.GGadget.Popup.Foreground": "#f4f4f5",
    "Gdraw.GGadget.Popup.Background": "#1c1c20",
    "Gdraw.GProgress.Background": "#141416",
    "Gdraw.GProgress.Foreground": "#f4f4f5",
    "Gdraw.GProgress.FillColor": "#ffffff",
    "Gdraw.GGadget.Box.NormalForeground": "#f4f4f5",
    "Gdraw.GGadget.Box.DisabledForeground": "#6e7681",
    "Gdraw.GGadget.Box.NormalBackground": "#141416",
    "Gdraw.GGadget.Box.DisabledBackground": "#141416",
    "Gdraw.GGadget.Box.PressedBackground": "#242428",
    "Gdraw.GGadget.Box.GradientStartCol": "#141416",
    "Gdraw.GGadget.Box.BorderBrightest": "#3a3a40",
    "Gdraw.GGadget.Box.BorderBrighter": "#303036",
    "Gdraw.GGadget.Box.BorderDarker": "#303036",
    "Gdraw.GGadget.Box.BorderDarkest": "#303036",
    "Gdraw.GGadget.Box.BorderInnerCol": "#303036",
    "Gdraw.GGadget.Box.BorderOuterCol": "#303036",
    "Gdraw.GGadget.Box.ActiveBorder": "#ffffff",
    "Gdraw.GGadget.Font": "92% ^View.DefaultFont",
    "Gdraw.GGadget.LeftMargin": "8",
    "Gdraw.GListMark.Box.NormalBackground": "#1c1c20",
    "Gdraw.GListMark.Box.BorderBrightest": "#3a3a40",
    "Gdraw.GListMark.Box.BorderBrighter": "#303036",
    "Gdraw.GListMark.Box.BorderDarker": "#303036",
    "Gdraw.GListMark.Box.BorderDarkest": "#303036",
    "Gdraw.GListMark.Box.BorderInnerCol": "#303036",
    "Gdraw.GLabel.Font": "92% ^View.DefaultFont",
    "Gdraw.GButton.Box.NormalBackground": "#1c1c20",
    "Gdraw.GButton.Box.GradientStartCol": "#1c1c20",
    "Gdraw.GButton.Box.BorderInnerCol": "#3a3a40",
    "Gdraw.GButton.Box.BorderOuterCol": "#303036",
    "Gdraw.GButton.Font": "92% ^View.DefaultFont",
    "Gdraw.GDefaultButton.Box.BorderBrightest": "#ffffff",
    "Gdraw.GDefaultButton.Box.BorderBrighter": "#ffffff",
    "Gdraw.GDefaultButton.Box.BorderDarker": "#ffffff",
    "Gdraw.GDefaultButton.Box.BorderDarkest": "#ffffff",
    "Gdraw.GDefaultButton.Box.BorderOuterCol": "#8a8a92",
    "Gdraw.GRadioOn.Box.PressedBackground": "#ffffff",
    "Gdraw.GRadioOn.Box.BorderBrighter": "#3a3a40",
    "Gdraw.GRadioOn.Box.BorderDarkest": "#303036",
    "Gdraw.GCheckBox.Box.Font": "92% ^View.DefaultFont",
    "Gdraw.GCheckBoxOn.Box.PressedBackground": "#ffffff",
    "Gdraw.GCheckBoxOn.Box.BorderBrighter": "#3a3a40",
    "Gdraw.GCheckBoxOn.Box.BorderDarkest": "#303036",
    "Gdraw.GCheckBoxOff.Box.BorderBrighter": "#3a3a40",
    "Gdraw.GCheckBoxOff.Box.BorderDarkest": "#303036",
    "Gdraw.GTextField.Box.NormalBackground": "#0f0f11",
    "Gdraw.GTextField.Box.BorderBrightest": "#3a3a40",
    "Gdraw.GTextField.Box.BorderBrighter": "#303036",
    "Gdraw.GTextField.Box.BorderDarker": "#303036",
    "Gdraw.GTextField.Box.BorderDarkest": "#303036",
    "Gdraw.GTextField.Box.BorderInnerCol": "#505058",
    "Gdraw.GComboBox.Box.BorderBrightest": "#3a3a40",
    "Gdraw.GComboBox.Box.BorderBrighter": "#303036",
    "Gdraw.GComboBoxMenu.Box.GradientStartCol": "#1c1c20",
    "Gdraw.GNumericFieldSpinner.Box.BorderInnerCol": "#3a3a40",
    "Gdraw.GNumericFieldSpinner.Box.BorderOuterCol": "#303036",
    "Gdraw.GList.Box.NormalBackground": "#0f0f11",
    "Gdraw.GScrollBar.Box.NormalForeground": "#141416",
    "Gdraw.GScrollBar.Box.DisabledForeground": "#141416",
    "Gdraw.GScrollBar.Box.NormalBackground": "#141416",
    "Gdraw.GScrollBar.Box.GradientStartCol": "#141416",
    "Gdraw.GScrollBar.Box.BorderBrightest": "#141416",
    "Gdraw.GScrollBar.Box.BorderDarker": "#141416",
    "Gdraw.GScrollBar.Box.BorderDarkest": "#141416",
    "Gdraw.GScrollBar.Box.BorderInnerCol": "#141416",
    "Gdraw.GScrollBar.Box.BorderOuterCol": "#141416",
    "Gdraw.GScrollBar.Box.ActiveBorder": "#141416",
    "Gdraw.GScrollBarThumb.Box.NormalForeground": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.DisabledForeground": "#242428",
    "Gdraw.GScrollBarThumb.Box.NormalBackground": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.DisabledBackground": "#242428",
    "Gdraw.GScrollBarThumb.Box.PressedBackground": "#505058",
    "Gdraw.GScrollBarThumb.Box.GradientStartCol": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.BorderBrightest": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.BorderBrighter": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.BorderDarker": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.BorderDarkest": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.BorderInnerCol": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.BorderOuterCol": "#3a3a40",
    "Gdraw.GScrollBarThumb.Box.ActiveBorder": "#505058",
    "Gdraw.GGroup.Box.NormalBackground": "#141416",
    "Gdraw.GGroup.Box.DisabledBackground": "#141416",
    "Gdraw.GLine.Box.BorderBrightest": "#303036",
    "Gdraw.GLine.Box.BorderBrighter": "#303036",
    "Gdraw.GMenuBar.Box.GradientStartCol": "#0b0b0c",
    "Gdraw.GMenuBar.Box.BorderInnerCol": "#0b0b0c",
    "Gdraw.GMenuBar.Box.ActiveBorder": "#ffffff",
    "Gdraw.GMenuBar.Font": "92% ^View.DefaultFont",
    "Gdraw.GMenu.Box.NormalBackground": "#17171a",
    "Gdraw.GMenu.Box.BorderOuterCol": "#303036",
    "Gdraw.GMenu.Font": "92% ^View.DefaultFont",
    "Gdraw.GMatrixEdit.Box.NormalBackground": "#0f0f11",
    "Gdraw.GMatrixEdit.Box.DisabledBackground": "#141416",
    "Gdraw.GMatrixEdit.TitleBG": "#242428",
    "Gdraw.GMatrixEdit.TitleFG": "#f4f4f5",
    "Gdraw.GMatrixEdit.TitleDivider": "#303036",
    "Gdraw.GMatrixEdit.RuleCol": "#303036",
    "Gdraw.GMatrixEdit.ActiveBG": "#ffffff",
    "Gdraw.GMatrixEditButton.Box.NormalBackground": "#1c1c20",
    "Gdraw.GMatrixEditButton.Box.DisabledBackground": "#141416",
    "Gdraw.GTabSet.Box.BorderWidth": "1",
    "Gdraw.GTabSet.Box.Radius": "2",
    "Gdraw.GTabSet.CloseColor": "#ff7b72",
    # Modern rounded controls
    "Gdraw.GButton.Box.BorderShape": "roundrect",
    "Gdraw.GButton.Box.Radius": "6",
    "Gdraw.GButton.Box.Padding": "3",
    "Gdraw.GDefaultButton.Box.BorderShape": "roundrect",
    "Gdraw.GDefaultButton.Box.Radius": "6",
    "Gdraw.GTextField.Box.BorderShape": "roundrect",
    "Gdraw.GTextField.Box.Radius": "6",
    "Gdraw.GTextField.Box.Padding": "3",
    "Gdraw.GList.Box.BorderShape": "roundrect",
    "Gdraw.GList.Box.Radius": "6",
    "Gdraw.GMenu.Box.BorderShape": "roundrect",
    "Gdraw.GMenu.Box.Radius": "6",
    "Gdraw.GMenu.Box.Padding": "6",
    "Gdraw.GComboBox.Box.BorderShape": "roundrect",
    "Gdraw.GComboBox.Box.Radius": "6",
    "Gdraw.GMenuBar.Box.Radius": "0",
    "Gdraw.GGadget.LeftMargin": "10",
    "Gdraw.GGadget.Skip": "8",
    # Splash
    "fontforge.Splash.Foreground": "#f4f4f5",
    "fontforge.Splash.Background": "#0b0b0c",
    "fontforge.Splash.Image": "ffpro-splash.png",
}


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: make_resources.py <default-resources> <output>")
        return 2

    source = pathlib.Path(sys.argv[1])
    target = pathlib.Path(sys.argv[2])
    lines = source.read_text(encoding="utf-8").splitlines()
    seen = set()
    output = []

    for line in lines:
        if line.startswith("fontforge.") or line.startswith("Gdraw."):
            key = line.split(":", 1)[0]
            if key in REPLACEMENTS:
                output.append(f"{key}: {REPLACEMENTS[key]}")
                seen.add(key)
                continue
        output.append(line)

    missing = sorted(set(REPLACEMENTS) - seen)
    if missing:
        output.append("")
        output.append("# FFpro additions")
        for key in missing:
            output.append(f"{key}: {REPLACEMENTS[key]}")

    target.write_text("\n".join(output) + "\n", encoding="utf-8")
    print(f"wrote {target} ({len(output)} lines, {len(seen)} replaced, {len(missing)} added)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
