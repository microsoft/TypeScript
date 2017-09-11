//// [destructureGenericsErrors.ts]
declare function g<T extends [number, number]>(...args: T): T;
var y = g(1); // error
var a = g(1,2,3); // error
declare function k<T extends [number, number]>(...args?: T): T;
var u = k(1,2); // error
declare function m<T extends [number, number]>(a?: string, ...args: T): T;
var v = m('a',1,2); // error


//// [destructureGenericsErrors.js]
var y = g(1); // error
var a = g(1, 2, 3); // error
var u = k(1, 2); // error
var v = m('a', 1, 2); // error
