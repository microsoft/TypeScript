//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName37.ts] ////

//// [parserComputedPropertyName37.ts]
var v = {
    [public]: 0
};

/// [Declarations] ////



//// [/.src/parserComputedPropertyName37.d.ts]
declare var v: invalid;
/// [Errors] ////

parserComputedPropertyName37.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName37.ts(2,6): error TS2304: Cannot find name 'public'.


==== parserComputedPropertyName37.ts (2 errors) ====
    var v = {
        [public]: 0
        ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~~~~~~
!!! error TS2304: Cannot find name 'public'.
    };