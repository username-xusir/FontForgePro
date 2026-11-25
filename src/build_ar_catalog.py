"""Build the partial Arabic UI catalog bundled with FontForgePro.

FontForge 20251009 ships catalogs for Chinese, English, French, Russian,
Spanish and many other languages, but not Arabic. This script adds a curated
Arabic catalog for the menu bar, common menu items, and dialog buttons. Strings
that are not in this catalog fall back to English, which keeps the rest of the
application usable.

The compiled file is copied to:
    app/share/locale/ar/LC_MESSAGES/FontForge.mo
"""

from __future__ import annotations

import pathlib
import struct
import sys

# Exact msgids from FontForge's catalog. Mnemonics are part of the msgid, but
# Arabic labels do not need them; the translation can omit the underscore.
TRANSLATIONS = {
    # Menu bar
    "_File": "ملف",
    "_Edit": "تحرير",
    "E_lement": "عنصر",
    "_Tools": "أدوات",
    "H_ints": "تلميحات",
    "E_ncoding": "ترميز",
    "_View": "عرض",
    "_Metrics": "قياسات",
    "_Window": "نافذة",
    "_Help": "مساعدة",
    # File menu
    "Font|_New": "جديد",
    "_Open": "فتح",
    "_Save": "حفظ",
    "_Save As...": "حفظ باسم...",
    "Save A_ll": "حفظ الكل",
    "_Generate Fonts...": "إنشاء الخطوط...",
    "_Import...": "استيراد...",
    "_Import": "استيراد",
    "_Print...": "طباعة...",
    "_Print": "طباعة",
    "_Revert": "استعادة",
    "_Quit": "خروج",
    "_Close": "إغلاق",
    # Edit menu
    "_Undo": "تراجع",
    "_Redo": "إعادة",
    "Cu_t": "قص",
    "_Copy": "نسخ",
    "_Paste": "لصق",
    "_Delete": "حذف",
    "Select _All": "تحديد الكل",
    "_Select": "تحديد",
    "_Deselect All": "إلغاء تحديد الكل",
    "Find Pr_oblems...": "البحث عن المشاكل...",
    "Find Proble_ms...": "البحث عن المشاكل...",
    # Element menu
    "_Font Info...": "معلومات الخط...",
    "_Glyph Info...": "معلومات الحرف...",
    "_Transform...": "تحويل...",
    "_Align Points": "محاذاة النقاط",
    "_Simplify": "تبسيط",
    "A_dd Extrema": "إضافة النقاط القصوى",
    "_Extrema": "النقاط القصوى",
    "_Correct Direction": "تصحيح الاتجاه",
    "_Validate...": "التحقق...",
    "_Layers": "طبقات",
    "_Remove Overlap": "إزالة التداخل",
    "_Expand Stroke...": "توسيع الحد...",
    "_Round To Grid": "تقريب إلى الشبكة",
    "Round To _Int": "تقريب إلى عدد صحيح",
    # View / Window
    "_Fit": "ملاءمة",
    "Zoom _in": "تكبير",
    "_Next Glyph": "الحرف التالي",
    "_Prev Glyph": "الحرف السابق",
    "Previe_w": "معاينة",
    "New _Metrics Window": "نافذة قياسات جديدة",
    "New O_utline Window": "نافذة مخطط جديدة",
    "New _Bitmap Window": "نافذة نقطية جديدة",
    # Buttons and common labels
    "_Ok": "موافق",
    "_OK": "موافق",
    "OK": "موافق",
    "_Cancel": "إلغاء",
    "Cancel": "إلغاء",
    "_Yes": "نعم",
    "Yes": "نعم",
    "_No": "لا",
    "No": "لا",
    "_Apply": "تطبيق",
    "_Help": "مساعدة",
    "_Done": "تم",
    "_Browse": "استعراض",
    "_Configure": "تكوين",
    "_About...": "حول...",
    "_None": "بلا",
    "_Both": "كلاهما",
    "_Back": "خلفي",
    "_Accept inexact": "قبول غير الدقيق",
    # Common dialog titles
    "Preferences": "تفضيلات",
    "Font Info": "معلومات الخط",
    "Glyph Info": "معلومات الحرف",
    "Generate Fonts": "إنشاء الخطوط",
    "Warnings": "تحذيرات",
    "Error": "خطأ",
    "File Exists": "الملف موجود",
    "Cannot be Undone": "لا يمكن التراجع",
    "Save Failed": "فشل الحفظ",
    "Font View": "عرض الخط",
    "Outline View": "عرض المخطط",
    "Metrics View": "عرض القياسات",
    "Open Font": "فتح خط",
}


def build_mo(items: list[tuple[str, str]]) -> bytes:
    items = [("", HEADER)] + items
    items.sort(key=lambda item: item[0].encode("utf-8"))
    keys = [key.encode("utf-8") for key, _ in items]
    values = [value.encode("utf-8") for _, value in items]
    count = len(items)

    key_table_offset = 28
    value_table_offset = 28 + 8 * count
    data_offset = 28 + 16 * count

    key_data = bytearray()
    key_offsets: list[tuple[int, int]] = []
    for key in keys:
        key_offsets.append((len(key), data_offset + len(key_data)))
        key_data += key + b"\0"

    value_data = bytearray()
    value_offsets: list[tuple[int, int]] = []
    value_base = data_offset + len(key_data)
    for value in values:
        value_offsets.append((len(value), value_base + len(value_data)))
        value_data += value + b"\0"

    # The .mo header is seven uint32 fields (28 bytes), including an empty
    # hash table. Getting this wrong shifts every offset by eight bytes.
    output = bytearray(
        struct.pack(
            "<IIIIIII",
            0x950412DE,
            0,
            count,
            key_table_offset,
            value_table_offset,
            0,
            0,
        )
    )
    for length, offset in key_offsets:
        output += struct.pack("<II", length, offset)
    for length, offset in value_offsets:
        output += struct.pack("<II", length, offset)
    output += key_data
    output += value_data
    return bytes(output)


HEADER = (
    "Project-Id-Version: FontForgePro\n"
    "Language: ar\n"
    "MIME-Version: 1.0\n"
    "Content-Type: text/plain; charset=UTF-8\n"
    "Content-Transfer-Encoding: 8bit\n"
    "Plural-Forms: nplurals=6; plural=(n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : "
    "n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5);\n"
)


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: build_ar_catalog.py <output.mo>")
        return 2
    output = pathlib.Path(sys.argv[1])
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(build_mo(list(TRANSLATIONS.items())))
    print(f"wrote {output} ({len(TRANSLATIONS)} translations)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
