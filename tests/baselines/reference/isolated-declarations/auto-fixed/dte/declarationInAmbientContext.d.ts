//// [tests/cases/conformance/es6/destructuring/declarationInAmbientContext.ts] ////

//// [declarationInAmbientContext.ts]
declare var [a, b];  // Error, destructuring declaration not allowed in ambient context
declare var {c, d};  // Error, destructuring declaration not allowed in ambient context


/// [Declarations] ////



//// [/.src/declarationInAmbientContext.d.ts]
declare var a: invalid, b: invalid;
declare var c: invalid, d: invalid;
/// [Errors] ////

declarationInAmbientContext.ts(1,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationInAmbientContext.ts(1,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationInAmbientContext.ts(2,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationInAmbientContext.ts(2,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== declarationInAmbientContext.ts (4 errors) ====
    declare var [a, b];  // Error, destructuring declaration not allowed in ambient context
                 ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    declare var {c, d};  // Error, destructuring declaration not allowed in ambient context
                 ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    