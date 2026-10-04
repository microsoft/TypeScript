// @target: es6
// @module: commonjs
// @declaration: true

// @filename: es6ImportNameSpaceImport_0.ts
export var a = 10;

// @filename: es6ImportNameSpaceImport_1.ts
import * as nameSpaceBinding from "./es6ImportNameSpaceImport_0";
var x = nameSpaceBinding.a;
import * as nameSpaceBinding2 from "./es6ImportNameSpaceImport_0"; // elide this
