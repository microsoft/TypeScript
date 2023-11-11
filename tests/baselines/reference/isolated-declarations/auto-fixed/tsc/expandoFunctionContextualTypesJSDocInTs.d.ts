//// [tests/cases/compiler/expandoFunctionContextualTypesJSDocInTs.ts] ////

//// [expandoFunctionContextualTypesJSDocInTs.ts]
export function Foo(): void { }

// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = () => { };


/// [Declarations] ////



//// [/.src/expandoFunctionContextualTypesJSDocInTs.d.ts]
export declare function Foo(): void;
export declare namespace Foo {
    var bar: () => void;
}
