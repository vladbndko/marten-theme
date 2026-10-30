export const LAYERS = [
  { ref: "base.bgDeep", name: "bg-deep", role: "side panels, title bars" },
  { ref: "base.bg", name: "bg", role: "editor and terminal" },
  { ref: "base.bgLine", name: "bg-line", role: "current line" },
  { ref: "base.surface", name: "surface", role: "status line, popups" },
  { ref: "base.selection", name: "selection", role: "selection, borders" },
];

export const TEXT = [
  { ref: "base.fg", name: "fg", role: "body text" },
  { ref: "base.fgMuted", name: "fg-muted", role: "comments, secondary text" },
  { ref: "base.fgFaint", name: "fg-faint", role: "line numbers, decoration" },
  { ref: "base.accent", name: "accent", role: "cursor, focus, keywords" },
];

export const ANSI = [
  { key: "black", note: "lifted off the floor", isText: false },
  { key: "red", note: "mill scale", isText: true },
  { key: "green", note: "patina", isText: true },
  { key: "yellow", note: "white-hot metal", isText: true },
  { key: "blue", note: "tempered steel", isText: true },
  { key: "magenta", note: "temper colors", isText: true },
  { key: "cyan", note: "cooling water", isText: true },
  { key: "white", note: "plain output", isText: true },
];

export const SYNTAX_EXAMPLES: Record<string, string> = {
  keyword: "if return import",
  string: '"pig iron"',
  function: "pour() cast()",
  number: "1600 true null",
  type: "Ingot <div>",
  property: "ladle.temp",
  special: "\\n /^\\d+$/",
  variable: "heat props",
  comment: "// °C",
  punctuation: "( ) , : =>",
};

type Token = [string, string];

export const EDITOR_LINES: Token[][] = [
  [["k", "import"], ["p", " { "], ["v", "cast"], ["p", ", "], ["k", "type"], ["v", " "], ["t", "Ladle"], ["p", ", "], ["k", "type"], ["v", " "], ["t", "Ingot"], ["p", " } "], ["k", "from"], ["v", " "], ["s", '"./mill"'], ["p", ";"]],
  [],
  [["k", "const"], ["v", " furnace "], ["p", "= {"]],
  [["v", "  "], ["pr", "heat"], ["p", ": "], ["n", "1600"], ["p", ","], ["v", " "], ["c", "// °C"]],
  [["v", "  "], ["pr", "charge"], ["p", ": ["], ["s", '"pig iron"'], ["p", ", "], ["s", '"scrap"'], ["p", "],"]],
  [["p", "};"]],
  [],
  [["k", "export function"], ["v", " "], ["f", "pour"], ["p", "("], ["param", "ladle"], ["p", ": "], ["t", "Ladle"], ["p", "): "], ["t", "Ingot"], ["p", " | "], ["n", "null"], ["p", " {"]],
  [["v", "  "], ["k", "if"], ["p", " ("], ["v", "ladle"], ["p", "."], ["pr", "temp"], ["p", " < "], ["v", "furnace"], ["p", "."], ["pr", "heat"], ["p", ") "], ["k", "return"], ["v", " "], ["n", "null"], ["p", ";"]],
  [["v", "  "], ["k", "return"], ["v", " "], ["f", "cast"], ["p", "("], ["v", "ladle"], ["p", ", { "], ["pr", "mold"], ["p", ": "], ["s", '"slab"'], ["p", " });"]],
  [["p", "}"]],
];

export const EDITOR_CURRENT = 8;
