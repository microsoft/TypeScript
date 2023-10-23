//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName20.ts] ////

//// [parserComputedPropertyName20.ts]
interface I {
    [e](): number 
}

/// [Declarations] ////



//// [/.src/parserComputedPropertyName20.d.ts]
interface I {
    [e](): number;
}
