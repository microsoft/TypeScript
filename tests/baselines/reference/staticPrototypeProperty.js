//// [staticPrototypeProperty.js]
var C = (function () {
    function C() {
    }
    C.prototype = function () {
    };
    return C;
})();

var C2 = (function () {
    function C2() {
    }
    return C2;
})();
