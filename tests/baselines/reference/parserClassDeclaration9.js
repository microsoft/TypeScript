//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration9.ts] ////

//// [parserClassDeclaration9.ts]
class C {
   foo();
}

//// [parserClassDeclaration9.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
