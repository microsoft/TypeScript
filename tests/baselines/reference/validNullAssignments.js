//// [tests/cases/conformance/types/primitives/null/validNullAssignments.ts] ////

//// [validNullAssignments.ts]
var a: number = null;
var b: boolean = null;
var c: string = null;
var d: void = null;

var e: typeof undefined = null;
e = null; // ok

enum E { A }
E.A = null; // error

class C { foo: string }
var f: C;
f = null; // ok
C = null; // error

interface I { foo: string }
var g: I;
g = null; // ok
I = null; // error

module M { export var x = 1; }
M = null; // error

var h: { f(): void } = null;

function i<T>(a: T) {
    a = null;
}
i = null; // error

//// [validNullAssignments.js]
var a = null;
var b = null;
var c = null;
var d = null;
var e = null;
e = null; // ok
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
E.A = null; // error
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var f;
f = null; // ok
C = null; // error
var g;
g = null; // ok
I = null; // error
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
M = null; // error
var h = null;
function i(a) {
    a = null;
}
i = null; // error
