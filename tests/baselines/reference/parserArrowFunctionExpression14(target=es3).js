//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression14.ts] ////

//// [fileJs.js]
a() ? (b: number, c?: string): void => d() : e; // Not legal JS; "Unexpected token ':'" at first colon

//// [fileTs.ts]
a() ? (b: number, c?: string): void => d() : e;


//// [fileJs.js]
a() ? function (b, c) { return d(); } : e; // Not legal JS; "Unexpected token ':'" at first colon
//// [fileTs.js]
a() ? function (b, c) { return d(); } : e;
