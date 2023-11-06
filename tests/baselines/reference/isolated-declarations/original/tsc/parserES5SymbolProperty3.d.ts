//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty3.ts] ////

//// [parserES5SymbolProperty3.ts]
declare class C {
    [Symbol.unscopables](): string;
}

/// [Declarations] ////



//// [/.src/parserES5SymbolProperty3.d.ts]
declare class C {
    [Symbol.unscopables](): string;
}
/// [Errors] ////

parserES5SymbolProperty3.ts(2,5): error TS1165: A computed property name in an ambient context must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserES5SymbolProperty3.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserES5SymbolProperty3.ts(2,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
parserES5SymbolProperty3.ts(2,6): error TS4100: Public method '[Symbol.unscopables]' of exported class has or is using private name 'Symbol'.


==== parserES5SymbolProperty3.ts (4 errors) ====
    declare class C {
        [Symbol.unscopables](): string;
        ~~~~~~~~~~~~~~~~~~~~
!!! error TS1165: A computed property name in an ambient context must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
         ~~~~~~
!!! error TS4100: Public method '[Symbol.unscopables]' of exported class has or is using private name 'Symbol'.
    }