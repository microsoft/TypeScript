//// [tests/cases/conformance/types/contextualTypes/logicalAnd/contextuallyTypeLogicalAnd03.ts] ////

//// [contextuallyTypeLogicalAnd03.ts]
let x: (a: string) => string;
let y = true;

x = (a => a) && (b => b);

//// [contextuallyTypeLogicalAnd03.js]
var x;
var y = true;
x = (function (a) { return a; }) && (function (b) { return b; });
