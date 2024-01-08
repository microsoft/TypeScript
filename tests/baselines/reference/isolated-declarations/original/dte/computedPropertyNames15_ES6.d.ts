//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames15_ES6.ts] ////

//// [computedPropertyNames15_ES6.ts]
var p1: number | string;
var p2: number | number[];
var p3: string | boolean;
class C {
    [p1]() { }
    [p2]() { }
    [p3]() { }
}

/// [Declarations] ////



//// [computedPropertyNames15_ES6.d.ts]
declare var p1: number | string;
declare var p2: number | number[];
declare var p3: string | boolean;
declare class C {
    [p1](): invalid;
    [p2](): invalid;
    [p3](): invalid;
}

/// [Errors] ////

computedPropertyNames15_ES6.ts(5,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames15_ES6.ts(6,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames15_ES6.ts(6,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNames15_ES6.ts(7,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames15_ES6.ts(7,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.


==== computedPropertyNames15_ES6.ts (5 errors) ====
    var p1: number | string;
    var p2: number | number[];
    var p3: string | boolean;
    class C {
        [p1]() { }
        ~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames15_ES6.ts:5:5: Add a return type to the method
        [p2]() { }
        ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        ~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames15_ES6.ts:6:5: Add a return type to the method
        [p3]() { }
        ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        ~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNames15_ES6.ts:7:5: Add a return type to the method
    }