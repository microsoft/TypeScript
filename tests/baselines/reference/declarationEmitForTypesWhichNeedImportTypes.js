//// [tests/cases/compiler/declarationEmitForTypesWhichNeedImportTypes.ts] ////

//// [b.ts]
export interface Named {}

export function createNamed(): Named {
  return {};
}
//// [a.ts]
import { createNamed } from "./b";

export const Value = createNamed();


//// [b.js]
"use strict";
exports.__esModule = true;
function createNamed() {
    return {};
}
exports.createNamed = createNamed;
//// [a.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
exports.Value = b_1.createNamed();


//// [b.d.ts]
export interface Named {
}
export declare function createNamed(): Named;
//// [a.d.ts]
export declare const Value: import("./b").Named;
