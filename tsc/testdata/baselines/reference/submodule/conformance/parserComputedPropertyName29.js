//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName29.ts] ////

//// [parserComputedPropertyName29.ts]
class C {
    // yes ASI
    [e] = id++
    [e2]: number
}

//// [parserComputedPropertyName29.js]
class C {
    [e] = id++;
    [e2];
}
