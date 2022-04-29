// @module: commonjs
// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file1.ts
export function foo() { };

// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts
declare module "externalModuleRefernceResolutionOrderInImportDeclaration_file1" {
    export function bar();
}


// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file3.ts
///<reference path='externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts'/>
import file1 = require('./externalModuleRefernceResolutionOrderInImportDeclaration_file1');
file1.foo();
file1.bar();

