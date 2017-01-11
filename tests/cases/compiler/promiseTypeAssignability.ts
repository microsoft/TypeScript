// @target: es6
var x: Promise<string>;
var y: PromiseLike<string>;
var z: PromiseLike<number>;

y = x; // ok
z = x; // error