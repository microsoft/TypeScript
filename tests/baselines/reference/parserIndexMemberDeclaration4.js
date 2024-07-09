//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration4.ts] ////

//// [parserIndexMemberDeclaration4.ts]
class C {
   [a: string]: number; public v: number
}

//// [parserIndexMemberDeclaration4.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
