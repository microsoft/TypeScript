// @module: esnext
// @target: esnext
// @lib: esnext,dom

// @filename: a.d.ts
declare module "*.wasm";

// @filename: b.ts
import source a from "./a.wasm";
const b: any = a;
const c: Promise<any> = import.source("./a.wasm");
