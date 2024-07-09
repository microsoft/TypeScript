//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName40.ts] ////

//// [parserComputedPropertyName40.ts]
class C {
    [a ? "" : ""]() {}
}

//// [parserComputedPropertyName40.js]
class C {
    [a ? "" : ""]() { }
}
