//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames10_ES5.ts] ////

//// [computedPropertyNames10_ES5.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s](): void { },
    [n](): void { },
    [s + s](): void { },
    [s + n](): void { },
    [+s](): void { },
    [""](): void { },
    [0](): void { },
    [a](): void { },
    [<any>true](): void { },
    [`hello bye`](): void { },
    [`hello ${a} bye`](): void { }
}

/// [Declarations] ////



//// [/.src/computedPropertyNames10_ES5.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare var v: invalid;
/// [Errors] ////

computedPropertyNames10_ES5.ts(7,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames10_ES5.ts(8,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames10_ES5.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames10_ES5.ts(13,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames10_ES5.ts(15,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== computedPropertyNames10_ES5.ts (5 errors) ====
    var s: string;
    var n: number;
    var a: any;
    var v = {
        [s](): void { },
        [n](): void { },
        [s + s](): void { },
        ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [s + n](): void { },
        ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [+s](): void { },
        ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [""](): void { },
        [0](): void { },
        [a](): void { },
        [<any>true](): void { },
        ~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [`hello bye`](): void { },
        [`hello ${a} bye`](): void { }
        ~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }