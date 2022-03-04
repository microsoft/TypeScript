//// [parserArrowFunctionExpression12.ts]
a ? (b) => (c): d => e


//// [parserArrowFunctionExpression12.js]
a ? function (b) { return (c); } : function (d) { return e; };
