//// [cloduleWithDuplicateMember1.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "x", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    C.foo = function () {
    };
    return C;
})();

var C;
(function (C) {
    C.x = 1;
})(C || (C = {}));
var C;
(function (C) {
    function foo() {
    }
    C.foo = foo;
    function x() {
    }
    C.x = x;
})(C || (C = {}));
