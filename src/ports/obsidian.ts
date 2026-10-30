import type { Palette } from "../palette";
import { hsl } from "../color";
import type { PortMeta } from "./meta";

export const meta: PortMeta = {
  id: "obsidian",
  name: "Obsidian",
  kind: "Notes",
  keywords: ["markdown", "notes", "vault", "css"],
  icon: "M12 2.5 5.5 9l2.75 12h7.5L18.5 9 12 2.5Z M12 2.5 10 12l2 9 M5.5 9l4.5 3 8.5-3",
  file: "dist/obsidian/Marten/",
  intro: "A community theme for Obsidian in dark mode.",
  steps: [
    { title: "Copy it into your vault", shell: ["cp -R dist/obsidian/Marten /path/to/your/vault/.obsidian/themes/"] },
    { title: "Choose the theme", text: "Open Settings → Appearance and pick Marten under Themes." },
    { title: "Switch to dark", text: "Set Base color scheme to Dark." },
  ],
  covers: ["Base color scale", "Accent, links and headings", "Callouts and tags", "Code blocks", "Graph view"],
  notes: [
    "Dark mode only. In light mode Obsidian keeps its default colors.",
    "Faint text uses ui.textFaint, lighter than fg-faint, because Obsidian draws real text with it.",
    "Code font: FiraCode Nerd Font, then Fira Code, then your system monospace.",
  ],
};

export default function render(p: Palette) {
  const h = (r: string) => p.hex(r);
  const accent = hsl(h("base.accent"));
  return [
    { path: `obsidian/${p.name}/manifest.json`, content: `{
  "name": "${p.name}",
  "version": "0.1.0",
  "minAppVersion": "1.0.0",
  "author": "vladbndko"
}
` },
    { path: `obsidian/${p.name}/theme.css`, content: `body {
  --font-monospace-theme: "FiraCode Nerd Font", "Fira Code", ui-monospace, Menlo, monospace;
}

.theme-dark {
  --${p.slug}-bg-deep: ${h("base.bgDeep")};
  --${p.slug}-bg: ${h("base.bg")};
  --${p.slug}-bg-line: ${h("base.bgLine")};
  --${p.slug}-surface: ${h("base.surface")};
  --${p.slug}-selection: ${h("base.selection")};
  --${p.slug}-fg: ${h("base.fg")};
  --${p.slug}-fg-muted: ${h("base.fgMuted")};
  --${p.slug}-fg-faint: ${h("ui.textFaint")};
  --${p.slug}-accent: ${h("base.accent")};
  --${p.slug}-accent-bright: ${h("base.accentHover")};
  --${p.slug}-yellow: ${h("ansi.yellow")};
  --${p.slug}-red: ${h("ansi.red")};
  --${p.slug}-green: ${h("ansi.green")};
  --${p.slug}-blue: ${h("ansi.blue")};
  --${p.slug}-magenta: ${h("ansi.magenta")};
  --${p.slug}-cyan: ${h("ansi.cyan")};
  --${p.slug}-br-blue: ${h("ansi.brBlue")};

  color-scheme: dark;

  --color-base-00: var(--${p.slug}-bg);
  --color-base-05: ${h("ui.base05")};
  --color-base-10: var(--${p.slug}-bg-line);
  --color-base-20: var(--${p.slug}-surface);
  --color-base-25: ${h("ansi.black")};
  --color-base-30: var(--${p.slug}-selection);
  --color-base-35: ${h("ui.base35")};
  --color-base-40: ${h("base.fgFaint")};
  --color-base-50: ${h("ui.textFaint")};
  --color-base-60: var(--${p.slug}-fg-muted);
  --color-base-70: ${h("ui.base70")};
  --color-base-100: var(--${p.slug}-fg);

  --accent-h: ${accent.h};
  --accent-s: ${accent.s}%;
  --accent-l: ${accent.l}%;

  --color-red-rgb: ${p.rgb("ansi.red")};
  --color-red: var(--${p.slug}-red);
  --color-orange-rgb: ${p.rgb("ansi.brRed")};
  --color-orange: ${h("ansi.brRed")};
  --color-yellow-rgb: ${p.rgb("ansi.yellow")};
  --color-yellow: var(--${p.slug}-yellow);
  --color-green-rgb: ${p.rgb("ansi.green")};
  --color-green: var(--${p.slug}-green);
  --color-cyan-rgb: ${p.rgb("ansi.cyan")};
  --color-cyan: var(--${p.slug}-cyan);
  --color-blue-rgb: ${p.rgb("ansi.blue")};
  --color-blue: var(--${p.slug}-blue);
  --color-purple-rgb: ${p.rgb("ansi.magenta")};
  --color-purple: var(--${p.slug}-magenta);
  --color-pink-rgb: ${p.rgb("ansi.brMagenta")};
  --color-pink: ${h("ansi.brMagenta")};

  --background-primary: var(--${p.slug}-bg);
  --background-primary-alt: var(--${p.slug}-bg-line);
  --background-secondary: var(--${p.slug}-bg-deep);
  --background-secondary-alt: var(--${p.slug}-surface);
  --background-modifier-border: var(--${p.slug}-selection);
  --background-modifier-border-hover: ${h("ui.base35")};
  --background-modifier-border-focus: var(--${p.slug}-accent);
  --background-modifier-hover: rgba(${p.rgb("base.fg")}, 0.06);
  --background-modifier-active-hover: rgba(${p.rgb("base.accent")}, 0.15);
  --background-modifier-form-field: var(--${p.slug}-bg-line);
  --titlebar-background: var(--${p.slug}-bg-deep);
  --titlebar-background-focused: var(--${p.slug}-surface);
  --divider-color: var(--${p.slug}-selection);

  --text-normal: var(--${p.slug}-fg);
  --text-muted: var(--${p.slug}-fg-muted);
  --text-faint: var(--${p.slug}-fg-faint);
  --text-on-accent: var(--${p.slug}-bg);
  --text-on-accent-inverted: var(--${p.slug}-bg);
  --text-accent: var(--${p.slug}-accent);
  --text-accent-hover: var(--${p.slug}-accent-bright);
  --text-selection: rgba(${p.rgb("base.accent")}, 0.22);
  --text-highlight-bg: rgba(${p.rgb("base.accent")}, 0.28);
  --text-error: var(--${p.slug}-red);
  --text-warning: var(--${p.slug}-yellow);
  --text-success: var(--${p.slug}-green);

  --interactive-normal: var(--${p.slug}-surface);
  --interactive-hover: ${h("ansi.black")};
  --interactive-accent: var(--${p.slug}-accent);
  --interactive-accent-hover: var(--${p.slug}-accent-bright);
  --checkbox-color: var(--${p.slug}-accent);
  --checkbox-color-hover: var(--${p.slug}-accent-bright);
  --checkbox-marker-color: var(--${p.slug}-bg);
  --nav-item-color-active: var(--${p.slug}-fg);
  --nav-item-background-active: var(--${p.slug}-selection);
  --caret-color: var(--${p.slug}-accent);

  --link-color: var(--${p.slug}-accent);
  --link-color-hover: var(--${p.slug}-accent-bright);
  --link-unresolved-color: var(--${p.slug}-accent);
  --link-unresolved-opacity: 0.6;
  --link-external-color: var(--${p.slug}-blue);
  --link-external-color-hover: var(--${p.slug}-br-blue);

  --h1-color: var(--${p.slug}-accent);
  --h2-color: var(--${p.slug}-fg);
  --h3-color: var(--${p.slug}-fg);
  --h4-color: var(--${p.slug}-fg-muted);
  --h5-color: var(--${p.slug}-fg-muted);
  --h6-color: var(--${p.slug}-fg-muted);
  --inline-title-color: var(--${p.slug}-fg);

  --tag-color: var(--${p.slug}-cyan);
  --tag-color-hover: ${h("ansi.brCyan")};
  --tag-background: rgba(${p.rgb("ansi.cyan")}, 0.12);
  --tag-background-hover: rgba(${p.rgb("ansi.cyan")}, 0.2);

  --table-border-color: var(--${p.slug}-selection);
  --table-header-background: var(--${p.slug}-bg-line);
  --blockquote-border-color: var(--${p.slug}-accent);
  --hr-color: var(--${p.slug}-selection);

  --code-background: var(--${p.slug}-bg-line);
  --code-normal: var(--${p.slug}-fg);
  --code-comment: var(--${p.slug}-fg-muted);
  --code-keyword: var(--${p.slug}-accent);
  --code-string: var(--${p.slug}-green);
  --code-function: var(--${p.slug}-blue);
  --code-value: var(--${p.slug}-magenta);
  --code-tag: var(--${p.slug}-cyan);
  --code-property: var(--${p.slug}-br-blue);
  --code-operator: var(--${p.slug}-fg-muted);
  --code-punctuation: var(--${p.slug}-fg-muted);
  --code-important: var(--${p.slug}-red);

  --graph-line: var(--${p.slug}-selection);
  --graph-node: var(--${p.slug}-fg-muted);
  --graph-node-unresolved: ${h("base.fgFaint")};
  --graph-node-focused: var(--${p.slug}-accent);
  --graph-node-tag: var(--${p.slug}-cyan);
  --graph-node-attachment: var(--${p.slug}-blue);
}
` },
  ];
}
