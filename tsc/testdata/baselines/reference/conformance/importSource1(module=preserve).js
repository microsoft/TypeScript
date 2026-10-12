//// [tests/cases/conformance/importSource/importSource1.ts] ////

//// [b.ts]
import source a from "./a.wasm";
const b: AbstractModuleSource = a;

//// [c.ts]
import source a from "./a.wasm" with { type: "webassembly" };
const b: AbstractModuleSource = a;


//// [b.js]
import source a from "./a.wasm";
const b = a;
//// [c.js]
import source a from "./a.wasm" with { type: "webassembly" };
const b = a;
