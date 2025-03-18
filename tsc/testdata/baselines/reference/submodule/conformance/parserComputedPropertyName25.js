//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName25.ts] ////

//// [parserComputedPropertyName25.ts]
class C {
    // No ASI
    [e] = 0
    [e2] = 1
}

//// [parserComputedPropertyName25.js]
class C {
    [e] = 0[e2] = 1;
}
