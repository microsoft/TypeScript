//// [tests/cases/conformance/types/primitives/boolean/assignFromBooleanInterface.ts] ////

//// [assignFromBooleanInterface.ts]
var x = true;
declare var a: Boolean;
x = a;
a = x;

//// [assignFromBooleanInterface.js]
"use strict";
var x = true;
x = a;
a = x;
