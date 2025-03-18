//// [tests/cases/compiler/spreadIntersection.ts] ////

//// [spreadIntersection.ts]
var intersection: { a: number } & { b: string };

var o1: { a: number, b: string };
var o1 = { ...intersection };

var o2: { a: number, b: string, c: boolean };
var o2 = { ...intersection, c: false };

//// [spreadIntersection.js]
var intersection;
var o1;
var o1 = { ...intersection };
var o2;
var o2 = { ...intersection, c: false };
