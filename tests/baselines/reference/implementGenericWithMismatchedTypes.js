//// [implementGenericWithMismatchedTypes.js]
// no errors because in the derived types the best common type for T's value is Object
// and that matches the original signature for assignability since we treat its T's as Object
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return null;
    };
    return C;
})();

var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) {
        return null;
    };
    return C2;
})();
