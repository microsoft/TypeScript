//// [tests/cases/conformance/ambient/ambientDeclarationsPatterns_merging1.ts] ////

//// [types.ts]
declare module "*.foo" {
  let everywhere: string;
}


//// [testA.ts]
import { everywhere, onlyInA } from "a.foo";
declare module "a.foo" {
  let onlyInA: number;
}

//// [testB.ts]
import { everywhere, onlyInA } from "b.foo"; // Error


//// [types.js]
//// [testA.js]
"use strict";
exports.__esModule = true;
//// [testB.js]
"use strict";
exports.__esModule = true;
