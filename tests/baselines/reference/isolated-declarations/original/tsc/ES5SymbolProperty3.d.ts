//// [tests/cases/conformance/Symbols/ES5SymbolProperty3.ts] ////

//// [ES5SymbolProperty3.ts]
var Symbol: any;

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

/// [Declarations] ////



//// [ES5SymbolProperty3.d.ts]
declare var Symbol: any;
declare class C {
}

/// [Errors] ////

ES5SymbolProperty3.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== ES5SymbolProperty3.ts (1 errors) ====
    var Symbol: any;
    
    class C {
        [Symbol.iterator]() { }
        ~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
    }
    
    (new C)[Symbol.iterator]