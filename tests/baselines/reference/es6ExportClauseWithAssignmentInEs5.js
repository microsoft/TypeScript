//// [tests/cases/compiler/es6ExportClauseWithAssignmentInEs5.ts] ////

//// [server.ts]
var foo = 2;
foo = 3;

var baz = 3;
baz = 4;

var buzz = 10;
buzz += 3;

var bizz = 8;
bizz++; // compiles to exports.bizz = (bizz++, bizz)
bizz--; // similarly
++bizz; // compiles to exports.bizz = ++bizz

export { foo, baz, baz as quux, buzz, bizz };


//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bizz = exports.buzz = exports.quux = exports.baz = exports.foo = void 0;
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
exports.bizz = (bizz++, bizz); // compiles to exports.bizz = (bizz++, bizz)
exports.bizz = (bizz--, bizz); // similarly
exports.bizz = ++bizz; // compiles to exports.bizz = ++bizz
