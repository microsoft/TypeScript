//// [tests/cases/compiler/prefixIncrementAsOperandOfPlusExpression.ts] ////

//// [prefixIncrementAsOperandOfPlusExpression.ts]
var x = 1;
var y = 1;
+ ++x;
+ ++y;

//// [prefixIncrementAsOperandOfPlusExpression.js]
"use strict";
var x = 1;
var y = 1;
+ ++x;
+ ++y;
