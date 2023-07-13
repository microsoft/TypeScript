//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration6.ts] ////

//// [parserIndexMemberDeclaration6.ts]
class C {
   static [x: string]: string;
}

//// [parserIndexMemberDeclaration6.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
