//// [tests/cases/compiler/noErrorUsingImportExportModuleAugmentationInDeclarationFile2.ts] ////

//// [1.ts]
export var j = "hello"; // error

//// [0.d.ts]
export = a;
declare var a: number;

//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.j = void 0;
exports.j = "hello"; // error
