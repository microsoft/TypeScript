//// [tests/cases/conformance/Symbols/ES5SymbolProperty6.ts] ////

//// [ES5SymbolProperty6.ts]
u//@target: ES5
class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

/// [Declarations] ////



//// [ES5SymbolProperty6.d.ts]
declare class C {
}

/// [Errors] ////

ES5SymbolProperty6.ts(1,1): error TS2304: Cannot find name 'u'.
ES5SymbolProperty6.ts(3,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
ES5SymbolProperty6.ts(6,9): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.


==== ES5SymbolProperty6.ts (3 errors) ====
    u//@target: ES5
    ~
!!! error TS2304: Cannot find name 'u'.
    class C {
        [Symbol.iterator]() { }
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
    }
    
    (new C)[Symbol.iterator]
            ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.