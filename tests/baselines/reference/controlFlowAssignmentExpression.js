//// [tests/cases/conformance/controlFlow/controlFlowAssignmentExpression.ts] ////

//// [controlFlowAssignmentExpression.ts]
let x: string | boolean | number;
let obj: any;

x = "";
x = x.length;
x; // number

x = true;
(x = "", obj).foo = (x = x.length);
x; // number

// https://github.com/microsoft/TypeScript/issues/35484
type D = { done: true, value: 1 } | { done: false, value: 2 };
declare function fn(): D;
let o: D;
if ((o = fn()).done) {
    const y: 1 = o.value;
}

//// [controlFlowAssignmentExpression.js]
var x;
var obj;
x = "";
x = x.length;
x; // number
x = true;
(x = "", obj).foo = (x = x.length);
x; // number
var o;
if ((o = fn()).done) {
    var y = o.value;
}
