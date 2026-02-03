//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration2.ts] ////

//// [parserMemberAccessorDeclaration2.ts]
class C {
  get "b"() { }
}

//// [parserMemberAccessorDeclaration2.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "b", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
