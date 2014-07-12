//// [staticMembersUsingClassTypeParameter.js]
// BUG 745747
var C = (function () {
    function C() {
    }
    C.f = function (x) {
    };
    return C;
})();

var C2 = (function () {
    function C2() {
    }
    C2.f = function (x) {
    };
    return C2;
})();

var C3 = (function () {
    function C3() {
    }
    C3.f = function (x) {
    };
    return C3;
})();
