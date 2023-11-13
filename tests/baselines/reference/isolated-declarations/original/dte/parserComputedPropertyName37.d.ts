//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName37.ts] ////

//// [parserComputedPropertyName37.ts]
var v = {
    [public]: 0
};

/// [Declarations] ////



//// [parserComputedPropertyName37.d.ts]
declare var v: {
    [public]: number;
};
/// [Errors] ////

parserComputedPropertyName37.ts(2,6): error TS2304: Cannot find name 'public'.


==== parserComputedPropertyName37.ts (1 errors) ====
    var v = {
        [public]: 0
         ~~~~~~
!!! error TS2304: Cannot find name 'public'.
    };