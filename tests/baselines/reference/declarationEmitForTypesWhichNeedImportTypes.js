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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNamed = createNamed;
function createNamed() {
    return {};
}
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Value = void 0;
var b_1 = require("./b");
exports.Value = (0, b_1.createNamed)();


//// [b.d.ts]
export interface Named {
}
export declare function createNamed(): Named;
//// [a.d.ts]
export declare const Value: import("./b").Named;
