//// [tests/cases/conformance/types/primitives/string/assignFromStringInterface.ts] ////

//// [assignFromStringInterface.ts]
var x = '';
var a: String;
x = a;
a = x;

//// [assignFromStringInterface.js]
var x = '';
var a;
x = a;
a = x;
