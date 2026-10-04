//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedConditional.ts] ////

//// [templateStringWithEmbeddedConditional.ts]
var x = `abc${ true ? false : " " }def`;

//// [templateStringWithEmbeddedConditional.js]
"use strict";
var x = `abc${true ? false : " "}def`;
