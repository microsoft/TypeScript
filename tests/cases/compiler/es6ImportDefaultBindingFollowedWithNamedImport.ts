// @target: es6
// @module: commonjs

// @filename: es6ImportDefaultBindingFollowedWithNamedImport_0.ts
export var a = 10;
export var x = a;
export var m = a;

// @filename: es6ImportDefaultBindingFollowedWithNamedImport_1.ts
import defaultBinding, { } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { a } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { a as b } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { x as z,  } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { m,  } from "es6ImportDefaultBindingFollowedWithNamedImport_0";