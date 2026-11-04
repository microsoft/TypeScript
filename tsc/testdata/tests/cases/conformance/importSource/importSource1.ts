// @module: esnext, preserve
// @target: esnext
// @lib: esnext

// @filename: b.ts
import source a from "./a.wasm";
const b: AbstractModuleSource = a;

// @filename: c.ts
import source a from "./a.wasm" with { type: "webassembly" };
const b: AbstractModuleSource = a;
