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
    interface connectModule {
        (res: any, req: any, next: any): void;
    }
    interface connectExport {
        use: (mod: connectModule) => connectExport;
        listen: (port: number) => void;
    }
}
declare var m2: {
    (): m2.connectExport;
    test1: m2.connectModule;
    test2(): m2.connectModule;
};
export = m2;
