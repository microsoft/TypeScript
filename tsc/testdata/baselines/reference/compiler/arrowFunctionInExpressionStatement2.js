//// [tests/cases/compiler/arrowFunctionInExpressionStatement2.ts] ////

//// [arrowFunctionInExpressionStatement2.ts]
namespace M {
    () => 0;
}

//// [arrowFunctionInExpressionStatement2.js]
"use strict";
var M;
(function (M) {
    () => 0;
})(M || (M = {}));
