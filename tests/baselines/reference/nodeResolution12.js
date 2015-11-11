//// [tests/cases/compiler/nodeResolution12.ts] ////

//// [index.d.ts]
import internal = require("./foo");
export class Foo extends internal.Foo_Internal {}

//// [foo.d.ts]
export class Foo_Internal {}

//// [start.ts]
import foo = require("foo");
import foofoo = require("foo/foo");
new foo.Foo();
new foofoo.Foo_Internal();


//// [start.js]
var foo = require("foo");
var foofoo = require("foo/foo");
new foo.Foo();
new foofoo.Foo_Internal();
