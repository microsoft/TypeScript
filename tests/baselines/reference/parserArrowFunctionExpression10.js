//// [parserArrowFunctionExpression10.ts]
a ? (b) : c => (d) : e => f


//// [parserArrowFunctionExpression10.js]
a ? function (b) { return (d); } : function (e) { return f; };
