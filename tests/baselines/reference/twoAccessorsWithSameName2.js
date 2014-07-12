//// [twoAccessorsWithSameName2.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C, "x", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "x", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

var D = (function () {
    function D() {
    }
    Object.defineProperty(D, "x", {
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(D, "x", {
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return D;
})();

var E = (function () {
    function E() {
    }
    Object.defineProperty(E, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return E;
})();
