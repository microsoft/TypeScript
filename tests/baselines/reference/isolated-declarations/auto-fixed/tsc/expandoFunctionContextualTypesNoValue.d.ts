//// [tests/cases/compiler/expandoFunctionContextualTypesNoValue.ts] ////

//// [expandoFunctionContextualTypesNoValue.ts]
// GH #38532
import Foo from "blah";

export function Foo(): void { }

Foo.bar = () => { };


/// [Declarations] ////



//// [expandoFunctionContextualTypesNoValue.d.ts]
export declare function Foo(): void;
export declare namespace Foo {
    var bar: () => void;
}

/// [Errors] ////

expandoFunctionContextualTypesNoValue.ts(2,17): error TS2307: Cannot find module 'blah' or its corresponding type declarations.


==== expandoFunctionContextualTypesNoValue.ts (1 errors) ====
    // GH #38532
    import Foo from "blah";
                    ~~~~~~
!!! error TS2307: Cannot find module 'blah' or its corresponding type declarations.
    
    export function Foo(): void { }
    
    Foo.bar = () => { };
    