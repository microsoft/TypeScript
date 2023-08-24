//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserAccessors1.ts] ////

//// [parserAccessors1.ts]
class C {
    get Foo() { }
}

//// [parserAccessors1.js]
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
