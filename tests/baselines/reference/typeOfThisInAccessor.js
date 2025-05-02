//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberAccessorDeclarations/typeOfThisInAccessor.ts] ////

//// [typeOfThisInAccessor.ts]
class C {
    get x() {
        var r = this; // C
        return 1;
    }

    static get y() {
        var r2 = this; // typeof C
        return 1;
    }
}

class D<T> {
    a: T;
    get x() {
        var r = this; // D<T>
        return 1;
    }

    static get y() {
        var r2 = this; // typeof D
        return 1;
    }
}

var x = {
    get a() {
        var r3 = this; // any
        return 1;
    }
}

//// [typeOfThisInAccessor.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            var r = this; // C
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "y", {
        get: function () {
            var r2 = this; // typeof C
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
        get: function () {
            var r = this; // D<T>
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D, "y", {
        get: function () {
            var r2 = this; // typeof D
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return D;
}());
var x = {
    get a() {
        var r3 = this; // any
        return 1;
    }
};
