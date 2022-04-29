//// [parserArrowFunctionExpression3.ts]
a = (() => { } || a)

//// [parserArrowFunctionExpression3.js]
a = (function () { }) || a;
