//// [tests/cases/conformance/types/primitives/number/assignFromNumberInterface.ts] ////

//// [assignFromNumberInterface.ts]
var x = 1;
declare var a: Number;
x = a;
a = x;

//// [assignFromNumberInterface.js]
var x = 1;
x = a;
a = x;
