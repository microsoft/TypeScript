//// [tests/cases/compiler/noErrorUsingImportExportModuleAugmentationInDeclarationFile2.ts] ////

//// [1.ts]

export var j = "hello"

//// [0.d.ts]
export = a;
declare var a: number;

//// [1.js]
"use strict";
exports.j = "hello";
