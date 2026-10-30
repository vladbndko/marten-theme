import type { Palette } from "../palette";
import type { PortMeta } from "./meta";

export const meta: PortMeta = {
  id: "claude-code",
  name: "Claude Code",
  kind: "Coding agent",
  keywords: ["cli", "terminal", "agent", "ai", "anthropic"],
  icon: "M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Z M12 8.5v7 M8.97 10.25l6.06 3.5 M8.97 13.75l6.06-3.5",
  file: "dist/claude-code/marten.json",
  intro: "A custom theme for Claude Code: the prompt, permissions, modes, diffs and subagent colors.",
  steps: [
    { title: "Copy the theme", shell: ["mkdir -p ~/.claude/themes", "cp dist/claude-code/marten.json ~/.claude/themes/"] },
    { title: "Pick it", text: "Run /theme in Claude Code and choose Marten. If the themes folder did not exist before, restart Claude Code once." },
  ],
  covers: ["Claude's orange and the spinner", "Prompt border, plan and auto-accept modes", "Permission prompts", "Diffs, with word highlights", "Your messages and selection", "Subagent colors"],
  notes: [
    "Built on the dark preset; anything the theme does not set keeps its default.",
    "Pair it with the Ghostty or iTerm2 port so the terminal background matches.",
  ],
};

export default function render(p: Palette) {
  const h = (r: string) => p.hex(r);
  return [{ path: `claude-code/${p.slug}.json`, content: `{
  "name": "${p.name}",
  "base": "dark",
  "overrides": {
    "claude": "${h("base.accent")}",
    "claudeShimmer": "${h("base.accentHover")}",
    "text": "${h("base.fg")}",
    "inverseText": "${h("base.bg")}",
    "inactive": "${h("base.fgMuted")}",
    "inactiveShimmer": "${h("ansi.white")}",
    "subtle": "${h("base.fgFaint")}",
    "suggestion": "${h("ansi.blue")}",
    "permission": "${h("ansi.blue")}",
    "permissionShimmer": "${h("ansi.brBlue")}",
    "remember": "${h("ansi.brBlue")}",
    "ide": "${h("ansi.blue")}",

    "success": "${h("status.success")}",
    "error": "${h("status.error")}",
    "warning": "${h("status.warning")}",
    "warningShimmer": "${h("ansi.brYellow")}",
    "merged": "${h("ansi.magenta")}",

    "promptBorder": "${h("base.fgFaint")}",
    "promptBorderShimmer": "${h("base.fgMuted")}",
    "planMode": "${h("ansi.cyan")}",
    "autoAccept": "${h("ansi.brMagenta")}",
    "bashBorder": "${h("ansi.magenta")}",
    "fastMode": "${h("ansi.brYellow")}",
    "fastModeShimmer": "${h("ansi.brWhite")}",
    "effortUltra": "${h("ansi.magenta")}",

    "diffAdded": "${h("ui.diffAdded")}",
    "diffRemoved": "${h("ui.diffRemoved")}",
    "diffAddedDimmed": "${h("ui.diffAdded")}",
    "diffRemovedDimmed": "${h("ui.diffRemoved")}",
    "diffAddedWord": "${h("ui.diffAddedWord")}",
    "diffRemovedWord": "${h("ui.diffRemovedWord")}",

    "userMessageBackground": "${h("base.surface")}",
    "userMessageBackgroundHover": "${h("base.selection")}",
    "bashMessageBackgroundColor": "${h("base.bgLine")}",
    "memoryBackgroundColor": "${h("ui.diffChanged")}",
    "selectionBg": "${h("base.selection")}",
    "composerSidebarBackground": "${h("base.bgDeep")}",

    "rate_limit_fill": "${h("ansi.blue")}",
    "rate_limit_empty": "${h("base.fgFaint")}",
    "briefLabelYou": "${h("ansi.brBlue")}",
    "briefLabelClaude": "${h("base.accent")}",

    "red_FOR_SUBAGENTS_ONLY": "${h("ansi.red")}",
    "orange_FOR_SUBAGENTS_ONLY": "${h("base.accent")}",
    "yellow_FOR_SUBAGENTS_ONLY": "${h("ansi.yellow")}",
    "green_FOR_SUBAGENTS_ONLY": "${h("ansi.green")}",
    "cyan_FOR_SUBAGENTS_ONLY": "${h("ansi.cyan")}",
    "blue_FOR_SUBAGENTS_ONLY": "${h("ansi.blue")}",
    "purple_FOR_SUBAGENTS_ONLY": "${h("ansi.magenta")}",
    "pink_FOR_SUBAGENTS_ONLY": "${h("ansi.brMagenta")}"
  }
}
` }];
}
