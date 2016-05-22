//// [server.ts]

var foo = 2;
foo = 3;

var baz = 3;
baz = 4;

export { foo, baz, baz as quux };


//// [server.js]
"use strict";
var foo = 2;
exports.foo = foo;
exports.foo = foo = 3;
var baz = 3;
exports.baz = baz;
exports.quux = baz;
exports.baz = exports.quux = baz = 4;
