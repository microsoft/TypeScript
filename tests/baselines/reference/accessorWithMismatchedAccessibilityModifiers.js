//// [accessorWithMismatchedAccessibilityModifiers.ts]
class C {
    get x() {
        return 1;
    }
    private set x(v) {
    }
}

class D {
    protected get x() {
        return 1;
    }
    private set x(v) {
    }
}

class E {
    protected set x(v) {
    }
    get x() {
        return 1;
    }
}

class F {
    protected static set x(v) {
    }
    static get x() {
        return 1;
    }
}

//// [accessorWithMismatchedAccessibilityModifiers.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    Object.defineProperty(E.prototype, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return E;
}());
var F = /** @class */ (function () {
    function F() {
    }
    Object.defineProperty(F, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return F;
}());
