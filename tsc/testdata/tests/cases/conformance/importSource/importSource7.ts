// @module: esnext
// @target: esnext
// @allowArbitraryExtensions: true
// @lib: esnext

// @filename: a.d.wasm.ts
export const a: number;

// @filename: b.ts
import { a } from "./a.wasm";
import source b from "./a.wasm";

const c: number = a;
const d: AbstractModuleSource = b;
const e: Promise<AbstractModuleSource> = import.source("./a.wasm");
