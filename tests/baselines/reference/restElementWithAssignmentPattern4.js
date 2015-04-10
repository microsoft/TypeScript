//// [restElementWithAssignmentPattern4.ts]
var a: string, b: number;
var tuple: [string, number] = ["", 1];
[...{ 0: a = "", b }] = tuple;

//// [restElementWithAssignmentPattern4.js]
var a, b;
var tuple = ["", 1];
{ 0: a = "", b: b } = tuple.slice(0);
