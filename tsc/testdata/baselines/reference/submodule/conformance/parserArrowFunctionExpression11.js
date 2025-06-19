//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression11.ts] ////

//// [fileJs.js]
a ? b ? c : (d) : e => f // Legal JS

//// [fileTs.ts]
a ? b ? c : (d) : e => f


//// [fileJs.js]
a ? b ? c : (d) : e => f; // Legal JS
//// [fileTs.js]
a ? b ? c : (d) : e => f;
