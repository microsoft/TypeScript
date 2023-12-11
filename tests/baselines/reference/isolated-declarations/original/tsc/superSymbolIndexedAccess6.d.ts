//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess6.ts] ////

//// [superSymbolIndexedAccess6.ts]
var symbol: any;

class Foo {
    static [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    static [symbol]() {
        return super[symbol]();
    }
}

/// [Declarations] ////



//// [superSymbolIndexedAccess6.d.ts]
declare var symbol: any;
declare class Foo {
}
declare class Bar extends Foo {
}

/// [Errors] ////

superSymbolIndexedAccess6.ts(4,12): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
superSymbolIndexedAccess6.ts(10,12): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== superSymbolIndexedAccess6.ts (2 errors) ====
    var symbol: any;
    
    class Foo {
        static [symbol]() {
               ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
            return 0;
        }
    }
    
    class Bar extends Foo {
        static [symbol]() {
               ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
            return super[symbol]();
        }
    }