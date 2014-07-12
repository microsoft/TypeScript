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
e = null;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
0 /* A */ = null;
var C = (function () {
    function C() {
    }
    return C;
})();
var f;
f = null;
C = null;
var g;
g = null;
I = null;
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
M = null;
var h = null;
function i(a) {
    a = null;
}
i = null;
