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
//// [c.js]
const a = import.source("./a.wasm", { with: { type: "webassembly" } });
const b = a;
//// [d.js]
const a = import.source("./a.wasm");
const b = a;
const c = import.source("./a.wasm", { with: { type: "webassembly" } });
const d = c;
//// [e.js]
const a = import.source(`./a.wasm`);
const b = a;
