//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames12_ES5.ts] ////

//// [computedPropertyNames12_ES5.ts]
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



//// [computedPropertyNames12_ES5.d.ts]
declare var s: string;
declare var n: number;
declare var a: any;
declare class C {
    static [""]: number;
    [0]: number;
    [`hello bye`]: number;
}

/// [Errors] ////

computedPropertyNames12_ES5.ts(5,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES5.ts(5,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames12_ES5.ts(6,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES5.ts(6,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames12_ES5.ts(7,12): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES5.ts(8,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES5.ts(9,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES5.ts(12,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES5.ts(12,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames12_ES5.ts(13,12): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
computedPropertyNames12_ES5.ts(15,12): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.


==== computedPropertyNames12_ES5.ts (11 errors) ====
    var s: string;
    var n: number;
    var a: any;
    class C {
        [s]: number;
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        [n] = n;
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
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
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        static [<any>true]: number;
               ~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        [`hello bye`] = 0;
        static [`hello ${a} bye`] = 0
               ~~~~~~~~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
    }