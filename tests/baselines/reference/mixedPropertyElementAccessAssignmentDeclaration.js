//// [mixedPropertyElementAccessAssignmentDeclaration.ts]
// Should not crash: #34642
var arr = [];
arr[0].prop[2] = {};


//// [mixedPropertyElementAccessAssignmentDeclaration.js]
// Should not crash: #34642
var arr = [];
arr[0].prop[2] = {};
