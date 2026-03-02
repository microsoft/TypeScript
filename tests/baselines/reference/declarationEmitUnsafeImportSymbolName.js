//// [tests/cases/compiler/declarationEmitUnsafeImportSymbolName.ts] ////

//// [index.d.ts]
export interface MySpecialType {
    val: string;
}
//// [index.d.ts]
import { MySpecialType } from "nested";
export function getSpecial(): MySpecialType;
//// [entry.ts]
import { getSpecial } from "foo";
export const special = getSpecial();


//// [entry.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.special = void 0;
const foo_1 = require("foo");
exports.special = (0, foo_1.getSpecial)();
