//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclaration4.ts] ////

//// [parserMemberFunctionDeclaration4.ts]
class C {
    export Foo() { }
}

//// [parserMemberFunctionDeclaration4.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.Foo = function () { };
    return C;
}());
