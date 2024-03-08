//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration5.ts] ////

//// [parserIndexMemberDeclaration5.ts]
class C {
   [a: string]: number public v: number
}

//// [parserIndexMemberDeclaration5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
