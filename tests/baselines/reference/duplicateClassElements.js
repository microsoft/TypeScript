//// [duplicateClassElements.js]
var a = (function () {
    function a() {
    }
    a.prototype.b = function () {
    };
    a.prototype.b = function () {
    };

    Object.defineProperty(a.prototype, "x", {
        get: function () {
            return 10;
        },
        set: function (_x) {
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(a.prototype, "y", {
        get: function () {
            return "Hello";
        },
        set: function (_y) {
        },
        enumerable: true,
        configurable: true
    });

    a.prototype.z = function () {
    };
    Object.defineProperty(a.prototype, "z", {
        get: function () {
            return "Hello";
        },
        set: function (_y) {
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(a.prototype, "x2", {
        get: function () {
            return 10;
        },
        set: function (_x) {
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(a.prototype, "z2", {
        get: function () {
            return "Hello";
        },
        set: function (_y) {
        },
        enumerable: true,
        configurable: true
    });
    a.prototype.z2 = function () {
    };
    return a;
})();
