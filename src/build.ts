import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { loadPalettes } from "./palette";
import { PORTS } from "./ports";

const ROOT = join(import.meta.dir, "..");
const DIST = join(ROOT, "dist");

rmSync(DIST, { recursive: true, force: true });

for (const palette of loadPalettes(join(ROOT, "palettes"))) {
  for (const { meta, render } of PORTS) {
    for (const { path, content } of render(palette)) {
      const file = join(DIST, path);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, content);
      console.log(`${palette.slug.padEnd(8)} ${meta.id.padEnd(9)} dist/${path}`);
    }
  }
}
