//// [tests/cases/compiler/fatarrowfunctionsOptionalArgsErrors2.ts] ////

//// [fatarrowfunctionsOptionalArgsErrors2.ts]
var tt1 = (a, (b, c)) => a+b+c;
var tt2 = ((a), b, c) => a+b+c;

var tt3 = ((a)) => a;

//// [fatarrowfunctionsOptionalArgsErrors2.js]
"use strict";
var tt1 = (a, (b, c));
a + b + c;
var tt2 = ((a), b, c);
a + b + c;
var tt3 = ((a));
a;
