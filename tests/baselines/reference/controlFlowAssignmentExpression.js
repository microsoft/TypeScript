//// [controlFlowAssignmentExpression.ts]
let x: string | boolean | number;
let obj: any;

x = "";
x = x.length;
x; // number

x = true;
(x = "", obj).foo = (x = x.length);
x; // number


//// [controlFlowAssignmentExpression.js]
var x;
var obj;
x = "";
x = x.length;
x; // number
x = true;
(x = "", obj).foo = (x = x.length);
x; // number
