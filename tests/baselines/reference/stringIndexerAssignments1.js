//// [tests/cases/compiler/stringIndexerAssignments1.ts] ////

//// [stringIndexerAssignments1.ts]
var x: { [index: string]: string; one: string; };
var a: { one: string; };
var b: { one: number; two: string; };
x = a;
x = b; // error


//// [stringIndexerAssignments1.js]
var x;
var a;
var b;
x = a;
x = b; // error
