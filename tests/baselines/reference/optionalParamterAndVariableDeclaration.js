//// [tests/cases/compiler/optionalParamterAndVariableDeclaration.ts] ////

//// [optionalParamterAndVariableDeclaration.ts]
class C {
    constructor(options?: number) {
        var options = (options || 0);
    }
}


//// [optionalParamterAndVariableDeclaration.js]
"use strict";
var C = /** @class */ (function () {
    function C(options) {
        var options = (options || 0);
    }
    return C;
}());
