//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty7.ts] ////

//// [parserES5SymbolProperty7.ts]
class C {
    [Symbol.toStringTag](): void { }
}

/// [Declarations] ////



//// [parserES5SymbolProperty7.d.ts]
declare class C {
    [Symbol.toStringTag](): void;
}

/// [Errors] ////

parserES5SymbolProperty7.ts(2,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
parserES5SymbolProperty7.ts(2,6): error TS4100: Public method '[Symbol.toStringTag]' of exported class has or is using private name 'Symbol'.


==== parserES5SymbolProperty7.ts (2 errors) ====
    class C {
        [Symbol.toStringTag](): void { }
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
         ~~~~~~
!!! error TS4100: Public method '[Symbol.toStringTag]' of exported class has or is using private name 'Symbol'.
    }