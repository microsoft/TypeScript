// @target: es5
// @module: commonjs

// @filename: es6ImportNameSpaceImportNoNamedExports_0.ts
var a = 10;
export = a;

// @filename: es6ImportNameSpaceImportNoNamedExports_1.ts
import * as nameSpaceBinding from "./es6ImportNameSpaceImportNoNamedExports_0"; // error