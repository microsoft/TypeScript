//// [tests/cases/conformance/types/primitives/string/assignFromStringInterface.ts] ////

//// [assignFromStringInterface.ts]
var x = '';
declare var a: String;
x = a;
a = x;

//// [assignFromStringInterface.js]
var x = '';
x = a;
a = x;
