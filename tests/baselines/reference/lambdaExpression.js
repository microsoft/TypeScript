//// [tests/cases/compiler/lambdaExpression.ts] ////

//// [lambdaExpression.ts]
() => 0; // Needs to be wrapped in parens to be a valid expression (not declaration)
var y = 0;
(()=>0);
var x = 0;


//// [lambdaExpression.js]
(function () { return 0; }); // Needs to be wrapped in parens to be a valid expression (not declaration)
var y = 0;
(function () { return 0; });
var x = 0;
