//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames6_ES6.ts] ////

//// [computedPropertyNames6_ES6.ts]
var p1: number | string;
var p2: number | number[];
var p3: string | boolean;
var v = {
    [p1]: 0,
    [p2]: 1,
    [p3]: 2
}

/// [Declarations] ////



//// [computedPropertyNames6_ES6.d.ts]
declare var p1: number | string;
declare var p2: number | number[];
declare var p3: string | boolean;
declare var v: {
    [p1]: number;
    [p2]: number;
    [p3]: number;
};

/// [Errors] ////

computedPropertyNames6_ES6.ts(6,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
computedPropertyNames6_ES6.ts(7,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.


==== computedPropertyNames6_ES6.ts (2 errors) ====
    var p1: number | string;
    var p2: number | number[];
    var p3: string | boolean;
    var v = {
        [p1]: 0,
        [p2]: 1,
        ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        [p3]: 2
        ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
    }