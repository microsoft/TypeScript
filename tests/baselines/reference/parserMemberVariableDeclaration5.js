//// [tests/cases/conformance/parser/ecmascript5/MemberVariableDeclarations/parserMemberVariableDeclaration5.ts] ////

//// [parserMemberVariableDeclaration5.ts]
class C {
  declare Foo;
}

//// [parserMemberVariableDeclaration5.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
