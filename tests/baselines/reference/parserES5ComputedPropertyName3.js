//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName3.ts] ////

//// [parserES5ComputedPropertyName3.ts]
var v = { [e]() { } };

//// [parserES5ComputedPropertyName3.js]
var _a;
var v = (_a = {}, _a[e] = function () { }, _a);
