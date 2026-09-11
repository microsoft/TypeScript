// @module: esnext, preserve
// @target: esnext
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export {};

// @filename: b.ts
export {};
const a = import.source("./a.wasm");
const b: Promise<WebAssembly.Module> = a;

// @filename: c.ts
export {};
const a = import.source("./a.wasm", { with: { type: "webassembly" } });
const b: Promise<WebAssembly.Module> = a;

// @filename: d.ts
export {};
const a = import.source("./a.wasm",);
const b: Promise<WebAssembly.Module> = a;
const c = import.source("./a.wasm", { with: { type: "webassembly" } },);
const d: Promise<WebAssembly.Module> = c;

// @filename: e.ts
export {};
const a = import.source(`./a.wasm`);
const b: Promise<WebAssembly.Module> = a;
