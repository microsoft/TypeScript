//// [tests/cases/compiler/badExternalModuleReference.ts] ////

//// [badExternalModuleReference.ts]
import a1 = require("garbage");
export declare var a: {
    test1: a1.connectModule;
    (): a1.connectExport;
};


//// [badExternalModuleReference.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
