//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess3.ts] ////

//// [superSymbolIndexedAccess3.ts]
var symbol = Symbol.for('myThing');

class Foo {
    [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    [symbol]() {
        return super[Bar]();
    }
}

/// [Declarations] ////



//// [superSymbolIndexedAccess3.d.ts]
declare var symbol: invalid;
declare class Foo {
    [symbol](): invalid;
}
declare class Bar extends Foo {
    [symbol](): invalid;
}

/// [Errors] ////

superSymbolIndexedAccess3.ts(1,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
superSymbolIndexedAccess3.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
superSymbolIndexedAccess3.ts(10,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
superSymbolIndexedAccess3.ts(11,22): error TS2538: Type 'typeof Bar' cannot be used as an index type.


==== superSymbolIndexedAccess3.ts (4 errors) ====
    var symbol = Symbol.for('myThing');
                 ~~~~~~~~~~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 superSymbolIndexedAccess3.ts:1:5: Add a type annotation to the variable symbol
    
    class Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 superSymbolIndexedAccess3.ts:4:5: Add a return type to the method
            return 0;
        }
    }
    
    class Bar extends Foo {
        [symbol]() {
        ~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 superSymbolIndexedAccess3.ts:10:5: Add a return type to the method
            return super[Bar]();
                         ~~~
!!! error TS2538: Type 'typeof Bar' cannot be used as an index type.
        }
    }