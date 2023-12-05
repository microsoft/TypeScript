//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName5.ts] ////

//// [parserComputedPropertyName5.ts]
var v = { public get [e]() { } };

//// [parserComputedPropertyName5.js]
var v = { get [e]() { } };
