//// [tests/cases/compiler/es6ImportNameSpaceImport.ts] ////

//// [es6ImportNameSpaceImport_0.ts]

export var a = 10;

//// [es6ImportNameSpaceImport_1.ts]
import * as nameSpaceBinding from "es6ImportNameSpaceImport_0";
var x = nameSpaceBinding.a;

//// [es6ImportNameSpaceImport_0.js]
exports.a = 10;
//// [es6ImportNameSpaceImport_1.js]
var x = nameSpaceBinding.a;
