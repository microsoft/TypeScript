//// [promiseTypeAssignability.ts]
var x: Promise<string>;
var y: PromiseLike<string>;
var z: PromiseLike<number>;

y = x; // ok
z = x; // error

//// [promiseTypeAssignability.js]
var x;
var y;
var z;
y = x; // ok
z = x; // error
