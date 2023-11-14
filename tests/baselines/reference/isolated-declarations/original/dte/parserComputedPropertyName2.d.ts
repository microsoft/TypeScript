//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName2.ts] ////

//// [parserComputedPropertyName2.ts]
var v = { [e]: 1 };

/// [Declarations] ////



//// [parserComputedPropertyName2.d.ts]
declare var v: {
    [e]: number;
};

/// [Errors] ////

parserComputedPropertyName2.ts(1,12): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName2.ts (1 errors) ====
    var v = { [e]: 1 };
               ~
!!! error TS2304: Cannot find name 'e'.