//// [tests/cases/compiler/declFileExportAssignmentImportInternalModule.ts] ////

//// [declFileExportAssignmentImportInternalModule.ts]
module m3 {
    export module m2 {
        export interface connectModule {
            (res, req, next): void;
        }
        export interface connectExport {
            use: (mod: connectModule) => connectExport;
            listen: (port: number) => void;
        }

    }

    export var server: {
        (): m2.connectExport;
        test1: m2.connectModule;
        test2(): m2.connectModule;
    };
}

import m = m3
export = m;

//// [declFileExportAssignmentImportInternalModule.js]
"use strict";
var m3;
(function (m3) {
})(m3 || (m3 = {}));
var m = m3;
module.exports = m;


//// [declFileExportAssignmentImportInternalModule.d.ts]
declare namespace m3 {
    namespace m2 {
        interface connectModule {
            (res: any, req: any, next: any): void;
        }
        interface connectExport {
            use: (mod: connectModule) => connectExport;
            listen: (port: number) => void;
        }
    }
    var server: {
        (): m2.connectExport;
        test1: m2.connectModule;
        test2(): m2.connectModule;
    };
}
import m = m3;
export = m;
