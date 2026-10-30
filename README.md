# Marten

A dark color theme of graphite, steel and molten metal, for terminals and code editors.

The name comes from the *marten* - the open-hearth furnace (Siemens–Martin process) of the steel mills in Dnipro, Ukraine. The background is the graphite and cold steel of the mill floor; the single warm color is the orange glow of molten metal. The rest of the palette comes from the same place: mill scale, patina, tempered steel, temper colors and cooling water.

Every port is generated from one palette file, and every color is checked for contrast and color-blind safety before release.

## Ports

| App | File | Install |
|---|---|---|
| [Ghostty](#ghostty) | [`dist/ghostty/marten`](dist/ghostty/marten) | theme file |
| [Neovim](#neovim) | [`dist/nvim/colors/marten.lua`](dist/nvim/colors/marten.lua) | colorscheme |
| [Obsidian](#obsidian) | [`dist/obsidian/Marten/`](dist/obsidian/Marten) | community theme folder, dark mode only |
| [Zed](#zed) | [`dist/zed/marten.json`](dist/zed/marten.json) | theme file |

Clone the repository (or download the file you need from `dist/`), then follow the steps for your app. No build step is needed to use the themes.

### Ghostty

```bash
mkdir -p ~/.config/ghostty/themes
cp dist/ghostty/marten ~/.config/ghostty/themes/
```

Add to `~/.config/ghostty/config`:

```
theme = marten
```

Reload the config with <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>,</kbd> or restart Ghostty.

### Neovim

```bash
mkdir -p ~/.config/nvim/colors
cp dist/nvim/colors/marten.lua ~/.config/nvim/colors/
```

In `init.lua`:

```lua
vim.cmd.colorscheme("marten")
```

The colorscheme has no dependencies. It covers the editor UI, legacy syntax groups, Treesitter, LSP (references, inlay hints, semantic tokens), diagnostics, gitsigns and the built-in terminal. It sets `termguicolors`.

### Obsidian

```bash
cp -R dist/obsidian/Marten /path/to/your/vault/.obsidian/themes/
```

Then open **Settings → Appearance**, pick **Marten** under **Themes**, and set **Base color scheme** to **Dark**. In light mode Obsidian keeps its default colors.

The theme sets the code font to Fira Code (`FiraCode Nerd Font`, then `Fira Code`, then your system monospace font). Callouts, tags and the graph view use the palette colors.

### Zed

```bash
mkdir -p ~/.config/zed/themes
cp dist/zed/marten.json ~/.config/zed/themes/
```

Open the theme selector (<kbd>Cmd</kbd>+<kbd>K</kbd> <kbd>Cmd</kbd>+<kbd>T</kbd>) and choose **Marten**, or set it in `settings.json`:

```json
{ "theme": { "mode": "system", "light": "One Light", "dark": "Marten" } }
```

## Palette

Contrast is the WCAG 2 ratio against the background `#18191b`.

### Base

| Role | Color | Contrast | Used for |
|---|---|---|---|
| `bgDeep` | `#101113` | - | sidebars, tab bar, title bar |
| `bg` | `#18191b` | - | editor and terminal background |
| `bgLine` | `#1f2023` | - | current line |
| `surface` | `#212326` | - | popups, status bar, completion menu |
| `selection` | `#33363a` | - | selection, borders |
| `fg` | `#e3e3e0` | 13.7 | text |
| `fgMuted` | `#95979a` | 6.0 | comments, punctuation, secondary text |
| `fgFaint` | `#707377` | 3.7 | line numbers, decoration |
| `accent` | `#ff8c2e` | 7.6 | cursor, focus, links, keywords |

### ANSI

| | Normal | Contrast | Bright | Contrast |
|---|---|---|---|---|
| black | `#26282b` | - | `#707377` | 3.7 |
| red | `#e85a44` | 5.0 | `#f27461` | 6.2 |
| green | `#9dbf7a` | 8.5 | `#b5d396` | 10.7 |
| yellow | `#f5c04a` | 10.5 | `#ffcf66` | 12.0 |
| blue | `#7fa3c4` | 6.7 | `#9fbbd6` | 8.8 |
| magenta | `#c98fa6` | 6.7 | `#dba9bd` | 8.7 |
| cyan | `#7fb8b5` | 7.9 | `#9ccecb` | 10.1 |
| white | `#c8c9c6` | 10.6 | `#f7f7f5` | 16.4 |

Yellow is not the accent: yellow means warnings and modified files, orange means the cursor, focus and keywords.

### Syntax

| Role | Color |
|---|---|
| keyword | accent |
| string | green |
| function | blue |
| number, constant | magenta |
| type | cyan |
| property | bright blue |
| escape, special | bright yellow |
| variable | fg |
| comment, punctuation | fgMuted |

## Accessibility

`bun run check` tests the palette before every release:

- **Contrast.** All text colors are at least 4.5:1 on the background and on the current line. Hints, line numbers and colored text on the selection are at least 3:1. All 78 checked pairs pass.
- **Color-blind safety.** Pairs that must not be confused (error/success, error/warning, keyword/string, function/type and others) are simulated for protanopia, deuteranopia and tritanopia ([Machado et al., 2009](https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html)) and compared by OKLab distance.

Known issues, tracked in the palette file:

- Under tritanopia, blue (functions, info) and cyan (types, hints) are close, and so are cyan and green (strings).
- Under deuteranopia, the added and removed diff backgrounds are close. Diffs still show `+`/`-` markers and gutter signs.

## Development

Requires [Bun](https://bun.sh). The themes have no other dependencies; only the website in `site/` installs packages.

```bash
bun run build            # palettes/*.json → dist/
bun run check            # contrast and color-blind checks
bun run install-themes   # copy dist/ into Ghostty, Neovim and Zed; Obsidian needs OBSIDIAN_VAULT
```

```bash
OBSIDIAN_VAULT=~/path/to/vault bun run install-themes
```

`install-themes` only copies files. It never changes which theme an app uses.

### How it works

```
palettes/marten.json   the palette: the only place colors are defined
src/ports/*.ts         one template per app, plus its metadata for the website
src/ports/index.ts     the list of ports
src/build.ts           palette × template → dist/
src/check.ts           contrast and color-blind checks
src/thresholds.ts      the minimums the checks enforce, also shown on the website
src/install.ts         copies dist/ into each app's theme folder
dist/                  generated themes, committed so users can install without building
site/                  the website (Astro), built from the same palette and port list
```

The palette has five groups:

- `base` - backgrounds, text and the accent;
- `ansi` - the 16 terminal colors;
- `ui` - borders, diff, search and a few app-specific shades;
- `syntax` and `status` - references to the colors above, written like `{ansi.green}`.

Templates read colors only through `h("group.key")`, so they never contain a hex value.

### Changing a color

1. Edit `palettes/marten.json`.
2. Run `bun run build` and `bun run check`.
3. Commit the palette together with the regenerated `dist/`.

Do not edit files in `dist/` by hand; the next build overwrites them.

### Adding a port

Add `src/ports/<app>.ts` that exports a `render(palette)` function returning `{ path, content }[]` and a `meta` object (name, icon, install steps, what it covers). Register it in `src/ports/index.ts` and add its target folder to `src/install.ts`. The website picks up the new port by itself: a card in the port list and its own page. Use an existing port as a starting point.

### Website

The site in `site/` is built with [Astro](https://astro.build). It imports `palettes/marten.json`, the port list and `src/color.ts`, so colors, contrast ratios and install steps are never copied by hand.

```bash
cd site
bun install
bun run dev      # http://localhost:4321
bun run build    # site/dist/
```

`.github/workflows/site.yml` runs `bun run check`, builds the site and deploys it to GitHub Pages on every push to `main`. The site address and base path come from the Pages settings. `site/dist/` is not committed.

## License

[MIT](LICENSE)
