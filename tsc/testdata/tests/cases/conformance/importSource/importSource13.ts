// @module: nodenext
// @target: esnext
// @lib: esnext

// @filename: b.mts
import source a from "./a.wasm";
const b: AbstractModuleSource = a;
const c: Promise<AbstractModuleSource> = import.source("./a.wasm");

// @filename: c.cts
import source a from "./a.wasm";
const b: AbstractModuleSource = a;
const c: Promise<AbstractModuleSource> = import.source("./a.wasm");
