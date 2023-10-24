//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames4_ES6.ts] ////

//// [computedPropertyNames4_ES6.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s]: 0,
    [n]: n,
    [s + s]: 1,
    [s + n]: 2,
    [+s]: s,
    [""]: 0,
    [0]: 0,
    [a]: 1,
    [<any>true]: 0,
    [`hello bye`]: 0,
    [`hello ${a} bye`]: 0
}

/// [Declarations] ////



//// [/.src/computedPropertyNames4_ES6.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare var v: invalid;
/// [Errors] ////

computedPropertyNames4_ES6.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames4_ES6.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames4_ES6.ts(7,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames4_ES6.ts(8,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames4_ES6.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames4_ES6.ts(12,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames4_ES6.ts(13,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames4_ES6.ts(15,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== computedPropertyNames4_ES6.ts (8 errors) ====
    var s: string;
    var n: number;
    var a: any;
    var v = {
        [s]: 0,
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [n]: n,
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [s + s]: 1,
        ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [s + n]: 2,
        ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [+s]: s,
        ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [""]: 0,
        [0]: 0,
        [a]: 1,
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [<any>true]: 0,
        ~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [`hello bye`]: 0,
        [`hello ${a} bye`]: 0
        ~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }