//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserGetAccessorWithTypeParameters1.ts] ////

//// [parserGetAccessorWithTypeParameters1.ts]
class C {
  get foo<T>() { }
}

//// [parserGetAccessorWithTypeParameters1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
