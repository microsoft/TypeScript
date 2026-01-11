//// [tests/cases/compiler/genericArrayAssignment1.ts] ////

//// [genericArrayAssignment1.ts]
declare var s: string[];
declare var n: number[];

s = n;

//// [genericArrayAssignment1.js]
s = n;
