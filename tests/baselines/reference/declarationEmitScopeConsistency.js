//// [tests/cases/compiler/declarationEmitScopeConsistency.ts] ////

//// [a.ts]
export interface A { a: number }
export const f = (x: A) => x as A;

//// [b.ts]
import { f } from "./a";
export interface A { other: number }
export const g = f;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
var f = function (x) { return x; };
exports.f = f;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
var a_1 = require("./a");
exports.g = a_1.f;


//// [a.d.ts]
export interface A {
    a: number;
}
export declare const f: (x: A) => A;
//// [b.d.ts]
export interface A {
    other: number;
}
export declare const g: (x: import("./a").A) => import("./a").A;
