//// [parserArrowFunctionExpression11.ts]
a ? b ? c : (d) : e => f


//// [parserArrowFunctionExpression11.js]
a ? b ? c : (d) : function (e) { return f; };
