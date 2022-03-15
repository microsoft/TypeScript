//// [parserArrowFunctionExpression13.ts]
a ? () => a() : (): any => null;


//// [parserArrowFunctionExpression13.js]
a ? function () { return a(); } : function () { return null; };
