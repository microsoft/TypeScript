//// [tests/cases/conformance/parser/ecmascript5/PropertyAssignments/parserFunctionPropertyAssignment2.ts] ////

//// [parserFunctionPropertyAssignment2.ts]
var v = { 0() { } };

//// [parserFunctionPropertyAssignment2.js]
var v = { 0: function () { } };
