//// [tests/cases/conformance/Symbols/ES5SymbolProperty4.ts] ////

//// [ES5SymbolProperty4.ts]
var Symbol: { iterator: string };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

/// [Declarations] ////



//// [ES5SymbolProperty4.d.ts]
declare var Symbol: {
    iterator: string;
};
declare class C {
}

/// [Errors] ////

ES5SymbolProperty4.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.


==== ES5SymbolProperty4.ts (1 errors) ====
    var Symbol: { iterator: string };
    
    class C {
        [Symbol.iterator]() { }
        ~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
    }
    
    (new C)[Symbol.iterator]