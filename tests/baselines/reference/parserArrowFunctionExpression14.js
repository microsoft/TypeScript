//// [parserArrowFunctionExpression14.ts]
a() ? (b: number, c?: string): void => d() : e;


//// [parserArrowFunctionExpression14.js]
a() ? function (b, c) { return d(); } : e;
