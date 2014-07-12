//// [generics4.js]
var C = (function () {
    function C() {
    }
    return C;
})();

var a;
var b;

a = b; // Not ok - return types of "f" are different
