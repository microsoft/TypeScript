//// [server.ts]

var foo = 2;
foo = 3;

var baz = 3;
baz = 4;

var buzz = 10;
buzz += 3;

export { foo, baz, baz as quux, buzz };


//// [server.js]
"use strict";
var foo = 2;
exports.foo = foo;
exports.foo = foo = 3;
var baz = 3;
exports.baz = baz;
exports.quux = baz;
exports.baz = exports.quux = baz = 4;
var buzz = 10;
exports.buzz = buzz;
exports.buzz = buzz += 3;
