//// [tests/cases/conformance/parser/ecmascript5/IndexMemberDeclarations/parserIndexMemberDeclaration1.ts] ////

//// [parserIndexMemberDeclaration1.ts]
class C {
   [a: string]: number
}

//// [parserIndexMemberDeclaration1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
