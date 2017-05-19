//// [parserAccessors1.ts]
class C {
    get Foo() { }
}

//// [parserAccessors1.js]
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
