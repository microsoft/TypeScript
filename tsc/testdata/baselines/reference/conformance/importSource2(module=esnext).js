//// [tests/cases/conformance/importSource/importSource2.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.ts]
export {};
const a = import.source("./a.wasm");
const b: Promise<WebAssembly.Module> = a;

//// [c.ts]
export {};
const a = import.source("./a.wasm", { with: { type: "webassembly" } });
const b: Promise<WebAssembly.Module> = a;

//// [d.ts]
export {};
const a = import.source("./a.wasm",);
const b: Promise<WebAssembly.Module> = a;
const c = import.source("./a.wasm", { with: { type: "webassembly" } },);
const d: Promise<WebAssembly.Module> = c;

//// [e.ts]
export {};
const a = import.source(`./a.wasm`);
const b: Promise<WebAssembly.Module> = a;


//// [b.js]
const a = import.source("./a.wasm");
const b = a;
export {};
//// [c.js]
const a = import.source("./a.wasm", { with: { type: "webassembly" } });
const b = a;
export {};
//// [d.js]
const a = import.source("./a.wasm");
const b = a;
const c = import.source("./a.wasm", { with: { type: "webassembly" } });
const d = c;
export {};
//// [e.js]
const a = import.source(`./a.wasm`);
const b = a;
export {};
