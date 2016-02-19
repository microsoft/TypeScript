//// [parserConstructorDeclaration11.ts]
class C {
  constructor<>() { }
}

//// [parserConstructorDeclaration11.js]
var C = (function () {
    function C() {
    }
    return C;
}());
