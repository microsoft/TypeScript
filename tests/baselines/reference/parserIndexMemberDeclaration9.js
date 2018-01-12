//// [parserIndexMemberDeclaration9.ts]
class C {
   export [x: string]: string;
}

//// [parserIndexMemberDeclaration9.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
