//// [tests/cases/conformance/parser/ecmascript5/MemberVariableDeclarations/parserMemberVariableDeclaration1.ts] ////

//// [parserMemberVariableDeclaration1.ts]
class C {
  public public Foo;
}

//// [parserMemberVariableDeclaration1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
