//// [tests/cases/conformance/externalModules/typeOnly/generic.ts] ////

//// [a.ts]
export class A<T> { a!: T }
export type { A as B };

//// [b.ts]
import type { A } from './a';
import { B } from './a';
let a: A<string> = { a: "" };
let b: B<number> = { a: 3 };
let c: A<boolean> = {};
let d: B = { a: "" };

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = { a: "" };
var b = { a: 3 };
var c = {};
var d = { a: "" };
