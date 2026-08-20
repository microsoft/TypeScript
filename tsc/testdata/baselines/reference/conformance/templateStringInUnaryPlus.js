//// [tests/cases/conformance/es6/templates/templateStringInUnaryPlus.ts] ////

//// [templateStringInUnaryPlus.ts]
var x = +`abc${ 123 }def`;

//// [templateStringInUnaryPlus.js]
"use strict";
var x = +`abc${123}def`;
