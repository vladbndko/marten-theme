import type { Palette } from "../palette";
import { parseHex } from "../color";
import type { PortMeta } from "./meta";

export const meta: PortMeta = {
  id: "iterm2",
  name: "iTerm2",
  kind: "Terminal",
  keywords: ["terminal", "emulator", "ansi", "macos", "itermcolors"],
  icon: "M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Z M7 9.5l3 2.5-3 2.5 M12 15h5",
  file: "dist/iterm2/marten.itermcolors",
  intro: "A color preset for iTerm2: the 16 terminal colors, background, cursor and selection.",
  steps: [
    { title: "Import the preset", text: "Open Settings → Profiles → Colors, click Color Presets… → Import… and choose dist/iterm2/marten.itermcolors." },
    { title: "Apply it", text: "Open Color Presets… again and pick marten." },
  ],
  covers: ["16 ANSI colors, normal and bright", "Background and foreground", "Orange cursor", "Steel selection", "Links, badge and search matches"],
  notes: ["Colors are written in sRGB, so they match the other ports.", "Yellow means warnings, orange means the cursor. They never swap."],
};

export default function render(p: Palette) {
  const color = (name: string, ref: string, alpha = 1) => {
    const [r, g, b] = parseHex(p.hex(ref)).map((c) => (c / 255).toFixed(6));
    return `	<key>${name}</key>
	<dict>
		<key>Alpha Component</key>
		<real>${alpha}</real>
		<key>Blue Component</key>
		<real>${b}</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>${g}</real>
		<key>Red Component</key>
		<real>${r}</real>
	</dict>`;
  };
  const ansi = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const keys = [...ansi, ...ansi.map((c) => `br${c[0].toUpperCase()}${c.slice(1)}`)];
  return [{ path: `iterm2/${p.slug}.itermcolors`, content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${[
  ...keys.map((k, i) => color(`Ansi ${i} Color`, `ansi.${k}`)),
  color("Background Color", "base.bg"),
  color("Badge Color", "base.accent", 0.5),
  color("Bold Color", "base.fg"),
  color("Cursor Color", "base.accent"),
  color("Cursor Guide Color", "base.bgLine"),
  color("Cursor Text Color", "base.bg"),
  color("Foreground Color", "base.fg"),
  color("Link Color", "ansi.blue"),
  color("Match Background Color", "ui.search"),
  color("Selected Text Color", "base.fg"),
  color("Selection Color", "base.selection"),
].join("\n")}
</dict>
</plist>
` }];
}
