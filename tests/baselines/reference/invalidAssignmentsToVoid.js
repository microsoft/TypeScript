//// [invalidAssignmentsToVoid.ts]
var x: void;
x = 1;
x = true;
x = '';
x = {}

class C { foo: string; }
var c: C;
x = C;
x = c;

interface I { foo: string; }
var i: I;
x = i;

module M { export var x = 1; }
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
var c;
x = C;
x = c;
var i;
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
