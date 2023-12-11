//// [tests/cases/conformance/Symbols/ES5SymbolProperty5.ts] ////

//// [ES5SymbolProperty5.ts]
var Symbol: { iterator: symbol };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator](0) // Should error

/// [Declarations] ////



//// [ES5SymbolProperty5.d.ts]
declare var Symbol: {
    iterator: symbol;
};
declare class C {
    [Symbol.iterator](): invalid;
}

/// [Errors] ////

ES5SymbolProperty5.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations


==== ES5SymbolProperty5.ts (1 errors) ====
    var Symbol: { iterator: symbol };
    
    class C {
        [Symbol.iterator]() { }
        ~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 ES5SymbolProperty5.ts:4:5: Add a return type to the method
    }
    
    (new C)[Symbol.iterator](0) // Should error