//// [tests/cases/conformance/es6/Symbols/symbolProperty54.ts] ////

//// [symbolProperty54.ts]
var obj = {
    [Symbol.prototype]: 0
};

/// [Declarations] ////



//// [/.src/symbolProperty54.d.ts]
declare var obj: invalid;
/// [Errors] ////

symbolProperty54.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== symbolProperty54.ts (1 errors) ====
    var obj = {
        [Symbol.prototype]: 0
        ~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    };