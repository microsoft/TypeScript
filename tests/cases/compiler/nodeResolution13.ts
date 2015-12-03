// @module: commonjs
// @moduleResolution: node
// @filename: node_modules/foo/index.d.ts
/// <reference path="../baz/include.d.ts" />
export class Foo extends BazShim {}

// @filename: node_modules/bar/index.d.ts
/// <reference path="../baz/include.d.ts" />
export class Bar extends BazShim {}

// @filename: node_modules/baz/include.d.ts
declare class BazShim {}

// @filename: start.ts
import foo = require("foo");
import bar = require("bar");

new foo.Foo();
new bar.Bar();
