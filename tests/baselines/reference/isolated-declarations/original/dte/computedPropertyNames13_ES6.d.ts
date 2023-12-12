//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames13_ES6.ts] ////

//// [computedPropertyNames13_ES6.ts]
var s: string;
var n: number;
var a: any;
class C {
    [s]() {}
    [n]() { }
    static [s + s]() { }
    [s + n]() { }
    [+s]() { }
    static [""]() { }
    [0]() { }
    [a]() { }
    static [<any>true]() { }
    [`hello bye`]() { }
    static [`hello ${a} bye`]() { }
}

/// [Declarations] ////



//// [computedPropertyNames13_ES6.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    [s](): invalid;
    [n](): invalid;
    static [""](): invalid;
    [0](): invalid;
    [a](): invalid;
    [`hello bye`](): invalid;
}

/// [Errors] ////

computedPropertyNames13_ES6.ts(5,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames13_ES6.ts(6,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames13_ES6.ts(10,12): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames13_ES6.ts(11,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames13_ES6.ts(12,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames13_ES6.ts(14,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.


==== computedPropertyNames13_ES6.ts (6 errors) ====
    var s: string;
    var n: number;
    var a: any;
    class C {
        [s]() {}
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames13_ES6.ts:5:5: Add a return type to the method
        [n]() { }
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames13_ES6.ts:6:5: Add a return type to the method
        static [s + s]() { }
        [s + n]() { }
        [+s]() { }
        static [""]() { }
               ~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames13_ES6.ts:10:12: Add a return type to the method
        [0]() { }
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames13_ES6.ts:11:5: Add a return type to the method
        [a]() { }
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames13_ES6.ts:12:5: Add a return type to the method
        static [<any>true]() { }
        [`hello bye`]() { }
        ~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames13_ES6.ts:14:5: Add a return type to the method
        static [`hello ${a} bye`]() { }
    }