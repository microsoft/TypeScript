//// [tests/cases/compiler/expandoFunctionContextualTypesJSDocInTs.ts] ////

//// [expandoFunctionContextualTypesJSDocInTs.ts]
export function Foo(): void { }

// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = () => { };


/// [Declarations] ////



//// [expandoFunctionContextualTypesJSDocInTs.d.ts]
export declare function Foo(): void;
/// [Errors] ////

expandoFunctionContextualTypesJSDocInTs.ts(1,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== expandoFunctionContextualTypesJSDocInTs.ts (1 errors) ====
    export function Foo(): void { }
                    ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    // This comment should have no effect; this is a TS file.
    /** @type {never} */
    Foo.bar = () => { };
    