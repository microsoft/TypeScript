//// [invalidAssignmentsToVoid.js]
var x;
x = 1;
x = true;
x = '';
x = {};

var C = (function () {
    function C() {
    }
    return C;
})();
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
