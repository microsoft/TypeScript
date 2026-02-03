//// [tests/cases/conformance/types/primitives/undefined/invalidUndefinedValues.ts] ////

//// [invalidUndefinedValues.ts]
var x: typeof undefined;

x = 1;
x = '';
x = true;
var a: void;
x = a;
x = null;

class C { foo: string }
var b: C;
x = C;
x = b;

interface I { foo: string }
var c: I;
x = c;

module M { export var x = 1; }
x = M;

x = { f() { } }

function f<T>(a: T) {
    x = a;
}
x = f;

enum E { A }
x = E;
x = E.A;

//// [invalidUndefinedValues.js]
var x;
x = 1;
x = '';
x = true;
var a;
x = a;
x = null;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var b;
x = C;
x = b;
var c;
x = c;
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
x = M;
x = { f: function () { } };
function f(a) {
    x = a;
}
x = f;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
x = E;
x = E.A;
