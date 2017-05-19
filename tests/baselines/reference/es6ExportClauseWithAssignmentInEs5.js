//// [server.ts]
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

export { foo, baz, baz as quux, buzz, bizz };


//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo = 2;
exports.foo = foo;
exports.foo = foo = 3;
var baz = 3;
exports.baz = baz;
exports.quux = baz;
exports.quux = exports.baz = baz = 4;
var buzz = 10;
exports.buzz = buzz;
exports.buzz = buzz += 3;
var bizz = 8;
exports.bizz = bizz;
exports.bizz = bizz += 1; // compiles to exports.bizz = bizz += 1
exports.bizz = bizz -= 1; // similarly
exports.bizz = ++bizz; // compiles to exports.bizz = ++bizz
