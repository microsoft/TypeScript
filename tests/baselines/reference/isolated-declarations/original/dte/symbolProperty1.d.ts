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



//// [/.src/symbolProperty1.d.ts]
declare var s: symbol;
declare var x: invalid;
/// [Errors] ////

symbolProperty1.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
symbolProperty1.ts(5,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== symbolProperty1.ts (2 errors) ====
    var s: symbol;
    var x = {
        [s]: 0,
        [s]() { },
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        get [s]() {
            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            return 0;
        }
    }