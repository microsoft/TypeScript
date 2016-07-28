//// [tests/cases/compiler/noErrorUsingImportExportModuleAugmentationInDeclarationFile3.ts] ////

//// [0.d.ts]

export = a;
declare var a: number;

//// [1.ts]
export var j = "hello";  // error


//// [1.js]
"use strict";
exports.j = "hello"; // error
