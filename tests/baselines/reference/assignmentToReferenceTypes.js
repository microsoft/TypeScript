//// [assignmentToReferenceTypes.js]
// Should all be allowed
M = null;

var C = (function () {
    function C() {
    }
    return C;
})();
C = null;

var E;
(function (E) {
})(E || (E = {}));
E = null;

function f() {
}
f = null;

var x = 1;
x = null;

function g(x) {
    x = null;
}
