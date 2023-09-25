//// [tests/cases/compiler/declareFileExportAssignmentWithVarFromVariableStatement.ts] ////

//// [declareFileExportAssignmentWithVarFromVariableStatement.ts]
module m2 {
    export interface connectModule {
        (res, req, next): void;
    }
    export interface connectExport {
        use: (mod: connectModule) => connectExport;
        listen: (port: number) => void;
    }

}

var x = 10, m2: {
    (): m2.connectExport;
    test1: m2.connectModule;
    test2(): m2.connectModule;
};

export = m2;

//// [declareFileExportAssignmentWithVarFromVariableStatement.js]
"use strict";
var x = 10, m2;
module.exports = m2;


//// [declareFileExportAssignmentWithVarFromVariableStatement.d.ts]
declare namespace m2 {
}
declare var m2: {
    (): m2.connectExport;
    test1: m2.connectModule;
    test2(): m2.connectModule;
};
export = m2;


//// [DtsFileErrors]


declareFileExportAssignmentWithVarFromVariableStatement.d.ts(4,12): error TS2694: Namespace 'm2' has no exported member 'connectExport'.
declareFileExportAssignmentWithVarFromVariableStatement.d.ts(5,15): error TS2694: Namespace 'm2' has no exported member 'connectModule'.
declareFileExportAssignmentWithVarFromVariableStatement.d.ts(6,17): error TS2694: Namespace 'm2' has no exported member 'connectModule'.


==== declareFileExportAssignmentWithVarFromVariableStatement.d.ts (3 errors) ====
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
    