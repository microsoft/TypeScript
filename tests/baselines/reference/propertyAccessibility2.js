//// [propertyAccessibility2.js]
var C = (function () {
    function C() {
    }
    C.x = 1;
    return C;
})();
var c = C.x;
