// @module: commonjs
// @Filename: vs/foo_0.ts
export var x: number;

// @Filename: vs/fum.d.ts
export declare var y: number;

// @Filename: foo_1.ts
import foo = require("./vs/foo_0");
import fum = require("./vs/fum");
var z = foo.x + fum.y;
