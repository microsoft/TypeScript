// @module: commonjs
// @declaration: true

// @Filename: declFileImportModuleWithExportAssignment_0.ts
module m2 {
    export interface connectModule {
        (res, req, next): void;
    }
    export interface connectExport {
        use: (mod: connectModule) => connectExport;
        listen: (port: number) => void;
    }

}
var m2: {
    (): m2.connectExport;
    test1: m2.connectModule;
    test2(): m2.connectModule;
};
export = m2;

// @Filename: declFileImportModuleWithExportAssignment_1.ts
/**This is on import declaration*/
import a1 = require("./declFileImportModuleWithExportAssignment_0");
export var a = a1;
a.test1(null, null, null);
