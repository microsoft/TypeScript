// @target: esnext
// @module: esnext
// @moduleResolution: bundler
// @rewriteRelativeImportExtensions: true
// @noEmitOnError: false, true
// @allowJs: true
// @declaration: true
// @outDir: out
// @noImplicitReferences: true

// @filename: a.ts/package.json
{ "main": "index.wasm" }

// @filename: a.ts/index.wasm

// @filename: b.ts/package.json
{ "main": "index.js" }

// @filename: b.ts/index.js
export default 1;

// @filename: c.ts
export default 1;

// @filename: d.d.ts
import source a from "./a.ts";
import source b from "./b.ts";
export { a, b };

// @filename: index.ts
/// <reference path="d.d.ts" />
import source a from "./a.ts";
import source b from "./b.ts";
import source c from "./c.ts";
import source d from "./a.ts/index.wasm";
import type e from "./b.ts";
export { a, b, c, d };
export type T = typeof e;

export const f = import.source("./a.ts");
export const g = import.source("./b.ts");
export const h = import.source("./c.ts");
export const i = import.source("./a.ts/index.wasm");
