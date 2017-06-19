//// [parserConstructorDeclaration6.ts]
class C {
  public public constructor() { }
}

//// [parserConstructorDeclaration6.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
