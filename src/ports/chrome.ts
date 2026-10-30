import type { Palette } from "../palette";
import type { PortMeta } from "./meta";

export const meta: PortMeta = {
  id: "chrome",
  name: "Chrome",
  kind: "Browser",
  keywords: ["browser", "chromium", "tabs", "extension"],
  icon: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0Z M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0Z M12 8.5h8.29 M15.03 13.75l-4.14 7.18 M8.97 13.75 4.82 6.57",
  file: "dist/chrome/marten/",
  intro: "A Chrome theme: tabs, toolbar, address bar and the New Tab page.",
  steps: [
    { title: "Open the extensions page", text: "Go to chrome://extensions and turn on Developer mode in the top right corner." },
    { title: "Load the theme", text: "Click Load unpacked and choose the dist/chrome/marten folder." },
    { title: "Going back", text: "To return to the default look, open Settings → Appearance and click Reset to default." },
  ],
  covers: ["Window frame and tabs", "Toolbar and bookmarks bar", "Address bar suggestions", "New Tab page"],
  notes: [
    "Works in Chromium browsers that support themes, such as Brave and Edge.",
    "Chrome may tint some controls from the theme colors on its own.",
  ],
};

export default function render(p: Palette) {
  const c = (r: string) => `[${p.rgb(r)}]`;
  return [{ path: `chrome/${p.slug}/manifest.json`, content: `{
  "manifest_version": 3,
  "name": "${p.name}",
  "version": "0.1.0",
  "description": "${p.name}, a dark theme of ${p.tagline}.",
  "theme": {
    "colors": {
      "frame": ${c("base.bgDeep")},
      "frame_inactive": ${c("base.bgDeep")},
      "frame_incognito": ${c("base.bgDeep")},
      "frame_incognito_inactive": ${c("base.bgDeep")},
      "background_tab": ${c("base.bgDeep")},
      "background_tab_inactive": ${c("base.bgDeep")},
      "background_tab_incognito": ${c("base.bgDeep")},
      "background_tab_incognito_inactive": ${c("base.bgDeep")},
      "toolbar": ${c("base.bg")},
      "toolbar_text": ${c("base.fg")},
      "toolbar_button_icon": ${c("base.fgMuted")},
      "tab_text": ${c("base.fg")},
      "tab_background_text": ${c("base.fgMuted")},
      "tab_background_text_inactive": ${c("ui.textFaint")},
      "tab_background_text_incognito": ${c("base.fgMuted")},
      "tab_background_text_incognito_inactive": ${c("ui.textFaint")},
      "bookmark_text": ${c("base.fgMuted")},
      "omnibox_background": ${c("base.surface")},
      "omnibox_text": ${c("base.fg")},
      "ntp_background": ${c("base.bg")},
      "ntp_text": ${c("base.fg")},
      "ntp_link": ${c("base.accent")},
      "ntp_header": ${c("ui.border")}
    }
  }
}
` }];
}
