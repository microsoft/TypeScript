// @module: esnext
// @target: esnext
// @verbatimModuleSyntax: false, true
// @declaration: true

// @filename: index.ts
import source a from "./a.wasm";
import source b from "./b.wasm";
import source c from "./c.wasm";
export type A = typeof a;
export const d = c;
