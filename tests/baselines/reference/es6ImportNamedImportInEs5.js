//// [tests/cases/compiler/es6ImportNamedImportInEs5.ts] ////

//// [es6ImportNamedImportInEs5_0.ts]

export var a = 10;
export var x = a;
export var m = a;

//// [es6ImportNamedImportInEs5_1.ts]
import { } from "es6ImportNamedImportInEs5_0";
import { a } from "es6ImportNamedImportInEs5_0";
import { a as b } from "es6ImportNamedImportInEs5_0";
import { x, a as y } from "es6ImportNamedImportInEs5_0";
import { x as z,  } from "es6ImportNamedImportInEs5_0";
import { m,  } from "es6ImportNamedImportInEs5_0";

//// [es6ImportNamedImportInEs5_0.js]
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
//// [es6ImportNamedImportInEs5_1.js]
