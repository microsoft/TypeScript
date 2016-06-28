//// [parserMemberVariableDeclaration3.ts]
class C {
  static public Foo;
}

//// [parserMemberVariableDeclaration3.js]
var C = (function () {
    function C() {
    }
    return C;
}());
