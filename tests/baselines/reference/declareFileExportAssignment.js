//// [tests/cases/compiler/declareFileExportAssignment.ts] ////

//// [declareFileExportAssignment.ts]
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

//// [declareFileExportAssignment.js]
"use strict";
var m2;
module.exports = m2;


//// [declareFileExportAssignment.d.ts]
declare namespace m2 {
}
declare var m2: {
    (): m2.connectExport;
    test1: m2.connectModule;
    test2(): m2.connectModule;
};
export = m2;


//// [DtsFileErrors]


declareFileExportAssignment.d.ts(4,12): error TS2694: Namespace 'm2' has no exported member 'connectExport'.
declareFileExportAssignment.d.ts(5,15): error TS2694: Namespace 'm2' has no exported member 'connectModule'.
declareFileExportAssignment.d.ts(6,17): error TS2694: Namespace 'm2' has no exported member 'connectModule'.


==== declareFileExportAssignment.d.ts (3 errors) ====
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
    