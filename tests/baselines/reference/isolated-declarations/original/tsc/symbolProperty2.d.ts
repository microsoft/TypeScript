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

symbolProperty2.ts(1,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
symbolProperty2.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
symbolProperty2.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
symbolProperty2.ts(5,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== symbolProperty2.ts (4 errors) ====
    var s = Symbol();
            ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    var x = {
        [s]: 0,
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [s]() { },
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        get [s]() {
            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            return 0;
        }
    }