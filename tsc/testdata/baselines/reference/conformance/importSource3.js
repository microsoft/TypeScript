//// [tests/cases/conformance/importSource/importSource3.ts] ////

//// [a.ts]
export default 1;
export const a = 2;

//// [b.ts]
import source from "./a.js";
const a: number = source;

//// [c.ts]
import source, { a } from "./a.js";
const b: number = source + a;

//// [d.ts]
import source = require("./a");
const a: typeof source = source;

//// [e.ts]
const source = 1;
const a: number = source;

//// [f.d.wasm.ts]
export {};

//// [g.ts]
import source from from "./f.wasm";
const a: WebAssembly.Module = from;

//// [h.ts]
import source type from "./f.wasm";
const a: WebAssembly.Module = type;

//// [i.ts]
import source source from "./f.wasm";
const a: WebAssembly.Module = source;

//// [j.ts]
import
source
a
from "./f.wasm";
const b: WebAssembly.Module = a;


//// [a.js]
export default 1;
export const a = 2;
//// [b.js]
import source from "./a.js";
const a = source;
//// [c.js]
import source, { a } from "./a.js";
const b = source + a;
//// [d.js]
const source = require("./a");
const a = source;
//// [e.js]
"use strict";
const source = 1;
const a = source;
//// [g.js]
import source from from "./f.wasm";
const a = from;
//// [h.js]
import source type from "./f.wasm";
const a = type;
//// [i.js]
import source source from "./f.wasm";
const a = source;
//// [j.js]
import source a from "./f.wasm";
const b = a;
