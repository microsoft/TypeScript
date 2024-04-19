//// [declarationSingleFileHasErrorsReported.ts] ////
export const a string = "missing colon";
//// [declarationSingleFileHasErrorsReported.d.ts] ////
export declare const a: any, string = "missing colon";


//// [Diagnostics reported]
declarationSingleFileHasErrorsReported.ts(1,16): error TS1005: ',' expected.


==== declarationSingleFileHasErrorsReported.ts (1 errors) ====
    export const a string = "missing colon";
                   ~~~~~~
!!! error TS1005: ',' expected.
