//// [tests/cases/compiler/expandoFunctionExpressionsWithDynamicNames.ts] ////

//// [expandoFunctionExpressionsWithDynamicNames.ts]
// https://github.com/microsoft/TypeScript/issues/54809

const s = "X";

export const expr = () => {}
expr[s] = 0

export const expr2 = function () {}
expr2[s] = 0


/// [Declarations] ////



//// [expandoFunctionExpressionsWithDynamicNames.d.ts]
export declare const expr: invalid;
export declare const expr2: invalid;
/// [Errors] ////

expandoFunctionExpressionsWithDynamicNames.ts(5,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
expandoFunctionExpressionsWithDynamicNames.ts(8,22): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== expandoFunctionExpressionsWithDynamicNames.ts (2 errors) ====
    // https://github.com/microsoft/TypeScript/issues/54809
    
    const s = "X";
    
    export const expr = () => {}
                        ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    expr[s] = 0
    
    export const expr2 = function () {}
                         ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    expr2[s] = 0
    