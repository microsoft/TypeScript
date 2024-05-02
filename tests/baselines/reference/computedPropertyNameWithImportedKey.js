//// [tests/cases/compiler/computedPropertyNameWithImportedKey.ts] ////

//// [a.ts]
export const a = Symbol();

//// [b.ts]
import { a } from "./a";
export function fn({ [a]: value }: any): string {
    return value;
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = Symbol();
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = fn;
var a_1 = require("./a");
function fn(_a) {
    var _b = a_1.a, value = _a[_b];
    return value;
}


//// [a.d.ts]
export declare const a: unique symbol;
//// [b.d.ts]
import { a } from "./a";
export declare function fn({ [a]: value }: any): string;
