//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression9.ts] ////

//// [fileJs.js]
b ? (c) : d => e // Legal JS

//// [fileTs.ts]
b ? (c) : d => e


//// [fileJs.js]
b ? (c) : d => e; // Legal JS
//// [fileTs.js]
b ? (c) : d => e;
