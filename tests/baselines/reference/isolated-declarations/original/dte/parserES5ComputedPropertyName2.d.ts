//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName2.ts] ////

//// [parserES5ComputedPropertyName2.ts]
var v = { [e]: 1 };

/// [Declarations] ////



//// [/.src/parserES5ComputedPropertyName2.d.ts]
declare var v: {
    [e]: number;
};
