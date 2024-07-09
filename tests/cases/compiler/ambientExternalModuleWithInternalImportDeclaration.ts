//@module: amd
// @Filename: ambientExternalModuleWithInternalImportDeclaration_0.ts
declare module 'M' {
    module C {
        export var f: number;
    }
    class C {
        foo(): void;
    }
    import X = C;
    export = X;

}

// @Filename: ambientExternalModuleWithInternalImportDeclaration_1.ts
///<reference path='ambientExternalModuleWithInternalImportDeclaration_0.ts'/>
import A = require('M');
var c = new A();