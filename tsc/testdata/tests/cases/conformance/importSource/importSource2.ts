// @module: esnext, preserve
// @target: esnext
// @lib: esnext

// @filename: b.ts
export {};
const a = import.source("./a.wasm");
const b: Promise<AbstractModuleSource> = a;

// @filename: c.ts
export {};
const a = import.source("./a.wasm", { with: { type: "webassembly" } });
const b: Promise<AbstractModuleSource> = a;

// @filename: d.ts
export {};
const a = import.source("./a.wasm",);
const b: Promise<AbstractModuleSource> = a;
const c = import.source("./a.wasm", { with: { type: "webassembly" } },);
const d: Promise<AbstractModuleSource> = c;

// @filename: e.ts
export {};
const a = import.source(`./a.wasm`);
const b: Promise<AbstractModuleSource> = a;
