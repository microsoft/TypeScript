//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName6.ts] ////

//// [parserComputedPropertyName6.ts]
var v = { [e]: 1, [e + e]: 2 };

//// [parserComputedPropertyName6.js]
var v = { [e]: 1, [e + e]: 2 };
