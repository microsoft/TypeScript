//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration2.ts] ////

//// [parserIndexMemberDeclaration2.ts]
class C {
   [a: string]: number
   public v: number
}

//// [parserIndexMemberDeclaration2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
