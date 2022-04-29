//// [parserMemberVariableDeclaration3.ts]
class C {
  static public Foo;
}

//// [parserMemberVariableDeclaration3.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
