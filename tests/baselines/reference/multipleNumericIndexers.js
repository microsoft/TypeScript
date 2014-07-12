//// [multipleNumericIndexers.js]
// Multiple indexers of the same type are an error
var C = (function () {
    function C() {
    }
    return C;
})();

var a;

var b = { 1: '', "2": '' };

var C2 = (function () {
    function C2() {
    }
    return C2;
})();
