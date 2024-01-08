//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames10_ES6.ts] ////

//// [computedPropertyNames10_ES6.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s]() { },
    [n]() { },
    [s + s]() { },
    [s + n]() { },
    [+s]() { },
    [""]() { },
    [0]() { },
    [a]() { },
    [<any>true]() { },
    [`hello bye`]() { },
    [`hello ${a} bye`]() { }
}

/// [Declarations] ////



//// [computedPropertyNames10_ES6.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare var v: invalid;

/// [Errors] ////

computedPropertyNames10_ES6.ts(5,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(6,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(7,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(7,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(8,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(8,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(9,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(9,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(10,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(11,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(12,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(13,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(13,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(14,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(15,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames10_ES6.ts(15,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.


==== computedPropertyNames10_ES6.ts (16 errors) ====
    var s: string;
    var n: number;
    var a: any;
    var v = {
        [s]() { },
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:5:5: Add a return type to the method
        [n]() { },
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:6:5: Add a return type to the method
        [s + s]() { },
        ~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:7:5: Add a return type to the method
        ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
        [s + n]() { },
        ~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:8:5: Add a return type to the method
        ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
        [+s]() { },
        ~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:9:5: Add a return type to the method
        ~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
        [""]() { },
        ~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:10:5: Add a return type to the method
        [0]() { },
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:11:5: Add a return type to the method
        [a]() { },
        ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:12:5: Add a return type to the method
        [<any>true]() { },
        ~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:13:5: Add a return type to the method
        ~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
        [`hello bye`]() { },
        ~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:14:5: Add a return type to the method
        [`hello ${a} bye`]() { }
        ~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
!!! related TS9034 computedPropertyNames10_ES6.ts:15:5: Add a return type to the method
        ~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 computedPropertyNames10_ES6.ts:4:5: Add a type annotation to the variable v.
    }