//// [parserArrowFunctionExpression16.ts]
true ? false ? (param): string => param : null : null


//// [parserArrowFunctionExpression16.js]
true ? false ? (param) : function (string) { return param; } : null;
null;
