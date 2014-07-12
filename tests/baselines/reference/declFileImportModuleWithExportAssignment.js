//// [declFileImportModuleWithExportAssignment_1.ts]
/**This is on import declaration*/
import a1 = require("declFileImportModuleWithExportAssignment_0");
export var a = a1;
a.test1(null, null, null);


//// [declFileImportModuleWithExportAssignment_0.js]
var m2;
module.exports = m2;
//// [declFileImportModuleWithExportAssignment_1.js]
/**This is on import declaration*/
var a1 = require("declFileImportModuleWithExportAssignment_0");
exports.a = a1;
exports.a.test1(null, null, null);


////[declFileImportModuleWithExportAssignment_0.d.ts]
declare module m2 {
    interface connectModule {
        (res: any, req: any, next: any): void;
    }
    interface connectExport {
        use: (mod: connectModule) => connectExport;
        listen: (port: number) => void;
    }
}
declare var m2: {
    test1: m2.connectModule;
    test2(): m2.connectModule;
    (): m2.connectExport;
};
export = m2;
////[declFileImportModuleWithExportAssignment_1.d.ts]
/**This is on import declaration*/
import a1 = require("declFileImportModuleWithExportAssignment_0");
export declare var a: {
    test1: a1.connectModule;
    test2(): a1.connectModule;
    (): a1.connectExport;
};
