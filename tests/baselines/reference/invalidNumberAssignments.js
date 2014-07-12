//// [invalidNumberAssignments.js]
var x = 1;

var a = x;
var b = x;
var c = x;
var d = x;

var C = (function () {
    function C() {
    }
    return C;
})();
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
