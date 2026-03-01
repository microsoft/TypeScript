//// [tests/cases/conformance/controlFlow/controlFlowConditionalExpression.ts] ////

//// [controlFlowConditionalExpression.ts]
let x: string | number | boolean;
let cond: boolean;

cond ? x = "" : x = 3;
x; // string | number


//// [controlFlowConditionalExpression.js]
"use strict";
let x;
let cond;
cond ? x = "" : x = 3;
x; // string | number
