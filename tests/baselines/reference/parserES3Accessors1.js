//// [parserES3Accessors1.ts]
class C {
    get Foo() { }
}

//// [parserES3Accessors1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "Foo", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
