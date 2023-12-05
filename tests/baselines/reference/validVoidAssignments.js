//// [tests/cases/conformance/types/primitives/void/validVoidAssignments.ts] ////

//// [validVoidAssignments.ts]
var x: void;
var y: any;
var z: void;
y = x;
x = y;
x = z;

//// [validVoidAssignments.js]
var x;
var y;
var z;
y = x;
x = y;
x = z;
