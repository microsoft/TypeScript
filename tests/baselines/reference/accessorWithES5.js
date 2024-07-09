//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberAccessorDeclarations/accessorWithES5.ts] ////

//// [accessorWithES5.ts]
class C {
    get x() {
        return 1;
    }
}

class D {
    set x(v) {
    }
}

var x = {
    get a() { return 1 }
}

var y = {
    set b(v) { }
}

//// [accessorWithES5.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
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
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return D;
}());
var x = {
    get a() { return 1; }
};
var y = {
    set b(v) { }
};
