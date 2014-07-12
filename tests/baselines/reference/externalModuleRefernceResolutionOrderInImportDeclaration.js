//// [externalModuleRefernceResolutionOrderInImportDeclaration_file2.js]
//// [externalModuleRefernceResolutionOrderInImportDeclaration_file1.js]
function foo() {
}
exports.foo = foo;
;
//// [externalModuleRefernceResolutionOrderInImportDeclaration_file3.js]
///<reference path='externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts'/>
var file1 = require('externalModuleRefernceResolutionOrderInImportDeclaration_file1');
file1.foo();
file1.bar();
