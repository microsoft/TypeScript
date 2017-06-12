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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
var D = (function () {
    function D() {
    }
    var proto_2 = D.prototype;
    Object.defineProperty(proto_2, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return D;
}());
var E = (function () {
    function E() {
    }
    var proto_3 = E.prototype;
    Object.defineProperty(proto_3, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return E;
}());
var F = (function () {
    function F() {
    }
    Object.defineProperty(F, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return F;
}());
