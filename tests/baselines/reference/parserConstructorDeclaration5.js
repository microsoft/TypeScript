//// [parserConstructorDeclaration5.ts]
class C {
  private constructor() { }
}

//// [parserConstructorDeclaration5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
