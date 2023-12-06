//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessor1.ts] ////

//// [parserMemberAccessor1.ts]
class C {
  get foo() { }
  set foo(a) { }
}

//// [parserMemberAccessor1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        get: function () { },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
