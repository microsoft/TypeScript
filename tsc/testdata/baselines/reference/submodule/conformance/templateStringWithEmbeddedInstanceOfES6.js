//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedInstanceOfES6.ts] ////

//// [templateStringWithEmbeddedInstanceOfES6.ts]
var x = `abc${ "hello" instanceof String }def`;

//// [templateStringWithEmbeddedInstanceOfES6.js]
"use strict";
var x = `abc${"hello" instanceof String}def`;
