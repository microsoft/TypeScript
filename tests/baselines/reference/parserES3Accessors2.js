//// [tests/cases/conformance/parser/ecmascript3/Accessors/parserES3Accessors2.ts] ////

//// [parserES3Accessors2.ts]
class C {
    set Foo(a) { }
}

//// [parserES3Accessors2.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
