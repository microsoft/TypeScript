//// [parserConstructorDeclaration2.ts]
class C {
  static constructor() { }
}

//// [parserConstructorDeclaration2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
