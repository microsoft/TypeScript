//// [tests/cases/conformance/es6/destructuring/declarationWithNoInitializer.ts] ////

//// [declarationWithNoInitializer.ts]
var [a, b];          // Error, no initializer
var {c, d};          // Error, no initializer


/// [Declarations] ////



//// [declarationWithNoInitializer.d.ts]
declare var a: any, b: any;
declare var c: any, d: any;

/// [Errors] ////

declarationWithNoInitializer.ts(1,5): error TS1182: A destructuring declaration must have an initializer.
declarationWithNoInitializer.ts(2,5): error TS1182: A destructuring declaration must have an initializer.


==== declarationWithNoInitializer.ts (2 errors) ====
    var [a, b];          // Error, no initializer
        ~~~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
    var {c, d};          // Error, no initializer
        ~~~~~~
!!! error TS1182: A destructuring declaration must have an initializer.
    