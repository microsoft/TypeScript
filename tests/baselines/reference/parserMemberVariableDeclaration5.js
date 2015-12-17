//// [parserMemberVariableDeclaration5.ts]
class C {
  declare Foo;
}

//// [parserMemberVariableDeclaration5.js]
var C = (function () {
    function C() {
    }
    return C;
}());
