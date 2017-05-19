//// [parserConstructorDeclaration9.ts]
class C {
  constructor<T>() { }
}

//// [parserConstructorDeclaration9.js]
var C = (function () {
    function C() {
    }
    return C;
}());
