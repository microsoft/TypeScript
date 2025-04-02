//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression12.ts] ////

//// [fileJs.js]
a ? (b) => (c): d => e // Legal JS

//// [fileTs.ts]
a ? (b) => (c): d => e


//// [fileJs.js]
a ? (b) => (c) : d => e; // Legal JS
//// [fileTs.js]
a ? (b) => (c) : d => e;
