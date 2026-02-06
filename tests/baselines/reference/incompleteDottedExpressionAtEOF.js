//// [tests/cases/compiler/incompleteDottedExpressionAtEOF.ts] ////

//// [incompleteDottedExpressionAtEOF.ts]
// used to leak __missing into error message
var p2 = window. 

//// [incompleteDottedExpressionAtEOF.js]
"use strict";
// used to leak __missing into error message
var p2 = window.;
