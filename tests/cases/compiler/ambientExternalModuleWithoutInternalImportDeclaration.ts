//@module: amd
// @Filename: ambientExternalModuleWithoutInternalImportDeclaration_0.ts
declare module 'M' {
    module C {
        export var f: number;
    }
    class C {
        foo(): void;
    }
    export = C;

}

// @Filename: ambientExternalModuleWithoutInternalImportDeclaration_1.ts
///<reference path='ambientExternalModuleWithoutInternalImportDeclaration_0.ts'/>
import A = require('M');
var c = new A();