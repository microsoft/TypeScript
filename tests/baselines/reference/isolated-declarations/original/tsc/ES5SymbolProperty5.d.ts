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
}

/// [Errors] ////

ES5SymbolProperty5.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.


==== ES5SymbolProperty5.ts (1 errors) ====
    var Symbol: { iterator: symbol };
    
    class C {
        [Symbol.iterator]() { }
        ~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
    }
    
    (new C)[Symbol.iterator](0) // Should error