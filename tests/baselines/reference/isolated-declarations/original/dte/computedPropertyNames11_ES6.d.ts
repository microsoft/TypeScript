//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames11_ES6.ts] ////

//// [computedPropertyNames11_ES6.ts]
var s: string;
var n: number;
var a: any;
var v = {
    get [s]() { return 0; },
    set [n](v) { },
    get [s + s]() { return 0; },
    set [s + n](v) { },
    get [+s]() { return 0; },
    set [""](v) { },
    get [0]() { return 0; },
    set [a](v) { },
    get [<any>true]() { return 0; },
    set [`hello bye`](v) { },
    get [`hello ${a} bye`]() { return 0; }
}

/// [Declarations] ////



//// [computedPropertyNames11_ES6.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare var v: invalid;

/// [Errors] ////

computedPropertyNames11_ES6.ts(5,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(6,13): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(7,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(7,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(8,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(8,17): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(9,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(9,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(10,14): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(11,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(12,13): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(13,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(13,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(14,23): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(15,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames11_ES6.ts(15,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.


==== computedPropertyNames11_ES6.ts (16 errors) ====
    var s: string;
    var n: number;
    var a: any;
    var v = {
        get [s]() { return 0; },
            ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames11_ES6.ts:5:9: Add a return type to the get accessor declaration.
        set [n](v) { },
                ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames11_ES6.ts:6:9: Add a type to parameter of the set accessor declaration.
        get [s + s]() { return 0; },
            ~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames11_ES6.ts:7:9: Add a return type to the get accessor declaration.
            ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames11_ES6.ts:4:5: Add a type annotation to the variable v.
        set [s + n](v) { },
            ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames11_ES6.ts:4:5: Add a type annotation to the variable v.
                    ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames11_ES6.ts:8:9: Add a type to parameter of the set accessor declaration.
        get [+s]() { return 0; },
            ~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames11_ES6.ts:9:9: Add a return type to the get accessor declaration.
            ~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames11_ES6.ts:4:5: Add a type annotation to the variable v.
        set [""](v) { },
                 ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames11_ES6.ts:10:9: Add a type to parameter of the set accessor declaration.
        get [0]() { return 0; },
            ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames11_ES6.ts:11:9: Add a return type to the get accessor declaration.
        set [a](v) { },
                ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames11_ES6.ts:12:9: Add a type to parameter of the set accessor declaration.
        get [<any>true]() { return 0; },
            ~~~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames11_ES6.ts:13:9: Add a return type to the get accessor declaration.
            ~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames11_ES6.ts:4:5: Add a type annotation to the variable v.
        set [`hello bye`](v) { },
                          ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 computedPropertyNames11_ES6.ts:14:9: Add a type to parameter of the set accessor declaration.
        get [`hello ${a} bye`]() { return 0; }
            ~~~~~~~~~~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames11_ES6.ts:15:9: Add a return type to the get accessor declaration.
            ~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames11_ES6.ts:4:5: Add a type annotation to the variable v.
    }