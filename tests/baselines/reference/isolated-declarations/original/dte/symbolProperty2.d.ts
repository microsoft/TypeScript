//// [tests/cases/conformance/es6/Symbols/symbolProperty2.ts] ////

//// [symbolProperty2.ts]
var s = Symbol();
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
}

/// [Declarations] ////



//// [symbolProperty2.d.ts]
declare var s: invalid;
declare var x: invalid;

/// [Errors] ////

symbolProperty2.ts(1,9): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
symbolProperty2.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
symbolProperty2.ts(5,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.


==== symbolProperty2.ts (3 errors) ====
    var s = Symbol();
            ~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 symbolProperty2.ts:1:5: Add a type annotation to the variable s.
    var x = {
        [s]: 0,
        [s]() { },
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 symbolProperty2.ts:2:5: Add a type annotation to the variable x.
!!! related TS9034 symbolProperty2.ts:4:5: Add a return type to the method
        get [s]() {
            ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 symbolProperty2.ts:5:9: Add a return type to the get accessor declaration.
            return 0;
        }
    }