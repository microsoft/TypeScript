//// [tests/cases/conformance/es6/templates/templateStringInDivision.ts] ////

//// [templateStringInDivision.ts]
var x = `abc${ 1 }def` / 1;

//// [templateStringInDivision.js]
"use strict";
var x = `abc${1}def` / 1;
