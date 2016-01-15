//// [parserClassDeclaration8.ts]
class C {
  constructor();
}

//// [parserClassDeclaration8.js]
var C = (function () {
    function C() {
    }
    return C;
}());
