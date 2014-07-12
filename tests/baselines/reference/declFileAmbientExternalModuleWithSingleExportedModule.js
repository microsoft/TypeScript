//// [tests/cases/compiler/declFileAmbientExternalModuleWithSingleExportedModule.ts] ////

//// [declFileAmbientExternalModuleWithSingleExportedModule_0.ts]

declare module "SubModule" {
    export module m {
        export module m3 {
            interface c {
            }
        }
    }
}

//// [declFileAmbientExternalModuleWithSingleExportedModule_1.ts]
///<reference path='declFileAmbientExternalModuleWithSingleExportedModule_0.ts'/>
import SubModule = require('SubModule');
export var x: SubModule.m.m3.c;



//// [declFileAmbientExternalModuleWithSingleExportedModule_0.js]
//// [declFileAmbientExternalModuleWithSingleExportedModule_1.js]
exports.x;


//// [declFileAmbientExternalModuleWithSingleExportedModule_0.d.ts]
//// [declFileAmbientExternalModuleWithSingleExportedModule_1.d.ts]
/// <reference path='declFileAmbientExternalModuleWithSingleExportedModule_0.d.ts' />
export declare var x;
