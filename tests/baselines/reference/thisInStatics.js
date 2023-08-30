//// [tests/cases/compiler/thisInStatics.ts] ////

//// [thisInStatics.ts]
class C {
    static f() {
        var y/*1*/ = this;
    }

    static get x() {
        var y/*2*/ = this;
        return y;
    }
}

//// [thisInStatics.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.f = function () {
        var y /*1*/ = this;
    };
    Object.defineProperty(C, "x", {
        get: function () {
            var y /*2*/ = this;
            return y;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
