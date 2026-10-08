// @module: esnext
// @target: esnext
// @declaration: true
// @lib: esnext

// @filename: b.ts
import source a from "./a.wasm";
export { a };

// @filename: c.ts
import { a } from "./b.js";
const b: AbstractModuleSource = a;

// @filename: d.ts
import * as a from "./b.js";
const b: AbstractModuleSource = a.a;

// @filename: e.ts
import source a from "./a.wasm";
export type B = typeof a;
export const b = import.source("./a.wasm");
