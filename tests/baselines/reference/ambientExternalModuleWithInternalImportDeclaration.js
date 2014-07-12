//// [ambientExternalModuleWithInternalImportDeclaration_1.ts]
///<reference path='ambientExternalModuleWithInternalImportDeclaration_0.ts'/>
import A = require('M');
var c = new A();

//// [ambientExternalModuleWithInternalImportDeclaration_0.js]
//// [ambientExternalModuleWithInternalImportDeclaration_1.js]
define(["require", "exports", 'M'], function(require, exports, A) {
    var c = new A();
});
