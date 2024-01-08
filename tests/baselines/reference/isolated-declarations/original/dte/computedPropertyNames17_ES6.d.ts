//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames17_ES6.ts] ////

//// [computedPropertyNames17_ES6.ts]
var b: boolean;
class C {
    get [b]() { return 0;}
    static set [true](v) { }
    get [[]]() { return 0; }
    set [{}](v) { }
    static get [undefined]() { return 0; }
    set [null](v) { }
}

/// [Declarations] ////



//// [computedPropertyNames17_ES6.d.ts]
declare var b: boolean;
declare class C {
    get [b](): invalid;
    static get [undefined](): invalid;
}

/// [Errors] ////

computedPropertyNames17_ES6.ts(3,9): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames17_ES6.ts(3,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames17_ES6.ts(4,16): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames17_ES6.ts(5,9): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames17_ES6.ts(6,9): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames17_ES6.ts(7,16): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames17_ES6.ts(7,16): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames17_ES6.ts(8,9): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.


==== computedPropertyNames17_ES6.ts (8 errors) ====
    var b: boolean;
    class C {
        get [b]() { return 0;}
            ~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
            ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames17_ES6.ts:3:9: Add a return type to the get accessor declaration.
        static set [true](v) { }
                   ~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        get [[]]() { return 0; }
            ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        set [{}](v) { }
            ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        static get [undefined]() { return 0; }
                   ~~~~~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
                   ~~~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 computedPropertyNames17_ES6.ts:7:16: Add a return type to the get accessor declaration.
        set [null](v) { }
            ~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
    }