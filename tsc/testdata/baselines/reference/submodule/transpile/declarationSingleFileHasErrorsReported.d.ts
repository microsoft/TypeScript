//// [declarationSingleFileHasErrorsReported.ts] ////
export const a string = "missing colon";
//// [declarationSingleFileHasErrorsReported.d.ts] ////
export declare const a: any, string = "missing colon";


//// [Diagnostics reported]
declarationSingleFileHasErrorsReported.ts(1,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
declarationSingleFileHasErrorsReported.ts(1,16): error TS1005: ',' expected.


==== declarationSingleFileHasErrorsReported.ts (2 errors) ====
    export const a string = "missing colon";
                 ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 declarationSingleFileHasErrorsReported.ts:1:14: Add a type annotation to the variable a.
                   ~~~~~~
!!! error TS1005: ',' expected.
