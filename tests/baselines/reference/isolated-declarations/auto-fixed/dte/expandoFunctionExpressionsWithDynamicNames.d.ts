//// [tests/cases/compiler/expandoFunctionExpressionsWithDynamicNames.ts] ////

//// [expandoFunctionExpressionsWithDynamicNames.ts]
// https://github.com/microsoft/TypeScript/issues/54809

const s = "X";

export const expr = (): void => {}
expr[s] = 0

export const expr2 = function (): void {}
expr2[s] = 0


/// [Declarations] ////



//// [/.src/expandoFunctionExpressionsWithDynamicNames.d.ts]
export declare const expr: invalid;
export declare const expr2: invalid;
/// [Errors] ////

expandoFunctionExpressionsWithDynamicNames.ts(5,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
expandoFunctionExpressionsWithDynamicNames.ts(5,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expandoFunctionExpressionsWithDynamicNames.ts(8,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
expandoFunctionExpressionsWithDynamicNames.ts(8,14): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== expandoFunctionExpressionsWithDynamicNames.ts (4 errors) ====
    // https://github.com/microsoft/TypeScript/issues/54809
    
    const s = "X";
    
    export const expr = (): void => {}
                 ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    expr[s] = 0
    
    export const expr2 = function (): void {}
                 ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    expr2[s] = 0
    