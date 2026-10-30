import type { Palette } from "../palette";

export type Step = {
  title: string;
  text?: string;
  shell?: string[];
  code?: string[];
};

export type PortMeta = {
  id: string;
  name: string;
  kind: string;
  keywords: string[];
  icon: string;
  file: string;
  intro: string;
  steps: Step[];
  covers: string[];
  notes: string[];
};

export type Port = {
  meta: PortMeta;
  render: (p: Palette) => { path: string; content: string }[];
};
