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
var C = (function () {
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
        enumerable: true,
        configurable: true
    });
    return C;
}());
