//// [tests/cases/conformance/es6/modules/exportsAndImports1.ts] ////

//// [t1.ts]
var v = 1;
function f() { }
class C {
}
interface I {
}
enum E {
    A, B, C
}
const enum D {
    A, B, C
}
module M {
    export var x;
}
module N {
    export interface I {
    }
}
type T = number;
import a = M.x;

export { v, f, C, I, E, D, M, N, T, a };

//// [t2.ts]
export { v, f, C, I, E, D, M, N, T, a } from "./t1";

//// [t3.ts]
import { v, f, C, I, E, D, M, N, T, a } from "./t1";
export { v, f, C, I, E, D, M, N, T, a };


//// [t1.js]
"use strict";
exports.__esModule = true;
exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
var v = 1;
exports.v = v;
function f() { }
exports.f = f;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));
exports.E = E;
var M;
(function (M) {
})(M || (M = {}));
exports.M = M;
var a = M.x;
exports.a = a;
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
__createBinding(exports, t1_1, "v");
__createBinding(exports, t1_1, "f");
__createBinding(exports, t1_1, "C");
__createBinding(exports, t1_1, "E");
__createBinding(exports, t1_1, "M");
__createBinding(exports, t1_1, "a");
//// [t3.js]
"use strict";
exports.__esModule = true;
exports.a = exports.M = exports.E = exports.C = exports.f = exports.v = void 0;
var t1_1 = require("./t1");
exports.v = t1_1.v;
exports.f = t1_1.f;
exports.C = t1_1.C;
exports.E = t1_1.E;
exports.M = t1_1.M;
exports.a = t1_1.a;
