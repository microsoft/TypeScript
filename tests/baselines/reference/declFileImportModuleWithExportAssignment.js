//// [tests/cases/compiler/declFileImportModuleWithExportAssignment.ts] ////

//// [declFileImportModuleWithExportAssignment_0.ts]
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

//// [declFileImportModuleWithExportAssignment_1.ts]
/**This is on import declaration*/
import a1 = require("./declFileImportModuleWithExportAssignment_0");
export var a = a1;
a.test1(null, null, null);


//// [declFileImportModuleWithExportAssignment_0.js]
"use strict";
var m2;
module.exports = m2;
//// [declFileImportModuleWithExportAssignment_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
/**This is on import declaration*/
var a1 = require("./declFileImportModuleWithExportAssignment_0");
exports.a = a1;
exports.a.test1(null, null, null);


//// [declFileImportModuleWithExportAssignment_0.d.ts]
declare namespace m2 {
}
declare var m2: {
    (): m2.connectExport;
    test1: m2.connectModule;
    test2(): m2.connectModule;
};
export = m2;
//// [declFileImportModuleWithExportAssignment_1.d.ts]
/**This is on import declaration*/
import a1 = require("./declFileImportModuleWithExportAssignment_0");
export declare var a: {
    (): a1.connectExport;
    test1: a1.connectModule;
    test2(): a1.connectModule;
};


//// [DtsFileErrors]


declFileImportModuleWithExportAssignment_0.d.ts(4,12): error TS2694: Namespace 'm2' has no exported member 'connectExport'.
declFileImportModuleWithExportAssignment_0.d.ts(5,15): error TS2694: Namespace 'm2' has no exported member 'connectModule'.
declFileImportModuleWithExportAssignment_0.d.ts(6,17): error TS2694: Namespace 'm2' has no exported member 'connectModule'.
declFileImportModuleWithExportAssignment_1.d.ts(4,12): error TS2694: Namespace 'm2' has no exported member 'connectExport'.
declFileImportModuleWithExportAssignment_1.d.ts(5,15): error TS2694: Namespace 'm2' has no exported member 'connectModule'.
declFileImportModuleWithExportAssignment_1.d.ts(6,17): error TS2694: Namespace 'm2' has no exported member 'connectModule'.


==== declFileImportModuleWithExportAssignment_1.d.ts (3 errors) ====
    /**This is on import declaration*/
    import a1 = require("./declFileImportModuleWithExportAssignment_0");
    export declare var a: {
        (): a1.connectExport;
               ~~~~~~~~~~~~~
!!! error TS2694: Namespace 'm2' has no exported member 'connectExport'.
        test1: a1.connectModule;
                  ~~~~~~~~~~~~~
!!! error TS2694: Namespace 'm2' has no exported member 'connectModule'.
        test2(): a1.connectModule;
                    ~~~~~~~~~~~~~
!!! error TS2694: Namespace 'm2' has no exported member 'connectModule'.
    };
    
==== declFileImportModuleWithExportAssignment_0.d.ts (3 errors) ====
    declare namespace m2 {
    }
    declare var m2: {
        (): m2.connectExport;
               ~~~~~~~~~~~~~
!!! error TS2694: Namespace 'm2' has no exported member 'connectExport'.
        test1: m2.connectModule;
                  ~~~~~~~~~~~~~
!!! error TS2694: Namespace 'm2' has no exported member 'connectModule'.
        test2(): m2.connectModule;
                    ~~~~~~~~~~~~~
!!! error TS2694: Namespace 'm2' has no exported member 'connectModule'.
    };
    export = m2;
    