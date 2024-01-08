//// [tests/cases/conformance/es6/Symbols/symbolProperty1.ts] ////

//// [symbolProperty1.ts]
var s: symbol;
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
}

/// [Declarations] ////



//// [symbolProperty1.d.ts]
declare var s: symbol;
declare var x: invalid;

/// [Errors] ////

symbolProperty1.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
symbolProperty1.ts(5,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.


==== symbolProperty1.ts (2 errors) ====
    var s: symbol;
    var x = {
        [s]: 0,
        [s]() { },
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 symbolProperty1.ts:2:5: Add a type annotation to the variable x.
!!! related TS9034 symbolProperty1.ts:4:5: Add a return type to the method
        get [s]() {
            ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 symbolProperty1.ts:5:9: Add a return type to the get accessor declaration.
            return 0;
        }
    }