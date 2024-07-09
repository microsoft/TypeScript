//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserAccessors2.ts] ////

//// [parserAccessors2.ts]
class C {
    set Foo(a) { }
}

//// [parserAccessors2.js]
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
