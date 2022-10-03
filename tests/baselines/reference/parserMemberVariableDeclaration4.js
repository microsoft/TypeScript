//// [parserMemberVariableDeclaration4.ts]
class C {
  export Foo;
}

//// [parserMemberVariableDeclaration4.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
