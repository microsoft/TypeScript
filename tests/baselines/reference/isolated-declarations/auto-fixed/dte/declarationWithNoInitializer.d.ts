//// [tests/cases/conformance/es6/destructuring/declarationWithNoInitializer.ts] ////

//// [declarationWithNoInitializer.ts]
var [a, b];          // Error, no initializer
var {c, d};          // Error, no initializer


/// [Declarations] ////



//// [declarationWithNoInitializer.d.ts]
declare var a: invalid, b: invalid;
declare var c: invalid, d: invalid;

/// [Errors] ////

declarationWithNoInitializer.ts(1,5): error TS1182: A destructuring declaration must have an initializer.
declarationWithNoInitializer.ts(1,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationWithNoInitializer.ts(1,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationWithNoInitializer.ts(2,5): error TS1182: A destructuring declaration must have an initializer.
declarationWithNoInitializer.ts(2,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationWithNoInitializer.ts(2,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== declarationWithNoInitializer.ts (6 errors) ====
    var [a, b];          // Error, no initializer
        ~~~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
         ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    var {c, d};          // Error, no initializer
        ~~~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
         ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    