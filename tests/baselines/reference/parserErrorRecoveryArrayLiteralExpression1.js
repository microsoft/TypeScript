//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ArrayLiteralExpressions/parserErrorRecoveryArrayLiteralExpression1.ts] ////

//// [parserErrorRecoveryArrayLiteralExpression1.ts]
var v = [1, 2, 3
4, 5, 6, 7];

//// [parserErrorRecoveryArrayLiteralExpression1.js]
var v = [1, 2, 3,
    4, 5, 6, 7];
