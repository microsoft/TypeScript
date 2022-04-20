//// [parserArrowFunctionExpression15.ts]
false ? (param): string => param : null


//// [parserArrowFunctionExpression15.js]
false ? (param) : function (string) { return param; };
null;
