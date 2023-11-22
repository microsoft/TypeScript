//// [tests/cases/compiler/genericAssignmentCompatOfFunctionSignatures1.ts] ////

//// [genericAssignmentCompatOfFunctionSignatures1.ts]
var x1 = function foo3<T, U extends { a: T; b: string }>(x: T, z: U) { }
var x2 = function foo3<T, U extends { a: T; b: number }>(x: T, z: U) { }

x1 = x2;
x2 = x1;

//// [genericAssignmentCompatOfFunctionSignatures1.js]
var x1 = function foo3(x, z) { };
var x2 = function foo3(x, z) { };
x1 = x2;
x2 = x1;
