//// [tests/cases/conformance/importSource/importSource2.ts] ////

//// [b.ts]
export {};
const a = import.source("./a.wasm");
const b: Promise<AbstractModuleSource> = a;

//// [c.ts]
export {};
const a = import.source("./a.wasm", { with: { type: "webassembly" } });
const b: Promise<AbstractModuleSource> = a;

//// [d.ts]
export {};
const a = import.source("./a.wasm",);
const b: Promise<AbstractModuleSource> = a;
const c = import.source("./a.wasm", { with: { type: "webassembly" } },);
const d: Promise<AbstractModuleSource> = c;

//// [e.ts]
export {};
const a = import.source(`./a.wasm`);
const b: Promise<AbstractModuleSource> = a;


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
