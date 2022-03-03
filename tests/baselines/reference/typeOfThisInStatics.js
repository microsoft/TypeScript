//// [typeOfThisInStatics.ts]
class C {
    static foo() {
        var r = this;
    }
    static get x() {
        var r = this;
        return 1;
    }
}


//// [typeOfThisInStatics.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.foo = function () {
        var r = this;
    };
    Object.defineProperty(C, "x", {
        get: function () {
            var r = this;
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
