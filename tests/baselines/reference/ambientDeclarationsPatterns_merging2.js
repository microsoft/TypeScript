//// [tests/cases/conformance/ambient/ambientDeclarationsPatterns_merging2.ts] ////

//// [types.ts]
declare module "*.foo" {
  let everywhere: string;
}


//// [testA.ts]
import { everywhere, onlyInA, alsoOnlyInA } from "a.foo";
declare module "a.foo" {
  let onlyInA: number;
}

//// [testB.ts]
import { everywhere, onlyInA, alsoOnlyInA } from "b.foo"; // Error
declare module "a.foo" {
  let alsoOnlyInA: number;
}

//// [types.js]
//// [testA.js]
"use strict";
exports.__esModule = true;
//// [testB.js]
"use strict";
exports.__esModule = true;
