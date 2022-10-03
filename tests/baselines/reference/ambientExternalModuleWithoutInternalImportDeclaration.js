//// [tests/cases/compiler/ambientExternalModuleWithoutInternalImportDeclaration.ts] ////

//// [ambientExternalModuleWithoutInternalImportDeclaration_0.ts]
declare module 'M' {
    module C {
        export var f: number;
    }
    class C {
        foo(): void;
    }
    export = C;

}

//// [ambientExternalModuleWithoutInternalImportDeclaration_1.ts]
///<reference path='ambientExternalModuleWithoutInternalImportDeclaration_0.ts'/>
import A = require('M');
var c = new A();

//// [ambientExternalModuleWithoutInternalImportDeclaration_0.js]
//// [ambientExternalModuleWithoutInternalImportDeclaration_1.js]
define(["require", "exports", "M"], function (require, exports, A) {
    "use strict";
    exports.__esModule = true;
    var c = new A();
});
