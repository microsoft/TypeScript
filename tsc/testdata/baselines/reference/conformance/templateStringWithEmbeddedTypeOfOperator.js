//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedTypeOfOperator.ts] ////

//// [templateStringWithEmbeddedTypeOfOperator.ts]
var x = `abc${ typeof "hi" }def`;

//// [templateStringWithEmbeddedTypeOfOperator.js]
"use strict";
var x = `abc${typeof "hi"}def`;
