// Espelho em hex dos custom properties do globals.css, porque canvas e nós
// criados via JS não leem var(). Mudou cor lá, mude aqui junto.
export const C = {
  bg: "#0a0a0b",
  surface: "#131316",
  surface2: "#1a1a1e",
  surface3: "#0d0d0f",
  border: "#27272a",
  border2: "#3f3f46",
  text: "#e4e4e7",
  dim: "#a1a1aa",
  dim2: "#9b9ba4",
  dim3: "#8d8d96",
  accent: "#a3e635",
} as const;

export const mono = "var(--font-mono), ui-monospace, monospace";
