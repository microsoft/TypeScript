//// [controlFlowBinaryOrExpression.ts]
let x: string | number | boolean;
let cond: boolean;

(x = "") || (x = 0);
x; // string | number

x = "";
cond || (x = 0);
x; // string | number


//// [controlFlowBinaryOrExpression.js]
var x;
var cond;
(x = "") || (x = 0);
x; // string | number
x = "";
cond || (x = 0);
x; // string | number
