//// [tests/cases/conformance/types/intersection/intersectionTypeAssignment.ts] ////

//// [intersectionTypeAssignment.ts]
var a: { a: string };
var b: { b: string };
var x: { a: string, b: string };
var y: { a: string } & { b: string };

a = x;
a = y;
x = a;  // Error
y = a;  // Error

b = x;
b = y;
x = b;  // Error
y = b;  // Error

x = y;
y = x;


//// [intersectionTypeAssignment.js]
var a;
var b;
var x;
var y;
a = x;
a = y;
x = a; // Error
y = a; // Error
b = x;
b = y;
x = b; // Error
y = b; // Error
x = y;
y = x;
