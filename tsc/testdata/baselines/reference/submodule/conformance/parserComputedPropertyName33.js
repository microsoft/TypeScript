//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName33.ts] ////

//// [parserComputedPropertyName33.ts]
class C {
    // No ASI
    [e] = 0
    [e2]() { }
}

//// [parserComputedPropertyName33.js]
class C {
    // No ASI
    [e] = 0[e2]();
}
{ }
