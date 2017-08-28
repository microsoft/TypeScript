//// [destructureGenericsErrors.ts]
declare function g<T extends [number, number]>(...args: T): T;
var y = g(1); // error
var y: [1];
var a = g(1,2,3); // error
var a: [1,2,3];


//// [destructureGenericsErrors.js]
var y = g(1); // error
var y;
var a = g(1, 2, 3); // error
var a;
