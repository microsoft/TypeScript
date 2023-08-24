//// [tests/cases/compiler/contextualTypeAny.ts] ////

//// [contextualTypeAny.ts]
var x: any;

var obj: { [s: string]: number } = { p: "", q: x };

var arr: number[] = ["", x];

//// [contextualTypeAny.js]
var x;
var obj = { p: "", q: x };
var arr = ["", x];
