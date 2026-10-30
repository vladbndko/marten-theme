import data from "../../../palettes/marten.json";
import { contrast, ratio } from "../../../src/color";
import { createPalette, type PaletteFile } from "../../../src/palette";
import { PORTS } from "../../../src/ports";
import type { Step } from "../../../src/ports/meta";

export const palette = createPalette(data as PaletteFile);
export const ports = PORTS;

const GROUPS = ["base", "ansi", "ui", "syntax", "status"] as const;

export const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

export const cssVars =
  ":root{" +
  GROUPS.flatMap((g) => Object.keys(palette[g]).map((k) => `--${g}-${kebab(k)}:${palette.hex(`${g}.${k}`)};`)).join("") +
  "}";

export const onBg = (ref: string) => ratio(contrast(palette.hex(ref), palette.hex("base.bg")));

export const href = (path = "") => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path}`;

export const portHref = (id: string) => href(`ports/${id}/`);

export type Line = { prompt: string; text: string };

export const stepLines = (step: Step): Line[] => [
  ...(step.shell ?? []).map((text) => ({ prompt: "$ ", text })),
  ...(step.code ?? []).map((text) => ({ prompt: "", text })),
];
