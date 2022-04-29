//@module: amd
// @Filename: externalModuleReferenceOfImportDeclarationWithExportModifier_0.ts
export function foo() { };

// @Filename: externalModuleReferenceOfImportDeclarationWithExportModifier_1.ts
export import file1 = require('externalModuleReferenceOfImportDeclarationWithExportModifier_0');
file1.foo();
