//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration15.ts] ////

//// [parserMemberAccessorDeclaration15.ts]
class C {
   set Foo(public a: number) { }
}

//// [parserMemberAccessorDeclaration15.js]
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
