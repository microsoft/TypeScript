//// [declarationSingleFileHasErrors.ts] ////
export const a number = "missing colon";
//// [declarationSingleFileHasErrors.d.ts] ////
export declare const a: any, number = "missing colon";


//// [Diagnostics reported]
declarationSingleFileHasErrors.ts(1,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== declarationSingleFileHasErrors.ts (1 errors) ====
    export const a number = "missing colon";
                 ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 declarationSingleFileHasErrors.ts:1:14: Add a type annotation to the variable a.
