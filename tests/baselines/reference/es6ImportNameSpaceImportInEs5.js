//// [tests/cases/compiler/es6ImportNameSpaceImportInEs5.ts] ////

//// [es6ImportNameSpaceImportInEs5_0.ts]

export var a = 10;  

//// [es6ImportNameSpaceImportInEs5_1.ts]
import * as nameSpaceBinding from "es6ImportNameSpaceImportInEs5_0";

//// [es6ImportNameSpaceImportInEs5_0.js]
exports.a = 10;
//// [es6ImportNameSpaceImportInEs5_1.js]
