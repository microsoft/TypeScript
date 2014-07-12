//// [ambientExternalModuleWithoutInternalImportDeclaration_1.ts]
///<reference path='ambientExternalModuleWithoutInternalImportDeclaration_0.ts'/>
import A = require('M');
var c = new A();

//// [ambientExternalModuleWithoutInternalImportDeclaration_0.js]
//// [ambientExternalModuleWithoutInternalImportDeclaration_1.js]
define(["require", "exports", 'M'], function(require, exports, A) {
    var c = new A();
});
