//// [invalidUndefinedAssignments.js]
var x;

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
E = x;
0 /* A */ = x;

var C = (function () {
    function C() {
    }
    return C;
})();
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

function i(a) {
}

// BUG 767030
i = x;
