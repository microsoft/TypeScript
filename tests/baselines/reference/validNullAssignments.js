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
0 /* A */ = null; // error

var C = (function () {
    function C() {
    }
    return C;
})();
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
