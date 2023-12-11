//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames4_ES5.ts] ////

//// [computedPropertyNames4_ES5.ts]
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



//// [computedPropertyNames4_ES5.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare var v: invalid;

/// [Errors] ////

computedPropertyNames4_ES5.ts(5,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames4_ES5.ts(6,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames4_ES5.ts(6,10): error TS9013: Expression type can't be inferred with --isolatedDeclarations
computedPropertyNames4_ES5.ts(7,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames4_ES5.ts(8,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames4_ES5.ts(9,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames4_ES5.ts(9,11): error TS9013: Expression type can't be inferred with --isolatedDeclarations
computedPropertyNames4_ES5.ts(12,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames4_ES5.ts(13,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames4_ES5.ts(15,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== computedPropertyNames4_ES5.ts (10 errors) ====
    var s: string;
    var n: number;
    var a: any;
    var v = {
        [s]: 0,
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
        [n]: n,
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
             ~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
!!! related TS9035 computedPropertyNames4_ES5.ts:6:10: Add a type assertion to this expression to make type type explicit
        [s + s]: 1,
        ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
        [s + n]: 2,
        ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
        [+s]: s,
        ~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
              ~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
!!! related TS9035 computedPropertyNames4_ES5.ts:9:11: Add a type assertion to this expression to make type type explicit
        [""]: 0,
        [0]: 0,
        [a]: 1,
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
        [<any>true]: 0,
        ~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
        [`hello bye`]: 0,
        [`hello ${a} bye`]: 0
        ~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 computedPropertyNames4_ES5.ts:4:5: Add a type annotation to the variable v
    }