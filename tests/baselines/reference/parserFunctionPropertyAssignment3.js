//// [tests/cases/conformance/parser/ecmascript5/PropertyAssignments/parserFunctionPropertyAssignment3.ts] ////

//// [parserFunctionPropertyAssignment3.ts]
var v = { "foo"() { } };

//// [parserFunctionPropertyAssignment3.js]
var v = { "foo": function () { } };
