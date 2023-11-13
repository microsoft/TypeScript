//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames12_ES6.ts] ////

//// [computedPropertyNames12_ES6.ts]
var s: string;
var n: number;
var a: any;
class C {
    [s]: number;
    [n] = n;
    static [s + s]: string;
    [s + n] = 2;
    [+s]: typeof s;
    static [""]: number;
    [0]: number;
    [a]: number;
    static [<any>true]: number;
    [`hello bye`] = 0;
    static [`hello ${a} bye`] = 0
}

/// [Declarations] ////



//// [computedPropertyNames12_ES6.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    [s]: number;
    [n]: invalid;
    static [""]: number;
    [0]: number;
    [a]: number;
    [`hello bye`]: number;
}
/// [Errors] ////

computedPropertyNames12_ES6.ts(5,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES6.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames12_ES6.ts(6,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES6.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames12_ES6.ts(6,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames12_ES6.ts(7,12): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES6.ts(8,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES6.ts(9,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES6.ts(12,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES6.ts(12,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames12_ES6.ts(13,12): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES6.ts(15,12): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.


==== computedPropertyNames12_ES6.ts (12 errors) ====
    var s: string;
    var n: number;
    var a: any;
    class C {
        [s]: number;
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [n] = n;
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
              ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static [s + s]: string;
               ~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        [s + n] = 2;
        ~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        [+s]: typeof s;
        ~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        static [""]: number;
        [0]: number;
        [a]: number;
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static [<any>true]: number;
               ~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        [`hello bye`] = 0;
        static [`hello ${a} bye`] = 0
               ~~~~~~~~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
    }