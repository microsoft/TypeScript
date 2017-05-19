//// [parserClassDeclaration9.ts]
class C {
   foo();
}

//// [parserClassDeclaration9.js]
var C = (function () {
    function C() {
    }
    return C;
}());
