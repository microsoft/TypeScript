//// [parserConstructorDeclaration11.ts]
class C {
  constructor<>() { }
}

//// [parserConstructorDeclaration11.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
