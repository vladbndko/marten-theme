import type { Palette } from "../palette";
import type { PortMeta } from "./meta";

export const meta: PortMeta = {
  id: "slack",
  name: "Slack",
  kind: "Chat",
  keywords: ["chat", "messenger", "sidebar", "work"],
  icon: "M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z M10.5 7.5l-1 9 M14.5 7.5l-1 9 M7.5 10.25h9.25 M7.25 13.75h9.25",
  file: "dist/slack/marten.txt",
  intro: "A custom theme string for Slack: navigation, selected items, presence and notifications.",
  steps: [
    { title: "Copy the theme string", shell: ["pbcopy < dist/slack/marten.txt"] },
    { title: "Import it", text: "In Slack open Preferences → Appearance, select Custom theme, then click Import theme next to Theme Colors and paste." },
    { title: "If Slack rejects it", text: "Older Slack builds take the 8-color legacy string. Copy it instead:", shell: ["pbcopy < dist/slack/marten-legacy.txt"] },
  ],
  covers: ["Sidebar and window", "Selected channel in molten orange", "Presence dot", "Mention badges"],
  notes: ["Slack has no theme files; the theme is a pasted string.", "Slack picks the text colors itself from the ones it gets."],
};

export default function render(p: Palette) {
  const h = (r: string) => p.hex(r);
  const join = (refs: string[]) => refs.map(h).join(",") + "\n";
  return [
    { path: `slack/${p.slug}.txt`, content: join(["base.bgDeep", "base.accent", "ansi.green", "ansi.red"]) },
    {
      path: `slack/${p.slug}-legacy.txt`,
      content: join(["base.bgDeep", "base.surface", "base.accent", "base.bg", "base.surface", "base.fg", "ansi.green", "ansi.red"]),
    },
  ];
}
