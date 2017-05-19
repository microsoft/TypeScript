//// [parserConstructorDeclaration6.ts]
class C {
  public public constructor() { }
}

//// [parserConstructorDeclaration6.js]
var C = (function () {
    function C() {
    }
    return C;
}());
