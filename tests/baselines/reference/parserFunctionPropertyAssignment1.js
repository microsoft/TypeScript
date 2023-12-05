//// [tests/cases/conformance/parser/ecmascript5/PropertyAssignments/parserFunctionPropertyAssignment1.ts] ////

//// [parserFunctionPropertyAssignment1.ts]
var v = { foo() { } };

//// [parserFunctionPropertyAssignment1.js]
var v = { foo: function () { } };
