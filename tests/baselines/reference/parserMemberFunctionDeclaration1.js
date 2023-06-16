//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclaration1.ts] ////

//// [parserMemberFunctionDeclaration1.ts]
class C {
    public public Foo() { }
}

//// [parserMemberFunctionDeclaration1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.Foo = function () { };
    return C;
}());
