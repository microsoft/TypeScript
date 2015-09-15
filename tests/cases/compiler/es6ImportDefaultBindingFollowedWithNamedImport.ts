// @target: es6
// @module: commonjs
// @declaration: true

// @filename: es6ImportDefaultBindingFollowedWithNamedImport_0.ts
export var a = 10;
export var x = a;
export var m = a;
export default {};

// @filename: es6ImportDefaultBindingFollowedWithNamedImport_1.ts
import defaultBinding1, { } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding2, { a } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = a;
import defaultBinding3, { a as b } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = b;
import defaultBinding4, { x, a as y } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = x;
var x1: number = y;
import defaultBinding5, { x as z,  } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = z;
import defaultBinding6, { m,  } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = m;
