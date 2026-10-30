import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const HOME = homedir();
const DIST = join(import.meta.dir, "..", "dist");
const vault = process.env.OBSIDIAN_VAULT?.replace(/^~/, HOME);

const TARGETS: Record<string, string | undefined> = {
  "claude-code": join(HOME, ".claude/themes"),
  ghostty: join(HOME, ".config/ghostty/themes"),
  "nvim/colors": join(HOME, ".config/nvim/colors"),
  obsidian: vault && join(vault, ".obsidian/themes"),
  zed: join(HOME, ".config/zed/themes"),
};

if (!existsSync(DIST)) {
  console.error("No dist/ folder. Run `bun run build` first.");
  process.exit(1);
}

for (const [from, to] of Object.entries(TARGETS)) {
  const src = join(DIST, from);
  if (!existsSync(src)) continue;
  if (!to) {
    console.log(`skip ${from}: set OBSIDIAN_VAULT=/path/to/vault to install the Obsidian theme`);
    continue;
  }
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(src)) {
    cpSync(join(src, entry), join(to, entry), { recursive: true });
    console.log(`${join(from, entry)} → ${join(to, entry)}`);
  }
}
