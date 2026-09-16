//// [tests/cases/compiler/externalModuleReferenceOfImportDeclarationWithExportModifier.ts] ////

//// [externalModuleReferenceOfImportDeclarationWithExportModifier_0.ts]
export function foo() { };

//// [externalModuleReferenceOfImportDeclarationWithExportModifier_1.ts]
export import file1 = require('externalModuleReferenceOfImportDeclarationWithExportModifier_0');
file1.foo();


//// [externalModuleReferenceOfImportDeclarationWithExportModifier_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file1 = require("externalModuleReferenceOfImportDeclarationWithExportModifier_0");
exports.file1.foo();
