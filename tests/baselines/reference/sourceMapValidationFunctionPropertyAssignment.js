//// [tests/cases/compiler/sourceMapValidationFunctionPropertyAssignment.ts] ////

//// [sourceMapValidationFunctionPropertyAssignment.ts]
var x = { n() { } };

//// [sourceMapValidationFunctionPropertyAssignment.js]
"use strict";
var x = { n: function () { } };
//# sourceMappingURL=sourceMapValidationFunctionPropertyAssignment.js.map