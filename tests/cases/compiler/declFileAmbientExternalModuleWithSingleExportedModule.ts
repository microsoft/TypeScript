//@module: commonjs
// @declaration: true

// @Filename: declFileAmbientExternalModuleWithSingleExportedModule_0.ts
declare module "SubModule" {
    export namespace m {
        export namespace m3 {
            interface c {
            }
        }
    }
}

// @Filename: declFileAmbientExternalModuleWithSingleExportedModule_1.ts
///<reference path='declFileAmbientExternalModuleWithSingleExportedModule_0.ts' preserve="true" />
import SubModule = require('SubModule');
export var x: SubModule.m.m3.c;

