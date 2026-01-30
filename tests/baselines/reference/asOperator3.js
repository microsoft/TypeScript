//// [tests/cases/conformance/expressions/asOperator/asOperator3.ts] ////

//// [asOperator3.ts]
declare function tag(...x: any[]): any;

var a = `${123 + 456 as number}`;
var b = `leading ${123 + 456 as number}`;
var c = `${123 + 456 as number} trailing`;
var d = `Hello ${123} World` as string;
var e = `Hello` as string;
var f = 1 + `${1} end of string` as string;
var g = tag `Hello ${123} World` as string;
var h = tag `Hello` as string;

//// [asOperator3.js]
var a = `${123 + 456}`;
var b = `leading ${123 + 456}`;
var c = `${123 + 456} trailing`;
var d = `Hello ${123} World`;
var e = `Hello`;
var f = 1 + `${1} end of string`;
var g = tag `Hello ${123} World`;
var h = tag `Hello`;
