//// [tests/cases/compiler/externalModuleRefernceResolutionOrderInImportDeclaration.ts] ////

//// [externalModuleRefernceResolutionOrderInImportDeclaration_file1.ts]
export function foo() { };

//// [externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts]
declare module "externalModuleRefernceResolutionOrderInImportDeclaration_file1" {
    export function bar();
}


//// [externalModuleRefernceResolutionOrderInImportDeclaration_file3.ts]
///<reference path='externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts'/>
import file1 = require('./externalModuleRefernceResolutionOrderInImportDeclaration_file1');
file1.foo();
file1.bar();



//// [externalModuleRefernceResolutionOrderInImportDeclaration_file2.js]
//// [externalModuleRefernceResolutionOrderInImportDeclaration_file1.js]
"use strict";
function foo() { }
exports.foo = foo;
;
//// [externalModuleRefernceResolutionOrderInImportDeclaration_file3.js]
"use strict";
///<reference path='externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts'/>
var file1 = require('./externalModuleRefernceResolutionOrderInImportDeclaration_file1');
file1.foo();
file1.bar();
