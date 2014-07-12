//// [wrappedAndRecursiveConstraints2.js]
var C = (function () {
    function C(x) {
    }
    return C;
})();

var c = new C(1);
var c = new C(new C('')); // error
