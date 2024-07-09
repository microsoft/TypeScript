//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserSetAccessorWithTypeParameters1.ts] ////

//// [parserSetAccessorWithTypeParameters1.ts]
class C {
   set foo<T>(v) { }
}

//// [parserSetAccessorWithTypeParameters1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
