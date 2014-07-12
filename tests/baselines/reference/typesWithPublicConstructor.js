//// [typesWithPublicConstructor.js]
// public is allowed on a constructor but is not meaningful
var C = (function () {
    function C() {
    }
    return C;
})();

var c = new C();
var r = c.constructor;

var C2 = (function () {
    function C2(x) {
    }
    return C2;
})();

var c2 = new C2();
var r2 = c2.constructor;
