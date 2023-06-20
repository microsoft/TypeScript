//// [tests/cases/conformance/types/primitives/boolean/assignFromBooleanInterface.ts] ////

//// [assignFromBooleanInterface.ts]
var x = true;
var a: Boolean;
x = a;
a = x;

//// [assignFromBooleanInterface.js]
var x = true;
var a;
x = a;
a = x;
