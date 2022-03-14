//// [parserArrowFunctionExpression9.ts]
b ? (c) : d => e


//// [parserArrowFunctionExpression9.js]
b ? (c) : function (d) { return e; };
