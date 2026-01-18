//// [tests/cases/compiler/assignmentCompat1.ts] ////

//// [assignmentCompat1.ts]
var x = { one: 1 };
declare var y: { [index: string]: any };
declare var z: { [index: number]: any };
x = y;  // Error
y = x;  // Ok because index signature type is any
x = z;  // Error
z = x;  // Ok because index signature type is any
y = "foo"; // Error
z = "foo"; // OK, string has numeric indexer
z = false; // Error



//// [assignmentCompat1.js]
var x = { one: 1 };
x = y; // Error
y = x; // Ok because index signature type is any
x = z; // Error
z = x; // Ok because index signature type is any
y = "foo"; // Error
z = "foo"; // OK, string has numeric indexer
z = false; // Error
