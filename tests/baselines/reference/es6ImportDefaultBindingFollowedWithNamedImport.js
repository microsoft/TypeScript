//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamedImport_0.ts]

export var a = 10;
export var x = a;
export var m = a;

//// [es6ImportDefaultBindingFollowedWithNamedImport_1.ts]
import defaultBinding, { } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { a } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { a as b } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { x as z,  } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding, { m,  } from "es6ImportDefaultBindingFollowedWithNamedImport_0";

//// [es6ImportDefaultBindingFollowedWithNamedImport_0.js]
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
//// [es6ImportDefaultBindingFollowedWithNamedImport_1.js]
