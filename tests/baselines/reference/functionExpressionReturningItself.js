//// [tests/cases/compiler/functionExpressionReturningItself.ts] ////

//// [functionExpressionReturningItself.ts]
var x = function somefn() { return somefn; };

//// [functionExpressionReturningItself.js]
var x = function somefn() { return somefn; };


//// [functionExpressionReturningItself.d.ts]
declare var x: () => () => /*elided*/ any;
