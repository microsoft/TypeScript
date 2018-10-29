/// <reference path='fourslash.ts'/>

// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file1.ts
////export function foo() { };

// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts
////declare module "externalModuleRefernceResolutionOrderInImportDeclaration_file1" {
////    export function bar();
////}


// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file3.ts
///////<reference path='externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts'/>
////import file1 = require('externalModuleRefernceResolutionOrderInImportDeclaration_file1');
/////*1*/

goTo.marker('1');
edit.insert("file1.");
verify.completions({ includes: "bar", excludes: "foo" });
