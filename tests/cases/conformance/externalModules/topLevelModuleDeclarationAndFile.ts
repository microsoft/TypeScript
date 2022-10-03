// @module: commonjs
// @Filename: vs/foo_0/index.ts
export var x: number = 42;

// @Filename: foo_1.ts
declare module "vs/foo_0" {
	export var y: () => number;
}


// @Filename: foo_2.ts
/// <reference path="foo_1.ts"/>
import foo = require("vs/foo_0");
var z1 = foo.x + 10;   // Should error, as declaration should win
var z2 = foo.y() + 10; // Should resolve
