//// [tests/cases/compiler/declarationMaps.ts] ////

//// [declarationMaps.ts]
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

//// [declarationMaps.js]
"use strict";
var m2;
module.exports = m2;
