//// [tests/cases/conformance/types/primitives/undefined/invalidUndefinedAssignments.ts] ////

//// [invalidUndefinedAssignments.ts]
var x: typeof undefined;

enum E { A }
E = x;
E.A = x;

class C { foo: string }
var f: C;
C = x;

interface I { foo: string }
var g: I;
g = x;
I = x;

module M { export var x = 1; }
M = x;

function i<T>(a: T) { }
// BUG 767030
i = x; 

//// [invalidUndefinedAssignments.js]
var x;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
E = x;
E.A = x;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var f;
C = x;
var g;
g = x;
I = x;
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
M = x;
function i(a) { }
// BUG 767030
i = x;
