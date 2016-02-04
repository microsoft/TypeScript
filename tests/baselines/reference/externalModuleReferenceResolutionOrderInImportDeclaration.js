//// [tests/cases/compiler/externalModuleReferenceResolutionOrderInImportDeclaration.ts] ////

//// [externalModuleReferenceResolutionOrderInImportDeclaration_file1.ts]
export function foo() { };

//// [externalModuleReferenceResolutionOrderInImportDeclaration_file2.ts]
declare module "externalModuleReferenceResolutionOrderInImportDeclaration_file1" {
    export function bar();
}


//// [externalModuleReferenceResolutionOrderInImportDeclaration_file3.ts]
///<reference path='externalModuleReferenceResolutionOrderInImportDeclaration_file2.ts'/>
import file1 = require('./externalModuleReferenceResolutionOrderInImportDeclaration_file1');
file1.foo();
file1.bar();



//// [externalModuleReferenceResolutionOrderInImportDeclaration_file2.js]
//// [externalModuleReferenceResolutionOrderInImportDeclaration_file1.js]
"use strict";
function foo() { }
exports.foo = foo;
;
//// [externalModuleReferenceResolutionOrderInImportDeclaration_file3.js]
"use strict";
///<reference path='externalModuleReferenceResolutionOrderInImportDeclaration_file2.ts'/>
var file1 = require('./externalModuleReferenceResolutionOrderInImportDeclaration_file1');
file1.foo();
file1.bar();
