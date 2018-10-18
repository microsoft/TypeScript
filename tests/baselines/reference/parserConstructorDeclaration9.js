//// [parserConstructorDeclaration9.ts]
class C {
  constructor<T>() { }
}

//// [parserConstructorDeclaration9.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
