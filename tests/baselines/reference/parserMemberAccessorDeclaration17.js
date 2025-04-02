//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration17.ts] ////

//// [parserMemberAccessorDeclaration17.ts]
class C {
   set Foo(a?: number) { }
}

//// [parserMemberAccessorDeclaration17.js]
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
