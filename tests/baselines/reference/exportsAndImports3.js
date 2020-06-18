//// [tests/cases/conformance/es6/modules/exportsAndImports3.ts] ////

//// [t1.ts]
export var v = 1;
export function f() { }
export class C {
}
export interface I {
}
export enum E {
    A, B, C
}
export const enum D {
    A, B, C
}
export module M {
    export var x;
}
export module N {
    export interface I {
    }
}
export type T = number;
export import a = M.x;

export { v as v1, f as f1, C as C1, I as I1, E as E1, D as D1, M as M1, N as N1, T as T1, a as a1 };

//// [t2.ts]
export { v1 as v, f1 as f, C1 as C, I1 as I, E1 as E, D1 as D, M1 as M, N1 as N, T1 as T, a1 as a } from "./t1";

//// [t3.ts]
import { v1 as v, f1 as f, C1 as C, I1 as I, E1 as E, D1 as D, M1 as M, N1 as N, T1 as T, a1 as a } from "./t1";
export { v, f, C, I, E, D, M, N, T, a };


//// [t1.js]
"use strict";
exports.__esModule = true;
exports.a1 = exports.M1 = exports.E1 = exports.C1 = exports.f1 = exports.v1 = exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
exports.v = 1;
exports.v1 = exports.v;
function f() { }
exports.f = f;
exports.f1 = f;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
exports.C1 = C;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E = exports.E || (exports.E = {}));
exports.E1 = E;
var M;
(function (M) {
})(M = exports.M || (exports.M = {}));
exports.M1 = M;
exports.a = M.x;
exports.a1 = exports.a;
//// [t2.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
var t1_1 = require("./t1");
__createBinding(exports, t1_1, "v1", "v");
__createBinding(exports, t1_1, "f1", "f");
__createBinding(exports, t1_1, "C1", "C");
__createBinding(exports, t1_1, "E1", "E");
__createBinding(exports, t1_1, "M1", "M");
__createBinding(exports, t1_1, "a1", "a");
//// [t3.js]
"use strict";
exports.__esModule = true;
exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
var t1_1 = require("./t1");
exports.v = t1_1.v1;
exports.f = t1_1.f1;
exports.C = t1_1.C1;
exports.E = t1_1.E1;
exports.M = t1_1.M1;
exports.a = t1_1.a1;
