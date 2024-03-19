//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression16.ts] ////

//// [fileJs.js]
true ? false ? (param): string => param : null : null // Not legal JS; "Unexpected token ':'" at last colon

//// [fileTs.ts]
true ? false ? (param): string => param : null : null


//// [fileJs.js]
true ? false ? (param) => param : null : null; // Not legal JS; "Unexpected token ':'" at last colon
//// [fileTs.js]
true ? false ? (param) => param : null : null;
