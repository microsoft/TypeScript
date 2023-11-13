//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames16_ES5.ts] ////

//// [computedPropertyNames16_ES5.ts]
var s: string;
var n: number;
var a: any;
class C {
    get [s]() { return 0;}
    set [n](v) { }
    static get [s + s]() { return 0; }
    set [s + n](v) { }
    get [+s]() { return 0; }
    static set [""](v) { }
    get [0]() { return 0; }
    set [a](v) { }
    static get [<any>true]() { return 0; }
    set [`hello bye`](v) { }
    get [`hello ${a} bye`]() { return 0; }
}

/// [Declarations] ////



//// [computedPropertyNames16_ES5.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    get [s](): invalid;
    set [n](v: invalid);
    static set [""](v: invalid);
    get [0](): invalid;
    set [a](v: invalid);
    set [`hello bye`](v: invalid);
}
/// [Errors] ////

computedPropertyNames16_ES5.ts(5,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames16_ES5.ts(6,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames16_ES5.ts(6,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames16_ES5.ts(10,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames16_ES5.ts(11,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames16_ES5.ts(12,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames16_ES5.ts(12,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames16_ES5.ts(14,23): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== computedPropertyNames16_ES5.ts (8 errors) ====
    var s: string;
    var n: number;
    var a: any;
    class C {
        get [s]() { return 0;}
            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        set [n](v) { }
            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static get [s + s]() { return 0; }
        set [s + n](v) { }
        get [+s]() { return 0; }
        static set [""](v) { }
                        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        get [0]() { return 0; }
            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        set [a](v) { }
            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static get [<any>true]() { return 0; }
        set [`hello bye`](v) { }
                          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        get [`hello ${a} bye`]() { return 0; }
    }