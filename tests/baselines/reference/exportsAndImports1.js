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
var v = 1;
exports.v = v;
function f() {
}
exports.f = f;
var C = (function () {
    function C() {
    }
    return C;
})();
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
    M.x;
})(M || (M = {}));
exports.M = M;
var a = M.x;
exports.a = a;
//// [t2.js]
var _t1 = require("./t1");
exports.v = _t1.v;
exports.f = _t1.f;
exports.C = _t1.C;
exports.E = _t1.E;
exports.M = _t1.M;
exports.a = _t1.a;
//// [t3.js]
var _t1 = require("./t1");
exports.v = _t1.v;
exports.f = _t1.f;
exports.C = _t1.C;
exports.E = _t1.E;
exports.M = _t1.M;
exports.a = _t1.a;
