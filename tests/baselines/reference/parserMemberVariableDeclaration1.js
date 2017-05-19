//// [parserMemberVariableDeclaration1.ts]
class C {
  public public Foo;
}

//// [parserMemberVariableDeclaration1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
