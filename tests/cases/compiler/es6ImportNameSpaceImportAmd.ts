// @module: amd
// @declaration: true

// @filename: es6ImportNameSpaceImportAmd_0.ts
export var a = 10;

// @filename: es6ImportNameSpaceImportAmd_1.ts
import * as nameSpaceBinding from "es6ImportNameSpaceImportAmd_0";
var x = nameSpaceBinding.a;
import * as nameSpaceBinding2 from "es6ImportNameSpaceImportAmd_0"; // elide this
