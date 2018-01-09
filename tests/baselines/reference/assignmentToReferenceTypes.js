//// [assignmentToReferenceTypes.ts]
// Should all be allowed

module M {
}
M = null;

class C {
}
C = null;

enum E {
}
E = null;

function f() { }
f = null;

var x = 1;
x = null;

function g(x) {
    x = null;
}

//// [assignmentToReferenceTypes.js]
// Should all be allowed
M = null;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
C = null;
var E;
(function (E) {
})(E || (E = {}));
E = null;
function f() { }
f = null;
var x = 1;
x = null;
function g(x) {
    x = null;
}
