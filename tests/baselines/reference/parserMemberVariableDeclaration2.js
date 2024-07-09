//// [tests/cases/conformance/parser/ecmascript5/MemberVariableDeclarations/parserMemberVariableDeclaration2.ts] ////

//// [parserMemberVariableDeclaration2.ts]
class C {
  static static Foo;
}

//// [parserMemberVariableDeclaration2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
