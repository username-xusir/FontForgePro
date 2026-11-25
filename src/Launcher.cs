using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;

[assembly: AssemblyTitle("FontForgePro")]
[assembly: AssemblyDescription("FontForgePro font editor, built on FontForge")]
[assembly: AssemblyProduct("FontForgePro")]
[assembly: AssemblyCompany("FontForgePro")]
[assembly: AssemblyCopyright("GPL-3.0-or-later")]
[assembly: AssemblyVersion("2.1.0.0")]
[assembly: AssemblyFileVersion("2.1.0.0")]

namespace FontForgePro
{
    internal static class Launcher
    {
        private const int WM_SETICON = 0x0080;
        private const int ICON_SMALL = 0;
        private const int ICON_BIG = 1;

        private static string _home;
        private static Icon _iconSmall;
        private static Icon _iconBig;

        [STAThread]
        private static void Main(string[] args)
        {
            try
            {
                Run(args);
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "FontForgePro 启动失败：\n\n" + ex.Message,
                    "FontForgePro",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
            }
        }

        private static void Run(string[] args)
        {
            _home = AppDomain.CurrentDomain.BaseDirectory.TrimEnd('\\');
            string appDir = Path.Combine(_home, "app");
            string exePath = Path.Combine(appDir, "bin", "fontforge.exe");

            if (!File.Exists(exePath))
            {
                MessageBox.Show(
                    "找不到 FontForge 内核：\n" + exePath + "\n\n请重新安装 FontForgePro。",
                    "FontForgePro",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                return;
            }

            PrepareProfile(appDir);

            _iconSmall = LoadIcon(16);
            _iconBig = LoadIcon(32);

            var startInfo = new ProcessStartInfo();
            startInfo.FileName = exePath;
            startInfo.WorkingDirectory = appDir;
            startInfo.UseShellExecute = false;
            startInfo.CreateNoWindow = true;
            startInfo.Arguments = BuildArguments(args);

            string appData = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "FontForgePro");
            SetEnvironment(startInfo, appData);

            using (Process process = Process.Start(startInfo))
            {
                if (process == null)
                {
                    MessageBox.Show(
                        "无法启动 FontForge 内核。",
                        "FontForgePro",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error);
                    return;
                }

                Thread watcher = new Thread(() => WatchWindows(process));
                watcher.IsBackground = true;
                watcher.Start();

                process.WaitForExit();
            }
        }

        private static string BuildArguments(string[] args)
        {
            var parts = new List<string>();
            foreach (string arg in args)
            {
                parts.Add(Quote(arg));
            }
            return string.Join(" ", parts.ToArray());
        }

        private static string Quote(string value)
        {
            if (value.Length == 0)
            {
                return "\"\"";
            }

            bool needsQuotes = value.IndexOfAny(new[] { ' ', '\t', '\n', '\v', '"' }) >= 0;
            if (!needsQuotes)
            {
                return value;
            }

            var builder = new StringBuilder();
            builder.Append('"');
            int backslashes = 0;
            foreach (char c in value)
            {
                if (c == '\\')
                {
                    backslashes++;
                    continue;
                }

                if (c == '"')
                {
                    builder.Append('\\', backslashes * 2 + 1);
                    builder.Append('"');
                    backslashes = 0;
                    continue;
                }

                builder.Append('\\', backslashes);
                backslashes = 0;
                builder.Append(c);
            }
            builder.Append('\\', backslashes * 2);
            builder.Append('"');
            return builder.ToString();
        }

        private static void SetEnvironment(ProcessStartInfo startInfo, string appData)
        {
            var env = startInfo.EnvironmentVariables;
            string locale = GetPosixLocale();

            env["APPDATA"] = appData;
            env["FFPRO_HOME"] = _home;
            env["FFPRO_VERSION"] = "2.1.0";
            env["PYTHONIOENCODING"] = "utf-8";
            env["PYTHONUTF8"] = "1";
            env["LANG"] = locale + ".UTF-8";
            env["LC_ALL"] = locale + ".UTF-8";
            env["LANGUAGE"] = locale;
        }

        private static string GetPosixLocale()
        {
            string name;
            try
            {
                name = CultureInfo.InstalledUICulture.Name;
            }
            catch
            {
                name = CultureInfo.CurrentUICulture.Name;
            }

            if (string.IsNullOrEmpty(name))
            {
                return "en_US";
            }

            // Windows uses zh-CN; gettext catalogs use zh_CN.
            name = name.Replace('-', '_');
            if (name.StartsWith("zh_Hans", StringComparison.OrdinalIgnoreCase) ||
                name.Equals("zh_SG", StringComparison.OrdinalIgnoreCase))
            {
                return "zh_CN";
            }
            if (name.StartsWith("zh_Hant", StringComparison.OrdinalIgnoreCase) ||
                name.Equals("zh_HK", StringComparison.OrdinalIgnoreCase))
            {
                return "zh_TW";
            }
            if (name.Length == 2)
            {
                // Bare language codes are fine for gettext, but FontForge's
                // catalogs are mostly language_region.
                if (name == "zh")
                {
                    return "zh_CN";
                }
                if (name == "ja")
                {
                    return "ja_JP";
                }
                if (name == "ko")
                {
                    return "ko_KR";
                }
            }
            return name;
        }

        private static void PrepareProfile(string appDir)
        {
            string appData = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "FontForgePro");
            string ffUser = Path.Combine(appData, "FontForge");
            string pluginDir = Path.Combine(ffUser, "plugin");
            string pythonDir = Path.Combine(ffUser, "python");
            string gtkDir = Path.Combine(appData, "gtk-3.0");
            Directory.CreateDirectory(pluginDir);
            Directory.CreateDirectory(pythonDir);
            Directory.CreateDirectory(gtkDir);
            Directory.CreateDirectory(Path.Combine(ffUser, "autosave"));

            string resourcePath = Path.Combine(_home, "resources", "ffpro.resources")
                .Replace('\\', '/');

            string prefsPath = Path.Combine(ffUser, "prefs");
            var prefs = new List<string>();
            if (File.Exists(prefsPath))
            {
                prefs.AddRange(File.ReadAllLines(prefsPath, Encoding.UTF8));
            }

            SetPref(prefs, "ResourceFile", resourcePath);
            SetPref(prefs, "UsePlugins", "1");
            SetPref(prefs, "PluginStartupMode", "On");
            SetPref(prefs, "SplashScreen", "0");
            SetPref(prefs, "UndoDepth", "200");
            SetPref(prefs, "SnapToInt", "1");
            SetPref(prefs, "ShowControlPointsAlways", "1");
            SetPref(prefs, "FreeTypeInFontView", "1");
            SetPref(prefs, "OpenCharsInNewWindow", "0");
            SetPref(prefs, "SaveEditorState", "1");
            SetPref(prefs, "AutoSaveFrequency", "5");
            File.WriteAllLines(prefsPath, prefs.ToArray(), new UTF8Encoding(false));

            string gtkSettings = Path.Combine(gtkDir, "settings.ini");
            if (!File.Exists(gtkSettings))
            {
                File.WriteAllText(
                    gtkSettings,
                    "[Settings]\r\ngtk-font-name=Microsoft YaHei UI 10\r\n",
                    new UTF8Encoding(false));
            }
        }

        private static void SetPref(List<string> lines, string key, string value)
        {
            string prefix = key + ":";
            for (int i = 0; i < lines.Count; i++)
            {
                if (lines[i].StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                {
                    lines[i] = key + ":\t" + value;
                    return;
                }
            }
            lines.Add(key + ":\t" + value);
        }

        private static Icon LoadIcon(int size)
        {
            try
            {
                string path = Path.Combine(_home, "resources", "app.ico");
                if (File.Exists(path))
                {
                    return new Icon(path, new Size(size, size));
                }
            }
            catch
            {
                // Ignore icon failures; the app remains usable.
            }
            return null;
        }

        private static void WatchWindows(Process process)
        {
            while (!process.HasExited)
            {
                try
                {
                    UInt32 pid = (UInt32)process.Id;
                    EnumWindows(delegate(IntPtr hWnd, IntPtr lParam)
                    {
                        UInt32 windowPid;
                        GetWindowThreadProcessId(hWnd, out windowPid);
                        if (windowPid != pid || !IsWindowVisible(hWnd))
                        {
                            return true;
                        }

                        BrandTitle(hWnd);
                        ApplyIcon(hWnd);
                        return true;
                    }, IntPtr.Zero);
                }
                catch
                {
                    // Keep watching; transient failures are normal while windows open.
                }

                Thread.Sleep(700);
            }
        }

        private static void BrandTitle(IntPtr hWnd)
        {
            var buffer = new StringBuilder(512);
            int length = GetWindowText(hWnd, buffer, buffer.Capacity);
            if (length <= 0)
            {
                return;
            }

            string title = buffer.ToString();
            if (title.IndexOf("FontForge", StringComparison.Ordinal) < 0)
            {
                return;
            }

            string normalized = title.Replace("FontForgePro", "FontForge");
            string branded = normalized.Replace("FontForge", "FontForgePro");
            if (branded != title)
            {
                SetWindowText(hWnd, branded);
            }
        }

        private static void ApplyIcon(IntPtr hWnd)
        {
            if (_iconSmall != null)
            {
                SendMessage(hWnd, WM_SETICON, (IntPtr)ICON_SMALL, _iconSmall.Handle);
            }
            if (_iconBig != null)
            {
                SendMessage(hWnd, WM_SETICON, (IntPtr)ICON_BIG, _iconBig.Handle);
            }

            try
            {
                int enabled = 1;
                DwmSetWindowAttribute(hWnd, 20, ref enabled, sizeof(int));
                int caption = 0x000C0B0B;
                DwmSetWindowAttribute(hWnd, 35, ref caption, sizeof(int));
                int captionText = 0x00F5F4F4;
                DwmSetWindowAttribute(hWnd, 36, ref captionText, sizeof(int));
            }
            catch
            {
                // Dark title bars need Windows 10 1809+; older systems keep the default.
            }
        }

        private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

        [DllImport("user32.dll")]
        private static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

        [DllImport("user32.dll")]
        private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

        [DllImport("user32.dll", CharSet = CharSet.Unicode)]
        private static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

        [DllImport("user32.dll", CharSet = CharSet.Unicode)]
        private static extern bool SetWindowText(IntPtr hWnd, string lpString);

        [DllImport("user32.dll")]
        private static extern bool IsWindowVisible(IntPtr hWnd);

        [DllImport("user32.dll")]
        private static extern IntPtr SendMessage(IntPtr hWnd, int msg, IntPtr wParam, IntPtr lParam);

        [DllImport("dwmapi.dll")]
        private static extern int DwmSetWindowAttribute(IntPtr hwnd, int attribute, ref int value, int size);
    }
}
