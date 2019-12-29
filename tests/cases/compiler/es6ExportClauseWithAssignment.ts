// @target: es6
// @module: commonjs

// @filename: server.ts
var foo = 2;
foo = 3;

var baz = 3;
baz = 4;

var buzz = 10;
buzz += 3;

var bizz = 8;
bizz++; // compiles to exports.bizz = bizz += 1
bizz--; // similarly
++bizz; // compiles to exports.bizz = ++bizz

for (foo of [1, 2]) {}

export var exportedFoo = 0;
for (exportedFoo of [1, 2]) {}

export var doubleExportedFoo = 0;
for (doubleExportedFoo of [1, 2]) {}

let bar = '';
for (bar in {}) {}

export { foo, bar, baz, baz as quux, buzz, bizz, doubleExportedFoo as otherFoo };
