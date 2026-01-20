//// [tests/cases/compiler/stringIndexerAssignments1.ts] ////

//// [stringIndexerAssignments1.ts]
var x: { [index: string]: string; one: string; };
declare var a: { one: string; };
declare var b: { one: number; two: string; };
x = a;
x = b; // error


//// [stringIndexerAssignments1.js]
var x;
x = a;
x = b; // error
