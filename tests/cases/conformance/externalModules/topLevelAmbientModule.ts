// @module: commonjs
// @Filename: foo_0.ts
declare module "foo" {
	export var x: number;
}

// @Filename: foo_1.ts
/// <reference path="foo_0.ts"/>
import foo = require("foo");
var z = foo.x + 10;
