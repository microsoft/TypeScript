//// [tests/cases/conformance/externalModules/typeOnly/mergedWithLocalValue.ts] ////

//// [a.ts]
export type A = "a";

//// [b.ts]
import type { A } from "./a";
const A: A = "a";
A.toUpperCase();


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = "a";
A.toUpperCase();
