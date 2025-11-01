// @target: es6
// @declaration: true

// @filename: es6ImportDefaultBindingFollowedWithNamedImport1_0.ts
var a = 10;
export default a;

// @filename: es6ImportDefaultBindingFollowedWithNamedImport1_1.ts
import defaultBinding1, { } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding1;
import defaultBinding2, { a } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding2;
import defaultBinding3, { a as b } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding3;
import defaultBinding4, { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding4;
import defaultBinding5, { x as z,  } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding5;
import defaultBinding6, { m,  } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding6;
