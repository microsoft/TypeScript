//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedInstanceOf.ts] ////

//// [templateStringWithEmbeddedInstanceOf.ts]
var x = `abc${ "hello" instanceof String }def`;

//// [templateStringWithEmbeddedInstanceOf.js]
"use strict";
var x = "abc".concat("hello" instanceof String, "def");
