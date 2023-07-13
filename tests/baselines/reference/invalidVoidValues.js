//// [tests/cases/conformance/types/primitives/void/invalidVoidValues.ts] ////

//// [invalidVoidValues.ts]
var x: void;
x = 1;
x = '';
x = true;

enum E { A }
x = E;
x = E.A;

class C { foo: string }
var a: C;
x = a;

interface I { foo: string }
var b: I;
x = b;

x = { f() {} }

module M { export var x = 1; }
x = M;

function f<T>(a: T) {
    x = a;
}
x = f;

//// [invalidVoidValues.js]
var x;
x = 1;
x = '';
x = true;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
x = E;
x = E.A;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
x = a;
var b;
x = b;
x = { f: function () { } };
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
x = M;
function f(a) {
    x = a;
}
x = f;
