// @target: es5
// @module: commonjs
// @declaration: true

// @filename: es6ImportNameSpaceImportInEs5_0.ts
export var a = 10;  

// @filename: es6ImportNameSpaceImportInEs5_1.ts
import * as nameSpaceBinding from "./es6ImportNameSpaceImportInEs5_0";
var x = nameSpaceBinding.a;
import * as nameSpaceBinding2 from "./es6ImportNameSpaceImportInEs5_0"; // elide this
