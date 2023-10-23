//// [tests/cases/conformance/es6/Symbols/symbolProperty52.ts] ////

//// [symbolProperty52.ts]
var obj = {
    [Symbol.nonsense]: 0
};

obj = {};

obj[Symbol.nonsense];

/// [Declarations] ////



//// [/.src/symbolProperty52.d.ts]
declare var obj: invalid;
/// [Errors] ////

symbolProperty52.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== symbolProperty52.ts (1 errors) ====
    var obj = {
        [Symbol.nonsense]: 0
        ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    };
    
    obj = {};
    
    obj[Symbol.nonsense];