//// [parserArrowFunctionExpression15.ts]
false ? (param): string => param : null


//// [parserArrowFunctionExpression15.js]
false ? function (param) { return param; } : null;
