//// [destructureGenerics.ts]
declare function f<T extends any[]>(...args: T): T;
var x = f(1,2);
var x: [1, 2];
declare function g<T extends [number, number]>(...args: T): T;
var z = g(1,2);
var z: [1,2];
declare function h<T>(...args: T[]): T;
var b = h(1,2,3);
var b: number;


//// [destructureGenerics.js]
var x = f(1, 2);
var x;
var z = g(1, 2);
var z;
var b = h(1, 2, 3);
var b;
