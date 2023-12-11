//// [tests/cases/conformance/Symbols/ES5SymbolProperty7.ts] ////

//// [ES5SymbolProperty7.ts]
var Symbol: { iterator: any };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]

/// [Declarations] ////



//// [ES5SymbolProperty7.d.ts]
declare var Symbol: {
    iterator: any;
};
declare class C {
    [Symbol.iterator](): invalid;
}

/// [Errors] ////

ES5SymbolProperty7.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
ES5SymbolProperty7.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== ES5SymbolProperty7.ts (2 errors) ====
    var Symbol: { iterator: any };
    
    class C {
        [Symbol.iterator]() { }
        ~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 ES5SymbolProperty7.ts:4:5: Add a return type to the method
        ~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
    }
    
    (new C)[Symbol.iterator]