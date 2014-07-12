//// [newOnInstanceSymbol.js]
var C = (function () {
    function C() {
    }
    return C;
})();
var x = new C();
new x(); // should error
