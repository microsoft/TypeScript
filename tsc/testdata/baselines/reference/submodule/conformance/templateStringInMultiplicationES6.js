//// [tests/cases/conformance/es6/templates/templateStringInMultiplicationES6.ts] ////

//// [templateStringInMultiplicationES6.ts]
var x = 1 * `abc${ 1 }def`;

//// [templateStringInMultiplicationES6.js]
"use strict";
var x = 1 * `abc${1}def`;
