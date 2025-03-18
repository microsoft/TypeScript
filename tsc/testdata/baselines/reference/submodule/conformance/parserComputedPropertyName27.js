//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName27.ts] ////

//// [parserComputedPropertyName27.ts]
class C {
    // No ASI
    [e]: number = 0
    [e2]: number
}

//// [parserComputedPropertyName27.js]
class C {
    [e] = 0[e2];
    number;
}
