//// [parserArrowFunctionExpression2.ts]
a = () => { } || a

//// [parserArrowFunctionExpression2.js]
a = function () { };
 || a;
