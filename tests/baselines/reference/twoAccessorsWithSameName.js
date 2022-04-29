//// [twoAccessorsWithSameName.ts]
class C {
    get x() { return 1; }
    get x() { return 1; } // error
}

class D {
    set x(v) {  }
    set x(v) {  } // error
}

class E {
    get x() {
        return 1;
    }
    set x(v) { }
}

var x = {
    get x() {
        return 1;
    },

    // error
    get x() {
        return 1;
    }
}

var y = {
    get x() {
        return 1;
    },
    set x(v) { }
}

//// [twoAccessorsWithSameName.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        set: function (v) { },
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
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return E;
}());
var x = {
    get x() {
        return 1;
    },
    // error
    get x() {
        return 1;
    }
};
var y = {
    get x() {
        return 1;
    },
    set x(v) { }
};
