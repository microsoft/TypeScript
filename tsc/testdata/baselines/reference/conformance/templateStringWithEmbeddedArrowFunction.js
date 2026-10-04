//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedArrowFunction.ts] ////

//// [templateStringWithEmbeddedArrowFunction.ts]
var x = `abc${ x => x }def`;

//// [templateStringWithEmbeddedArrowFunction.js]
"use strict";
var x = `abc${x => x}def`;
