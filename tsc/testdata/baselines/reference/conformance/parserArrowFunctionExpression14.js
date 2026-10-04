//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression14.ts] ////

//// [fileJs.js]
a() ? (b: number, c?: string): void => d() : e; // Not legal JS; "Unexpected token ':'" at first colon

//// [fileTs.ts]
a() ? (b: number, c?: string): void => d() : e;


//// [fileJs.js]
"use strict";
a() ? (b, c) => d() : e; // Not legal JS; "Unexpected token ':'" at first colon
//// [fileTs.js]
"use strict";
a() ? (b, c) => d() : e;
