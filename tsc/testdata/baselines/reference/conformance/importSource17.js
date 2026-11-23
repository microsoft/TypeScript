//// [tests/cases/conformance/importSource/importSource17.ts] ////

//// [index.ts]
import source a from "./a.wasm";
const b: string = a;
a.exports;
a.value;
import(a);
import.source(a);
import.source(1);
import.source(undefined);
import.source("./a.wasm", 1);
import.source("./a.wasm", { with: { type: 1 } });
import.source("./a.wasm", { assert: { type: "webassembly" } });
new AbstractModuleSource();
type C = AbstractModuleSource<string>;


//// [index.js]
import source a from "./a.wasm";
const b = a;
a.exports;
a.value;
import(a);
import.source(a);
import.source(1);
import.source(undefined);
import.source("./a.wasm", 1);
import.source("./a.wasm", { with: { type: 1 } });
import.source("./a.wasm", { assert: { type: "webassembly" } });
new AbstractModuleSource();
