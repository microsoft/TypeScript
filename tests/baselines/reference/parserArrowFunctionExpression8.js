//// [parserArrowFunctionExpression8.ts]
x ? y => ({ y }) : z => ({ z })


//// [parserArrowFunctionExpression8.js]
x ? function (y) { return ({ y: y }); } : function (z) { return ({ z: z }); };
