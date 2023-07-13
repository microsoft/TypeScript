//// [tests/cases/compiler/numberOnLeftSideOfInExpression.ts] ////

//// [numberOnLeftSideOfInExpression.ts]
var left: number;
var right: any;
left in right;

//// [numberOnLeftSideOfInExpression.js]
var left;
var right;
left in right;
