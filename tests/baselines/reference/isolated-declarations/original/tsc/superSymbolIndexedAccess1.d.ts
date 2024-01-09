//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess1.ts] ////

//// [superSymbolIndexedAccess1.ts]
var symbol = Symbol.for('myThing');

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



//// [superSymbolIndexedAccess1.d.ts]
declare var symbol: invalid;
declare class Foo {
}
declare class Bar extends Foo {
}

/// [Errors] ////

superSymbolIndexedAccess1.ts(1,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
superSymbolIndexedAccess1.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
superSymbolIndexedAccess1.ts(10,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.


==== superSymbolIndexedAccess1.ts (3 errors) ====
    var symbol = Symbol.for('myThing');
                 ~~~~~~~~~~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 superSymbolIndexedAccess1.ts:1:5: Add a type annotation to the variable symbol.
    
    class Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
            return 0;
        }
    }
    
    class Bar extends Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
            return super[symbol]();
        }
    }