import type { Palette } from "../palette";
import type { PortMeta } from "./meta";

export const meta: PortMeta = {
  id: "ghostty",
  name: "Ghostty",
  kind: "Terminal",
  keywords: ["terminal", "emulator", "ansi"],
  icon: "M5 21V10a7 7 0 0 1 14 0v11l-2.33-2-2.34 2L12 19l-2.33 2-2.34-2L5 21Z M9.5 10v1.5 M14.5 10v1.5",
  file: "dist/ghostty/marten",
  intro: "A theme file for Ghostty: the 16 terminal colors, background, cursor and selection.",
  steps: [
    { title: "Copy the theme", shell: ["mkdir -p ~/.config/ghostty/themes", "cp dist/ghostty/marten ~/.config/ghostty/themes/"] },
    { title: "Point Ghostty at it", text: "Add this line to ~/.config/ghostty/config:", code: ["theme = marten"] },
    { title: "Reload", text: "Press Cmd+Shift+, or restart Ghostty." },
  ],
  covers: ["16 ANSI colors, normal and bright", "Background and foreground", "Orange block cursor", "Steel selection", "Split dividers"],
  notes: ["Checked with ghostty +validate-config.", "Yellow means warnings, orange means the cursor. They never swap."],
};

export default function render(p: Palette) {
  const h = (r: string) => p.hex(r);
  return [{ path: `ghostty/${p.slug}`, content: `palette = 0=${h("ansi.black")}
palette = 1=${h("ansi.red")}
palette = 2=${h("ansi.green")}
palette = 3=${h("ansi.yellow")}
palette = 4=${h("ansi.blue")}
palette = 5=${h("ansi.magenta")}
palette = 6=${h("ansi.cyan")}
palette = 7=${h("ansi.white")}
palette = 8=${h("ansi.brBlack")}
palette = 9=${h("ansi.brRed")}
palette = 10=${h("ansi.brGreen")}
palette = 11=${h("ansi.brYellow")}
palette = 12=${h("ansi.brBlue")}
palette = 13=${h("ansi.brMagenta")}
palette = 14=${h("ansi.brCyan")}
palette = 15=${h("ansi.brWhite")}

background = ${h("base.bg")}
foreground = ${h("base.fg")}
cursor-color = ${h("base.accent")}
cursor-text = ${h("base.bg")}
selection-background = ${h("base.selection")}
selection-foreground = ${h("base.fg")}
split-divider-color = ${h("ui.border")}
` }];
}
