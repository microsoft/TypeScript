//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName2.ts] ////

//// [parserComputedPropertyName2.ts]
var v = { [e]: 1 };

/// [Declarations] ////



//// [/.src/parserComputedPropertyName2.d.ts]
declare var v: {
    [e]: number;
};
