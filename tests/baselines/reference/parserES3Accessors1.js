//// [parserES3Accessors1.ts]
class C {
    get Foo() { }
}

//// [parserES3Accessors1.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
