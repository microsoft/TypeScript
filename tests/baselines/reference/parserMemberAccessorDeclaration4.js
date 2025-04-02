//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration4.ts] ////

//// [parserMemberAccessorDeclaration4.ts]
class C {
  set a(i) { }
}

//// [parserMemberAccessorDeclaration4.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "a", {
        set: function (i) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
