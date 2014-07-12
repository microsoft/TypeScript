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

var C = (function () {
    function C() {
    }
    return C;
})();
var f = x;

var g = x;

var h = x;
var h2 = x;

var M;
(function (M) {
    M.a = 1;
})(M || (M = {}));
M = x;

function i(a) {
    a = x;
}
i = x;
