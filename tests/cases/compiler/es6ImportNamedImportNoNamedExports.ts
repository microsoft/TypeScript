// @target: es5
// @module: commonjs

// @filename: es6ImportNamedImportNoNamedExports_0.ts
var a = 10;
export = a;

// @filename: es6ImportNamedImportNoNamedExports_1.ts
import { a } from "./es6ImportNamedImportNoNamedExports_0";
import { a as x } from "./es6ImportNamedImportNoNamedExports_0";