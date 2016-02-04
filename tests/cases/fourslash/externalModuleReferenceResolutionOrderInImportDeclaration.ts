/// <reference path='fourslash.ts'/>

// @Filename: externalModuleReferenceResolutionOrderInImportDeclaration_file1.ts
////export function foo() { };

// @Filename: externalModuleReferenceResolutionOrderInImportDeclaration_file2.ts
////declare module "externalModuleReferenceResolutionOrderInImportDeclaration_file1" {
////    export function bar();
////}


// @Filename: externalModuleReferenceResolutionOrderInImportDeclaration_file3.ts
///////<reference path='externalModuleReferenceResolutionOrderInImportDeclaration_file2.ts'/>
////import file1 = require('externalModuleReferenceResolutionOrderInImportDeclaration_file1');
/////*1*/

goTo.marker('1');
edit.insert("file1.");
verify.memberListContains("bar");
verify.not.memberListContains("foo");