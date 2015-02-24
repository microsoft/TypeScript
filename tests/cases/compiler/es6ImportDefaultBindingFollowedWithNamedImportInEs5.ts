// @target: es5
// @module: commonjs

// @filename: es6ImportDefaultBindingFollowedWithNamedImportInEs5_0.ts
export var a = 10;
export var x = a;
export var m = a;

// @filename: es6ImportDefaultBindingFollowedWithNamedImportInEs5_1.ts
import defaultBinding, { } from "es6ImportDefaultBindingFollowedWithNamedImportInEs5_0";
import defaultBinding, { a } from "es6ImportDefaultBindingFollowedWithNamedImportInEs5_0";
import defaultBinding, { a as b } from "es6ImportDefaultBindingFollowedWithNamedImportInEs5_0";
import defaultBinding, { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImportInEs5_0";
import defaultBinding, { x as z,  } from "es6ImportDefaultBindingFollowedWithNamedImportInEs5_0";
import defaultBinding, { m,  } from "es6ImportDefaultBindingFollowedWithNamedImportInEs5_0";