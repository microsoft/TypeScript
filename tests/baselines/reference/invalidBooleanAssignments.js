//// [tests/cases/conformance/types/primitives/boolean/invalidBooleanAssignments.ts] ////

//// [invalidBooleanAssignments.ts]
var x = true;

var a: number = x;
var b: string = x;
var c: void = x;
var d: typeof undefined = x;

enum E { A }
var e: E = x;

class C { foo: string }
var f: C = x;

interface I { bar: string }
var g: I = x;

var h: { (): string } = x;
var h2: { toString(): string } = x; // no error

module M { export var a = 1; }
M = x;

function i<T>(a: T) {
    a = x;
}
i = x;

//// [invalidBooleanAssignments.js]
var x = true;
var a = x;
var b = x;
var c = x;
var d = x;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var e = x;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var f = x;
var g = x;
var h = x;
var h2 = x; // no error
var M;
(function (M) {
    M.a = 1;
})(M || (M = {}));
M = x;
function i(a) {
    a = x;
}
i = x;
