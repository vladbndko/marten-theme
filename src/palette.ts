import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const HEX = /^#[0-9a-f]{6}$/;

export type KnownIssue = { fg: string; bg: string; note: string } | { pair: [string, string]; note: string };

export type PaletteFile = {
  name: string;
  slug: string;
  variant: "dark" | "light";
  tagline: string;
  accentName: string;
  base: Record<string, string>;
  ansi: Record<string, string>;
  ui: Record<string, string>;
  syntax: Record<string, string>;
  status: Record<string, string>;
  knownIssues: KnownIssue[];
};

export type Palette = PaletteFile & {
  hex(ref: string): string;
  rgb(ref: string): string;
};

const GROUPS = ["base", "ansi", "ui", "syntax", "status"] as const;

export function loadPalette(file: string): Palette {
  return createPalette(JSON.parse(readFileSync(file, "utf8")) as PaletteFile);
}

export function createPalette(data: PaletteFile): Palette {
  const hex = (ref: string, seen: string[] = []): string => {
    if (seen.includes(ref)) throw new Error(`${data.slug}: reference cycle ${[...seen, ref].join(" → ")}`);
    const [group, key] = ref.split(".");
    if (!GROUPS.includes(group as (typeof GROUPS)[number])) throw new Error(`${data.slug}: unknown group in "${ref}"`);
    const value = (data as unknown as Record<string, Record<string, string>>)[group][key];
    if (value === undefined) throw new Error(`${data.slug}: no color "${ref}"`);
    const alias = /^\{(.+)\}$/.exec(value);
    if (alias) return hex(alias[1], [...seen, ref]);
    if (!HEX.test(value)) throw new Error(`${data.slug}: "${ref}" is "${value}", expected lowercase #rrggbb`);
    return value;
  };

  const rgb = (ref: string) => {
    const v = hex(ref);
    return [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16)).join(", ");
  };

  for (const group of GROUPS) for (const key of Object.keys(data[group])) hex(`${group}.${key}`);
  for (const issue of data.knownIssues) ("pair" in issue ? issue.pair : [issue.fg, issue.bg]).forEach((r) => hex(r));

  return { ...data, hex: (ref) => hex(ref), rgb };
}

export function loadPalettes(dir: string): Palette[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => loadPalette(join(dir, f)));
}
