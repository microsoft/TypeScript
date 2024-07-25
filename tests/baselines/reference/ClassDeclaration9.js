//// [tests/cases/compiler/ClassDeclaration9.ts] ////

//// [ClassDeclaration9.ts]
class C {
   foo();
}

//// [ClassDeclaration9.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
