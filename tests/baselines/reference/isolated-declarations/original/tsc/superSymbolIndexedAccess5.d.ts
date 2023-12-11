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
    [symbol](): invalid;
}
declare class Bar extends Foo {
    [symbol](): invalid;
}

/// [Errors] ////

superSymbolIndexedAccess5.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
superSymbolIndexedAccess5.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
superSymbolIndexedAccess5.ts(10,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
superSymbolIndexedAccess5.ts(10,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== superSymbolIndexedAccess5.ts (4 errors) ====
    var symbol: any;
    
    class Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 superSymbolIndexedAccess5.ts:4:5: Add a return type to the method
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
            return 0;
        }
    }
    
    class Bar extends Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 superSymbolIndexedAccess5.ts:10:5: Add a return type to the method
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
            return super[symbol]();
        }
    }