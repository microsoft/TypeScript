//// [tests/cases/compiler/assignmentToParenthesizedExpression1.ts] ////

//// [assignmentToParenthesizedExpression1.ts]
var x;
(1, x)=0;

//// [assignmentToParenthesizedExpression1.js]
"use strict";
var x;
(1, x) = 0;
