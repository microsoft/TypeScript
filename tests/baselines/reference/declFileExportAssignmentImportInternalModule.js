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
var m3;
(function (m3) {
    m3.server;
})(m3 || (m3 = {}));

var m = m3;
module.exports = m;


////[declFileExportAssignmentImportInternalModule.d.ts]
declare module m3 {
    module m2 {
        interface connectModule {
            (res: any, req: any, next: any): void;
        }
        interface connectExport {
            use: (mod: connectModule) => connectExport;
            listen: (port: number) => void;
        }
    }
    var server: {
        test1: m2.connectModule;
        test2(): m2.connectModule;
        (): m2.connectExport;
    };
}
import m = m3;
export = m;
