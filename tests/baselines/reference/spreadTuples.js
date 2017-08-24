//// [spreadTuples.ts]
function foo(x: number, y: number, z: number) {}
var args: [0, 1, 2] = [0, 1, 2];
foo(...args);


//// [spreadTuples.js]
function foo(x, y, z) { }
var args = [0, 1, 2];
foo.apply(void 0, args);
