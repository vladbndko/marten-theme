import * as ghostty from "./ghostty";
import type { Port } from "./meta";
import * as nvim from "./nvim";
import * as obsidian from "./obsidian";
import * as zed from "./zed";

export const PORTS: Port[] = [ghostty, nvim, obsidian, zed].map((m) => ({ meta: m.meta, render: m.default }));
