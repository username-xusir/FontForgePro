using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace FontForgePro
{
    internal sealed class WelcomeForm : Form
    {
        private readonly WelcomeCopy _copy;
        private readonly Label[] _stepLabels;
        private readonly Label _kicker;
        private readonly Label _heading;
        private readonly Label _body;
        private readonly Label _bullets;
        private readonly Button _back;
        private readonly Button _next;
        private readonly Button _skip;
        private readonly float _scale;
        private readonly float _fontScale;
        private int _index;

        public WelcomeForm(string locale, string appDir)
        {
            _copy = WelcomeCopy.For(locale);
            float dpiScale = GetScale();
            float fitWidth = (Screen.PrimaryScreen.Bounds.Width - 40) / 900F;
            float fitHeight = (Screen.PrimaryScreen.Bounds.Height - 80) / 560F;
            float fit = Math.Min(fitWidth, fitHeight);
            _scale = Math.Max(0.85F, Math.Min(dpiScale, fit > 0 ? fit : dpiScale));
            _fontScale = _scale / dpiScale;

            Text = "FontForgePro";
            StartPosition = FormStartPosition.CenterScreen;
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;
            MinimizeBox = false;
            ShowInTaskbar = true;
            BackColor = Color.FromArgb(11, 11, 12);
            ForeColor = Color.FromArgb(244, 244, 245);
            ClientSize = new Size(Px(900), Px(560));
            AutoScaleMode = AutoScaleMode.None;
            Font = Ui(10F);
            DoubleBuffered = true;

            try
            {
                Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
            }
            catch
            {
                // The default icon is fine.
            }

            var left = new Panel();
            left.Dock = DockStyle.Left;
            left.Width = Px(280);
            left.BackColor = Color.FromArgb(17, 17, 20);
            Controls.Add(left);

            var logo = new Label();
            logo.Text = "f";
            logo.Font = new Font("Georgia", 64F * _fontScale, FontStyle.Italic, GraphicsUnit.Point);
            logo.ForeColor = Color.White;
            logo.AutoSize = true;
            logo.Location = new Point(Px(30), Px(18));
            left.Controls.Add(logo);

            var name = new Label();
            name.Text = "FontForgePro";
            name.Font = Ui(16F, FontStyle.Bold);
            name.ForeColor = Color.White;
            name.AutoSize = true;
            name.Location = new Point(Px(32), Px(120));
            left.Controls.Add(name);

            var tagline = new Label();
            tagline.Text = _copy.Tagline;
            tagline.Font = Ui(9.5F);
            tagline.ForeColor = Color.FromArgb(138, 138, 146);
            tagline.AutoSize = false;
            tagline.Size = new Size(Px(224), Px(48));
            tagline.Location = new Point(Px(33), Px(156));
            left.Controls.Add(tagline);

            var version = new Label();
            version.Text = "2.3.0  ·  FontForge 20251009";
            version.Font = Mono(8F);
            version.ForeColor = Color.FromArgb(110, 110, 118);
            version.AutoSize = false;
            version.Size = new Size(Px(230), Px(26));
            version.Location = new Point(Px(33), Px(516));
            left.Controls.Add(version);

            _stepLabels = new Label[_copy.Steps.Length];
            for (int i = 0; i < _copy.Steps.Length; i++)
            {
                var step = new Label();
                step.Text = _copy.Steps[i].Short;
                step.Font = Ui(10F);
                step.ForeColor = Color.FromArgb(126, 126, 134);
                step.AutoSize = false;
                step.Size = new Size(Px(224), Px(30));
                step.Location = new Point(Px(33), Px(220 + i * 38));
                left.Controls.Add(step);
                _stepLabels[i] = step;
            }

            _kicker = new Label();
            _kicker.ForeColor = Color.FromArgb(154, 216, 138);
            _kicker.Font = Ui(9F, FontStyle.Bold);
            _kicker.AutoSize = false;
            _kicker.Size = new Size(Px(558), Px(24));
            _kicker.Location = new Point(Px(312), Px(44));
            Controls.Add(_kicker);

            _heading = new Label();
            _heading.ForeColor = Color.White;
            _heading.Font = Ui(22F, FontStyle.Bold);
            _heading.AutoSize = false;
            _heading.Size = new Size(Px(558), Px(52));
            _heading.Location = new Point(Px(310), Px(72));
            Controls.Add(_heading);

            _body = new Label();
            _body.ForeColor = Color.FromArgb(212, 212, 216);
            _body.Font = Ui(11F);
            _body.AutoSize = false;
            _body.Size = new Size(Px(558), Px(100));
            _body.Location = new Point(Px(312), Px(136));
            Controls.Add(_body);

            _bullets = new Label();
            _bullets.ForeColor = Color.FromArgb(244, 244, 245);
            _bullets.Font = Ui(10.5F);
            _bullets.AutoSize = false;
            _bullets.Size = new Size(Px(558), Px(228));
            _bullets.Location = new Point(Px(312), Px(244));
            Controls.Add(_bullets);

            _skip = MakeButton(_copy.Skip, false);
            _skip.Size = new Size(Px(120), Px(40));
            _skip.Location = new Point(Px(312), Px(486));
            _skip.Click += delegate { DialogResult = DialogResult.Cancel; Close(); };
            Controls.Add(_skip);

            _back = MakeButton(_copy.Back, false);
            _back.Size = new Size(Px(112), Px(40));
            _back.Location = new Point(Px(588), Px(486));
            _back.Click += delegate
            {
                if (_index > 0)
                {
                    _index--;
                    UpdateStep();
                }
            };
            Controls.Add(_back);

            _next = MakeButton(_copy.Next, true);
            _next.Size = new Size(Px(140), Px(40));
            _next.Location = new Point(Px(712), Px(486));
            _next.Click += delegate
            {
                if (_index >= _copy.Steps.Length - 1)
                {
                    DialogResult = DialogResult.OK;
                    Close();
                }
                else
                {
                    _index++;
                    UpdateStep();
                }
            };
            Controls.Add(_next);

            AcceptButton = _next;
            CancelButton = _skip;
            UpdateStep();
        }

        private Font Ui(float size, FontStyle style = FontStyle.Regular)
        {
            return new Font(
                "Microsoft YaHei UI",
                size * _fontScale,
                style,
                GraphicsUnit.Point);
        }

        private Font Mono(float size)
        {
            return new Font(
                "Consolas",
                size * _fontScale,
                FontStyle.Regular,
                GraphicsUnit.Point);
        }

        private int Px(int value)
        {
            return (int)Math.Round(value * _scale);
        }

        private static float GetScale()
        {
            try
            {
                using (Graphics graphics = Graphics.FromHwnd(IntPtr.Zero))
                {
                    float scale = graphics.DpiX / 96F;
                    if (scale >= 0.75F && scale <= 5F)
                    {
                        return scale;
                    }
                }
            }
            catch
            {
                // Use 100% scaling.
            }
            return 1F;
        }

        private Button MakeButton(string text, bool primary)
        {
            var button = new Button();
            button.Text = text;
            button.FlatStyle = FlatStyle.Flat;
            button.FlatAppearance.BorderSize = 1;
            button.FlatAppearance.BorderColor = primary
                ? Color.White
                : Color.FromArgb(58, 58, 64);
            button.BackColor = primary ? Color.White : Color.FromArgb(28, 28, 32);
            button.ForeColor = primary ? Color.Black : Color.White;
            button.Font = Ui(10F, FontStyle.Bold);
            button.UseVisualStyleBackColor = false;
            return button;
        }

        private void UpdateStep()
        {
            WelcomeStep step = _copy.Steps[_index];
            _kicker.Text = step.Kicker;
            _heading.Text = step.Title;
            _body.Text = step.Body;
            _bullets.Text = string.Join("\n\n", step.Bullets);
            _next.Text = _index >= _copy.Steps.Length - 1 ? _copy.Start : _copy.Next;
            _back.Enabled = _index > 0;
            _back.ForeColor = _back.Enabled ? Color.White : Color.FromArgb(90, 90, 96);

            for (int i = 0; i < _stepLabels.Length; i++)
            {
                bool active = i == _index;
                _stepLabels[i].ForeColor = active
                    ? Color.White
                    : Color.FromArgb(126, 126, 134);
                _stepLabels[i].Font = Ui(10F, active ? FontStyle.Bold : FontStyle.Regular);
            }
        }

        protected override void OnHandleCreated(EventArgs e)
        {
            base.OnHandleCreated(e);
            try
            {
                int enabled = 1;
                DwmSetWindowAttribute(Handle, 20, ref enabled, sizeof(int));
                int caption = 0x000C0B0B;
                DwmSetWindowAttribute(Handle, 35, ref caption, sizeof(int));
                int captionText = 0x00F5F4F4;
                DwmSetWindowAttribute(Handle, 36, ref captionText, sizeof(int));
            }
            catch
            {
                // Dark title bars need Windows 10 1809+.
            }
        }

        protected override void OnShown(EventArgs e)
        {
            base.OnShown(e);
            _next.Focus();
        }

        [DllImport("dwmapi.dll")]
        private static extern int DwmSetWindowAttribute(IntPtr hwnd, int attribute, ref int value, int size);

        private sealed class WelcomeStep
        {
            public string Short;
            public string Kicker;
            public string Title;
            public string Body;
            public string[] Bullets;
        }

        private sealed class WelcomeCopy
        {
            public string Tagline;
            public string Skip;
            public string Back;
            public string Next;
            public string Start;
            public WelcomeStep[] Steps;

            public static WelcomeCopy For(string locale)
            {
                string lang = (locale ?? "en").ToLowerInvariant();
                if (lang.StartsWith("zh_tw") || lang.StartsWith("zh_hk") || lang.StartsWith("zh_mo"))
                {
                    return Traditional();
                }
                if (lang.StartsWith("zh"))
                {
                    return Simplified();
                }
                if (lang.StartsWith("fr"))
                {
                    return French();
                }
                if (lang.StartsWith("ru"))
                {
                    return Russian();
                }
                if (lang.StartsWith("es"))
                {
                    return Spanish();
                }
                return English();
            }

            private static WelcomeCopy Simplified()
            {
                return new WelcomeCopy
                {
                    Tagline = "原生 FontForge 字体设计工作台",
                    Skip = "跳过",
                    Back = "上一步",
                    Next = "下一步",
                    Start = "开始使用",
                    Steps = new[]
                    {
                        new WelcomeStep
                        {
                            Short = "01   欢迎",
                            Kicker = "第 1 步 · 欢迎",
                            Title = "欢迎使用 FontForgePro",
                            Body = "原生 FontForge 20251009 内核，保留完整的专业字体功能；FFpro 工具把常用操作整理到一起。",
                            Bullets = new[]
                            {
                                "•  完整 FontForge：轮廓、位图、OpenType、变体、脚本",
                                "•  FFpro：字体体检、预览、清理、模板",
                                "•  设置独立保存在 %APPDATA%\\FontForgePro，不影响系统 FontForge"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "02   界面",
                            Kicker = "第 2 步 · 界面",
                            Title = "先认识字体窗口",
                            Body = "字体窗口显示所有字符槽位；双击任意字形进入字形窗口。空白格只是未使用的编码槽位，不是错误。",
                            Bullets = new[]
                            {
                                "•  字体窗口：总览、排序、生成字体",
                                "•  字形窗口：轮廓、控制点、锚点、图层",
                                "•  按 ` 键进入预览模式，滚轮缩放"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "03   流程",
                            Kicker = "第 3 步 · 流程",
                            Title = "做第一个字体",
                            Body = "新建 → 编辑字形 → 体检 → 预览 → 生成。先用模板字体练手最快。",
                            Bullets = new[]
                            {
                                "•  文件 → 新建，或 FFpro 工具 → 打开模板字体",
                                "•  左键拖点，右键加点；Shift 多选",
                                "•  文件 → 生成字体，导出 TTF / OTF / WOFF2"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "04   工具",
                            Kicker = "第 4 步 · 工具",
                            Title = "FFpro 工具与帮助",
                            Body = "工具 → FFpro 工具里有全部快捷功能；帮助菜单可以随时打开教程。",
                            Bullets = new[]
                            {
                                "•  字体预览：8 档字号，文字自动保存",
                                "•  离线 FontForge 官方手册，可本地搜索",
                                "•  界面语言跟随系统，也可手动切换"
                            }
                        }
                    }
                };
            }

            private static WelcomeCopy Traditional()
            {
                WelcomeCopy copy = Simplified();
                copy.Tagline = "原生 FontForge 字型設計工作台";
                copy.Skip = "跳過";
                copy.Back = "上一步";
                copy.Next = "下一步";
                copy.Start = "開始使用";
                copy.Steps[0].Short = "01   歡迎";
                copy.Steps[0].Kicker = "第 1 步 · 歡迎";
                copy.Steps[0].Title = "歡迎使用 FontForgePro";
                copy.Steps[0].Body = "原生 FontForge 20251009 核心，保留完整的專業字型功能；FFpro 工具把常用操作整理在一起。";
                copy.Steps[0].Bullets = new[]
                {
                    "•  完整 FontForge：輪廓、點陣、OpenType、變體、腳本",
                    "•  FFpro：字型檢查、預覽、清理、範本",
                    "•  設定獨立儲存在 %APPDATA%\\FontForgePro，不影響系統 FontForge"
                };
                copy.Steps[1].Short = "02   介面";
                copy.Steps[1].Kicker = "第 2 步 · 介面";
                copy.Steps[1].Title = "先認識字型視窗";
                copy.Steps[1].Body = "字型視窗顯示所有字元槽位；雙擊任一字形進入字形視窗。空白格只是未使用的編碼槽位，不是錯誤。";
                copy.Steps[1].Bullets = new[]
                {
                    "•  字型視窗：總覽、排序、產生字型",
                    "•  字形視窗：輪廓、控制點、錨點、圖層",
                    "•  按 ` 鍵進入預覽模式，滾輪縮放"
                };
                copy.Steps[2].Short = "03   流程";
                copy.Steps[2].Kicker = "第 3 步 · 流程";
                copy.Steps[2].Title = "做第一個字型";
                copy.Steps[2].Body = "新建 → 編輯字形 → 檢查 → 預覽 → 產生。先用範本字型練手最快。";
                copy.Steps[2].Bullets = new[]
                {
                    "•  檔案 → 新建，或 FFpro 工具 → 開啟範本字型",
                    "•  左鍵拖點，右鍵加點；Shift 多選",
                    "•  檔案 → 產生字型，匯出 TTF / OTF / WOFF2"
                };
                copy.Steps[3].Short = "04   工具";
                copy.Steps[3].Kicker = "第 4 步 · 工具";
                copy.Steps[3].Title = "FFpro 工具與說明";
                copy.Steps[3].Body = "工具 → FFpro 工具裡有全部快捷功能；說明功能表可以隨時開啟教學。";
                copy.Steps[3].Bullets = new[]
                {
                    "•  字型預覽：8 種字級，文字自動儲存",
                    "•  離線 FontForge 官方手冊，可本機搜尋",
                    "•  介面語言跟隨系統，也可手動切換"
                };
                return copy;
            }

            private static WelcomeCopy English()
            {
                return new WelcomeCopy
                {
                    Tagline = "Native FontForge font studio",
                    Skip = "Skip",
                    Back = "Back",
                    Next = "Next",
                    Start = "Start using it",
                    Steps = new[]
                    {
                        new WelcomeStep
                        {
                            Short = "01   Welcome",
                            Kicker = "Step 1 · Welcome",
                            Title = "Welcome to FontForgePro",
                            Body = "Built on native FontForge 20251009 with all professional font tools kept intact. FFpro tools gather the everyday actions in one menu.",
                            Bullets = new[]
                            {
                                "•  Full FontForge: outlines, bitmaps, OpenType, variations, scripting",
                                "•  FFpro: font audit, preview, cleanup, starter template",
                                "•  Settings stay in %APPDATA%\\FontForgePro and never touch system FontForge"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "02   Interface",
                            Kicker = "Step 2 · Interface",
                            Title = "Meet the font window",
                            Body = "The font window shows every character slot. Double-click a glyph to open its outline window. Empty slots are unused encoding positions, not errors.",
                            Bullets = new[]
                            {
                                "•  Font window: overview, ordering, generate",
                                "•  Glyph window: outlines, points, anchors, layers",
                                "•  Press ` for preview mode; use the wheel to zoom"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "03   Workflow",
                            Kicker = "Step 3 · Workflow",
                            Title = "Make your first font",
                            Body = "New font → edit glyphs → audit → preview → generate. Starting from the template is the quickest way to learn.",
                            Bullets = new[]
                            {
                                "•  File → New, or FFpro Tools → Open Starter Font",
                                "•  Drag points with the left button, add points with the right button; Shift selects more",
                                "•  File → Generate Fonts, export TTF / OTF / WOFF2"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "04   Tools",
                            Kicker = "Step 4 · Tools",
                            Title = "FFpro tools and help",
                            Body = "Everything lives under Tools → FFpro Tools. The Help menu opens the local guides at any time.",
                            Bullets = new[]
                            {
                                "•  Font preview: eight sizes, text saved automatically",
                                "•  Offline official FontForge manual with local search",
                                "•  Interface language follows Windows or can be changed manually"
                            }
                        }
                    }
                };
            }

            private static WelcomeCopy French()
            {
                return new WelcomeCopy
                {
                    Tagline = "Studio de polices FontForge natif",
                    Skip = "Passer",
                    Back = "Retour",
                    Next = "Suivant",
                    Start = "Commencer",
                    Steps = new[]
                    {
                        new WelcomeStep
                        {
                            Short = "01   Bienvenue",
                            Kicker = "Étape 1 · Bienvenue",
                            Title = "Bienvenue dans FontForgePro",
                            Body = "Basé sur FontForge 20251009 natif, avec tous les outils professionnels conservés. Les outils FFpro rassemblent les actions courantes.",
                            Bullets = new[]
                            {
                                "•  FontForge complet : contours, bitmaps, OpenType, variations, scripts",
                                "•  FFpro : audit, aperçu, nettoyage, modèle de départ",
                                "•  Réglages dans %APPDATA%\\FontForgePro, sans toucher à FontForge système"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "02   Interface",
                            Kicker = "Étape 2 · Interface",
                            Title = "Découvrir la fenêtre de police",
                            Body = "La fenêtre de police montre toutes les cases de caractères. Double-cliquez sur un glyphe pour ouvrir son contour. Les cases vides sont des positions non utilisées.",
                            Bullets = new[]
                            {
                                "•  Fenêtre de police : vue d'ensemble, ordre, génération",
                                "•  Fenêtre de glyphe : contours, points, ancres, calques",
                                "•  Appuyez sur ` pour l'aperçu ; molette pour zoomer"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "03   Flux",
                            Kicker = "Étape 3 · Flux",
                            Title = "Votre première police",
                            Body = "Nouvelle police → éditer → audit → aperçu → générer. Partir du modèle est le plus rapide.",
                            Bullets = new[]
                            {
                                "•  Fichier → Nouveau, ou Outils FFpro → Ouvrir la police modèle",
                                "•  Glisser les points au clic gauche, ajouter au clic droit ; Shift pour multi-sélectionner",
                                "•  Fichier → Générer, exporter TTF / OTF / WOFF2"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "04   Outils",
                            Kicker = "Étape 4 · Outils",
                            Title = "Outils FFpro et aide",
                            Body = "Tout se trouve dans Outils → Outils FFpro. Le menu Aide ouvre les guides locaux.",
                            Bullets = new[]
                            {
                                "•  Aperçu : huit tailles, texte enregistré automatiquement",
                                "•  Manuel FontForge officiel hors ligne avec recherche locale",
                                "•  Langue de l'interface selon Windows ou choix manuel"
                            }
                        }
                    }
                };
            }

            private static WelcomeCopy Russian()
            {
                return new WelcomeCopy
                {
                    Tagline = "Студия шрифтов на FontForge",
                    Skip = "Пропустить",
                    Back = "Назад",
                    Next = "Далее",
                    Start = "Начать",
                    Steps = new[]
                    {
                        new WelcomeStep
                        {
                            Short = "01   Добро",
                            Kicker = "Шаг 1 · Добро пожаловать",
                            Title = "Добро пожаловать в FontForgePro",
                            Body = "Основано на FontForge 20251009 со всеми профессиональными инструментами. Инструменты FFpro собраны в одном меню.",
                            Bullets = new[]
                            {
                                "•  Полный FontForge: контуры, битмапы, OpenType, вариации, скрипты",
                                "•  FFpro: проверка, предпросмотр, очистка, шаблон",
                                "•  Настройки в %APPDATA%\\FontForgePro, системный FontForge не затрагивается"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "02   Интерфейс",
                            Kicker = "Шаг 2 · Интерфейс",
                            Title = "Окно шрифта",
                            Body = "Окно шрифта показывает все ячейки символов. Двойной щелчок открывает контур глифа. Пустые ячейки — неиспользуемые позиции кодировки.",
                            Bullets = new[]
                            {
                                "•  Окно шрифта: обзор, порядок, генерация",
                                "•  Окно глифа: контуры, точки, якоря, слои",
                                "•  Клавиша ` включает предпросмотр; колесо масштабирует"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "03   Работа",
                            Kicker = "Шаг 3 · Работа",
                            Title = "Первый шрифт",
                            Body = "Новый шрифт → правка → проверка → предпросмотр → генерация. Быстрее всего начать с шаблона.",
                            Bullets = new[]
                            {
                                "•  Файл → Новый или FFpro → Открыть шаблон",
                                "•  Тяните точки левой кнопкой, добавляйте правой; Shift — множественный выбор",
                                "•  Файл → Сгенерировать, экспорт TTF / OTF / WOFF2"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "04   Инструменты",
                            Kicker = "Шаг 4 · Инструменты",
                            Title = "Инструменты FFpro и справка",
                            Body = "Всё находится в Инструменты → Инструменты FFpro. Справка открывает локальные руководства.",
                            Bullets = new[]
                            {
                                "•  Предпросмотр: восемь размеров, текст сохраняется автоматически",
                                "•  Офлайн-руководство FontForge с локальным поиском",
                                "•  Язык интерфейса следует Windows или выбирается вручную"
                            }
                        }
                    }
                };
            }

            private static WelcomeCopy Spanish()
            {
                return new WelcomeCopy
                {
                    Tagline = "Estudio de fuentes FontForge nativo",
                    Skip = "Saltar",
                    Back = "Atrás",
                    Next = "Siguiente",
                    Start = "Empezar",
                    Steps = new[]
                    {
                        new WelcomeStep
                        {
                            Short = "01   Bienvenida",
                            Kicker = "Paso 1 · Bienvenida",
                            Title = "Bienvenido a FontForgePro",
                            Body = "Basado en FontForge 20251009 nativo, conservando todas las herramientas profesionales. Las herramientas FFpro reúnen las acciones habituales.",
                            Bullets = new[]
                            {
                                "•  FontForge completo: contornos, mapas de bits, OpenType, variaciones, scripts",
                                "•  FFpro: auditoría, vista previa, limpieza, plantilla",
                                "•  Ajustes en %APPDATA%\\FontForgePro, sin tocar FontForge del sistema"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "02   Interfaz",
                            Kicker = "Paso 2 · Interfaz",
                            Title = "La ventana de fuente",
                            Body = "La ventana de fuente muestra todas las celdas de caracteres. Haz doble clic en un glifo para abrir su contorno. Las celdas vacías son posiciones sin usar.",
                            Bullets = new[]
                            {
                                "•  Ventana de fuente: vista general, orden, generar",
                                "•  Ventana de glifo: contornos, puntos, anclas, capas",
                                "•  Pulsa ` para la vista previa; la rueda hace zoom"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "03   Flujo",
                            Kicker = "Paso 3 · Flujo",
                            Title = "Tu primera fuente",
                            Body = "Nueva fuente → editar → auditar → vista previa → generar. Empezar con la plantilla es lo más rápido.",
                            Bullets = new[]
                            {
                                "•  Archivo → Nuevo, o Herramientas FFpro → Abrir fuente de inicio",
                                "•  Arrastra puntos con el botón izquierdo, añade con el derecho; Shift selecciona varios",
                                "•  Archivo → Generar fuentes, exporta TTF / OTF / WOFF2"
                            }
                        },
                        new WelcomeStep
                        {
                            Short = "04   Herramientas",
                            Kicker = "Paso 4 · Herramientas",
                            Title = "Herramientas FFpro y ayuda",
                            Body = "Todo está en Herramientas → Herramientas FFpro. El menú Ayuda abre las guías locales.",
                            Bullets = new[]
                            {
                                "•  Vista previa: ocho tamaños, texto guardado automáticamente",
                                "•  Manual oficial de FontForge sin conexión con búsqueda local",
                                "•  El idioma sigue a Windows o se cambia manualmente"
                            }
                        }
                    }
                };
            }
        }
    }
}
