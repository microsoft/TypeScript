//// [parserConstructorDeclaration7.ts]
class C {
  public private constructor() { }
}

//// [parserConstructorDeclaration7.js]
var C = (function () {
    function C() {
    }
    return C;
}());
