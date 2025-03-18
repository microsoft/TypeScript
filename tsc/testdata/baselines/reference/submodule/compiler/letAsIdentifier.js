//// [tests/cases/compiler/letAsIdentifier.ts] ////

//// [letAsIdentifier.ts]
var let = 10;
var a = 10;
let = 30;
let
a;

//// [letAsIdentifier.js]
var let = 10;
var a = 10;
let = 30;
let a;
