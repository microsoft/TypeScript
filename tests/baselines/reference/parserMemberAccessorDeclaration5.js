//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration5.ts] ////

//// [parserMemberAccessorDeclaration5.ts]
class C {
  set "a"(i) { }
}

//// [parserMemberAccessorDeclaration5.js]
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
