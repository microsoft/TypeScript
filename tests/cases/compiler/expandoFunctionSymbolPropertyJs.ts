// @strict: true
// @lib: esnext
// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: /types.ts
export const symb = Symbol();

export interface TestSymb {
  (): void;
  readonly [symb]: boolean;
}

// @filename: /a.js
import { symb } from "./types";

/**
 * @returns {import("./types").TestSymb}
 */
export function test() {
  function inner() {}
  inner[symb] = true;
  return inner;
}