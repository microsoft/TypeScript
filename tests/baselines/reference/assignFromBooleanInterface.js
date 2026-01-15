//// [tests/cases/conformance/types/primitives/boolean/assignFromBooleanInterface.ts] ////

//// [assignFromBooleanInterface.ts]
var x = true;
declare var a: Boolean;
x = a;
a = x;

//// [assignFromBooleanInterface.js]
var x = true;
x = a;
a = x;
