//// [tests/cases/compiler/functionVariableInReturnTypeAnnotation.ts] ////

//// [functionVariableInReturnTypeAnnotation.ts]
function bar(): typeof b {
    var b = 1;
    return undefined;
}

//// [functionVariableInReturnTypeAnnotation.js]
"use strict";
function bar() {
    var b = 1;
    return undefined;
}
