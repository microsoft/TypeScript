//// [tests/cases/conformance/es6/Symbols/symbolProperty53.ts] ////

//// [symbolProperty53.ts]
var obj = {
    [Symbol.for]: 0
};

obj[Symbol.for];

/// [Declarations] ////



//// [/.src/symbolProperty53.d.ts]
declare var obj: invalid;
/// [Errors] ////

symbolProperty53.ts(2,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
symbolProperty53.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
symbolProperty53.ts(5,5): error TS2538: Type '(key: string) => symbol' cannot be used as an index type.


==== symbolProperty53.ts (3 errors) ====
    var obj = {
        [Symbol.for]: 0
        ~~~~~~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    };
    
    obj[Symbol.for];
        ~~~~~~~~~~
!!! error TS2538: Type '(key: string) => symbol' cannot be used as an index type.