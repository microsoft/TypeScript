//// [tests/cases/conformance/types/primitives/void/invalidAssignmentsToVoid.ts] ////

//// [invalidAssignmentsToVoid.ts]
var x: void;
x = 1;
x = true;
x = '';
x = {}

class C { foo!: string; }
declare var c: C;
x = C;
x = c;

interface I { foo: string; }
declare var i: I;
x = i;

namespace M { export var x = 1; }
x = M;

function f<T>(a: T) {
    x = a;
}
x = f;

//// [invalidAssignmentsToVoid.js]
var x;
x = 1;
x = true;
x = '';
x = {};
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
x = C;
x = c;
x = i;
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
x = M;
function f(a) {
    x = a;
}
x = f;
