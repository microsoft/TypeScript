//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration26.ts] ////

//// [parserClassDeclaration26.ts]
class C {
   var
   public
}

//// [parserClassDeclaration26.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
