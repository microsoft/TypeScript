//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration14.ts] ////

//// [parserMemberAccessorDeclaration14.ts]
class C {
   set Foo(a: number, b: number) { }
}

//// [parserMemberAccessorDeclaration14.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a, b) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
