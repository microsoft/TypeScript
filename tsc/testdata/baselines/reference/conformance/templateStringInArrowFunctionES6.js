//// [tests/cases/conformance/es6/templates/templateStringInArrowFunctionES6.ts] ////

//// [templateStringInArrowFunctionES6.ts]
var x = x => `abc${ x }def`;

//// [templateStringInArrowFunctionES6.js]
"use strict";
var x = x => `abc${x}def`;
