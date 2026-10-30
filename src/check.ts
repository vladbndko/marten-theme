import { join } from "node:path";
import { contrast, distance, ratio, simulate, VISIONS } from "./color";
import { loadPalettes, type Palette } from "./palette";
import { MIN_DISTANCE, MIN_HINT, MIN_TEXT } from "./thresholds";

const ANSI_TEXT = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
const ANSI_BRIGHT = ["brRed", "brGreen", "brYellow", "brBlue", "brMagenta", "brCyan", "brWhite"];

const PAIRS: [string, string][] = [
  ["status.error", "status.success"],
  ["status.error", "status.warning"],
  ["status.warning", "status.success"],
  ["status.info", "status.hint"],
  ["syntax.keyword", "syntax.string"],
  ["syntax.keyword", "syntax.number"],
  ["syntax.function", "syntax.type"],
  ["syntax.string", "syntax.type"],
  ["syntax.number", "syntax.string"],
  ["ui.diffAdded", "ui.diffRemoved"],
  ["ui.diffAddedWord", "ui.diffRemovedWord"],
];

type Row = { what: string; ok: boolean; known?: string; detail: string };

function knownContrast(p: Palette, fg: string, bg: string) {
  return p.knownIssues.find((i) => "fg" in i && i.fg === fg && i.bg === bg)?.note;
}

function knownPair(p: Palette, a: string, b: string) {
  return p.knownIssues.find((i) => "pair" in i && i.pair.includes(a) && i.pair.includes(b))?.note;
}

function contrastRows(p: Palette): Row[] {
  const rows: Row[] = [];
  const test = (fg: string, bg: string, min: number) => {
    const c = contrast(p.hex(fg), p.hex(bg));
    const ok = c >= min;
    rows.push({ what: `${fg} on ${bg}`, ok, known: ok ? undefined : knownContrast(p, fg, bg), detail: `${ratio(c)} (min ${ratio(min)})` });
  };

  const text = [
    "base.fg", "base.fgMuted", "base.accent",
    ...[...ANSI_TEXT, ...ANSI_BRIGHT].map((c) => `ansi.${c}`),
    ...Object.keys(p.syntax).map((k) => `syntax.${k}`),
    ...Object.keys(p.status).map((k) => `status.${k}`),
  ];
  for (const bg of ["base.bg", "base.bgLine"]) for (const fg of text) test(fg, bg, MIN_TEXT);
  for (const fg of ["base.fgFaint", "ansi.brBlack", "ui.textFaint"]) test(fg, "base.bg", MIN_HINT);
  for (const bg of ["base.selection", "ui.diffAddedWord", "ui.diffRemovedWord"]) test("base.fg", bg, MIN_TEXT);
  for (const c of ANSI_TEXT) test(`ansi.${c}`, "base.selection", MIN_HINT);
  for (const bg of ["base.accent", "ansi.red", "ansi.green"]) test("base.bg", bg, MIN_TEXT);
  return rows;
}

function pairRows(p: Palette): Row[] {
  return PAIRS.map(([a, b]) => {
    const cells = VISIONS.map((v) => distance(simulate(p.hex(a), v), simulate(p.hex(b), v)).dE);
    const ok = cells.every((d) => d >= MIN_DISTANCE);
    return { what: `${a} / ${b}`, ok, known: ok ? undefined : knownPair(p, a, b), detail: cells.map((d) => d.toFixed(3)).join("  ") };
  });
}

function print(rows: Row[]): number {
  let failures = 0;
  for (const r of rows) {
    const mark = r.ok ? "ok   " : r.known ? "known" : "FAIL ";
    if (!r.ok && !r.known) failures++;
    if (r.ok && rows.length > 20) continue;
    console.log(`  ${mark}  ${r.what.padEnd(40)} ${r.detail}${r.known ? `  - ${r.known}` : ""}`);
  }
  return failures;
}

let failures = 0;
for (const p of loadPalettes(join(import.meta.dir, "..", "palettes"))) {
  console.log(`\n# ${p.name}\n`);

  const contrastResults = contrastRows(p);
  console.log(`## WCAG 2 contrast: text ≥ ${ratio(MIN_TEXT)}, hints and colors on selection ≥ ${ratio(MIN_HINT)}\n`);
  failures += print(contrastResults);
  const passed = contrastResults.filter((r) => r.ok).length;
  console.log(`  ${passed} of ${contrastResults.length} pairs pass`);

  console.log(`\n## Distinctness, OKLab ΔE ≥ ${MIN_DISTANCE}: normal / protanopia / deuteranopia / tritanopia\n`);
  failures += print(pairRows(p));
}

console.log(failures ? `\n${failures} new problem(s)` : "\nNo new problems");
process.exit(failures ? 1 : 0);
