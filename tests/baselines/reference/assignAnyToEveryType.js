//// [assignAnyToEveryType.js]
// all of these are valid
var x;

var a = x;
var b = x;
var c = x;
var d = x;
var e = null;
e = x;
var f = undefined;
f = x;

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));

var g = x;
var g2 = 0 /* A */;
g2 = x;

var C = (function () {
    function C() {
    }
    return C;
})();

var h = x;

var i = x;

var j = x;
var j2 = x;

var M;
(function (M) {
    M.foo = 1;
})(M || (M = {}));

M = x;

function k(a) {
    a = x;
}
