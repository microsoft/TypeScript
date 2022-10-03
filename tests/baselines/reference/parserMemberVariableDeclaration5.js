//// [parserMemberVariableDeclaration5.ts]
class C {
  declare Foo;
}

//// [parserMemberVariableDeclaration5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
