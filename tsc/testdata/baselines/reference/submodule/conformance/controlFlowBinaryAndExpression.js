//// [tests/cases/conformance/controlFlow/controlFlowBinaryAndExpression.ts] ////

//// [controlFlowBinaryAndExpression.ts]
let x: string | number | boolean;
let cond: boolean;

(x = "") && (x = 0);
x; // string | number

x = "";
cond && (x = 0);
x; // string | number


//// [controlFlowBinaryAndExpression.js]
let x;
let cond;
(x = "") && (x = 0);
x;
x = "";
cond && (x = 0);
x;
