//// [tests/cases/compiler/chainedAssignment2.ts] ////

//// [chainedAssignment2.ts]
var a: string;
var b: number;
var c: boolean;
var d: Date;
var e: RegExp;

a = b = c = d = e = null;



//// [chainedAssignment2.js]
var a;
var b;
var c;
var d;
var e;
a = b = c = d = e = null;
