// @target: es5
// @module: commonjs

// @filename: server.ts
var foo = 2;
foo = 3;

var baz = 3;
baz = 4;

var buzz = 10;
buzz += 3;

export { foo, baz, baz as quux, buzz };
