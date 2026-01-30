//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration14.ts] ////

//// [parserClassDeclaration14.ts]
class C {
   foo();
   constructor();
}

//// [parserClassDeclaration14.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
