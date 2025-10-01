//// [tests/cases/conformance/types/primitives/string/invalidStringAssignments.ts] ////

//// [invalidStringAssignments.ts]
var x = '';

var a: boolean = x;
var b: number = x;
var c: void = x;
var d: typeof undefined = x;

class C { foo: string; }
var e: C = x;

interface I { bar: string; }
var f: I = x;

var g: { baz: string } = 1;
var g2: { 0: number } = 1;

namespace M { export var x = 1; }
M = x;

function i<T>(a: T) {
    a = x;
}
i = x;

enum E { A }
var j: E = x;

//// [invalidStringAssignments.js]
var x = '';
var a = x;
var b = x;
var c = x;
var d = x;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var e = x;
var f = x;
var g = 1;
var g2 = 1;
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
M = x;
function i(a) {
    a = x;
}
i = x;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var j = x;
