//// [arrowFunctionInExpressionStatement2.ts]
module M {
    () => 0;
}

//// [arrowFunctionInExpressionStatement2.js]
var M = M || (M = {});
(function (M) {
    (function () { return 0; });
})(M);
