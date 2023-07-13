//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration3.ts] ////

//// [parserIndexMemberDeclaration3.ts]
class C {
   [a: string]: number;
   public v: number
}

//// [parserIndexMemberDeclaration3.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
