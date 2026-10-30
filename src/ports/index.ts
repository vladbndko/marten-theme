import * as chrome from "./chrome";
import * as claudeCode from "./claude-code";
import * as ghostty from "./ghostty";
import * as iterm2 from "./iterm2";
import type { Port } from "./meta";
import * as nvim from "./nvim";
import * as obsidian from "./obsidian";
import * as slack from "./slack";
import * as vscode from "./vscode";
import * as zed from "./zed";

export const PORTS: Port[] = [ghostty, iterm2, nvim, zed, vscode, claudeCode, obsidian, slack, chrome].map((m) => ({
  meta: m.meta,
  render: m.default,
}));
