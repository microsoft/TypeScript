//// [tests/cases/compiler/expandoFunctionContextualTypesNoValue.ts] ////

//// [expandoFunctionContextualTypesNoValue.ts]
// GH #38532
import Foo from "blah";

export function Foo(): void { }

Foo.bar = () => { };


/// [Declarations] ////



//// [expandoFunctionContextualTypesNoValue.d.ts]
export declare function Foo(): void;
/// [Errors] ////

expandoFunctionContextualTypesNoValue.ts(2,17): error TS2307: Cannot find module 'blah' or its corresponding type declarations.
expandoFunctionContextualTypesNoValue.ts(4,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== expandoFunctionContextualTypesNoValue.ts (2 errors) ====
    // GH #38532
    import Foo from "blah";
                    ~~~~~~
!!! error TS2307: Cannot find module 'blah' or its corresponding type declarations.
    
    export function Foo(): void { }
                    ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    Foo.bar = () => { };
    