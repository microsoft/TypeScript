//// [tests/cases/conformance/parser/ecmascript5/ArrowFunctionExpressions/parserArrowFunctionExpression13.ts] ////

//// [fileJs.js]
a ? () => a() : (): any => null; // Not legal JS; "Unexpected token ')'" at last paren

//// [fileTs.ts]
a ? () => a() : (): any => null;


//// [fileJs.js]
a ? () => a() : () => null; // Not legal JS; "Unexpected token ')'" at last paren
//// [fileTs.js]
a ? () => a() : () => null;
