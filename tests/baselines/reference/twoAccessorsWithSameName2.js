//// [tests/cases/conformance/classes/propertyMemberDeclarations/twoAccessorsWithSameName2.ts] ////

//// [twoAccessorsWithSameName2.ts]
class C {
    static get x() { return 1; }
    static get x() { return 1; } // error
}

class D {
    static set x(v) {  }
    static set x(v) {  } // error
}

class E {
    static get x() {
        return 1;
    }
    static set x(v) { }
}

//// [twoAccessorsWithSameName2.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C, "x", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    Object.defineProperty(D, "x", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    Object.defineProperty(E, "x", {
        get: function () {
            return 1;
        },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return E;
}());
