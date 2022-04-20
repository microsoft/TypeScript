//// [parserArrowFunctionExpression10.ts]
a ? (b) : c => (d) : e => f


//// [parserArrowFunctionExpression10.js]
a ? (b) : function (c) { return (d); };
(function (e) { return f; });
