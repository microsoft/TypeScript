//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration8.ts] ////

//// [parserClassDeclaration8.ts]
class C {
  constructor();
}

//// [parserClassDeclaration8.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
