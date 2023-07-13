//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName31.ts] ////

//// [parserComputedPropertyName31.ts]
class C {
    // yes ASI
    [e]: number
    [e2]: number
}

//// [parserComputedPropertyName31.js]
class C {
}
