//// [parserConstructorDeclaration4.ts]
class C {
  declare constructor() { }
}

//// [parserConstructorDeclaration4.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
