# marten-theme

Open-source color theme. One palette, ports generated from templates. User-facing docs: `README.md`.

Write everything in the repo in English: code, palette notes, README. Talk to the user in Russian.

## The palette is the single source of truth

- Colors live only in `palettes/marten.json`. Templates in `src/ports/` read them through `h("group.key")` and `p.rgb()`; a hex literal in a template is a bug.
- No comments anywhere in code: not in `src/`, not in generated files (no headers, no section labels). Explanations belong in the README.
- `dist/` is generated and committed (users install from it without Bun). Every change to a palette or template ends with `bun run build`, and the regenerated `dist/` goes in the same commit.
- Color choices are the user's. Propose a change with its contrast numbers and wait for a yes before editing the palette.

## Changing a color

1. Edit the palette, then `bun run build` and `bun run check`.
2. `check` must exit 0. A new failure is either fixed in the palette, or - only if the user accepts it - recorded in `knownIssues` with a note saying why it is acceptable.
3. After the user's yes, install with `OBSIDIAN_VAULT=~/Obsidian/Brain bun run install-themes` (the user's vault). Install copies files only; switching the active theme in an app is a separate step the user asks for.

## Changing a template

A refactor that should not change output must produce a byte-identical `dist/`: copy `dist/` aside before the change and `diff -r` after. Any difference is a regression unless you intended it and name it.

## Deliberate quirks

- `ansi.yellow` is not `base.accent`: yellow means warnings, orange means cursor, focus and keywords. Keep them separate in every port.
- `base.fgFaint` (3.7:1) is for line numbers and decoration. Where an app draws real text with its faint color (Obsidian `--text-faint`, Zed placeholders), the port uses `ui.textFaint` (4.6:1).
- `ui.base05`, `ui.base35`, `ui.base70` exist only for Obsidian's `--color-base-*` scale.
- `ui.diffAddedWord` and `ui.diffRemovedWord` highlight changed words inside a diff line (Claude Code, VS Code).
- The Obsidian theme styles dark mode only.

## Verifying a port

- Ghostty: `/Applications/Ghostty.app/Contents/MacOS/ghostty +validate-config --config-file=dist/ghostty/marten`
- Neovim: `nvim --headless -c 'set rtp^=dist/nvim' -c 'colorscheme marten' -c 'qa!'` prints nothing on success.
- Zed: every key under `style` must exist in the schema `https://zed.dev/schema/themes/v0.2.0.json`.
- iTerm2: `plutil -lint dist/iterm2/marten.itermcolors`.
- Claude Code: every key under `overrides` must appear in the installed binary (`~/.local/share/claude/versions/<latest>`); unknown keys are ignored silently.
- Chrome: `theme.colors` keys only from `kOverwritableColorTable` in Chromium's `browser_theme_pack.cc`.
- VS Code: every JSON file parses, and every key under `colors` is on https://code.visualstudio.com/api/references/theme-color.
- Slack: `marten.txt` holds 4 colors and `marten-legacy.txt` holds 8.
- Obsidian, Slack, VS Code, Chrome and iTerm2 have no runnable check here; the user checks them in the app.

## Website

`site/` is an Astro site deployed to GitHub Pages by `.github/workflows/site.yml`.

- Colors come only from `palettes/marten.json` through `site/src/lib/theme.ts`, which exposes them as CSS variables (`--base-accent`, `--ansi-br-blue`, `--syntax-keyword`). Components use `var(--…)`; a hex literal in `site/` is a bug.
- Contrast ratios on the site are computed with `src/color.ts`, never typed in.
- Port names, icons and install steps live in each port's `meta` in `src/ports/`. A new port in `src/ports/index.ts` gets a card and a page with no site changes.
- Verify with `cd site && bun run build`, then look at it in the browser: `.claude/launch.json` has a `site` dev server.
