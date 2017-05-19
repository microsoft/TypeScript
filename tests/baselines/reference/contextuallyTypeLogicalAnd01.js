//// [contextuallyTypeLogicalAnd01.ts]
let x: (a: string) => string;
let y = true;

x = y && (a => a);

//// [contextuallyTypeLogicalAnd01.js]
var x;
var y = true;
x = y && (function (a) { return a; });
