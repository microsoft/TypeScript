//// [parserConstructorDeclaration10.ts]
class C {
  constructor(): number { }
}

//// [parserConstructorDeclaration10.js]
var C = (function () {
    function C() {
    }
    return C;
}());
