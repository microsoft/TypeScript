//// [tests/cases/compiler/conditionalExpression1.ts] ////

//// [conditionalExpression1.ts]
var x: boolean = (true ? 1 : ""); // should be an error

//// [conditionalExpression1.js]
var x = (true ? 1 : ""); // should be an error
