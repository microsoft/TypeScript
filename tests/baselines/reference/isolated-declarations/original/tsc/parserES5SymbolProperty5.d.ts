//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty5.ts] ////

//// [parserES5SymbolProperty5.ts]
class C {
    [Symbol.isRegExp]: string;
}

/// [Declarations] ////



//// [parserES5SymbolProperty5.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
}

/// [Errors] ////

parserES5SymbolProperty5.ts(2,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserES5SymbolProperty5.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserES5SymbolProperty5.ts(2,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
parserES5SymbolProperty5.ts(2,6): error TS4031: Public property '[Symbol.isRegExp]' of exported class has or is using private name 'Symbol'.


==== parserES5SymbolProperty5.ts (4 errors) ====
    class C {
        [Symbol.isRegExp]: string;
        ~~~~~~~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
         ~~~~~~
!!! error TS4031: Public property '[Symbol.isRegExp]' of exported class has or is using private name 'Symbol'.
    }