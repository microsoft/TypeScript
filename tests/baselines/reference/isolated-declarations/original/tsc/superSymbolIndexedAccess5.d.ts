//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess5.ts] ////

//// [superSymbolIndexedAccess5.ts]
var symbol: any;

class Foo {
    [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    [symbol]() {
        return super[symbol]();
    }
}

/// [Declarations] ////



//// [superSymbolIndexedAccess5.d.ts]
declare var symbol: any;
declare class Foo {
}
declare class Bar extends Foo {
}

/// [Errors] ////

superSymbolIndexedAccess5.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
superSymbolIndexedAccess5.ts(10,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== superSymbolIndexedAccess5.ts (2 errors) ====
    var symbol: any;
    
    class Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
            return 0;
        }
    }
    
    class Bar extends Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
            return super[symbol]();
        }
    }