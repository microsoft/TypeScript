//// [parserES3Accessors1.ts]
class C {
    get Foo() { }
}

//// [parserES3Accessors1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
