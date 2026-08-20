//// [declarationSingleFileHasErrorsReported.ts] ////
export const a string = "missing colon";
//// [declarationSingleFileHasErrorsReported.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.a = void 0;
exports.string = "missing colon";


//// [Diagnostics reported]
declarationSingleFileHasErrorsReported.ts(1,16): error TS1005: ',' expected.


==== declarationSingleFileHasErrorsReported.ts (1 errors) ====
    export const a string = "missing colon";
                   ~~~~~~
!!! error TS1005: ',' expected.
