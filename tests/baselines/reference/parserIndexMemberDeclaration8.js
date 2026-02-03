//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration8.ts] ////

//// [parserIndexMemberDeclaration8.ts]
class C {
   private [x: string]: string;
}

//// [parserIndexMemberDeclaration8.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
