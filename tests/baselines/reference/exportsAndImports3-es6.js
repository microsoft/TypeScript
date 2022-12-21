//// [tests/cases/conformance/es6/modules/exportsAndImports3-es6.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.a1 = exports.M1 = exports.E1 = exports.C1 = exports.f1 = exports.v1 = exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
exports.v = 1;
exports.v1 = exports.v;
function f() { }
exports.f = f;
exports.f1 = f;
class C {
}
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
var t1_1 = require("./t1");
Object.defineProperty(exports, "v", { enumerable: true, get: function () { return t1_1.v1; } });
Object.defineProperty(exports, "f", { enumerable: true, get: function () { return t1_1.f1; } });
Object.defineProperty(exports, "C", { enumerable: true, get: function () { return t1_1.C1; } });
Object.defineProperty(exports, "E", { enumerable: true, get: function () { return t1_1.E1; } });
Object.defineProperty(exports, "M", { enumerable: true, get: function () { return t1_1.M1; } });
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.a1; } });
//// [t3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
const t1_1 = require("./t1");
Object.defineProperty(exports, "v", { enumerable: true, get: function () { return t1_1.v1; } });
Object.defineProperty(exports, "f", { enumerable: true, get: function () { return t1_1.f1; } });
Object.defineProperty(exports, "C", { enumerable: true, get: function () { return t1_1.C1; } });
Object.defineProperty(exports, "E", { enumerable: true, get: function () { return t1_1.E1; } });
Object.defineProperty(exports, "M", { enumerable: true, get: function () { return t1_1.M1; } });
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return t1_1.a1; } });
