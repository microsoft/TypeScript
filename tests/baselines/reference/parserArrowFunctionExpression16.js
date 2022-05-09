//// [parserArrowFunctionExpression16.ts]
true ? false ? (param): string => param : null : null


//// [parserArrowFunctionExpression16.js]
true ? false ? function (param) { return param; } : null : null;
