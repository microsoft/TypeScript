//// [parserMemberVariableDeclaration2.ts]
class C {
  static static Foo;
}

//// [parserMemberVariableDeclaration2.js]
var C = (function () {
    function C() {
    }
    return C;
}());
