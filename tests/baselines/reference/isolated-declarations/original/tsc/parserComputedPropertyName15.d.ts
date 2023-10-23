//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName15.ts] ////

//// [parserComputedPropertyName15.ts]
var v: { [e: number]: string; [e]: number };

/// [Declarations] ////



//// [/.src/parserComputedPropertyName15.d.ts]
declare var v: {
    [e: number]: string;
};
