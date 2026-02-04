//// [tests/cases/conformance/es6/templates/templateStringInMultiplication.ts] ////

//// [templateStringInMultiplication.ts]
var x = 1 * `abc${ 1 }def`;

//// [templateStringInMultiplication.js]
"use strict";
var x = 1 * `abc${1}def`;
