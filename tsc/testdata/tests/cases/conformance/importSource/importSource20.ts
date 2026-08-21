// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @lib: esnext,dom
// @strict: true
// @noImplicitReferences: true

// @filename: node_modules/a/package.json
{"name":"a","exports":{"types":"./index.d.ts","default":"./a.wasm"}}

// @filename: node_modules/a/index.d.ts
declare const a: string;
export default a;

// @filename: node_modules/a/a.wasm

// @filename: b.ts
import a from "a";
import source b from "a";
const c: string = a;
const d: WebAssembly.Module = b;

const e = import.source("a");
const f: Promise<WebAssembly.Module> = e;
