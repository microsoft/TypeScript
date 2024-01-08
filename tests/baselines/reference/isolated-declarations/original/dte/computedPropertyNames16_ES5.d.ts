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

computedPropertyNames16_ES5.ts(5,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames16_ES5.ts(6,13): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames16_ES5.ts(10,21): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames16_ES5.ts(11,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames16_ES5.ts(12,13): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames16_ES5.ts(14,23): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.


==== computedPropertyNames16_ES5.ts (6 errors) ====
    var s: string;
    var n: number;
    var a: any;
    class C {
        get [s]() { return 0;}
            ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames16_ES5.ts:5:9: Add a return type to the get accessor declaration.
        set [n](v) { }
                ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames16_ES5.ts:6:9: Add a type to parameter of the set accessor declaration.
        static get [s + s]() { return 0; }
        set [s + n](v) { }
        get [+s]() { return 0; }
        static set [""](v) { }
                        ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames16_ES5.ts:10:16: Add a type to parameter of the set accessor declaration.
        get [0]() { return 0; }
            ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames16_ES5.ts:11:9: Add a return type to the get accessor declaration.
        set [a](v) { }
                ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames16_ES5.ts:12:9: Add a type to parameter of the set accessor declaration.
        static get [<any>true]() { return 0; }
        set [`hello bye`](v) { }
                          ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames16_ES5.ts:14:9: Add a type to parameter of the set accessor declaration.
        get [`hello ${a} bye`]() { return 0; }
    }