//// [parserES3Accessors2.ts]
class C {
    set Foo(a) { }
}

//// [parserES3Accessors2.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
