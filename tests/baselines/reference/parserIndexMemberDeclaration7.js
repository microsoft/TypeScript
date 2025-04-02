//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration7.ts] ////

//// [parserIndexMemberDeclaration7.ts]
class C {
   public [x: string]: string;
}

//// [parserIndexMemberDeclaration7.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
