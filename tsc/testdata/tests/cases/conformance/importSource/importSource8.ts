// @module: esnext
// @target: esnext
// @allowArbitraryExtensions: true
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export const a: number;

// @filename: b.ts
import { a } from "./a.wasm";
import source b from "./a.wasm";

const c: number = a;
const d: WebAssembly.Module = b;
const e: Promise<WebAssembly.Module> = import.source("./a.wasm");
