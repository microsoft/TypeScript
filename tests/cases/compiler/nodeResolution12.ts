// @module: commonjs
// @moduleResolution: node
// @filename: node_modules/foo/index.d.ts
import internal = require("./foo");
export class Foo extends internal.Foo_Internal {}

// @filename: node_modules/foo/foo.d.ts
export class Foo_Internal {}

// @filename: start.ts
import foo = require("foo");
import foofoo = require("foo/foo");
new foo.Foo();
new foofoo.Foo_Internal();
