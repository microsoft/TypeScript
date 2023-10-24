//// [tests/cases/conformance/es6/Symbols/symbolProperty54.ts] ////

//// [symbolProperty54.ts]
var obj = {
    [Symbol.prototype]: 0
};

/// [Declarations] ////



//// [/.src/symbolProperty54.d.ts]
declare var obj: {
    [Symbol.prototype]: number;
};
/// [Errors] ////

symbolProperty54.ts(2,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.


==== symbolProperty54.ts (1 errors) ====
    var obj = {
        [Symbol.prototype]: 0
        ~~~~~~~~~~~~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
    };