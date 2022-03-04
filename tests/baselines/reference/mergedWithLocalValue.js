//// [tests/cases/conformance/externalModules/typeOnly/mergedWithLocalValue.ts] ////

//// [a.ts]
export type A = "a";

//// [b.ts]
import type { A } from "./a";
const A: A = "a";
A.toUpperCase();


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var A = "a";
A.toUpperCase();
