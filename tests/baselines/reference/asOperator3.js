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
var a = "" + (123 + 456);
var b = "leading " + (123 + 456);
var c = 123 + 456 + " trailing";
var d = "Hello " + 123 + " World";
var e = "Hello";
var f = 1 + (1 + " end of string");
var g = (_a = ["Hello ", " World"], _a.raw = ["Hello ", " World"], tag(_a, 123));
var h = (_b = ["Hello"], _b.raw = ["Hello"], tag(_b));
var _a, _b;
