//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames14_ES6.ts] ////

//// [computedPropertyNames14_ES6.ts]
var b: boolean;
class C {
    [b]() {}
    static [true]() { }
    [[]]() { }
    static [{}]() { }
    [undefined]() { }
    static [null]() { }
}

/// [Declarations] ////



//// [computedPropertyNames14_ES6.d.ts]
declare var b: boolean;
declare class C {
}

/// [Errors] ////

computedPropertyNames14_ES6.ts(3,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames14_ES6.ts(3,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames14_ES6.ts(4,12): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames14_ES6.ts(5,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames14_ES6.ts(6,12): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames14_ES6.ts(7,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames14_ES6.ts(7,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames14_ES6.ts(8,12): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.


==== computedPropertyNames14_ES6.ts (8 errors) ====
    var b: boolean;
    class C {
        [b]() {}
        ~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        static [true]() { }
               ~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        [[]]() { }
        ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        static [{}]() { }
               ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        [undefined]() { }
        ~~~~~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        ~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        static [null]() { }
               ~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
    }