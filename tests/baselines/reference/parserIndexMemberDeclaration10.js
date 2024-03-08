//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration10.ts] ////

//// [parserIndexMemberDeclaration10.ts]
class C {
   static static [x: string]: string;
}

//// [parserIndexMemberDeclaration10.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
