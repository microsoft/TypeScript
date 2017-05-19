//// [parserMemberVariableDeclaration4.ts]
class C {
  export Foo;
}

//// [parserMemberVariableDeclaration4.js]
var C = (function () {
    function C() {
    }
    return C;
}());
