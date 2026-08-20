import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Nada de identificador de uma letra — a regra está em CLAUDE.md e o
    // detalhe na skill `naming`. Antes disso a checagem era um grep manual,
    // ou seja, dependia de alguém lembrar.
    // `_` fica de fora: é marcador de parâmetro não usado, não é nome.
    rules: {
      "id-length": [
        "error",
        { min: 2, exceptions: ["_"], properties: "always" },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
