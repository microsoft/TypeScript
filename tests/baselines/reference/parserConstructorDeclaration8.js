//// [parserConstructorDeclaration8.ts]
class C {
  // Not a constructor
  public constructor;
}

//// [parserConstructorDeclaration8.js]
var C = (function () {
    // Not a constructor
    function C() {
    }
    return C;
}());
