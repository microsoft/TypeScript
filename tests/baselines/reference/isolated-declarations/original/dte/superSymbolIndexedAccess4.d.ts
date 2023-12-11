//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess4.ts] ////

//// [superSymbolIndexedAccess4.ts]
var symbol = Symbol.for('myThing');

class Bar {
    [symbol]() {
        return super[symbol]();
    }
}

/// [Declarations] ////



//// [superSymbolIndexedAccess4.d.ts]
declare var symbol: invalid;
declare class Bar {
    [symbol](): invalid;
}

/// [Errors] ////

superSymbolIndexedAccess4.ts(1,14): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
superSymbolIndexedAccess4.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
superSymbolIndexedAccess4.ts(5,16): error TS2335: 'super' can only be referenced in a derived class.


==== superSymbolIndexedAccess4.ts (3 errors) ====
    var symbol = Symbol.for('myThing');
                 ~~~~~~~~~~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 superSymbolIndexedAccess4.ts:1:5: Add a type annotation to the variable symbol
    
    class Bar {
        [symbol]() {
        ~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 superSymbolIndexedAccess4.ts:4:5: Add a return type to the method
            return super[symbol]();
                   ~~~~~
!!! error TS2335: 'super' can only be referenced in a derived class.
        }
    }