//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty1.ts] ////

//// [parserES5SymbolProperty1.ts]
interface I {
    [Symbol.iterator]: string;
}

/// [Declarations] ////



//// [parserES5SymbolProperty1.d.ts]
interface I {
}

/// [Errors] ////

parserES5SymbolProperty1.ts(2,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserES5SymbolProperty1.ts(2,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.


==== parserES5SymbolProperty1.ts (2 errors) ====
    interface I {
        [Symbol.iterator]: string;
        ~~~~~~~~~~~~~~~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
    }