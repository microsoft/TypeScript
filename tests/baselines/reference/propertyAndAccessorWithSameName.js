//// [propertyAndAccessorWithSameName.ts]
class C {
    x: number;
    get x() { // error
        return 1;
    }
}

class D {
    x: number;
    set x(v) { } // error
}

class E {
    private x: number;
    get x() { // error
        return 1;
    }
    set x(v) { }
}

//// [propertyAndAccessorWithSameName.js]
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
    return C;
}());
var D = (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        set: function (v) { } // error
        ,
        enumerable: true,
        configurable: true
    });
    return D;
}());
var E = (function () {
    function E() {
    }
    Object.defineProperty(E.prototype, "x", {
        get: function () {
            return 1;
        },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return E;
}());
