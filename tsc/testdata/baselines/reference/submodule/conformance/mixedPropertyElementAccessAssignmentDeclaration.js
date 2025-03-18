//// [tests/cases/conformance/salsa/mixedPropertyElementAccessAssignmentDeclaration.ts] ////

//// [mixedPropertyElementAccessAssignmentDeclaration.ts]
// Should not crash: #34642
var arr = [];
arr[0].prop[2] = {};


//// [mixedPropertyElementAccessAssignmentDeclaration.js]
var arr = [];
arr[0].prop[2] = {};
