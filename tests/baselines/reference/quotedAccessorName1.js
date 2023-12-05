//// [tests/cases/compiler/quotedAccessorName1.ts] ////

//// [quotedAccessorName1.ts]
class C {
    get "foo"() { return 0; }
}

//// [quotedAccessorName1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    return C;
}());
