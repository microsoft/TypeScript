//// [tests/cases/compiler/anyPlusAny1.ts] ////

//// [anyPlusAny1.ts]
var x: any;
x.name = "hello";
var z = x + x;

//// [anyPlusAny1.js]
var x;
x.name = "hello";
var z = x + x;
