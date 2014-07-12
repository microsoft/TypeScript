//// [cloduleWithDuplicateMember2.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        set: function (y) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "y", {
        set: function (z) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

var C;
(function (C) {
    C.x = 1;
})(C || (C = {}));
var C;
(function (C) {
    function x() {
    }
    C.x = x;
})(C || (C = {}));
