//// [parserMemberVariableDeclaration1.ts]
class C {
  public public Foo;
}

//// [parserMemberVariableDeclaration1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
